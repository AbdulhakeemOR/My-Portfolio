<?php
declare(strict_types=1);require __DIR__.'/workflow-core.php';trackingHeaders();
if(($_SERVER['REQUEST_METHOD']??'')!=='POST'){http_response_code(405);exit;}
try{$token=(string)($_POST['token']??'');$type=(string)($_POST['type']??'');$fileId=(string)($_POST['file']??'');$found=workflowCustomerRecord($token);$record=$found['record'];$path='';$name='';$mime='application/octet-stream';
if($type==='proposal'){foreach($record['proposal_files'] as $file)if(hash_equals($file['id'],$fileId)){$path=workflowFilePath($found['id'],$file,'proposal');$name=$file['name'];$mime=$file['mime'];}}
elseif($type==='invoice'&&workflowPaymentRequested($record)){foreach($record['invoices'] as $invoice)if(($invoice['status']??'')!=='Void'&&hash_equals($invoice['number'],$fileId)){$path=workflowFilesDirectory($found['id'],'invoice').DIRECTORY_SEPARATOR.$invoice['number'].'.pdf';$name=$invoice['number'].'.pdf';$mime='application/pdf';}}
elseif($type==='delivery'){$paid=false;foreach($record['invoices'] as $invoice)if(($invoice['type']??'')==='balance'&&($invoice['status']??'')==='Paid')$paid=true;if($paid)foreach($record['delivery_files'] as $file)if(hash_equals($file['id'],$fileId)){$path=workflowFilePath($found['id'],$file,'delivery');$name=$file['name'];$mime=$file['mime'];}}
if(!$path||!is_file($path))throw new OutOfBoundsException('File unavailable.');header('Content-Type: '.$mime);header('Content-Length: '.filesize($path));header("Content-Disposition: attachment; filename*=UTF-8''".rawurlencode($name));readfile($path);
}catch(Throwable $e){http_response_code(404);echo 'File unavailable or link expired.';}
