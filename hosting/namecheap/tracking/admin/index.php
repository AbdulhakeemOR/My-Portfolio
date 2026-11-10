<?php
declare(strict_types=1);
require dirname(__DIR__) . '/workflow-core.php';
trackingHeaders();
header("Content-Security-Policy: default-src 'none'; style-src 'self'; script-src 'self'; img-src data:; form-action 'self'; frame-ancestors 'none'; base-uri 'none'");
header('Content-Type: text/html; charset=utf-8');
// Apache sets REMOTE_USER only after cPanel Directory Privacy authenticates.
// Do not trust HTTP headers or PHP_AUTH_USER as proof of authentication.
if (($_SERVER['REMOTE_USER'] ?? '') !== 'aor-project-admin') {
    http_response_code(403);
    exit('Project admin is locked. Protect this admin folder using cPanel Directory Privacy and create the user aor-project-admin.');
}
$https = ($_SERVER['HTTPS'] ?? '') === 'on';
if (!$https && !in_array($_SERVER['REMOTE_ADDR'] ?? '', ['127.0.0.1', '::1'], true)) { http_response_code(403); exit('Use HTTPS to manage projects.'); }
function esc(mixed $value): string { return htmlspecialchars((string)$value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }
function customerUrl(string $token): string {
    $origin = 'https://abdulhakeemor.com';
    // Local PHP preview links must stay local, never point at a live customer site.
    if (PHP_SAPI === 'cli-server' && ($_SERVER['SERVER_NAME'] ?? '') === '127.0.0.1') {
        $origin = 'http://127.0.0.1:' . (int)($_SERVER['SERVER_PORT'] ?? 0);
    }
    return $origin . '/tracking/#key=' . $token;
}
$error = '';
$draft = null;
try {
    $sessionDirectory = trackingDirectory() . DIRECTORY_SEPARATOR . 'sessions';
    if (is_link($sessionDirectory)) throw new RuntimeException('Storage unavailable.');
    if (!is_dir($sessionDirectory) && !mkdir($sessionDirectory, 0700)) throw new RuntimeException('Storage unavailable.');
    ini_set('session.use_strict_mode', '1');
    ini_set('session.use_only_cookies', '1');
    session_save_path($sessionDirectory);
    session_name('AOR_PROJECT_ADMIN');
    session_set_cookie_params(['lifetime' => 0, 'path' => '/tracking/admin/', 'secure' => $https, 'httponly' => true, 'samesite' => 'Strict']);
    session_start();
    if (!isset($_SESSION['started'])) { session_regenerate_id(true); $_SESSION['started'] = time(); }
    if (time() - $_SESSION['started'] > 1800) { session_regenerate_id(true); $_SESSION = ['started' => time()]; }
    $_SESSION['csrf'] ??= bin2hex(random_bytes(32));
    $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
    if ($method === 'POST') {
        if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > 16000) throw new InvalidArgumentException('Request too large.');
        if (!is_string($_POST['csrf'] ?? null) || !hash_equals($_SESSION['csrf'], $_POST['csrf'])) {
            http_response_code(403);
            throw new InvalidArgumentException('This form expired. Reload the page and try again.');
        }
        if (($_SERVER['HTTP_SEC_FETCH_SITE'] ?? '') === 'cross-site') {
            http_response_code(403);
            throw new InvalidArgumentException('Open the admin page directly to save changes.');
        }
        $action = $_POST['action'] ?? '';
        if (!in_array($action, ['create', 'save', 'rotate', 'revoke'], true)) throw new InvalidArgumentException('Unknown action.');
        if (in_array($action, ['rotate', 'revoke'], true) && ($_POST['confirm'] ?? '') !== 'yes') throw new InvalidArgumentException('Confirm this link change before saving.');
        $result = trackingLocked(function () use ($action): array {
            $now = gmdate('c');
            $token = null;
            if ($action === 'create') {
                $record = trackingFields($_POST);
                $token = bin2hex(random_bytes(32));
                $id = hash('sha256', $token);
                $record['created_at'] = $now;
                $record['expires_at'] = gmdate('c', time() + $record['link_days'] * 86400);
                $record['revoked'] = false;
            } else {
                $id = trackingId(is_string($_POST['id'] ?? null) ? $_POST['id'] : '');
                $record = trackingRead($id);
                if (!is_string($_POST['revision'] ?? null) || !hash_equals((string)($record['revision'] ?? ''), $_POST['revision'])) throw new InvalidArgumentException('This project changed in another tab. Reload it before saving.');
                if ($action === 'save') {
                    $previousStage = $record['stage'] ?? '';
                    $record = array_merge($record, trackingFields($_POST));
                    if (($record['completed'] ?? false) && !workflowBalancePaid($record)) throw new InvalidArgumentException('Mark the active balance invoice Paid before completing the project.');
                    if ($previousStage !== $record['stage']) workflowActivity($record, 'stage_changed', $previousStage . ' → ' . $record['stage']);
                    workflowMaybeTestimonial($record);
                    // Saving progress must not silently reactivate a disabled link.
                } elseif ($action === 'revoke') {
                    $record['revoked'] = true;
                    $record['expires_at'] = $now;
                } elseif ($action === 'rotate') {
                    $token = bin2hex(random_bytes(32));
                    $newId = hash('sha256', $token);
                    $record['link_token_private'] = $token; // invoice emails and proposal re-sends use this link
                    $record['revoked'] = false;
                    $record['expires_at'] = gmdate('c', time() + max(1, min(3650, (int)($record['link_days'] ?? 90))) * 86400);
                    $record['revision'] = bin2hex(random_bytes(16));
                    $record['updated_at'] = $now;
                    workflowActivity($record, 'link_replaced', 'New customer link created; the old link no longer works.');
                    trackingWrite($newId, $record);
                    // Private files are stored under the project id, so they move with the new link.
                    $files = trackingDirectory() . DIRECTORY_SEPARATOR . 'files' . DIRECTORY_SEPARATOR;
                    if (is_dir($files . $id) && !rename($files . $id, $files . $newId)) {
                        unlink(trackingDirectory() . DIRECTORY_SEPARATOR . $newId . '.json');
                        throw new RuntimeException('Could not move private files to the new link.');
                    }
                    if (!unlink(trackingDirectory() . DIRECTORY_SEPARATOR . $id . '.json')) {
                        if (is_dir($files . $newId)) rename($files . $newId, $files . $id);
                        unlink(trackingDirectory() . DIRECTORY_SEPARATOR . $newId . '.json');
                        throw new RuntimeException('Could not replace link.');
                    }
                    return ['id' => $newId, 'token' => $token];
                }
            }
            $record['updated_at'] = $now;
            $record['revision'] = bin2hex(random_bytes(16));
            trackingWrite($id, $record);
            return ['id' => $id, 'token' => $token];
        });
        $_SESSION['flash'] = ['message' => ['create' => 'Project created.', 'save' => 'Progress saved. The customer can refresh their link to see it.', 'rotate' => 'New link created. The old link no longer works.', 'revoke' => 'Customer link disabled.'][$action]];
        if ($result['token']) $_SESSION['flash']['link'] = customerUrl($result['token']);
        header('Location: ./?edit=' . $result['id'], true, 303);
        exit;
    }
    if ($method !== 'GET') { http_response_code(405); exit('Method not allowed.'); }
} catch (InvalidArgumentException $exception) {
    if (http_response_code() < 400) http_response_code(422);
    $error = $exception->getMessage();
    $draft = $_POST;
} catch (Throwable $exception) {
    http_response_code(503);
    exit('Project admin could not complete this request. Check private storage permissions, then reload.');
}
$flash = $_SESSION['flash'] ?? null;
unset($_SESSION['flash']);
try {
    trackingEnsureReferences(); // older projects get a readable reference once
    $records = trackingRecords();
} catch (Throwable $exception) { http_response_code(503); exit('Could not load projects. Check private storage permissions and records.'); }
$editId = is_string($_GET['edit'] ?? null) ? $_GET['edit'] : '';
if ($draft && isset($draft['id']) && is_string($draft['id'])) $editId = $draft['id'];
$editing = $records[$editId] ?? null;
$values = $draft ?? $editing ?? ['title' => '', 'stage' => 'Brief', 'update' => '', 'next_step' => '', 'milestone_date' => '', 'link_days' => 90, 'completed' => false];
if ($draft) $values['completed'] = ($draft['completed'] ?? '') === '1';
?>
<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Project admin | AOR</title><link rel="stylesheet" href="../tracking.css"><link rel="stylesheet" href="admin.css"><link rel="stylesheet" href="../ui/date-picker.css"><script src="../ui/date-picker.js" defer></script><script src="admin.js" defer></script></head>
<body><main>
  <p class="eyebrow">AOR · Private workspace</p><h1>Manage your projects</h1>
  <p>Create a project, copy its private link, and save updates here. Customers never need an account.</p>
  <?php if ($error): ?><p class="notice error" role="alert"><?= esc($error) ?></p><?php endif; ?>
  <?php if ($flash): ?><div class="notice" role="status"><p><?= esc($flash['message']) ?></p>
    <?php if (isset($flash['link'])): ?><label for="customer-link">Copy and save this link now. It is shown once.</label><input id="customer-link" readonly value="<?= esc($flash['link']) ?>"><button type="button" id="copy-link">Copy customer link</button><span id="copy-status" role="status"></span><p>Anyone with this link can view the project's status. Share it privately.</p><?php endif; ?>
  </div><?php endif; ?>
  <div class="admin-layout"><section class="project-list" aria-labelledby="projects-heading"><h2 id="projects-heading">Projects</h2><a class="new-project" href="./">+ New project</a>
    <?php if (!$records): ?><p>No projects yet. Create your first project using the form.</p><?php endif; ?>
    <?php foreach ($records as $id => $row): ?>
      <a class="project-item" href="?edit=<?= esc($id) ?>" <?= $id === $editId ? 'aria-current="page"' : '' ?>><small class="project-ref"><?= esc($row['reference'] ?? '') ?></small><strong><?= esc($row['title']) ?></strong><span><?= esc($row['stage']) ?><?= ($row['completed'] ?? false) ? ' · Complete' : '' ?></span><small><?= ($row['revoked'] ?? false) ? 'Link disabled' : ((strtotime($row['expires_at'] ?? '') ?: 0) <= time() ? 'Link expired' : 'Link active') ?></small></a>
    <?php endforeach; ?>
  </section>
  <section aria-labelledby="edit-heading"><h2 id="edit-heading"><?= $editing ? 'Update project' : 'Create project' ?></h2><?php if ($editing && !empty($editing['reference'])): ?><p class="project-ref">Project reference: <strong><?= esc($editing['reference']) ?></strong></p><?php endif; ?>
    <?php if ($editing): ?><p><a class="new-project" href="workflow.php?edit=<?= esc($editId) ?>">Open complete project workflow →</a></p><?php endif; ?>
    <form method="post" action="<?= $editing ? '?edit=' . esc($editId) : './' ?>">
      <input type="hidden" name="csrf" value="<?= esc($_SESSION['csrf']) ?>">
      <?php if ($editing): ?><input type="hidden" name="id" value="<?= esc($editId) ?>"><input type="hidden" name="revision" value="<?= esc($draft['revision'] ?? $editing['revision'] ?? '') ?>"><?php endif; ?>
      <label for="title">Project title</label><input id="title" name="title" maxlength="160" required value="<?= esc($values['title'] ?? '') ?>">
      <label for="stage">Current stage</label><select id="stage" name="stage"><?php foreach (TRACKING_STAGES as $stage): ?><option <?= ($values['stage'] ?? '') === $stage ? 'selected' : '' ?>><?= esc($stage) ?></option><?php endforeach; ?></select>
      <label for="update">Latest update</label><textarea id="update" name="update" rows="4" maxlength="4000"><?= esc($values['update'] ?? '') ?></textarea>
      <label for="next_step">What the customer needs to do next</label><textarea id="next_step" name="next_step" rows="3" maxlength="2000"><?= esc($values['next_step'] ?? '') ?></textarea>
      <label for="milestone_date">Next milestone date (optional)</label><input type="date" id="milestone_date" name="milestone_date" value="<?= esc($values['milestone_date'] ?? '') ?>">
      <label for="days">New link validity, in days</label><input id="days" name="days" type="number" min="1" max="3650" required value="<?= esc($values['days'] ?? $values['link_days'] ?? 90) ?>"><p class="hint">Used when creating or replacing a link. Saving progress keeps the current expiry date.</p>
      <label class="checkbox"><input type="checkbox" name="completed" value="1" <?= ($values['completed'] ?? false) ? 'checked' : '' ?>>Project complete (Delivery stage only)</label>
      <button name="action" value="<?= $editing ? 'save' : 'create' ?>"><?= $editing ? 'Save progress' : 'Create project & get link' ?></button>
    </form>
    <?php if ($editing && !empty($editing['enquiries']) && is_array($editing['enquiries'])): ?>
      <section class="enquiry-history" aria-labelledby="enquiry-history-heading">
        <h3 id="enquiry-history-heading">Enquiry messages</h3>
        <p><strong>Client:</strong> <?= esc($editing['client_name'] ?? '') ?> &lt;<?= esc($editing['client_email'] ?? '') ?>&gt;</p>
        <?php foreach (array_reverse($editing['enquiries']) as $enquiry): ?>
          <article class="enquiry-message">
            <h4><?= esc($enquiry['subject'] ?? 'Enquiry') ?></h4>
            <p class="hint"><?= esc($enquiry['received_at'] ?? '') ?> · <?= esc($enquiry['service'] ?? 'Service not selected') ?> · <?= esc($enquiry['timeline'] ?? 'Timeline not provided') ?></p>
            <p><?= nl2br(esc($enquiry['message'] ?? '')) ?></p>
          </article>
        <?php endforeach; ?>
      </section>
    <?php endif; ?>
    <?php if ($editing): ?><div class="link-controls"><h3>Customer link</h3><p>Expires: <?= esc($editing['expires_at'] ?? '') ?>. Lost links can be replaced; the previous link will stop working.</p>
      <form method="post" action="?edit=<?= esc($editId) ?>"><input type="hidden" name="csrf" value="<?= esc($_SESSION['csrf']) ?>"><input type="hidden" name="id" value="<?= esc($editId) ?>"><input type="hidden" name="revision" value="<?= esc($editing['revision'] ?? '') ?>">
        <label class="checkbox"><input type="checkbox" name="confirm" value="yes" required>I understand the current customer link will stop working.</label>
        <div class="actions"><button name="action" value="rotate">Replace customer link</button><button class="secondary" name="action" value="revoke">Disable customer link</button></div>
      </form></div><?php endif; ?>
  </section></div>
  <p class="privacy">Keep confidential files, passwords, and payment details out of project updates. Only you sign in here. Close your private browser window when finished; the browser manages this directory's sign-in.</p>
</main></body></html>
