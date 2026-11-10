<?php
declare(strict_types=1);
const SITE_BASE_PATH = '';
require __DIR__ . '/tracking/core.php';
require __DIR__ . '/mail-core.php';
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function finish(int $status, string $message): void {
    http_response_code($status);
    if (str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json')) {
        header('Content-Type: application/json; charset=UTF-8');
        echo json_encode(['ok' => false, 'status' => $status]); exit;
    }
    $arabic = ($_POST['language'] ?? '') === 'ar';
    $language = $arabic ? 'ar' : 'en';
    $title = $arabic ? 'تعذر إرسال الرسالة' : 'Your message was not submitted';
    $escape = static fn(string $value): string => htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    $draft = [];
    foreach (['name', 'email', 'subject', 'service', 'timeline', 'message'] as $key) {
        if (isset($_POST[$key]) && is_string($_POST[$key])) $draft[] = $key . ': ' . substr($_POST[$key], 0, 20000);
    }
    header('Content-Type: text/html; charset=UTF-8');
    echo '<!doctype html><html lang="' . $language . '" dir="' . ($arabic ? 'rtl' : 'ltr') . '"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="robots" content="noindex"><title>' . $escape($title) . '</title>';
    echo '<style>body{font:18px/1.7 system-ui;max-width:720px;margin:40px auto;padding:20px;color:#18211f;background:#f7f9f7}textarea{width:100%;min-height:240px;font:inherit}a{color:#863a25}</style><main><h1>' . $escape($title) . '</h1><p>' . $escape($message) . '</p>';
    if ($draft) echo '<label for="draft">Copy your draft before leaving this page.</label><textarea id="draft" readonly>' . $escape(implode("\n", $draft)) . '</textarea>';
    echo '<p><a href="mailto:contact@abdulhakeemor.com">contact@abdulhakeemor.com</a></p><a href="' . SITE_BASE_PATH . '/' . $language . '/contact.html#contact-form">Return to the contact form</a></main></html>'; exit;
}

function field(string $key, int $limit, bool $required = false): string {
    $value = $_POST[$key] ?? '';
    if (!is_string($value) || strlen($value) > $limit * 4 || str_contains($value, "\0") || !preg_match('//u', $value)) finish(422, 'Please check the form fields.');
    $value = trim($value);
    if (preg_match_all('/./us', $value) > $limit || ($required && $value === '')) finish(422, 'Please complete all required fields.');
    return $value;
}

function enforceRateLimit(): void {
    $ratePath = sys_get_temp_dir() . '/aor-contact-' . hash('sha256', __DIR__) . '.json';
    $handle = @fopen($ratePath, 'c+');
    if (!$handle || !flock($handle, LOCK_EX)) finish(503, 'Please try again later or use the email link.');
    $now = time();
    $rates = json_decode(stream_get_contents($handle), true) ?: [];
    $rates = array_filter($rates, static fn($entry): bool => is_array($entry) && ($entry['until'] ?? 0) > $now);
    $key = hash('sha256', $_SERVER['REMOTE_ADDR'] ?? 'unknown');
    $entry = $rates[$key] ?? ['until' => $now + 3600, 'count' => 0];
    if ($entry['count'] >= 5 || count($rates) >= 10000) {
        flock($handle, LOCK_UN); fclose($handle); header('Retry-After: 3600');
        finish(429, 'Too many messages. Please try again later or use the email link.');
    }
    $entry['count']++; $rates[$key] = $entry;
    rewind($handle); $truncated = ftruncate($handle, 0); $encoded = json_encode($rates); $saved = fwrite($handle, $encoded);
    fflush($handle); flock($handle, LOCK_UN); fclose($handle);
    if (!$truncated || $saved !== strlen($encoded)) finish(503, 'Please try again later or use the email link.');
}

function verifyTurnstile(): void {
    try { $settings = aorConfig()['turnstile'] ?? []; }
    catch (Throwable $error) {
        error_log('AOR contact: Turnstile configuration unavailable: ' . $error->getMessage());
        return;
    }
    $secret = is_string($settings['secret_key'] ?? null) ? $settings['secret_key'] : '';
    $siteKey = is_string($settings['site_key'] ?? null) ? $settings['site_key'] : '';
    if ($secret === '' || $siteKey === '') return;
    $token = field('cf-turnstile-response', 2048, true);
    $context = stream_context_create(['http' => [
        'method' => 'POST', 'timeout' => 8, 'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
        'content' => http_build_query(['secret' => $secret, 'response' => $token, 'remoteip' => $_SERVER['REMOTE_ADDR'] ?? '']),
    ]]);
    $response = @file_get_contents('https://challenges.cloudflare.com/turnstile/v0/siteverify', false, $context);
    $result = is_string($response) ? json_decode($response, true) : null;
    if (!is_array($result) || ($result['success'] ?? false) !== true) finish(422, 'Please complete the spam verification and try again.');
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') { header('Allow: POST'); finish(405, 'Please use the contact form.'); }
if ((int)($_SERVER['CONTENT_LENGTH'] ?? 0) > 131072) finish(413, 'Your message is too large.');
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !in_array($origin, ['https://abdulhakeemor.com', 'https://www.abdulhakeemor.com'], true)) finish(403, 'Please use the contact form on abdulhakeemor.com.');
if (field('bot-field', 1000) !== '') finish(422, 'Please use the contact form.');

$name = field('name', 100, true);
if (preg_match_all('/./us', $name) < 2) finish(422, 'Please enter your full name.');
$email = field('email', 254, true);
$subject = field('subject', 160, true);
$service = field('service', 160);
$timeline = field('timeline', 160);
$message = field('message', 5000, true);
$language = field('language', 2) === 'ar' ? 'ar' : 'en';
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || preg_match('/[\r\n]/', $email)) finish(422, 'Please enter a valid email address.');

enforceRateLimit(); verifyTurnstile();
$enquiry = compact('name', 'email', 'subject', 'service', 'timeline', 'message', 'language');
$saved = false; $ownerSent = false;
try { trackingSaveEnquiry($enquiry); $saved = true; }
catch (Throwable $error) { error_log('AOR contact: enquiry save failed: ' . $error->getMessage()); }

$safe = static fn(string $value): string => htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
$ownerPlain = "Name: $name\nEmail: $email\nSubject: $subject\nService: $service\nTimeline: $timeline\n\n$message";
$ownerHtml = '<p><strong>Name:</strong> ' . $safe($name) . '</p><p><strong>Email:</strong> ' . $safe($email) . '</p><p><strong>Subject:</strong> ' . $safe($subject) . '</p><p><strong>Service:</strong> ' . $safe($service) . '</p><p><strong>Timeline:</strong> ' . $safe($timeline) . '</p><p><strong>Message:</strong></p><p>' . nl2br($safe($message)) . '</p>';
try {
    aorSendMail(aorOwnerEmail(), 'Abdulhakeem Oladapo Raji', 'New AOR website enquiry', aorMailTemplate('New website enquiry', $ownerHtml), $ownerPlain, $email);
    $ownerSent = true;
} catch (Throwable $error) { error_log('AOR contact: owner SMTP notification failed: ' . $error->getMessage()); }

if ($saved || $ownerSent) {
    $replySubject = $language === 'ar' ? 'تم استلام رسالتك لدى AOR' : 'AOR received your message';
    $replyPlain = $language === 'ar'
        ? "مرحبًا {$name}،\n\nشكرًا لتواصلك. تم استلام رسالتك بخصوص «{$subject}». سأراجع التفاصيل وأرد عليك خلال يومي عمل.\n\nعبد الحكيم أولادابو راجي\nAOR"
        : "Hello {$name},\n\nThank you for getting in touch. I received your message about “{$subject}”. I will review the details and reply within two business days.\n\nAbdulhakeem Oladapo Raji\nAOR";
    $replyHtml = $language === 'ar'
        ? '<p dir="rtl">مرحبًا ' . $safe($name) . '،</p><p dir="rtl">شكرًا لتواصلك. تم استلام رسالتك بخصوص «' . $safe($subject) . '». سأراجع التفاصيل وأرد عليك خلال يومي عمل.</p>'
        : '<p>Hello ' . $safe($name) . ',</p><p>Thank you for getting in touch. I received your message about “' . $safe($subject) . '”. I will review the details and reply within two business days.</p>';
    try { aorSendMail($email, $name, $replySubject, aorMailTemplate($replySubject, $replyHtml), $replyPlain); }
    catch (Throwable $error) { error_log('AOR contact: customer acknowledgement failed: ' . $error->getMessage()); }
} else finish(503, 'Your message could not be submitted. Please use the email link.');

if (str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json')) { header('Content-Type: application/json; charset=UTF-8'); echo json_encode(['ok' => true]); exit; }
header('Location: ' . SITE_BASE_PATH . '/' . $language . '/contact-success.html', true, 303); exit;
