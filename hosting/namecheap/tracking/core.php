<?php
declare(strict_types=1);
const TRACKING_STAGES = ['Enquiry', 'Brief', 'Proposal', 'Creation', 'Review', 'Delivery'];
function trackingHeaders(): void {
    header('Cache-Control: no-store, private');
    header('X-Robots-Tag: noindex, nofollow');
    header('X-Content-Type-Options: nosniff');
    header('Referrer-Policy: no-referrer');
}
function trackingDirectory(): string {
    $rootInput = getenv('AOR_DOCUMENT_ROOT') ?: ($_SERVER['DOCUMENT_ROOT'] ?? '');
    if ($rootInput === '' && PHP_SAPI === 'cli') $rootInput = dirname(__DIR__);
    $root = realpath($rootInput);
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
// Readable project reference in the invoice style, e.g. PRJ-2026-11-07-001: the date the
// project was created (Riyadh time) and a counter that restarts each month. The 64-character
// id stays the private storage key behind the client link. Callers hold trackingLocked().
function trackingNewReference(string $createdAt): string {
    try { $date = (new DateTimeImmutable($createdAt ?: 'now'))->setTimezone(new DateTimeZone('Asia/Riyadh')); }
    catch (Throwable) { $date = new DateTimeImmutable('now', new DateTimeZone('Asia/Riyadh')); }
    $path = trackingDirectory() . DIRECTORY_SEPARATOR . '.project-sequences.json';
    if (is_link($path)) throw new RuntimeException('Storage unavailable.');
    $sequences = is_file($path) ? json_decode((string)file_get_contents($path), true) : [];
    if (!is_array($sequences)) $sequences = [];
    $month = $date->format('Y-m'); $sequence = ((int)($sequences[$month] ?? 0)) + 1; $sequences[$month] = $sequence;
    if (file_put_contents($path, json_encode($sequences, JSON_PRETTY_PRINT), LOCK_EX) === false) throw new RuntimeException('Could not save project.');
    @chmod($path, 0600);
    return 'PRJ-' . $date->format('Y-m-d') . '-' . str_pad((string)$sequence, 3, '0', STR_PAD_LEFT);
}
// Give older projects a reference, numbered in the order they were created.
function trackingEnsureReferences(): void {
    trackingLocked(function (): void {
        $missing = array_filter(trackingRecords(), static fn(array $r): bool => !is_string($r['reference'] ?? null) || $r['reference'] === '');
        uasort($missing, static fn(array $a, array $b): int => strcmp($a['created_at'] ?? '', $b['created_at'] ?? ''));
        foreach ($missing as $id => $record) trackingWrite($id, $record);
    });
}
function trackingWrite(string $id, array $record): void {
    if (!is_string($record['reference'] ?? null) || $record['reference'] === '') $record['reference'] = trackingNewReference((string)($record['created_at'] ?? ''));
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
function trackingRecords(): array {
    $records = [];
    foreach (glob(trackingDirectory() . DIRECTORY_SEPARATOR . '*.json') ?: [] as $path) {
        $id = basename($path, '.json');
        if (!preg_match('/\A[a-f0-9]{64}\z/', $id)) continue;
        $records[$id] = trackingRead($id);
    }
    uasort($records, static fn(array $a, array $b): int => strcmp($b['updated_at'] ?? '', $a['updated_at'] ?? ''));
    return $records;
}
function trackingEmail(string $email): string {
    return strtolower(trim($email));
}
function trackingFindOpenByEmail(string $email): ?array {
    $needle = trackingEmail($email);
    foreach (trackingRecords() as $id => $record) {
        if (($record['completed'] ?? false) === true) continue;
        if (trackingEmail((string)($record['client_email'] ?? '')) === $needle) {
            return ['id' => $id, 'record' => $record];
        }
    }
    return null;
}
function trackingSaveEnquiry(array $enquiry): array {
    return trackingLocked(function () use ($enquiry): array {
        $now = gmdate('c');
        $match = trackingFindOpenByEmail($enquiry['email']);
        if ($match) {
            $id = $match['id'];
            $record = $match['record'];
            $record['enquiries'] = is_array($record['enquiries'] ?? null) ? $record['enquiries'] : [];
            $record['enquiries'][] = $enquiry + ['received_at' => $now];
            $record['client_name'] = $enquiry['name'];
            $record['client_email'] = trackingEmail($enquiry['email']);
            $record['update'] = 'A new enquiry message was received.';
            $record['updated_at'] = $now;
            $record['revision'] = bin2hex(random_bytes(16));
            trackingWrite($id, $record);
            return ['id' => $id, 'created' => false];
        }
        $id = bin2hex(random_bytes(32));
        $record = [
            'title' => $enquiry['subject'], 'stage' => 'Enquiry',
            'update' => 'New enquiry received.', 'next_step' => 'Awaiting review by AOR.',
            'milestone_date' => '', 'completed' => false, 'link_days' => 90,
            'created_at' => $now, 'expires_at' => $now, 'revoked' => true,
            'updated_at' => $now, 'revision' => bin2hex(random_bytes(16)),
            'client_name' => $enquiry['name'], 'client_email' => trackingEmail($enquiry['email']),
            'enquiries' => [$enquiry + ['received_at' => $now]],
        ];
        trackingWrite($id, $record);
        return ['id' => $id, 'created' => true];
    });
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
