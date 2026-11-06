<?php
declare(strict_types=1);

const FEEDBACK_BASE_PATH = '';
const FEEDBACK_MODERATOR = 'aor-moderator';

final class FeedbackError extends RuntimeException {
    public int $status;
    public function __construct(int $status, string $code) {
        parent::__construct($code);
        $this->status = $status;
    }
}

function fbFail(int $status, string $code): void {
    throw new FeedbackError($status, $code);
}

function fbHeaders(): void {
    header('Cache-Control: no-store');
    header('X-Content-Type-Options: nosniff');
    header('X-Robots-Tag: noindex, nofollow');
}

function fbTesting(): bool {
    return getenv('AOR_FEEDBACK_TESTING') === '1' && in_array($_SERVER['SERVER_ADDR'] ?? '', ['127.0.0.1', '::1'], true);
}

function fbOrigin(): void {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $allowed = ['https://abdulhakeemor.com', 'https://www.abdulhakeemor.com'];
    if (fbTesting()) $allowed[] = 'http://' . ($_SERVER['HTTP_HOST'] ?? '');
    if (!in_array($origin, $allowed, true)) fbFail(403, 'origin');
}

function fbArticles(): array {
    static $articles;
    if ($articles !== null) return $articles;
    $data = json_decode(file_get_contents(__DIR__ . '/content/articles.json'), true, 512, JSON_THROW_ON_ERROR);
    $articles = [];
    foreach ($data['articles'] as $article) {
        if (($article['published'] ?? true) && trim($article['body'] ?? '') !== '') {
            $articles[$article['slug']] = $article['title'];
        }
    }
    return $articles;
}

function fbArticle(mixed $slug): string {
    if (!is_string($slug) || !array_key_exists($slug, fbArticles())) fbFail(404, 'article');
    return $slug;
}

function fbDatabase(): PDO {
    static $db;
    if ($db instanceof PDO) return $db;
    $documentRoot = realpath($_SERVER['DOCUMENT_ROOT'] ?? '') ?: '';
    $directory = getenv('AOR_FEEDBACK_PRIVATE_DIR');
    if (!$directory || !fbTesting()) {
        // cPanel shared hosting: keep all discussion data outside public_html.
        if (!preg_match('~^(.+)/public_html(?:/.*)?$~', str_replace('\\', '/', $documentRoot), $match)) fbFail(503, 'storage');
        $directory = $match[1] . '/.aor-feedback';
    }
    if (is_link($directory)) fbFail(503, 'storage');
    if (!is_dir($directory) && !mkdir($directory, 0700, true) && !is_dir($directory)) fbFail(503, 'storage');
    $resolved = realpath($directory);
    if (!$resolved || !$documentRoot) fbFail(503, 'storage');
    $normalized = str_replace('\\', '/', $resolved) . '/';
    $public = str_replace('\\', '/', $documentRoot) . '/';
    if (str_starts_with(strtolower($normalized), strtolower($public))) fbFail(503, 'storage');
    $name = FEEDBACK_BASE_PATH === '' ? 'production.sqlite' : 'review.sqlite';
    $db = new PDO('sqlite:' . $resolved . '/' . $name, null, null, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]);
    $db->exec('PRAGMA busy_timeout = 5000');
    $db->exec('CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS stats (article TEXT PRIMARY KEY, likes INTEGER NOT NULL DEFAULT 0 CHECK(likes >= 0));
      CREATE TABLE IF NOT EXISTS votes (article TEXT NOT NULL, visitor TEXT NOT NULL, expires INTEGER NOT NULL, PRIMARY KEY(article, visitor));
      CREATE TABLE IF NOT EXISTS comments (id TEXT PRIMARY KEY, article TEXT NOT NULL, name TEXT NOT NULL, body TEXT NOT NULL, visitor TEXT NOT NULL, created INTEGER NOT NULL, approved INTEGER NOT NULL DEFAULT 0);
      CREATE INDEX IF NOT EXISTS comment_article ON comments(article, approved, created);
      CREATE TABLE IF NOT EXISTS limits (bucket TEXT PRIMARY KEY, count INTEGER NOT NULL, expires INTEGER NOT NULL)');
    $query = $db->prepare('INSERT OR IGNORE INTO settings(key,value) VALUES (?,?)');
    $query->execute(['secret', bin2hex(random_bytes(32))]);
    return $db;
}

function fbSecret(PDO $db): string {
    return (string) $db->query("SELECT value FROM settings WHERE key='secret'")->fetchColumn();
}

function fbCookieName(): string {
    return FEEDBACK_BASE_PATH === '' ? 'aor_discussion' : 'aor_discussion_review';
}

function fbVisitor(bool $create = false): string {
    $value = $_COOKIE[fbCookieName()] ?? '';
    if (is_string($value) && preg_match('/^[a-f0-9]{64}$/D', $value)) return $value;
    if (!$create) return '';
    $value = bin2hex(random_bytes(32));
    setcookie(fbCookieName(), $value, ['expires' => time() + 30 * 86400, 'path' => FEEDBACK_BASE_PATH . '/', 'secure' => !fbTesting(), 'httponly' => true, 'samesite' => 'Strict']);
    $_COOKIE[fbCookieName()] = $value;
    return $value;
}

function fbIdentity(PDO $db): string {
    $visitor = fbVisitor();
    return $visitor === '' ? '' : hash_hmac('sha256', $visitor, fbSecret($db));
}

function fbToken(PDO $db, string $scope): string {
    $visitor = fbVisitor();
    return $visitor === '' ? '' : hash_hmac('sha256', $scope . ':' . $visitor, fbSecret($db));
}

function fbCheckToken(PDO $db, string $scope, mixed $token): void {
    $expected = fbToken($db, $scope);
    if ($expected === '' || !is_string($token) || !hash_equals($expected, $token)) fbFail(403, 'token');
}

function fbTransaction(PDO $db, callable $operation): mixed {
    $db->exec('BEGIN IMMEDIATE');
    try {
        $now = time();
        $db->exec('DELETE FROM limits WHERE expires < ' . $now);
        $db->exec('DELETE FROM votes WHERE expires < ' . $now);
        $db->exec('DELETE FROM comments WHERE approved=0 AND created < ' . ($now - 30 * 86400));
        $result = $operation();
        $db->exec('COMMIT');
        return $result;
    } catch (Throwable $error) {
        $db->exec('ROLLBACK');
        throw $error;
    }
}

function fbLimit(PDO $db, string $action, int $maximum): void {
    $bucket = hash_hmac('sha256', $action . ':' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown'), fbSecret($db));
    $query = $db->prepare('SELECT count FROM limits WHERE bucket=?');
    $query->execute([$bucket]);
    if ((int) $query->fetchColumn() >= $maximum) fbFail(429, 'rate');
    $query = $db->prepare('INSERT INTO limits(bucket,count,expires) VALUES (?,1,?) ON CONFLICT(bucket) DO UPDATE SET count=count+1');
    $query->execute([$bucket, time() + 3600]);
}

function fbText(mixed $value, int $maximum): string {
    if (!is_string($value) || strlen($value) > $maximum * 4 || !preg_match('//u', $value)) fbFail(422, 'fields');
    $value = trim(str_replace("\r\n", "\n", $value));
    if ($value === '' || preg_match_all('/./us', $value) > $maximum || preg_match('/[\x00-\x08\x0b\x0c\x0e-\x1f]/', $value)) fbFail(422, 'fields');
    return $value;
}

function fbState(PDO $db, string $article, int $page = 0): array {
    $visitor = fbIdentity($db);
    $query = $db->prepare('SELECT likes FROM stats WHERE article=?');
    $query->execute([$article]);
    $likes = (int) $query->fetchColumn();
    $query = $db->prepare('SELECT 1 FROM votes WHERE article=? AND visitor=? AND expires>=?');
    $query->execute([$article, $visitor, time()]);
    $liked = (bool) $query->fetchColumn();
    $query = $db->prepare('SELECT id,name,body,created,approved,visitor FROM comments WHERE article=? AND (approved=1 OR visitor=?) ORDER BY created DESC,id DESC LIMIT 21 OFFSET ?');
    $query->execute([$article, $visitor, $page * 20]);
    $rows = $query->fetchAll();
    $more = count($rows) > 20;
    $comments = [];
    foreach (array_slice($rows, 0, 20) as $row) {
        $comments[] = ['id' => $row['id'], 'name' => $row['name'], 'body' => $row['body'], 'date' => gmdate('Y-m-d\TH:i:s\Z', (int) $row['created']), 'pending' => !(bool) $row['approved'], 'mine' => $visitor !== '' && hash_equals($row['visitor'], $visitor)];
    }
    return ['ok' => true, 'likes' => $likes, 'liked' => $liked, 'comments' => $comments, 'more' => $more, 'page' => $page, 'token' => fbToken($db, $article)];
}
