<?php
// Public list of testimonials for the website. Only entries the client allowed AND the
// owner published are returned, and only the text, display name, rating and date —
// never emails, project titles or tracking ids.
declare(strict_types=1);
require __DIR__ . '/core.php';
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-cache'); // publish/unpublish must show on the next page load
header('X-Content-Type-Options: nosniff');
if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'GET') { http_response_code(405); exit; }
$items = [];
try {
    foreach (glob(trackingDirectory() . DIRECTORY_SEPARATOR . '*.json') ?: [] as $path) {
        $id = basename($path, '.json');
        if (!preg_match('/\A[a-f0-9]{64}\z/', $id)) continue;
        try { $record = trackingRead($id); } catch (Throwable) { continue; }
        $t = $record['testimonial'] ?? null;
        if (!is_array($t) || ($t['public_ok'] ?? false) !== true || ($t['published'] ?? false) !== true) continue;
        $text = trim((string)($t['text'] ?? '')); $name = trim((string)($t['public_name'] ?? ''));
        if ($text === '' || $name === '') continue;
        $items[] = ['text' => $text, 'name' => $name, 'rating' => max(0, min(5, (int)($t['rating'] ?? 0))), 'published_at' => (string)($t['published_at'] ?? '')];
    }
    usort($items, static fn(array $a, array $b): int => strcmp($b['published_at'], $a['published_at']));
    echo json_encode(['testimonials' => array_slice($items, 0, 12)], JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);
} catch (Throwable) {
    http_response_code(503); echo json_encode(['testimonials' => []]);
}
