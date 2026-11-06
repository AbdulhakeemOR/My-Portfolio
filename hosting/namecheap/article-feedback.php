<?php
declare(strict_types=1);
require __DIR__ . '/feedback-core.php';
fbHeaders();
header('Content-Type: application/json; charset=UTF-8');

try {
    $method = $_SERVER['REQUEST_METHOD'] ?? '';
    if ($method === 'GET') {
        $article = fbArticle($_GET['article'] ?? null);
        $page = filter_var($_GET['page'] ?? '0', FILTER_VALIDATE_INT);
        if ($page === false || $page < 0 || $page > 1000) fbFail(422, 'page');
        if (($_GET['participate'] ?? '') === '1') {
            if (($_SERVER['HTTP_X_AOR_FEEDBACK'] ?? '') !== '1') fbFail(403, 'token');
            fbVisitor(true);
        }
        echo json_encode(fbState(fbDatabase(), $article, $page), JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
        exit;
    }
    if ($method !== 'POST') {
        header('Allow: GET, POST');
        fbFail(405, 'method');
    }
    fbOrigin();
    if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 16384) fbFail(413, 'size');
    $raw = file_get_contents('php://input', false, null, 0, 16385);
    if (strlen($raw) > 16384) fbFail(413, 'size');
    $input = json_decode($raw, true);
    if (!is_array($input)) fbFail(422, 'fields');
    $article = fbArticle($input['article'] ?? null);
    $db = fbDatabase();
    fbCheckToken($db, $article, $input['token'] ?? null);
    $identity = fbIdentity($db);
    $action = $input['action'] ?? '';
    $result = fbTransaction($db, function () use ($db, $input, $article, $identity, $action) {
        if ($action === 'like') {
            if (!is_bool($input['liked'] ?? null)) fbFail(422, 'fields');
            fbLimit($db, 'likes', 60);
            $query = $db->prepare('INSERT OR IGNORE INTO stats(article,likes) VALUES (?,0)');
            $query->execute([$article]);
            $query = $db->prepare('SELECT 1 FROM votes WHERE article=? AND visitor=?');
            $query->execute([$article, $identity]);
            $existing = (bool) $query->fetchColumn();
            if ($input['liked'] && !$existing) {
                $query = $db->prepare('INSERT INTO votes(article,visitor,expires) VALUES (?,?,?)');
                $query->execute([$article, $identity, time() + 30 * 86400]);
                $query = $db->prepare('UPDATE stats SET likes=likes+1 WHERE article=?');
                $query->execute([$article]);
            } elseif (!$input['liked'] && $existing) {
                $query = $db->prepare('DELETE FROM votes WHERE article=? AND visitor=?');
                $query->execute([$article, $identity]);
                $query = $db->prepare('UPDATE stats SET likes=MAX(0,likes-1) WHERE article=?');
                $query->execute([$article]);
            }
        } elseif ($action === 'comment') {
            if (($input['website'] ?? '') !== '') fbFail(422, 'fields');
            $name = fbText($input['name'] ?? null, 80);
            $body = fbText($input['body'] ?? null, 2000);
            fbLimit($db, 'comments', 5);
            if ((int) $db->query('SELECT COUNT(*) FROM comments WHERE approved=0')->fetchColumn() >= 500) fbFail(503, 'capacity');
            $query = $db->prepare('INSERT INTO comments(id,article,name,body,visitor,created) VALUES (?,?,?,?,?,?)');
            $query->execute([bin2hex(random_bytes(16)), $article, $name, $body, $identity, time()]);
        } elseif ($action === 'delete') {
            $id = $input['id'] ?? '';
            if (!is_string($id) || !preg_match('/^[a-f0-9]{32}$/D', $id)) fbFail(422, 'fields');
            $query = $db->prepare('DELETE FROM comments WHERE id=? AND article=? AND visitor=?');
            $query->execute([$id, $article, $identity]);
            if ($query->rowCount() !== 1) fbFail(404, 'comment');
        } else {
            fbFail(422, 'action');
        }
        return fbState($db, $article);
    });
    if ($action === 'comment') http_response_code(201);
    echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
} catch (FeedbackError $error) {
    http_response_code($error->status);
    if ($error->status === 429) header('Retry-After: 3600');
    echo json_encode(['ok' => false, 'error' => $error->getMessage()]);
} catch (Throwable $error) {
    error_log('AOR discussion: request failed (' . get_class($error) . ').');
    http_response_code(503);
    echo json_encode(['ok' => false, 'error' => 'unavailable']);
}
