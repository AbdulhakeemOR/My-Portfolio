<?php
// Install as aor-private/config.php beside public_html, then set mode 0600.
return [
    'transport' => 'smtp',
    'smtp' => [
        'host' => 'REPLACE_WITH_CPANEL_SMTP_HOST',
        'port' => 465,
        'username' => 'website@abdulhakeemor.com',
        'password' => 'REPLACE_WITH_MAILBOX_PASSWORD',
        'encryption' => 'ssl',
        'from_email' => 'website@abdulhakeemor.com',
        'from_name' => 'AOR Website',
        'owner_email' => 'contact@abdulhakeemor.com',
    ],
    // Leave both values empty until the Cloudflare widget is intentionally enabled.
    'turnstile' => ['site_key' => '', 'secret_key' => ''],
];
