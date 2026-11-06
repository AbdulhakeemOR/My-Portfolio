<?php
declare(strict_types=1);
header('Cache-Control: no-store, private');
header('X-Robots-Tag: noindex, nofollow');
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: no-referrer');
header("Content-Security-Policy: default-src 'none'; style-src 'self'; base-uri 'none'; frame-ancestors 'none'");
header('Content-Type: text/html; charset=utf-8');

// cPanel Directory Privacy supplies this verified identity after authentication.
// A browser header or an unverified Basic Authorization value is not sufficient.
if (($_SERVER['REMOTE_USER'] ?? '') !== 'aor-admin') {
    http_response_code(403);
    exit('Admin Home is locked. In cPanel Directory Privacy, protect public_html/admin and create the user aor-admin.');
}
if (($_SERVER['HTTPS'] ?? '') !== 'on' && !in_array($_SERVER['REMOTE_ADDR'] ?? '', ['127.0.0.1', '::1'], true)) {
    http_response_code(403);
    exit('Open Admin Home using HTTPS.');
}
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'GET' && ($_SERVER['REQUEST_METHOD'] ?? '') !== 'HEAD') {
    http_response_code(405);
    header('Allow: GET, HEAD');
    exit('Method not allowed.');
}

// Add future admin tools here. Keep customer-specific private links out of this list.
$tools = [
    ['title' => 'Project tracking', 'description' => 'Create projects, save progress updates, and manage customer links.',
     'href' => '../tracking/admin/index.php', 'path' => 'public_html/tracking/admin/index.php', 'user' => 'aor-project-admin', 'number' => '01'],
    ['title' => 'Comment moderation', 'description' => 'Review article comments, approve them, or delete them. This tool is currently installed in the protected review area.',
     'href' => '../review/feedback-admin/index.php', 'path' => 'public_html/review/feedback-admin/index.php', 'user' => 'aor-moderator', 'number' => '02']
];
function esc(string $value): string { return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="robots" content="noindex,nofollow">
  <title>Admin Home | AOR</title>
  <link rel="stylesheet" href="hub.css">
</head>
<body>
  <main>
    <p class="eyebrow">AOR · Private workspace</p>
    <h1>Admin Home</h1>
    <p class="intro">One place to find the tools you use to manage your work.</p>
    <p class="remember">Remember your domain plus <strong>/admin/</strong>.</p>
    <div class="tools">
      <?php foreach ($tools as $tool): ?>
      <section class="tool" aria-labelledby="tool-<?= esc($tool['number']) ?>">
        <span class="number" aria-hidden="true"><?= esc($tool['number']) ?></span>
        <h2 id="tool-<?= esc($tool['number']) ?>"><?= esc($tool['title']) ?></h2>
        <p><?= esc($tool['description']) ?></p>
        <a class="button" href="<?= esc($tool['href']) ?>">Open <?= esc(strtolower($tool['title'])) ?> <span aria-hidden="true">↗</span></a>
        <p class="account">Tool username: <strong><?= esc($tool['user']) ?></strong></p>
      </section>
      <?php endforeach; ?>
    </div>
    <p class="note">Each tool keeps its own sign-in. Opening a tool may ask for that tool's credentials.</p>
    <details class="recovery">
      <summary>Find these pages through cPanel</summary>
      <p>Open <strong>File Manager → public_html</strong>. Replace <code>public_html</code> with your website domain to form a website address.</p>
      <dl>
        <dt>This Admin Home</dt><dd><code>public_html/admin/index.php</code></dd>
        <?php foreach ($tools as $tool): ?><dt><?= esc($tool['title']) ?></dt><dd><code><?= esc($tool['path']) ?></code></dd><?php endforeach; ?>
      </dl>
      <p>Use <strong>cPanel → Directory Privacy</strong> to manage each protected folder's username and password.</p>
      <p>Customer project links are created inside Project tracking. If one is lost, replace it there; the previous link will stop working.</p>
    </details>
    <section class="website-links" aria-labelledby="website-heading">
      <h2 id="website-heading">Website versions</h2>
      <a href="../review/">Open protected website review <span aria-hidden="true">↗</span></a>
      <p>The complete review copy. Your review password may be requested.</p>
      <a href="../en/services.html">Open updated Services page <span aria-hidden="true">↗</span></a>
      <p>The integrated services design on the public website.</p>
      <a href="../">Open public homepage <span aria-hidden="true">↗</span></a>
      <p>The homepage currently published at your main domain; it may differ from the review copy.</p>
    </section>
    <footer><p>Close your private browser window when finished. Directory Privacy sign-in is managed by your browser.</p></footer>
  </main>
</body>
</html>
