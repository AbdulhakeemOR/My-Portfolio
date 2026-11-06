<?php
declare(strict_types=1);
const SITE_BASE_PATH = '';

// Requires PHP 8+ and the website@abdulhakeemor.com mailbox in cPanel.
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function finish(int $status, string $message): void {
    http_response_code($status);
    if (str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json')) {
        header('Content-Type: application/json; charset=UTF-8');
        echo json_encode(['ok' => false, 'status' => $status]);
        exit;
    }
    $arabic = ($_POST['language'] ?? '') === 'ar';
    $language = $arabic ? 'ar' : 'en';
    $title = $arabic ? 'تعذر إرسال الرسالة' : 'Your message was not submitted';
    $messages = [
        413 => 'الرسالة كبيرة جدًا. يُرجى تقصيرها أو استخدام رابط البريد.',
        422 => 'يُرجى التحقق من الحقول المطلوبة والبريد وطول الرسالة.',
        429 => 'محاولات كثيرة. يُرجى الانتظار حتى ساعة أو استخدام رابط البريد.',
    ];
    if ($arabic) $message = $messages[$status] ?? 'الخدمة غير متاحة حاليًا. يُرجى استخدام رابط البريد.';
    $escape = static fn(string $value): string => htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    $draft = [];
    foreach (['name', 'email', 'subject', 'service', 'timeline', 'message'] as $key) {
        if (isset($_POST[$key]) && is_string($_POST[$key])) $draft[] = $key . ': ' . substr($_POST[$key], 0, 20000);
    }
    header('Content-Type: text/html; charset=UTF-8');
    echo '<!doctype html><html lang="' . $language . '" dir="' . ($arabic ? 'rtl' : 'ltr') . '"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta name="robots" content="noindex"><title>' . $title . '</title>';
    echo '<style>body{font:18px/1.7 system-ui;max-width:720px;margin:40px auto;padding:20px;color:#18211f;background:#f7f9f7}textarea{width:100%;min-height:240px;font:inherit}a{color:#863a25}</style><main><h1>' . $title . '</h1><p>' . $escape($message) . '</p>';
    if ($draft) {
        $label = $arabic ? 'انسخ مسودتك قبل مغادرة الصفحة.' : 'Copy your draft before leaving this page.';
        echo '<label for="draft">' . $label . '</label><textarea id="draft" readonly>' . $escape(implode("\n", $draft)) . '</textarea>';
    }
    echo '<p><a href="mailto:abdulhakeemoladaporaji@gmail.com">abdulhakeemoladaporaji@gmail.com</a></p><a href="' . SITE_BASE_PATH . '/' . $language . '/contact.html#contact-form">' . ($arabic ? 'العودة إلى نموذج التواصل' : 'Return to the contact form') . '</a></main></html>';
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    finish(405, 'Please use the contact form.');
}
// URL-encoded Arabic/multibyte text can be much larger than its character count.
if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 131072) {
    finish(413, 'Your message is too large.');
}
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !in_array($origin, [
    'https://abdulhakeemor.com', 'https://www.abdulhakeemor.com'
], true)) {
    finish(403, 'Please use the contact form on abdulhakeemor.com.');
}

function field(string $key, int $limit, bool $required = false): string {
    $value = $_POST[$key] ?? '';
    if (!is_string($value) || strlen($value) > $limit * 4 || strpos($value, "\0") !== false || !preg_match('//u', $value)) {
        finish(422, 'Please check the form fields.');
    }
    $value = trim($value);
    if (preg_match_all('/./us', $value) > $limit) finish(422, 'Please check the form field lengths.');
    if ($required && $value === '') {
        finish(422, 'Please complete all required fields.');
    }
    return $value;
}

if (field('bot-field', 1000) !== '') {
    finish(422, 'Please use the contact form.');
}
$name = field('name', 100, true);
if (preg_match_all('/./us', $name) < 2) finish(422, 'Please enter your full name.');
$email = field('email', 254, true);
$subject = field('subject', 160, true);
$service = field('service', 160);
$timeline = field('timeline', 160);
$message = field('message', 5000, true);
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || preg_match('/[\r\n]/', $email)) {
    finish(422, 'Please enter a valid email address.');
}

// One locked, bounded file outside the public directory. Never store message text.
$ratePath = sys_get_temp_dir() . '/aor-contact-' . hash('sha256', __DIR__) . '.json';
$handle = @fopen($ratePath, 'c+');
if (!$handle || !flock($handle, LOCK_EX)) {
    error_log('AOR contact: unable to lock rate-limit storage.');
    finish(503, 'Please try again later or use the email link.');
}
$now = time();
$rates = json_decode(stream_get_contents($handle), true) ?: [];
$rates = array_filter($rates, static function ($entry) use ($now) {
    return is_array($entry) && ($entry['until'] ?? 0) > $now;
});
$key = hash('sha256', $_SERVER['REMOTE_ADDR'] ?? 'unknown');
$entry = $rates[$key] ?? ['until' => $now + 3600, 'count' => 0];
if ($entry['count'] >= 5 || count($rates) >= 10000) {
    flock($handle, LOCK_UN);
    fclose($handle);
    header('Retry-After: 3600');
    finish(429, 'Too many messages. Please try later or use the email link.');
}
$entry['count']++;
$rates[$key] = $entry;
rewind($handle);
$truncated = ftruncate($handle, 0);
$encoded = json_encode($rates);
$saved = fwrite($handle, $encoded);
fflush($handle);
flock($handle, LOCK_UN);
fclose($handle);
if (!$truncated || $saved !== strlen($encoded)) {
    error_log('AOR contact: unable to save rate-limit storage.');
    finish(503, 'Please try again later or use the email link.');
}

$body = "Name: $name\nEmail: $email\nSubject: $subject\nService: $service\nTimeline: $timeline\n\n$message";
$headers = [
    'From' => 'AOR Website <website@abdulhakeemor.com>',
    'Reply-To' => $email,
    'MIME-Version' => '1.0',
    'Content-Type' => 'text/plain; charset=UTF-8',
    'Content-Transfer-Encoding' => 'base64'
];
// Use a fixed subject and recipient; visitor values cannot become mail headers.
$sent = function_exists('mail') && @mail(
    'abdulhakeemoladaporaji@gmail.com',
    'New AOR website inquiry',
    chunk_split(base64_encode($body)),
    $headers
);
if (!$sent) {
    error_log('AOR contact: hosting mail transport rejected submission.');
    finish(503, 'Your message could not be submitted. Please use the email link.');
}
if (str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json')) {
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode(['ok' => true]);
    exit;
}
$language = ($_POST['language'] ?? '') === 'ar' ? 'ar' : 'en';
header('Location: ' . SITE_BASE_PATH . '/' . $language . '/contact-success.html', true, 303);
exit;
