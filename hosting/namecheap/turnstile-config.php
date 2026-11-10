<?php
declare(strict_types=1);
require __DIR__ . '/mail-core.php';
header('Cache-Control: no-store');
header('Content-Type: application/json; charset=UTF-8');
try {
    $config = aorConfig()['turnstile'] ?? [];
    $siteKey = is_string($config['site_key'] ?? null) ? $config['site_key'] : '';
    $secretKey = is_string($config['secret_key'] ?? null) ? $config['secret_key'] : '';
    echo json_encode(['enabled' => $siteKey !== '' && $secretKey !== '', 'siteKey' => $siteKey]);
} catch (Throwable $error) {
    echo json_encode(['enabled' => false, 'siteKey' => '']);
}
