<?php
declare(strict_types=1);

use PHPMailer\PHPMailer\Exception as MailException;
use PHPMailer\PHPMailer\PHPMailer;

// Live site: public_html/lib/phpmailer. Preview: the preview's vendor folder.
$aorPhpMailer = is_dir(__DIR__ . '/lib/phpmailer') ? __DIR__ . '/lib/phpmailer' : dirname(__DIR__) . '/vendor/phpmailer';
require $aorPhpMailer . '/src/Exception.php';
require $aorPhpMailer . '/src/PHPMailer.php';
require $aorPhpMailer . '/src/SMTP.php';

function aorConfig(): array {
    static $config;
    if (is_array($config)) return $config;
    $path = getenv('AOR_PRIVATE_CONFIG') ?: dirname((string)($_SERVER['DOCUMENT_ROOT'] ?? '')) . '/aor-private/config.php';
    if (!is_file($path) || is_link($path)) throw new RuntimeException('Private mail configuration is unavailable.');
    $loaded = require $path;
    if (!is_array($loaded)) throw new RuntimeException('Private mail configuration is invalid.');
    return $config = $loaded;
}

function aorMailTemplate(string $heading, string $htmlBody): string {
    return '<!doctype html><html><body style="margin:0;background:#f4f7f5;color:#18211f;font:16px/1.6 Arial,sans-serif">'
        . '<div style="max-width:640px;margin:auto;padding:32px 20px">'
        . '<div style="background:#fff;border:1px solid #d6dfda;border-radius:18px;padding:30px">'
        . '<img src="https://abdulhakeemor.com/assets/images/aor-logo.svg" alt="AOR" width="96" style="display:block;margin-bottom:24px">'
        . '<h1 style="font-size:26px;line-height:1.25;margin:0 0 18px">' . htmlspecialchars($heading, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') . '</h1>'
        . $htmlBody . '<p style="margin:28px 0 0;color:#53605c">Abdulhakeem Oladapo Raji<br>AOR</p></div></div></body></html>';
}

function aorSendMail(string $toEmail, string $toName, string $subject, string $html, string $plain, ?string $replyTo = null, array $attachments = []): void {
    $config = aorConfig();
    if (($config['transport'] ?? 'smtp') === 'log') {
        $line = json_encode(['at' => gmdate('c'), 'to' => $toEmail, 'name' => $toName, 'subject' => $subject, 'reply_to' => $replyTo ?: aorOwnerEmail(), 'plain' => $plain, 'attachments' => array_column($attachments, 'name')], JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
        if (file_put_contents((string)$config['mail_log'], $line . PHP_EOL, FILE_APPEND | LOCK_EX) === false) throw new RuntimeException('Preview mail log is unavailable.');
        return;
    }
    $smtp = $config['smtp'] ?? [];
    foreach (['host', 'port', 'username', 'password', 'encryption', 'from_email', 'from_name', 'owner_email'] as $field) {
        if (!isset($smtp[$field]) || $smtp[$field] === '') throw new RuntimeException('SMTP configuration is incomplete.');
    }
    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host = (string)$smtp['host'];
        $mail->Port = (int)$smtp['port'];
        $mail->SMTPAuth = true;
        $mail->Username = (string)$smtp['username'];
        $mail->Password = (string)$smtp['password'];
        $mail->SMTPSecure = (string)$smtp['encryption'];
        $mail->CharSet = PHPMailer::CHARSET_UTF8;
        $mail->setFrom((string)$smtp['from_email'], (string)$smtp['from_name']);
        $mail->addAddress($toEmail, $toName);
        // Replies always reach the owner's inbox, never the website@ sending mailbox.
        $mail->addReplyTo($replyTo ?: aorOwnerEmail());
        $mail->Subject = $subject;
        $mail->isHTML(true);
        $mail->Body = $html;
        $mail->AltBody = $plain;
        foreach ($attachments as $attachment) $mail->addAttachment((string)$attachment['path'], (string)$attachment['name']);
        $mail->send();
    } catch (MailException $error) {
        throw new RuntimeException('SMTP delivery failed.', 0, $error);
    }
}

function aorOwnerEmail(): string {
    $config = aorConfig();
    return (string)($config['smtp']['owner_email'] ?? 'contact@abdulhakeemor.com');
}

function aorUsesMailLog(): bool {
    return (aorConfig()['transport'] ?? 'smtp') === 'log';
}
