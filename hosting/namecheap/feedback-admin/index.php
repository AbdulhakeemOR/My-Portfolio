<?php
declare(strict_types=1);
require dirname(__DIR__) . '/feedback-core.php';
fbHeaders();
header("Content-Security-Policy: default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; frame-ancestors 'none'");

// Trust only the web server's authenticated user, never a client-provided header
// or PHP_AUTH_USER parsed from an unverified Basic Authorization request.
if (($_SERVER['REMOTE_USER'] ?? '') !== FEEDBACK_MODERATOR) {
    http_response_code(403);
    header('Content-Type: text/plain; charset=UTF-8');
    exit('Moderation is locked. In cPanel Directory Privacy, protect this feedback-admin folder and create a separate user named aor-moderator. Sign in with that user. Do not share its password with review visitors.');
}

function esc(string $text): string {
    return htmlspecialchars($text, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

try {
    $db = fbDatabase();
    fbVisitor(true);
    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
        fbOrigin();
        fbCheckToken($db, 'admin', $_POST['token'] ?? null);
        $id = $_POST['id'] ?? '';
        $action = $_POST['action'] ?? '';
        if (!is_string($id) || !preg_match('/^[a-f0-9]{32}$/D', $id) || !in_array($action, ['approve', 'delete'], true)) fbFail(422, 'fields');
        fbTransaction($db, function () use ($db, $id, $action) {
            $query = $db->prepare($action === 'approve' ? 'UPDATE comments SET approved=1 WHERE id=?' : 'DELETE FROM comments WHERE id=?');
            $query->execute([$id]);
        });
        header('Location: ' . FEEDBACK_BASE_PATH . '/feedback-admin/', true, 303);
        exit;
    }
    if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'GET') fbFail(405, 'method');
    fbTransaction($db, static fn() => null);
    $status = ($_GET['status'] ?? '') === 'approved' ? 1 : 0;
    $page = max(0, min(10000, (int) ($_GET['page'] ?? 0)));
    $query = $db->prepare('SELECT * FROM comments WHERE approved=? ORDER BY created DESC,id DESC LIMIT 50 OFFSET ?');
    $query->execute([$status, $page * 50]);
    $rows = $query->fetchAll();
    header('Content-Type: text/html; charset=UTF-8');
    echo '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>AOR comment moderation</title><style>body{font:17px/1.6 system-ui;max-width:850px;margin:auto;padding:24px;color:#18211f;background:#f7f9f7}article{border:1px solid #b7c6bd;margin:24px 0;padding:20px;overflow-wrap:anywhere}button,a{padding:8px 12px}p{white-space:pre-wrap}form{display:flex;gap:16px;flex-wrap:wrap}</style><main><h1>Article comment moderation</h1>';
    echo '<p>Environment: ' . (FEEDBACK_BASE_PATH === '' ? 'production' : 'protected review') . '. Approve publishes a comment. Delete removes it. Pending comments expire after 30 days when cleanup next runs.</p>';
    echo '<nav><a href="?status=pending">Pending</a><a href="?status=approved">Approved</a></nav>';
    if (!$rows) echo '<p>No comments in this view.</p>';
    $titles = fbArticles();
    foreach ($rows as $row) {
        echo '<article><h2>' . esc($titles[$row['article']] ?? $row['article']) . '</h2><strong>' . esc($row['name']) . '</strong><p>' . esc($row['body']) . '</p><small>' . gmdate('Y-m-d H:i', (int) $row['created']) . ' UTC</small>';
        echo '<form method="post"><input type="hidden" name="token" value="' . fbToken($db, 'admin') . '"><input type="hidden" name="id" value="' . esc($row['id']) . '">';
        if (!$status) echo '<button name="action" value="approve">Approve</button>';
        echo '<button name="action" value="delete">Delete</button></form></article>';
    }
    echo '<nav>';
    if ($page > 0) echo '<a href="?status=' . ($status ? 'approved' : 'pending') . '&amp;page=' . ($page - 1) . '">Previous</a>';
    if (count($rows) === 50) echo '<a href="?status=' . ($status ? 'approved' : 'pending') . '&amp;page=' . ($page + 1) . '">Next</a>';
    echo '</nav></main></html>';
} catch (Throwable $error) {
    http_response_code($error instanceof FeedbackError ? $error->status : 503);
    header('Content-Type: text/plain; charset=UTF-8');
    echo 'Moderation could not complete this request. Check the PHP SQLite extension and private storage permissions, or reload and try again.';
}
