<?php
declare(strict_types=1);
require dirname(__DIR__) . '/workflow-core.php';
trackingHeaders(); header('Content-Type: text/html; charset=utf-8');
if (($_SERVER['REMOTE_USER'] ?? '') !== 'aor-project-admin') { http_response_code(403); exit('Project admin is locked.'); }
$https = ($_SERVER['HTTPS'] ?? '') === 'on';
$sessionDirectory = trackingDirectory() . DIRECTORY_SEPARATOR . 'sessions'; if (!is_dir($sessionDirectory)) mkdir($sessionDirectory, 0700, true);
session_save_path($sessionDirectory); session_name('AOR_PROJECT_ADMIN'); session_set_cookie_params(['lifetime'=>0,'path'=>'/tracking/admin/','secure'=>$https,'httponly'=>true,'samesite'=>'Strict']); session_start();
$_SESSION['csrf'] ??= bin2hex(random_bytes(32));
function h(mixed $value): string { return htmlspecialchars((string)$value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }
function fileRows(string $id, string $kind, array $files, string $revision, string $accept = ''): string {
    $hidden = '<input type="hidden" name="csrf" value="'.h($_SESSION['csrf']).'"><input type="hidden" name="revision" value="'.h($revision).'"><input type="hidden" name="kind" value="'.$kind.'">';
    $out = '<ul class="file-list">';
    foreach ($files as $file) {
        $fileField = '<input type="hidden" name="file" value="'.h($file['id']).'">';
        $out .= '<li><span><a href="download.php?project='.h($id).'&type='.$kind.'&file='.h($file['id']).'">'.h($file['name']).'</a> ('.number_format(((int)$file['bytes'])/1048576,2).' MB)</span>'
            .'<form method="post" enctype="multipart/form-data">'.$hidden.$fileField.'<input type="file" name="replacement_file" required aria-label="Replacement for '.h($file['name']).'"'.($accept?' accept="'.$accept.'"':'').'><button name="action" value="replace_file">Replace</button></form>'
            .'<form method="post" class="remove-file" data-name="'.h($file['name']).'">'.$hidden.$fileField.'<button name="action" value="remove_file" class="danger">Remove</button></form></li>';
    }
    return $out . '</ul>';
}
function workflowInvoiceEmail(string $id, array &$record, array &$invoice): void {
    $token = workflowOpenToken($record); $url = workflowCustomerUrl($token); $amount = workflowFormat((int)$invoice['amount_due_cents'], $record['currency']);
    $plain = "Hello {$record['client_name']},\n\nInvoice {$invoice['number']} is attached.\nAmount due: $amount\nDue date: {$invoice['due_date']}\n\nPayment details:\n{$record['payment_details']}\n\nTrack your project: $url";
    $path = workflowFilesDirectory($id,'invoice') . DIRECTORY_SEPARATOR . $invoice['number'] . '.pdf';
    aorSendMail($record['client_email'],$record['client_name'],'Invoice '.$invoice['number'],aorMailTemplate('Invoice '.$invoice['number'],'<p>'.nl2br(h($plain)).'</p>'),$plain,null,[['path'=>$path,'name'=>$invoice['number'].'.pdf']]);
    $invoice['status']='Sent'; $invoice['sent_at']=gmdate('c');
    workflowActivity($record,aorUsesMailLog()?'email_previewed':'email_sent',aorUsesMailLog()?'Invoice '.$invoice['number'].' recorded in the preview mail log.':'Invoice '.$invoice['number'].' sent.');
}
$id = is_string($_GET['edit'] ?? null) ? trackingId($_GET['edit']) : '';
$error=''; $notice='';
try {
    if ($id==='') throw new InvalidArgumentException('Select a project first.');
    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST') {
        if (!hash_equals($_SESSION['csrf'], (string)($_POST['csrf'] ?? ''))) throw new InvalidArgumentException('This form expired. Reload and try again.');
        $action=(string)($_POST['action'] ?? '');
        $result=trackingLocked(function() use($id,$action): array {
            $record=workflowProject(trackingRead($id)); $newId=$id; $notice='Saved.';
            if (!hash_equals((string)($record['revision']??''),(string)($_POST['revision']??''))) throw new InvalidArgumentException('This project changed in another tab. Reload it.');
            if ($action==='save_brief') { $record=workflowForm($_POST,$record); workflowActivity($record,'brief_updated','Brief and invoice inputs updated.'); $notice='Brief and invoice inputs saved.'; }
            elseif ($action==='apply_template') {
                $key=workflowText($_POST['template']??'',20); $template=workflowRead('.templates.json',workflowTemplates())[$key]??null; if(!$template) throw new InvalidArgumentException('Choose a template.');
                $record['scope']=$template['scope']; $record['line_items']=array_map(fn($item)=>['description'=>$item['description'],'quantity'=>(int)$item['quantity'],'unit_price_cents'=>workflowMoney((string)$item['unit_price'])],$template['items']);
                workflowActivity($record,'template_applied',$template['name']); $notice='Template applied. Review and save the brief.';
            }
            elseif ($action==='upload_proposal' || $action==='upload_delivery') {
                $kind=$action==='upload_proposal'?'proposal':'delivery'; $field=$kind.'_file'; $file=workflowUpload($id,$kind,$_FILES[$field]??[]); $record[$kind.'_files'][]=$file; workflowActivity($record,'file_uploaded',$file['name'].' ('.$kind.')'); $notice=ucfirst($kind).' file uploaded.';
            }
            elseif ($action==='remove_file' || $action==='replace_file') {
                $kind=(string)($_POST['kind']??''); if(!in_array($kind,['proposal','delivery'],true)) throw new InvalidArgumentException('Unknown file type.');
                $fileId=(string)($_POST['file']??''); $index=null;
                foreach($record[$kind.'_files'] as $position=>$file) if(hash_equals((string)$file['id'],$fileId)) $index=$position;
                if($index===null) throw new InvalidArgumentException('That file is no longer listed. Reload the page.');
                $old=$record[$kind.'_files'][$index];
                if($action==='remove_file'){
                    if($kind==='proposal' && $record['proposal_sent_at'] && count($record['proposal_files'])===1) throw new InvalidArgumentException('The proposal has been sent, so its last file cannot be removed. Use Replace instead.');
                    array_splice($record[$kind.'_files'],$index,1); workflowActivity($record,'file_removed',$old['name'].' ('.$kind.')'); $notice=ucfirst($kind).' file removed.';
                } else {
                    $new=workflowUpload($id,$kind,$_FILES['replacement_file']??[]); $record[$kind.'_files'][$index]=$new;
                    workflowActivity($record,'file_replaced',$old['name'].' → '.$new['name'].' ('.$kind.')'); $notice=ucfirst($kind).' file replaced.';
                }
                try { unlink(workflowFilePath($id,$old,$kind)); } catch (OutOfBoundsException) { /* already gone */ }
            }
            elseif ($action==='send_proposal') {
                if(!$record['line_items'] || !$record['client_email']) throw new InvalidArgumentException('Save the Brief inputs before sending a proposal.');
                if(!$record['proposal_files']) throw new InvalidArgumentException('Upload at least one proposal file before sending the proposal.');
                // Re-sending keeps the customer's current link while it is active; a new link is only made when none is usable.
                $existing=(string)($record['link_token_private']??''); $expiry=strtotime((string)($record['expires_at']??''));
                if(preg_match('/\A[a-f0-9]{64}\z/',$existing) && hash_equals($id,hash('sha256',$existing)) && !($record['revoked']??false) && $expiry && $expiry>time()){
                    $resend=(bool)$record['proposal_sent_at']; workflowSend($id,$record,'proposal',workflowCustomerUrl($existing));
                    $notice=($resend?'Updated proposal':'Proposal').(aorUsesMailLog()?' recorded in the preview mail log.':' sent.').' The customer link is unchanged.';
                    $record['updated_at']=gmdate('c'); $record['revision']=bin2hex(random_bytes(16)); trackingWrite($id,$record); return ['id'=>$id,'notice'=>$notice];
                }
                $token=bin2hex(random_bytes(32)); $newId=hash('sha256',$token); $record['link_token_private']=$token; $record['revoked']=false; $record['expires_at']=gmdate('c',time()+max(1,min(3650,(int)$record['link_days']))*86400);
                workflowSend($id,$record,'proposal',workflowCustomerUrl($token)); workflowActivity($record,'link_replaced','New customer link created with the proposal; the old link no longer works.'); $record['revision']=bin2hex(random_bytes(16)); $record['updated_at']=gmdate('c'); trackingWrite($newId,$record);
                // The project moves to its new id: the old copy must never be left behind, or the
                // project appears twice in the list and the old customer link keeps working.
                $oldFiles=trackingDirectory().DIRECTORY_SEPARATOR.'files'.DIRECTORY_SEPARATOR.$id; $newFiles=trackingDirectory().DIRECTORY_SEPARATOR.'files'.DIRECTORY_SEPARATOR.$newId; if(is_dir($oldFiles) && !rename($oldFiles,$newFiles)){unlink(trackingDirectory().DIRECTORY_SEPARATOR.$newId.'.json');throw new RuntimeException('Could not move private files to the new link.');}
                if(!unlink(trackingDirectory().DIRECTORY_SEPARATOR.$id.'.json')){if(is_dir($newFiles)) rename($newFiles,$oldFiles); unlink(trackingDirectory().DIRECTORY_SEPARATOR.$newId.'.json'); throw new RuntimeException('Could not replace the customer link. Nothing was changed; please try again.');}
                return ['id'=>$newId,'notice'=>aorUsesMailLog()?'Proposal prepared. Preview email recorded locally; no real email was delivered.':'Proposal sent with a new private tracking link.'];
            }
            elseif (in_array($action,['create_deposit','create_balance'],true)) {
                $type=$action==='create_deposit'?'deposit':'balance'; if($type==='deposit' && !$record['proposal_accepted_at']) throw new InvalidArgumentException('The customer must accept the proposal first.');
                foreach($record['invoices'] as $existing) if(($existing['type']??'')===$type && ($existing['status']??'')!=='Void') throw new InvalidArgumentException(ucfirst($type).' invoice already exists. Mark the incorrect invoice Void before creating its replacement.');
                $totals=workflowTotals($record); $number=workflowInvoiceNumber(); $today=(new DateTimeImmutable('now',new DateTimeZone('Asia/Riyadh')))->format('Y-m-d');
                $invoice=['number'=>$number,'type'=>$type,'issue_date'=>$today,'due_date'=>$record['due_date']?:$today,'amount_due_cents'=>$totals[$type],'subtotal_cents'=>$totals['subtotal'],'discount_cents'=>$totals['discount'],'total_cents'=>$totals['total'],'discount_type'=>$record['discount_type'],'discount_value'=>$record['discount_value'],'status'=>'Draft','created_at'=>gmdate('c'),'sent_at'=>'','paid_at'=>'','reminders'=>[]];
                $invoice+=workflowInvoiceWording($record,$invoice);
                workflowPdf($id,$record,$invoice); workflowInvoiceEmail($id,$record,$invoice); $record['invoices'][]=$invoice; workflowActivity($record,'invoice_created',$number.' ('.$type.')');
                $notice=aorUsesMailLog()?ucfirst($type).' invoice created. Preview email recorded locally; no real email was delivered.':ucfirst($type).' invoice created and sent.';
            }
            elseif ($action==='invoice_status') {
                $number=workflowText($_POST['invoice_number']??'',40); $status=workflowText($_POST['invoice_status']??'',20); if(!in_array($status,INVOICE_STATUSES,true)) throw new InvalidArgumentException('Invalid invoice status.');
                $found=false; foreach($record['invoices'] as &$invoice) if($invoice['number']===$number){$invoice['status']=$status;$invoice['paid_at']=$status==='Paid'?gmdate('c'):'';$found=true;workflowActivity($record,'payment_status_changed',$number.' → '.$status);break;} unset($invoice); if(!$found) throw new InvalidArgumentException('Invoice unavailable.');
                workflowMaybeTestimonial($record); $notice='Invoice status updated.';
            }
            elseif ($action==='testimonial_publish') {
                if(!$record['testimonial']) throw new InvalidArgumentException('No testimonial has been received for this project.');
                $publish=($_POST['published']??'')==='1'; $name=workflowText($_POST['public_name']??'',120);
                if($name==='') throw new InvalidArgumentException('Enter the name to show on the website.');
                if($publish && !$record['testimonial']['public_ok']) throw new InvalidArgumentException('The client did not allow this testimonial to be published.');
                $was=(bool)($record['testimonial']['published']??false);
                $record['testimonial']['public_name']=$name; $record['testimonial']['published']=$publish;
                if($publish && !$was) $record['testimonial']['published_at']=gmdate('c');
                if($publish!==$was) workflowActivity($record,$publish?'testimonial_published':'testimonial_unpublished',$publish?'Shown on the website as '.$name.'.':'Removed from the website.');
                $notice=$publish?'Testimonial published on the website.':($was?'Testimonial removed from the website.':'Testimonial settings saved.');
            } else throw new InvalidArgumentException('Unknown workflow action.');
            $record['updated_at']=gmdate('c'); $record['revision']=bin2hex(random_bytes(16)); trackingWrite($newId,$record); return ['id'=>$newId,'notice'=>$notice];
        });
        $_SESSION['workflow_flash']=$result['notice']; header('Location: workflow.php?edit='.$result['id'],true,303); exit;
    }
} catch (Throwable $exception) { $error=$exception->getMessage(); }
$notice=$_SESSION['workflow_flash']??''; unset($_SESSION['workflow_flash']);
$record=$id?workflowProject(trackingRead($id)):[]; if($record&&empty($record['reference'])){trackingEnsureReferences();$record=workflowProject(trackingRead($id));} $totals=$record?workflowTotals($record):['subtotal'=>0,'discount'=>0,'total'=>0,'deposit'=>0,'balance'=>0];
$templates=workflowRead('.templates.json',workflowTemplates()); $items=$record['line_items']??[]; while(count($items)<3)$items[]=['description'=>'','quantity'=>1,'unit_price_cents'=>0];
function displayDate(string $value): string { try { return (new DateTimeImmutable($value))->setTimezone(new DateTimeZone('Asia/Riyadh'))->format('j F Y, g:i a'); } catch (Throwable) { return $value; } }
$allActivity=array_reverse($record['activity']??[]); $activityTypes=[]; foreach($allActivity as $entry){$event=(string)($entry['event']??'');if($event!=='')$activityTypes[$event]=ucwords(str_replace('_',' ',$event));} asort($activityTypes);
$activityFilter=is_string($_GET['activity_filter']??null)?$_GET['activity_filter']:''; if($activityFilter!==''&&!isset($activityTypes[$activityFilter]))$activityFilter='';
$filteredActivity=$activityFilter===''?$allActivity:array_values(array_filter($allActivity,static fn(array $entry):bool=>($entry['event']??'')===$activityFilter));
$activityPerPage=10; $activityPages=max(1,(int)ceil(count($filteredActivity)/$activityPerPage)); $activityPage=max(1,min($activityPages,(int)($_GET['activity_page']??1))); $visibleActivity=array_slice($filteredActivity,($activityPage-1)*$activityPerPage,$activityPerPage);
?><!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Project workflow | AOR</title><link rel="stylesheet" href="../tracking.css"><link rel="stylesheet" href="admin.css"><link rel="stylesheet" href="workflow.css"></head><body><main>
<p class="eyebrow">AOR · Private workflow<?php if(!empty($record['reference'])):?> · <span class="project-ref"><?=h($record['reference'])?></span><?php endif?></p><h1><?=h($record['title']??'Project workflow')?></h1><p><a href="./?edit=<?=h($id)?>">← Progress editor</a> · <a href="settings.php">Defaults & templates</a> · <a href="export.php?type=projects">Export projects CSV</a> · <a href="export.php?type=invoices">Export invoices CSV</a></p>
<?php if($error):?><p class="notice error"><?=h($error)?></p><?php endif?><?php if($notice):?><p class="notice"><?=h($notice)?></p><?php endif?>
<?php if(empty($record)):?><p><a href="./">Choose a project in the workspace</a>, then open its workflow.</p></main></body></html><?php exit; endif?>
<section><h2>Brief and invoice inputs</h2><form method="post"><input type="hidden" name="csrf" value="<?=h($_SESSION['csrf'])?>"><input type="hidden" name="revision" value="<?=h($record['revision']??'')?>">
<div class="form-grid"><label>Client name<input name="client_name" required value="<?=h($record['client_name'])?>"></label><label>Client email<input name="client_email" type="email" required value="<?=h($record['client_email'])?>"></label><label>Company (optional)<input name="client_company" value="<?=h($record['client_company'])?>"></label><label>Address (optional)<textarea name="client_address"><?=h($record['client_address'])?></textarea></label></div>
<label>Scope summary<textarea name="scope" rows="4"><?=h($record['scope'])?></textarea></label><div class="template-row"><label>Apply service template<select name="template"><?php foreach($templates as $key=>$template):?><option value="<?=h($key)?>"><?=h($template['name'])?></option><?php endforeach?></select></label><button name="action" value="apply_template">Apply template</button></div>
<h3>Line items</h3><div class="line-items" id="line-items"><?php foreach($items as $item):?><div><input name="item_description[]" aria-label="Description" placeholder="Description" value="<?=h($item['description'])?>"><input name="item_quantity[]" type="number" min="1" aria-label="Quantity" value="<?=h($item['quantity'])?>"><input name="item_unit_price[]" inputmode="decimal" aria-label="Unit price" value="<?=number_format(($item['unit_price_cents']??0)/100,2,'.','')?>"><button type="button" class="remove-item" aria-label="Remove line item">Remove</button></div><?php endforeach?></div><button type="button" id="add-item">Add another line item</button>
<div class="form-grid"><label>Currency<select name="currency"><?php foreach(WORKFLOW_CURRENCIES as $currency):?><option <?=$record['currency']===$currency?'selected':''?>><?=$currency?></option><?php endforeach?></select><small>Changing currency does not convert amounts. Enter the exact prices agreed in that currency.</small></label><label>Discount type<select name="discount_type"><option value="percent" <?=$record['discount_type']==='percent'?'selected':''?>>Percentage (%)</option><option value="fixed" <?=$record['discount_type']==='fixed'?'selected':''?>>Fixed amount</option></select></label><label>Discount value<input name="discount_value" inputmode="decimal" value="<?=h($record['discount_value'])?>"><small>Choose Percentage and enter 10 for a 10% discount.</small></label><label>Due date<input name="due_date" type="date" value="<?=h($record['due_date'])?>"></label><label>Included revisions<input name="revisions_included" type="number" min="0" max="99" value="<?=h($record['revisions_included'])?>"></label></div>
<div class="form-grid"><label>Deposit invoice notes<textarea name="invoice_notes"><?=h($record['invoice_notes'])?></textarea></label><label>Deposit invoice terms<textarea name="invoice_terms"><?=h($record['invoice_terms'])?></textarea></label><label>Balance invoice notes<textarea name="balance_notes"><?=h($record['balance_notes'])?></textarea></label><label>Balance invoice terms<textarea name="balance_terms"><?=h($record['balance_terms'])?></textarea></label></div><p class="calculation-note">Each invoice keeps the notes and terms it was created with. Editing these boxes later only affects invoices created afterwards.</p><label>Payment details for this project<textarea name="payment_details" rows="5"><?=h($record['payment_details'])?></textarea></label><label class="checkbox"><input type="checkbox" name="reminders_enabled" value="1" <?=$record['reminders_enabled']?'checked':''?>>Automatic payment reminders</label>
<p class="calculation-note">These are automatic invoice calculations, not controls. Change the line items or discount above, then save the Brief to update them.</p><div class="totals"><span>Subtotal <strong><?=h(workflowFormat($totals['subtotal'],$record['currency']))?></strong></span><span>Discount <strong><?=h(workflowFormat($totals['discount'],$record['currency']))?></strong></span><span>Total <strong><?=h(workflowFormat($totals['total'],$record['currency']))?></strong></span><span>Deposit 50% <strong><?=h(workflowFormat($totals['deposit'],$record['currency']))?></strong></span><span>Balance 50% <strong><?=h(workflowFormat($totals['balance'],$record['currency']))?></strong></span></div><button name="action" value="save_brief">Save Brief inputs</button></form></section>
<section><h2>Proposal</h2><form method="post" enctype="multipart/form-data"><input type="hidden" name="csrf" value="<?=h($_SESSION['csrf'])?>"><input type="hidden" name="revision" value="<?=h($record['revision'])?>"><input type="file" name="proposal_file" aria-label="Proposal file to upload" accept=".pdf,.doc,.docx,.ppt,.pptx,.zip,.png,.jpg,.jpeg" required><button name="action" value="upload_proposal">Upload proposal file</button></form><p class="calculation-note">Every file listed here is shown in the customer’s Proposal panel. Upload only proposal or scope files.</p><?=fileRows($id,'proposal',$record['proposal_files'],(string)$record['revision'],'.pdf,.doc,.docx,.ppt,.pptx,.zip,.png,.jpg,.jpeg')?><form method="post"<?=$record['proposal_sent_at']?' data-confirm="This proposal was already sent. Send the updated version to the customer?"':''?>><input type="hidden" name="csrf" value="<?=h($_SESSION['csrf'])?>"><input type="hidden" name="revision" value="<?=h($record['revision'])?>"><button name="action" value="send_proposal"><?=$record['proposal_sent_at']?'Send updated proposal':'Send proposal'?></button></form><p>Sent: <?=h($record['proposal_sent_at']?displayDate((string)$record['proposal_sent_at']):'Not sent')?> · Accepted: <?=h($record['proposal_accepted_at']?displayDate((string)$record['proposal_accepted_at']):'Not accepted')?></p></section>
<section><h2>Invoices</h2><div class="actions"><form method="post"><input type="hidden" name="csrf" value="<?=h($_SESSION['csrf'])?>"><input type="hidden" name="revision" value="<?=h($record['revision'])?>"><button name="action" value="create_deposit">Create deposit invoice (50%)</button></form><form method="post"><input type="hidden" name="csrf" value="<?=h($_SESSION['csrf'])?>"><input type="hidden" name="revision" value="<?=h($record['revision'])?>"><button name="action" value="create_balance">Create balance invoice (50%)</button></form></div><?php foreach($record['invoices'] as $invoice):?><article class="invoice"><div><a href="download.php?project=<?=h($id)?>&type=invoice&file=<?=h($invoice['number'])?>"><strong><?=h($invoice['number'])?></strong></a> · <?=h(ucfirst($invoice['type']))?> · <?=h(workflowFormat($invoice['amount_due_cents'],$record['currency']))?></div><form method="post"><input type="hidden" name="csrf" value="<?=h($_SESSION['csrf'])?>"><input type="hidden" name="revision" value="<?=h($record['revision'])?>"><input type="hidden" name="invoice_number" value="<?=h($invoice['number'])?>"><select name="invoice_status" aria-label="Status of invoice <?=h($invoice['number'])?>"><?php foreach(INVOICE_STATUSES as $status):?><option <?=$invoice['status']===$status?'selected':''?>><?=$status?></option><?php endforeach?></select><button name="action" value="invoice_status">Update</button></form></article><?php endforeach?></section>
<section><h2>Delivery files</h2><form method="post" enctype="multipart/form-data"><input type="hidden" name="csrf" value="<?=h($_SESSION['csrf'])?>"><input type="hidden" name="revision" value="<?=h($record['revision'])?>"><input type="file" name="delivery_file" aria-label="Delivery file to upload" required><button name="action" value="upload_delivery">Upload delivery file</button></form><?=fileRows($id,'delivery',$record['delivery_files'],(string)$record['revision'])?><p>Customer access remains locked until the balance invoice is Paid.</p></section>
<section><h2>Testimonial</h2><?php $testimonial=$record['testimonial']; if($testimonial):?><blockquote class="testimonial"><?=nl2br(h($testimonial['text']))?></blockquote><dl class="testimonial-meta"><dt>Show as</dt><dd><?=h($testimonial['display_name']?:$record['client_name'])?></dd><dt>Rating</dt><dd><?=$testimonial['rating']?h(str_repeat('★',(int)$testimonial['rating']).' '.$testimonial['rating'].' / 5'):'Not given'?></dd><dt>Permission to publish</dt><dd><?=$testimonial['public_ok']?'<strong>Yes</strong>, it may be shown on the website':'<strong>No</strong>, keep it private'?></dd><dt>Received</dt><dd><?=h(displayDate((string)$testimonial['submitted_at']))?></dd><dt>On the website</dt><dd><?=($testimonial['published']??false)?'<strong>Published</strong> since '.h(displayDate((string)($testimonial['published_at']??''))):'Not published'?></dd></dl>
<form method="post" class="publish-form"><input type="hidden" name="csrf" value="<?=h($_SESSION['csrf'])?>"><input type="hidden" name="revision" value="<?=h($record['revision'])?>">
<label>Name shown on the website<input name="public_name" maxlength="120" required value="<?=h(($testimonial['public_name']??'')?:($testimonial['display_name']?:$record['client_name']))?>"></label>
<label class="checkbox"><input type="checkbox" name="published" value="1" <?=($testimonial['published']??false)?'checked':''?> <?=$testimonial['public_ok']?'':'disabled'?>>Publish on website (Homepage and Services page)</label>
<?php if(!$testimonial['public_ok']):?><p class="calculation-note">The client did not give permission, so this testimonial cannot be published.</p><?php endif?>
<button name="action" value="testimonial_publish">Save website settings</button></form><?php elseif($record['testimonial_sent_at']):?><p>Requested on <?=h(displayDate((string)$record['testimonial_sent_at']))?>. Waiting for the customer to submit it from their project page.</p><?php else:?><p>The request is sent automatically once the project is marked complete and the balance invoice is Paid.</p><?php endif?></section>
<section><div class="activity-heading"><div><h2>Admin-only activity log</h2><p><?=count($filteredActivity)?> <?=count($filteredActivity)===1?'entry':'entries'?><?= $activityFilter!==''?' in this filter':'' ?></p></div><form method="get"><input type="hidden" name="edit" value="<?=h($id)?>"><label>Filter activity<select name="activity_filter"><option value="">All activity</option><?php foreach($activityTypes as $event=>$label):?><option value="<?=h($event)?>" <?=$activityFilter===$event?'selected':''?>><?=h($label)?></option><?php endforeach?></select></label><button>Apply filter</button><a class="button-link" href="export.php?type=activity&amp;project=<?=h($id)?><?=$activityFilter!==''?'&amp;event='.h($activityFilter):''?>" download>Export <?=$activityFilter!==''?'filtered ':''?>log (CSV)</a></form></div><ol class="activity"><?php foreach($visibleActivity as $entry):?><li><time datetime="<?=h($entry['at'])?>"><?=h(displayDate((string)$entry['at']))?></time><strong><?=h(ucwords(str_replace('_',' ',(string)$entry['event'])))?></strong><span><?=h($entry['detail'])?></span></li><?php endforeach?></ol><?php if(!$visibleActivity):?><p>No activity matches this filter.</p><?php endif?><?php if($activityPages>1):?><nav class="activity-pages" aria-label="Activity log pages"><?php if($activityPage>1):?><a href="?edit=<?=h($id)?>&activity_filter=<?=urlencode($activityFilter)?>&activity_page=<?=$activityPage-1?>">← Newer</a><?php endif?><span>Page <?=$activityPage?> of <?=$activityPages?></span><?php if($activityPage<$activityPages):?><a href="?edit=<?=h($id)?>&activity_filter=<?=urlencode($activityFilter)?>&activity_page=<?=$activityPage+1?>">Older →</a><?php endif?></nav><?php endif?></section>
<section><h2>CSV exports</h2><form class="export-form" method="get" action="export.php"><label>Export<select name="type"><option value="projects">Projects</option><option value="invoices">Invoices</option><option value="activity">Activity log (all projects)</option></select></label><label>From<input type="date" name="from"></label><label>To<input type="date" name="to"></label><button>Download CSV</button></form></section>
</main><script src="workflow.js"></script></body></html>
