<?php
declare(strict_types=1);
require __DIR__ . '/workflow-core.php';
trackingHeaders(); header('Content-Type: application/json; charset=utf-8');
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') { http_response_code(405); exit; }
try {
    $input = json_decode((string)file_get_contents('php://input'), true);
    if (!is_array($input)) throw new InvalidArgumentException('Your testimonial could not be read. Please try again.');
    $found = workflowCustomerRecord((string)($input['token'] ?? ''));
    $text = workflowText($input['text'] ?? '', 2000);
    if (strlen($text) < 10) throw new InvalidArgumentException('Please write a few words about your experience.');
    $rating = (int)($input['rating'] ?? 0); if ($rating < 0 || $rating > 5) throw new InvalidArgumentException('Choose a rating from 1 to 5, or leave it blank.');
    $testimonial = [
        'text' => $text,
        'rating' => $rating,
        'display_name' => workflowText($input['display_name'] ?? '', 120),
        'public_ok' => ($input['public_ok'] ?? false) === true,
        'submitted_at' => gmdate('c'),
    ];
    $record = trackingLocked(function () use ($found, $testimonial): array {
        $record = workflowProject(trackingRead($found['id']));
        if (!($record['completed'] ?? false)) throw new InvalidArgumentException('Testimonials open once your project is complete.');
        if ($record['testimonial']) throw new InvalidArgumentException('Your testimonial has already been received. Thank you!');
        $record['testimonial'] = $testimonial;
        workflowActivity($record, 'testimonial_received', ($testimonial['rating'] ? $testimonial['rating'] . '/5 · ' : '') . ($testimonial['public_ok'] ? 'May be published' : 'Private: do not publish'));
        $record['updated_at'] = gmdate('c'); $record['revision'] = bin2hex(random_bytes(16));
        trackingWrite($found['id'], $record);
        return $record;
    });
    // The testimonial is already saved; a mail failure must not lose it or show the customer an error.
    try {
        $plain = "New testimonial for {$record['title']}\n\nFrom: {$record['client_name']} <{$record['client_email']}>\n"
            . 'Show as: ' . ($testimonial['display_name'] ?: $record['client_name']) . "\n"
            . 'Rating: ' . ($testimonial['rating'] ? $testimonial['rating'] . ' / 5' : 'Not given') . "\n"
            . 'Permission to publish: ' . ($testimonial['public_ok'] ? 'Yes' : 'No') . "\n\n" . $testimonial['text'];
        aorSendMail(aorOwnerEmail(), 'AOR', 'New testimonial: ' . $record['title'], aorMailTemplate('New testimonial received', '<p>' . nl2br(htmlspecialchars($plain, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8')) . '</p>'), $plain, (string)$record['client_email']);
    } catch (Throwable) {}
    echo json_encode(['ok' => true]);
} catch (OutOfBoundsException) {
    http_response_code(404); echo json_encode(['error' => 'Link unavailable or expired.']);
} catch (InvalidArgumentException $e) {
    http_response_code(422); echo json_encode(['error' => $e->getMessage()]);
} catch (Throwable) {
    http_response_code(503); echo json_encode(['error' => 'Your testimonial could not be saved right now. Please try again later.']);
}
