<?php
declare(strict_types=1);
require_once __DIR__ . '/core.php';
require_once dirname(__DIR__) . '/mail-core.php';

const WORKFLOW_CURRENCIES = ['USD', 'SAR', 'NGN', 'EUR', 'GBP'];
const INVOICE_STATUSES = ['Draft', 'Sent', 'Paid', 'Overdue', 'Void'];

function workflowReserved(string $name): string {
    if (!preg_match('/\A\.[a-z0-9-]+\.json\z/', $name)) throw new InvalidArgumentException('Invalid private settings file.');
    return trackingDirectory() . DIRECTORY_SEPARATOR . $name;
}
function workflowRead(string $name, array $fallback): array {
    $path = workflowReserved($name);
    if (!is_file($path)) return $fallback;
    $value = json_decode((string)file_get_contents($path), true, 64, JSON_THROW_ON_ERROR);
    return is_array($value) ? $value : $fallback;
}
function workflowWrite(string $name, array $value): void {
    $path = workflowReserved($name); $directory = trackingDirectory();
    $temporary = tempnam($directory, '.settings-');
    if (!$temporary) throw new RuntimeException('Could not save private settings.');
    try {
        chmod($temporary, 0600);
        $json = json_encode($value, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_THROW_ON_ERROR);
        if (file_put_contents($temporary, $json, LOCK_EX) === false || !rename($temporary, $path)) throw new RuntimeException('Could not save private settings.');
    } finally { if (is_file($temporary)) unlink($temporary); }
}
function workflowDefaults(): array {
    return [
        'wise' => '', 'paypal' => '', 'other_payment' => '',
        'business_name' => 'Abdulhakeem Oladapo Raji', 'business_email' => 'contact@abdulhakeemor.com',
        'business_address' => '', 'terms_reference' => 'Terms and Policies: https://abdulhakeemor.com/en/terms.html',
    ];
}
function workflowTemplates(): array {
    return [
        'web' => ['name' => 'Website Development and Care', 'scope' => 'Website planning, implementation, testing and agreed post-launch care.', 'items' => [['description' => 'Website development and care', 'quantity' => 1, 'unit_price' => 600]]],
        'creative' => ['name' => 'Creative Design and Video', 'scope' => 'Creative design or short-form video deliverables agreed in the proposal.', 'items' => [['description' => 'Creative design and video project', 'quantity' => 1, 'unit_price' => 50]]],
        'pr' => ['name' => 'PR, Writing and Communications', 'scope' => 'Writing, messaging or communications support agreed in the proposal.', 'items' => [['description' => 'PR, writing and communications project', 'quantity' => 1, 'unit_price' => 100]]],
    ];
}
function workflowText(mixed $value, int $limit = 4000): string {
    if (!is_string($value) || strlen($value) > $limit * 4 || str_contains($value, "\0") || !preg_match('//u', $value)) throw new InvalidArgumentException('A workflow field is invalid or too long.');
    $value = trim($value);
    if (preg_match_all('/./us', $value) > $limit) throw new InvalidArgumentException('A workflow field is too long.');
    return $value;
}
function workflowActivity(array &$record, string $event, string $detail = ''): void {
    $record['activity'] = is_array($record['activity'] ?? null) ? $record['activity'] : [];
    $record['activity'][] = ['at' => gmdate('c'), 'event' => $event, 'detail' => $detail];
}
function workflowProject(array $record): array {
    $legacyDiscount = !array_key_exists('discount_value', $record);
    $defaults = workflowRead('.settings.json', workflowDefaults());
    $record += ['client_name'=>'', 'client_email'=>'', 'client_company'=>'', 'client_address'=>'', 'scope'=>'',
        'currency'=>'USD', 'discount_cents'=>0, 'discount_type'=>'fixed', 'discount_value'=>'0.00', 'due_date'=>'', 'invoice_notes'=>'', 'invoice_terms'=>'',
        // invoice_notes / invoice_terms are the deposit-stage text; the balance stage has its own.
        'balance_notes'=>"Thank you for working with me on this project.\nThis invoice covers the remaining 50% balance.",
        'balance_terms'=>'Your final files will be released as soon as the balance payment is confirmed.',
        'payment_details'=>trim(($defaults['wise'] ? "Wise: {$defaults['wise']}\n" : '') . ($defaults['paypal'] ? "PayPal: {$defaults['paypal']}\n" : '') . ($defaults['other_payment'] ?? '')),
        'line_items'=>[], 'proposal_files'=>[], 'delivery_files'=>[], 'proposal_sent_at'=>'', 'proposal_accepted_at'=>'',
        'invoices'=>[], 'reminders_enabled'=>true, 'revisions_included'=>2, 'revisions_used'=>0, 'activity'=>[], 'testimonial_sent_at'=>'', 'testimonial'=>[]];
    if (!isset($record['discount_type']) || !in_array($record['discount_type'], ['percent','fixed'], true)) $record['discount_type']='fixed';
    if ($legacyDiscount) $record['discount_value']=number_format(((int)($record['discount_cents']??0))/100,2,'.','');
    return $record;
}
function workflowMoney(mixed $value): int {
    if (!is_scalar($value) || !preg_match('/\A\d{1,9}(?:\.\d{1,2})?\z/', trim((string)$value))) throw new InvalidArgumentException('Enter a valid non-negative amount.');
    return (int)round((float)$value * 100);
}
function workflowTotals(array $record): array {
    $subtotal = 0;
    foreach ($record['line_items'] ?? [] as $item) $subtotal += (int)($item['quantity'] ?? 0) * (int)($item['unit_price_cents'] ?? 0);
    if (($record['discount_type'] ?? 'fixed') === 'percent') {
        $basisPoints = (int)round((float)($record['discount_value'] ?? 0) * 100);
        $discount = (int)round($subtotal * min(10000, max(0, $basisPoints)) / 10000);
    } else {
        $discount = min($subtotal, max(0, workflowMoney((string)($record['discount_value'] ?? '0'))));
    }
    $total = $subtotal - $discount; $deposit = intdiv($total + 1, 2); $balance = $total - $deposit;
    return compact('subtotal', 'discount', 'total', 'deposit', 'balance');
}
function workflowFormat(int $cents, string $currency): string { return $currency . ' ' . number_format($cents / 100, 2); }
function workflowPaymentRequested(array $record): bool {
    return preg_match('/\Acomplete payment[.!?]?\z/i', trim((string)($record['next_step'] ?? ''))) === 1;
}
function workflowBalancePaid(array $record): bool {
    foreach ($record['invoices'] ?? [] as $invoice) if (($invoice['type']??'')==='balance' && ($invoice['status']??'')==='Paid') return true;
    return false;
}
// Dompdf neither joins Arabic letters nor reorders right-to-left text, so PDF text is
// pre-shaped here: letters become their contextual presentation forms (U+FB50-U+FEFF,
// covered by the bundled DejaVu Sans) and each line is put into visual order.
function workflowArabicForms(): array {
    // code point => [isolated, final, initial, medial]; two entries = joins to the previous letter only
    return [
        0x0621=>[0xFE80], 0x0622=>[0xFE81,0xFE82], 0x0623=>[0xFE83,0xFE84], 0x0624=>[0xFE85,0xFE86],
        0x0625=>[0xFE87,0xFE88], 0x0626=>[0xFE89,0xFE8A,0xFE8B,0xFE8C], 0x0627=>[0xFE8D,0xFE8E],
        0x0628=>[0xFE8F,0xFE90,0xFE91,0xFE92], 0x0629=>[0xFE93,0xFE94], 0x062A=>[0xFE95,0xFE96,0xFE97,0xFE98],
        0x062B=>[0xFE99,0xFE9A,0xFE9B,0xFE9C], 0x062C=>[0xFE9D,0xFE9E,0xFE9F,0xFEA0], 0x062D=>[0xFEA1,0xFEA2,0xFEA3,0xFEA4],
        0x062E=>[0xFEA5,0xFEA6,0xFEA7,0xFEA8], 0x062F=>[0xFEA9,0xFEAA], 0x0630=>[0xFEAB,0xFEAC],
        0x0631=>[0xFEAD,0xFEAE], 0x0632=>[0xFEAF,0xFEB0], 0x0633=>[0xFEB1,0xFEB2,0xFEB3,0xFEB4],
        0x0634=>[0xFEB5,0xFEB6,0xFEB7,0xFEB8], 0x0635=>[0xFEB9,0xFEBA,0xFEBB,0xFEBC], 0x0636=>[0xFEBD,0xFEBE,0xFEBF,0xFEC0],
        0x0637=>[0xFEC1,0xFEC2,0xFEC3,0xFEC4], 0x0638=>[0xFEC5,0xFEC6,0xFEC7,0xFEC8], 0x0639=>[0xFEC9,0xFECA,0xFECB,0xFECC],
        0x063A=>[0xFECD,0xFECE,0xFECF,0xFED0], 0x0640=>[0x0640,0x0640,0x0640,0x0640], 0x0641=>[0xFED1,0xFED2,0xFED3,0xFED4],
        0x0642=>[0xFED5,0xFED6,0xFED7,0xFED8], 0x0643=>[0xFED9,0xFEDA,0xFEDB,0xFEDC], 0x0644=>[0xFEDD,0xFEDE,0xFEDF,0xFEE0],
        0x0645=>[0xFEE1,0xFEE2,0xFEE3,0xFEE4], 0x0646=>[0xFEE5,0xFEE6,0xFEE7,0xFEE8], 0x0647=>[0xFEE9,0xFEEA,0xFEEB,0xFEEC],
        0x0648=>[0xFEED,0xFEEE], 0x0649=>[0xFEEF,0xFEF0], 0x064A=>[0xFEF1,0xFEF2,0xFEF3,0xFEF4],
        0x067E=>[0xFB56,0xFB57,0xFB58,0xFB59], 0x0686=>[0xFB7A,0xFB7B,0xFB7C,0xFB7D], 0x0698=>[0xFB8A,0xFB8B],
        0x06A9=>[0xFB8E,0xFB8F,0xFB90,0xFB91], 0x06AF=>[0xFB92,0xFB93,0xFB94,0xFB95], 0x06CC=>[0xFBFC,0xFBFD,0xFBFE,0xFBFF],
    ];
}
function workflowIsMark(int $c): bool {
    return ($c >= 0x0300 && $c <= 0x036F) || ($c >= 0x0610 && $c <= 0x061A) || ($c >= 0x064B && $c <= 0x065F) || $c === 0x0670 || ($c >= 0x06D6 && $c <= 0x06ED);
}
function workflowArabicShape(array $codes): array {
    $forms = workflowArabicForms(); $lamAlef = [0x0622=>[0xFEF5,0xFEF6], 0x0623=>[0xFEF7,0xFEF8], 0x0625=>[0xFEF9,0xFEFA], 0x0627=>[0xFEFB,0xFEFC]];
    $count = count($codes); $out = [];
    $neighbour = function (int $i, int $step) use ($codes, $count): ?int {
        for ($j = $i + $step; $j >= 0 && $j < $count; $j += $step) if (!workflowIsMark($codes[$j])) return $codes[$j];
        return null;
    };
    for ($i = 0; $i < $count; $i++) {
        $c = $codes[$i];
        if (!isset($forms[$c])) { $out[] = $c; continue; }
        $prev = $neighbour($i, -1); $next = $neighbour($i, 1);
        $fromPrev = $prev !== null && isset($forms[$prev]) && count($forms[$prev]) === 4;
        if ($c === 0x0644 && isset($codes[$i + 1], $lamAlef[$codes[$i + 1]])) { $out[] = $lamAlef[$codes[$i + 1]][$fromPrev ? 1 : 0]; $i++; continue; }
        $f = $forms[$c];
        $toNext = count($f) === 4 && $next !== null && isset($forms[$next]) && count($forms[$next]) > 1;
        $out[] = count($f) === 1 ? $f[0] : ($fromPrev ? ($toNext ? $f[3] : $f[1]) : ($toNext ? $f[2] : $f[0]));
    }
    return $out;
}
function workflowBidiClass(int $c): string {
    if (($c >= 0x0660 && $c <= 0x0669) || ($c >= 0x06F0 && $c <= 0x06F9)) return 'L'; // Arabic-Indic digits read left to right
    if (($c >= 0x0590 && $c <= 0x08FF) || ($c >= 0xFB1D && $c <= 0xFDFF) || ($c >= 0xFE70 && $c <= 0xFEFF)) return 'R';
    return preg_match('/[\p{L}\p{N}]/u', (string)iconv('UCS-4BE', 'UTF-8', pack('N', $c))) ? 'L' : 'N';
}
function workflowArabicVisual(string $line): string {
    $ucs = iconv('UTF-8', 'UCS-4BE//IGNORE', $line); if ($ucs === false || $ucs === '') return $line;
    $codes = workflowArabicShape(array_values(unpack('N*', $ucs)));
    $classes = [];
    foreach ($codes as $k => $c) $classes[$k] = workflowIsMark($c) ? ($classes[$k - 1] ?? 'N') : workflowBidiClass($c);
    $strong = array_values(array_filter($classes, fn($x) => $x !== 'N')); $base = $strong[0] ?? 'L';
    $count = count($codes);
    for ($i = 0; $i < $count; $i++) {
        if ($classes[$i] !== 'N') continue;
        $j = $i; while ($j < $count && $classes[$j] === 'N') $j++;
        $before = $classes[$i - 1] ?? $base; $after = $classes[$j] ?? $base;
        $resolved = $before === $after ? $before : $base;
        for ($k = $i; $k < $j; $k++) $classes[$k] = $resolved;
        $i = $j - 1;
    }
    $runs = [];
    foreach ($codes as $k => $c) {
        if ($runs && end($runs)[0] === $classes[$k]) $runs[array_key_last($runs)][1][] = $c; else $runs[] = [$classes[$k], [$c]];
    }
    if ($base === 'R') $runs = array_reverse($runs);
    $mirror = [0x28=>0x29, 0x29=>0x28, 0x5B=>0x5D, 0x5D=>0x5B, 0x7B=>0x7D, 0x7D=>0x7B, 0x3C=>0x3E, 0x3E=>0x3C, 0xAB=>0xBB, 0xBB=>0xAB];
    $visual = [];
    foreach ($runs as [$dir, $run]) {
        if ($dir !== 'R') { array_push($visual, ...$run); continue; }
        $clusters = []; // keep combining marks after their base letter
        foreach ($run as $c) { if ($clusters && workflowIsMark($c)) $clusters[array_key_last($clusters)][] = $c; else $clusters[] = [$mirror[$c] ?? $c]; }
        foreach (array_reverse($clusters) as $cluster) array_push($visual, ...$cluster);
    }
    return (string)iconv('UCS-4BE', 'UTF-8', pack('N*', ...$visual));
}
function workflowPdfLine(string $value): string {
    if (!preg_match('/[\x{0590}-\x{08FF}\x{FB1D}-\x{FDFF}\x{FE70}-\x{FEFF}]/u', $value)) return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    $lines = array_map(fn($line) => htmlspecialchars(workflowArabicVisual($line), ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'), preg_split('/\r\n|\r|\n/', $value));
    return '<span lang="ar">' . implode("\n", $lines) . '</span>';
}
function workflowOpenToken(array $record): string {
    // This token is kept only in the existing private project store, outside public_html.
    // Keeping it server-side avoids requiring Sodium/OpenSSL extensions on shared hosting.
    $token = (string)($record['link_token_private'] ?? '');
    if (!preg_match('/\A[a-f0-9]{64}\z/', $token)) throw new RuntimeException('Send the proposal to create a reusable customer link.');
    return $token;
}
function workflowCustomerUrl(string $token): string {
    $origin = (PHP_SAPI === 'cli-server') ? 'http://127.0.0.1:' . (int)($_SERVER['SERVER_PORT'] ?? 5182) : 'https://abdulhakeemor.com';
    return $origin . '/tracking/#key=' . $token;
}
function workflowForm(array $input, array $record): array {
    $record['client_name'] = workflowText($input['client_name'] ?? '', 160);
    $record['client_email'] = strtolower(workflowText($input['client_email'] ?? '', 254));
    if (!filter_var($record['client_email'], FILTER_VALIDATE_EMAIL)) throw new InvalidArgumentException('Enter a valid client email.');
    $record['client_company'] = workflowText($input['client_company'] ?? '', 200);
    $record['client_address'] = workflowText($input['client_address'] ?? '', 1000);
    $record['scope'] = workflowText($input['scope'] ?? '', 6000);
    $currency = workflowText($input['currency'] ?? 'USD', 3); if (!in_array($currency, WORKFLOW_CURRENCIES, true)) throw new InvalidArgumentException('Select a supported currency.'); $record['currency'] = $currency;
    $discountType = workflowText($input['discount_type'] ?? 'fixed', 10);
    if (!in_array($discountType, ['percent','fixed'], true)) throw new InvalidArgumentException('Select a valid discount type.');
    $discountValue = trim((string)($input['discount_value'] ?? '0'));
    if (!preg_match('/\A\d{1,9}(?:\.\d{1,2})?\z/', $discountValue)) throw new InvalidArgumentException('Enter a valid discount.');
    if ($discountType === 'percent' && (float)$discountValue > 100) throw new InvalidArgumentException('Percentage discount cannot exceed 100%.');
    $record['discount_type'] = $discountType; $record['discount_value'] = $discountValue;
    $record['discount_cents'] = $discountType === 'fixed' ? workflowMoney($discountValue) : 0;
    $record['due_date'] = workflowText($input['due_date'] ?? '', 10);
    if ($record['due_date'] !== '' && !DateTimeImmutable::createFromFormat('!Y-m-d', $record['due_date'])) throw new InvalidArgumentException('Enter a valid due date.');
    $record['invoice_notes'] = workflowText($input['invoice_notes'] ?? '', 3000);
    $record['invoice_terms'] = workflowText($input['invoice_terms'] ?? '', 3000);
    $record['balance_notes'] = workflowText($input['balance_notes'] ?? '', 3000);
    $record['balance_terms'] = workflowText($input['balance_terms'] ?? '', 3000);
    $record['payment_details'] = workflowText($input['payment_details'] ?? '', 4000);
    $record['revisions_included'] = max(0, min(99, (int)($input['revisions_included'] ?? 2)));
    $record['reminders_enabled'] = ($input['reminders_enabled'] ?? '') === '1';
    $descriptions = is_array($input['item_description'] ?? null) ? $input['item_description'] : [];
    $quantities = is_array($input['item_quantity'] ?? null) ? $input['item_quantity'] : [];
    $prices = is_array($input['item_unit_price'] ?? null) ? $input['item_unit_price'] : [];
    $items = [];
    foreach ($descriptions as $index => $description) {
        $description = workflowText($description, 300); if ($description === '') continue;
        $quantity = filter_var($quantities[$index] ?? null, FILTER_VALIDATE_INT, ['options'=>['min_range'=>1,'max_range'=>999]]);
        if ($quantity === false) throw new InvalidArgumentException('Line-item quantity must be between 1 and 999.');
        $items[] = ['description'=>$description, 'quantity'=>$quantity, 'unit_price_cents'=>workflowMoney($prices[$index] ?? '0')];
    }
    if (!$items) throw new InvalidArgumentException('Add at least one line item.');
    $record['line_items'] = $items;
    return $record;
}
function workflowFilesDirectory(string $id, string $kind): string {
    trackingId($id); if (!in_array($kind, ['proposal','delivery','invoice'], true)) throw new InvalidArgumentException('Invalid file group.');
    $path = trackingDirectory() . DIRECTORY_SEPARATOR . 'files' . DIRECTORY_SEPARATOR . $id . DIRECTORY_SEPARATOR . $kind;
    if (!is_dir($path) && !mkdir($path, 0700, true) && !is_dir($path)) throw new RuntimeException('Private upload storage is unavailable.');
    return $path;
}
function workflowUpload(string $id, string $kind, array $upload): array {
    $allowed = ['pdf','doc','docx','ppt','pptx','zip','png','jpg','jpeg'];
    if (($upload['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK || ($upload['size'] ?? 0) > 10 * 1024 * 1024) throw new InvalidArgumentException('Upload a supported file no larger than 10 MB.');
    $extension = strtolower(pathinfo((string)($upload['name'] ?? ''), PATHINFO_EXTENSION));
    if (!in_array($extension, $allowed, true)) throw new InvalidArgumentException('This file type is not allowed.');
    $head = (string)file_get_contents((string)$upload['tmp_name'], false, null, 0, 8);
    $signatureOk = match ($extension) {
        'pdf' => str_starts_with($head, '%PDF-'),
        'png' => str_starts_with($head, "\x89PNG\r\n\x1a\n"),
        'jpg', 'jpeg' => str_starts_with($head, "\xff\xd8\xff"),
        'doc', 'ppt' => str_starts_with($head, "\xd0\xcf\x11\xe0\xa1\xb1\x1a\xe1"),
        'docx', 'pptx', 'zip' => str_starts_with($head, "PK\x03\x04") || str_starts_with($head, "PK\x05\x06"),
        default => false,
    };
    if (!$signatureOk) throw new InvalidArgumentException('The file contents do not match its extension.');
    $mime = match ($extension) {'pdf'=>'application/pdf','png'=>'image/png','jpg','jpeg'=>'image/jpeg','doc'=>'application/msword','ppt'=>'application/vnd.ms-powerpoint','docx'=>'application/vnd.openxmlformats-officedocument.wordprocessingml.document','pptx'=>'application/vnd.openxmlformats-officedocument.presentationml.presentation',default=>'application/zip'};
    $storedExtension = $extension === 'jpeg' ? 'jpg' : $extension;
    $fileId = bin2hex(random_bytes(16)); $stored = $fileId . '.' . $storedExtension;
    if (!move_uploaded_file($upload['tmp_name'], workflowFilesDirectory($id, $kind) . DIRECTORY_SEPARATOR . $stored)) throw new RuntimeException('Could not save the uploaded file.');
    return ['id'=>$fileId, 'name'=>workflowText(basename((string)$upload['name']), 240), 'stored'=>$stored, 'mime'=>$mime, 'bytes'=>(int)$upload['size'], 'uploaded_at'=>gmdate('c')];
}
function workflowFilePath(string $id, array $file, string $kind): string {
    $stored = (string)($file['stored'] ?? ''); if (!preg_match('/\A[a-f0-9]{32}\.[a-z0-9]+\z/', $stored)) throw new OutOfBoundsException('File unavailable.');
    $path = workflowFilesDirectory($id, $kind) . DIRECTORY_SEPARATOR . $stored; if (!is_file($path) || is_link($path)) throw new OutOfBoundsException('File unavailable.'); return $path;
}
function workflowInvoiceNumber(): string {
    $now = new DateTimeImmutable('now', new DateTimeZone('Asia/Riyadh')); $month = $now->format('Y-m');
    $sequences = workflowRead('.invoice-sequences.json', []); $sequence = ((int)($sequences[$month] ?? 0)) + 1; $sequences[$month] = $sequence; workflowWrite('.invoice-sequences.json', $sequences);
    return 'AOR-' . $now->format('Y-m-d') . '-' . str_pad((string)$sequence, 3, '0', STR_PAD_LEFT);
}
// Notes and terms for one invoice: the copy saved on the invoice when it was created,
// or (for invoices created before that copy existed) the project's text for its stage.
function workflowInvoiceWording(array $record, array $invoice): array {
    $balance = ($invoice['type'] ?? '') === 'balance';
    return [
        'notes' => (string)($invoice['notes'] ?? ($balance ? $record['balance_notes'] : $record['invoice_notes'])),
        'terms' => (string)($invoice['terms'] ?? ($balance ? $record['balance_terms'] : $record['invoice_terms'])),
    ];
}
function workflowPdf(string $id, array $record, array $invoice): string {
    // Live site: public_html/lib/dompdf (beside PHPMailer). Preview: the preview's vendor folder.
    $dompdf = dirname(__DIR__) . '/lib/dompdf/dompdf/autoload.inc.php';
    require_once is_file($dompdf) ? $dompdf : dirname(__DIR__, 2) . '/vendor/dompdf/dompdf/autoload.inc.php';
    $settings = workflowRead('.settings.json', workflowDefaults()); $totals = workflowTotals($record); $currency = $record['currency'];
    $rows = ''; foreach ($record['line_items'] as $item) $rows .= '<tr><td>'.workflowPdfLine((string)$item['description']).'</td><td>'.$item['quantity'].'</td><td>'.workflowFormat($item['unit_price_cents'],$currency).'</td><td>'.workflowFormat($item['quantity']*$item['unit_price_cents'],$currency).'</td></tr>';
    // JPEG rendering of aor-logo.svg (no GD needed): Dompdf cannot draw that SVG's embedded bitmap layers.
    $logoPath = __DIR__ . '/aor-logo.jpg'; $logo = is_file($logoPath) ? 'data:image/jpeg;base64,'.base64_encode((string)file_get_contents($logoPath)) : '';
    $amount = (int)$invoice['amount_due_cents']; $wording = workflowInvoiceWording(workflowProject($record), $invoice);
    $html = '<style>body{font-family:"DejaVu Sans",sans-serif;font-size:12px;color:#18211f}table.head{margin:0;border-bottom:2px solid #9f432a}table.head td{border:0;padding:0 0 16px;vertical-align:top}table.head td.meta{text-align:right}img{width:90px}h1{color:#9f432a}table{width:100%;border-collapse:collapse;margin:24px 0}th,td{padding:9px;border-bottom:1px solid #ccd6d1;text-align:left}.totals{margin-left:auto;width:45%}.due{font-size:18px;color:#9f432a}</style><table class="head"><tr><td>'.($logo?'<img src="'.$logo.'">':'<strong>AOR</strong>').'<p>'.workflowPdfLine((string)$settings['business_name']).'<br>'.nl2br(workflowPdfLine((string)$settings['business_address'])).'<br>'.htmlspecialchars($settings['business_email']).'</p></td><td class="meta"><h1>Invoice</h1><p><strong>'.htmlspecialchars($invoice['number']).'</strong><br>Issue: '.$invoice['issue_date'].'<br>Due: '.htmlspecialchars($invoice['due_date']).(!empty($record['reference'])?'<br>Project: '.htmlspecialchars((string)$record['reference']):'').'</p></td></tr></table><h2>Bill to</h2><p>'.workflowPdfLine((string)$record['client_name']).'<br>'.workflowPdfLine((string)$record['client_company']).'<br>'.nl2br(workflowPdfLine((string)$record['client_address'])).'<br>'.htmlspecialchars($record['client_email']).'</p><h2>'.workflowPdfLine((string)$record['title']).'</h2><table><thead><tr><th>Description</th><th>Qty</th><th>Unit price</th><th>Amount</th></tr></thead><tbody>'.$rows.'</tbody></table><table class="totals"><tr><td>Subtotal</td><td>'.workflowFormat($totals['subtotal'],$currency).'</td></tr><tr><td>Discount'.(($record['discount_type']??'fixed')==='percent'?' ('.htmlspecialchars((string)$record['discount_value']).'%)':'').'</td><td>'.workflowFormat($totals['discount'],$currency).'</td></tr><tr><td>Total</td><td>'.workflowFormat($totals['total'],$currency).'</td></tr><tr class="due"><td>Amount due now</td><td>'.workflowFormat($amount,$currency).'</td></tr></table><h3>Payment details</h3><p>'.nl2br(workflowPdfLine((string)$record['payment_details'])).'</p><p>'.nl2br(workflowPdfLine($wording['notes'])).'</p><p>'.nl2br(workflowPdfLine($wording['terms'])).'</p><p>'.workflowPdfLine((string)$settings['terms_reference']).'</p><p>Thank you for your business.</p>';
    $options = new Dompdf\Options(); $options->set('isRemoteEnabled', false); $options->set('chroot', trackingDirectory());
    $pdf = new Dompdf\Dompdf($options); $pdf->loadHtml($html, 'UTF-8'); $pdf->setPaper('A4'); $pdf->render();
    $path = workflowFilesDirectory($id, 'invoice') . DIRECTORY_SEPARATOR . $invoice['number'] . '.pdf';
    if (file_put_contents($path, $pdf->output(), LOCK_EX) === false) throw new RuntimeException('Could not save invoice PDF.'); chmod($path, 0600); return $path;
}
function workflowCustomerRecord(string $token): array {
    if (!preg_match('/\A[a-f0-9]{64}\z/', $token)) throw new OutOfBoundsException('Link unavailable.');
    $id = hash('sha256', $token); $record = workflowProject(trackingRead($id)); $expiry = strtotime($record['expires_at'] ?? '');
    if (!$expiry || $expiry <= time() || ($record['revoked'] ?? false)) throw new OutOfBoundsException('Link unavailable.');
    return ['id'=>$id, 'record'=>$record];
}
function workflowMaybeTestimonial(array &$record): void {
    $record = workflowProject($record);
    if (($record['testimonial_sent_at'] ?? '') !== '' || !($record['completed'] ?? false)) return;
    $balancePaid = false; foreach ($record['invoices'] as $invoice) if (($invoice['type']??'')==='balance' && ($invoice['status']??'')==='Paid') $balancePaid=true;
    if (!$balancePaid) return;
    try { $url = workflowCustomerUrl(workflowOpenToken($record)); } catch (Throwable) { $url = ''; }
    $plain="Hello {$record['client_name']},\n\nThank you for working with AOR. If you have a moment, please share a short testimonial about your experience"
        .($url ? " using the form on your project page:\n$url\n\nYou can also simply reply to this email." : ' by replying to this email.');
    // Replies go to the owner's inbox rather than the website sending mailbox.
    aorSendMail($record['client_email'],$record['client_name'],'A short testimonial for AOR',aorMailTemplate('Thank you for working with AOR','<p>'.nl2br(htmlspecialchars($plain)).'</p>'),$plain,aorOwnerEmail());
    $record['testimonial_sent_at']=gmdate('c'); workflowActivity($record,'email_sent','Testimonial request sent.');
}
function workflowSend(string $id, array &$record, string $kind, string $tracking): void {
    $totals = workflowTotals($record);
    if ($kind === 'proposal') {
        $attachments = []; $size = 0; foreach ($record['proposal_files'] as $file) { $size += $file['bytes']; $attachments[] = ['path'=>workflowFilePath($id,$file,'proposal'),'name'=>$file['name']]; }
        $attach = $size <= 10*1024*1024 ? $attachments : [];
        $plain = "Hello {$record['client_name']},\n\n{$record['scope']}\n\nTotal: ".workflowFormat($totals['total'],$record['currency'])."\n50% deposit: ".workflowFormat($totals['deposit'],$record['currency'])."\nTracking link: $tracking" . ($attach ? '' : "\n\nProposal files are available on the tracking page.");
        aorSendMail($record['client_email'],$record['client_name'],'Your AOR proposal',aorMailTemplate('Your proposal','<p>'.nl2br(htmlspecialchars($plain)).'</p>'),$plain,null,$attach);
        $record['proposal_sent_at']=gmdate('c');
        // Only move the project to Proposal if it has not progressed past it; a re-sent proposal must not wind progress back.
        if (array_search($record['stage'] ?? '', TRACKING_STAGES, true) <= array_search('Proposal', TRACKING_STAGES, true)) {
            $record['stage']='Proposal'; $record['update']='The proposal is ready for review.'; $record['next_step']='Review the proposal files and accept the proposal to begin.';
        }
        workflowActivity($record,aorUsesMailLog()?'email_previewed':'email_sent',aorUsesMailLog()?'Proposal recorded in the preview mail log.':'Proposal sent.');
    }
}
