<?php
declare(strict_types=1);
const TRACKING_STAGES = ['Brief', 'Proposal', 'Creation', 'Review', 'Delivery'];
function trackingHeaders(): void {
    header('Cache-Control: no-store, private');
    header('X-Robots-Tag: noindex, nofollow');
    header('X-Content-Type-Options: nosniff');
    header('Referrer-Policy: no-referrer');
}
function trackingDirectory(): string {
    $root = realpath($_SERVER['DOCUMENT_ROOT'] ?? '');
    if (!$root) throw new RuntimeException('Storage unavailable.');
    $directory = dirname($root) . DIRECTORY_SEPARATOR . 'aor-projects';
    if (is_link($directory)) throw new RuntimeException('Storage unavailable.');
    if (!is_dir($directory) && !mkdir($directory, 0700, true) && !is_dir($directory)) throw new RuntimeException('Storage unavailable.');
    $resolved = realpath($directory);
    if (!$resolved || str_starts_with(strtolower($resolved) . DIRECTORY_SEPARATOR, strtolower($root) . DIRECTORY_SEPARATOR)) throw new RuntimeException('Storage unavailable.');
    return $resolved;
}
function trackingId(string $id): string {
    if (!preg_match('/\A[a-f0-9]{64}\z/', $id)) throw new InvalidArgumentException('Invalid project.');
    return $id;
}
function trackingRead(string $id): array {
    $path = trackingDirectory() . DIRECTORY_SEPARATOR . trackingId($id) . '.json';
    if (!is_file($path) || is_link($path)) throw new OutOfBoundsException('Project unavailable.');
    $record = json_decode((string)file_get_contents($path), true, 32, JSON_THROW_ON_ERROR);
    if (!is_array($record) || !in_array($record['stage'] ?? '', TRACKING_STAGES, true)) throw new RuntimeException('Invalid project record.');
    return $record;
}
function trackingLocked(callable $action): mixed {
    $path = trackingDirectory() . DIRECTORY_SEPARATOR . '.write.lock';
    if (is_link($path)) throw new RuntimeException('Storage unavailable.');
    $lock = fopen($path, 'c');
    if (!$lock || !flock($lock, LOCK_EX)) throw new RuntimeException('Storage unavailable.');
    try { return $action(); }
    finally { flock($lock, LOCK_UN); fclose($lock); }
}
function trackingWrite(string $id, array $record): void {
    $directory = trackingDirectory();
    $path = $directory . DIRECTORY_SEPARATOR . trackingId($id) . '.json';
    if (is_link($path)) throw new RuntimeException('Storage unavailable.');
    $temporary = tempnam($directory, '.project-');
    if (!$temporary) throw new RuntimeException('Could not save project.');
    try {
        chmod($temporary, 0600);
        $json = json_encode($record, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR | JSON_PRETTY_PRINT);
        if (file_put_contents($temporary, $json, LOCK_EX) === false || !rename($temporary, $path)) throw new RuntimeException('Could not save project.');
    } finally { if (is_file($temporary)) unlink($temporary); }
}
function trackingFields(array $input): array {
    $result = [];
    foreach (['title' => 160, 'update' => 4000, 'next_step' => 2000, 'stage' => 20, 'milestone_date' => 10] as $field => $limit) {
        $value = $input[$field] ?? '';
        if (!is_string($value) || strlen($value) > $limit) throw new InvalidArgumentException('A field is too long or invalid.');
        $result[$field] = trim($value);
    }
    if ($result['title'] === '' || !in_array($result['stage'], TRACKING_STAGES, true)) throw new InvalidArgumentException('Enter a project title and select a stage.');
    if ($result['milestone_date'] !== '') {
        $date = DateTimeImmutable::createFromFormat('!Y-m-d', $result['milestone_date']);
        if (!$date || $date->format('Y-m-d') !== $result['milestone_date']) throw new InvalidArgumentException('Enter a valid milestone date.');
    }
    $result['completed'] = ($input['completed'] ?? '') === '1';
    if ($result['completed'] && $result['stage'] !== 'Delivery') throw new InvalidArgumentException('Only a project at Delivery can be marked complete.');
    $days = filter_var($input['days'] ?? null, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1, 'max_range' => 3650]]);
    if ($days === false) throw new InvalidArgumentException('Link duration must be between 1 and 3650 days.');
    $result['link_days'] = $days;
    return $result;
}
