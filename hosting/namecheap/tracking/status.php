<?php
declare(strict_types=1); require __DIR__.'/workflow-core.php'; trackingHeaders(); header('Content-Type: application/json; charset=utf-8');
function fail(int $status,string $message):void{http_response_code($status);echo json_encode(['error'=>$message]);exit;}
if(($_SERVER['REQUEST_METHOD']??'')!=='POST')fail(405,'Open your private project link to view progress.');
try{$input=json_decode((string)file_get_contents('php://input'),true);$token=is_array($input)?(string)($input['token']??''):'';$found=workflowCustomerRecord($token);$record=$found['record'];$output=[];foreach(['title','stage','update','next_step','milestone_date','updated_at'] as $field)$output[$field]=is_string($record[$field]??null)?$record[$field]:'';$output['reference']=is_string($record['reference']??null)?$record['reference']:'';$output['completed']=($record['completed']??false)===true;
$output['proposal']=['sent'=>(bool)$record['proposal_sent_at'],'accepted_at'=>$record['proposal_accepted_at'],'files'=>array_map(fn($f)=>['id'=>$f['id'],'name'=>$f['name'],'bytes'=>$f['bytes']],$record['proposal_files'])];
$output['revisions']=['included'=>(int)$record['revisions_included'],'used'=>(int)$record['revisions_used']];$output['invoices']=[];
if(workflowPaymentRequested($record))foreach($record['invoices'] as $invoice)if(($invoice['status']??'')!=='Void')$output['invoices'][]=['number'=>$invoice['number'],'type'=>$invoice['type'],'status'=>$invoice['status'],'due_date'=>$invoice['due_date'],'amount'=>workflowFormat((int)$invoice['amount_due_cents'],$record['currency']),'payment_details'=>$record['payment_details']];
$balancePaid=workflowBalancePaid($record);$output['delivery_locked']=!$balancePaid;$output['delivery_files']=$balancePaid?array_map(fn($f)=>['id'=>$f['id'],'name'=>$f['name'],'bytes'=>$f['bytes']],$record['delivery_files']):[];
$output['testimonial']=['open'=>$output['completed'],'submitted_at'=>(string)($record['testimonial']['submitted_at']??''),'text'=>(string)($record['testimonial']['text']??'')];
echo json_encode($output,JSON_UNESCAPED_UNICODE|JSON_INVALID_UTF8_SUBSTITUTE);
}catch(OutOfBoundsException $e){fail(404,'This project link is unavailable or has expired.');}catch(Throwable $e){fail(503,'Project updates are temporarily unavailable.');}
