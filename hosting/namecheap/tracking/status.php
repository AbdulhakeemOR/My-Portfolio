<?php
declare(strict_types=1);
require __DIR__ . '/core.php';
trackingHeaders();
header('Content-Type: application/json; charset=utf-8');
function fail(int $status, string $message): void {
    http_response_code($status);
    echo json_encode(['error' => $message]);
    exit;
}
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') fail(405, 'Open your private project link to view progress.');
if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > 1024) fail(413, 'Request too large.');
$input = json_decode((string)file_get_contents('php://input', false, null, 0, 1025), true);
$token = is_array($input) ? ($input['token'] ?? '') : '';
if (!is_string($token) || !preg_match('/\A[a-f0-9]{64}\z/', $token)) fail(404, 'This project link is unavailable or has expired.');
try {
    $record = trackingRead(hash('sha256', $token));
    $expiry = strtotime($record['expires_at'] ?? '');
    if (!$expiry || $expiry <= time() || ($record['revoked'] ?? false)) fail(404, 'This project link is unavailable or has expired.');
    $output = [];
    foreach (['title', 'stage', 'update', 'next_step', 'milestone_date', 'updated_at'] as $field) {
        $output[$field] = is_string($record[$field] ?? null) ? $record[$field] : '';
    }
    $output['completed'] = ($record['completed'] ?? false) === true;
    echo json_encode($output, JSON_UNESCAPED_UNICODE | JSON_INVALID_UTF8_SUBSTITUTE);
} catch (OutOfBoundsException $error) {
    fail(404, 'This project link is unavailable or has expired.');
} catch (Throwable $error) {
    fail(503, 'Project updates are temporarily unavailable.');
}
