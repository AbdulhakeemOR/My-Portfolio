// Exercise the hosted contact UI with simulated responses; never send mail.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../assets/js/script.js'), 'utf8');
const block = source.slice(source.indexOf('const contactForm ='));

async function run(outcome, language='en', basePath='') {
  const listeners = {};
  const button = {disabled:false, textContent:'Send message'};
  const status = {textContent:''};
  const fields = {
    '#subject': {value:'Test'}, '#message': {value:'Retain this message',maxLength:5000,addEventListener(){}},
    '#message-counter': {textContent:''}, '#contact-form-status':status
  };
  let reset = false;
  let destination = '';
  const form = {
    dataset:{contactBackend:'php'},
    action:`https://abdulhakeemor.com${basePath}/contact.php`,
    querySelector(selector) {return selector.includes('submit')?button:null},
    querySelectorAll() {return []},
    addEventListener(name, fn) {listeners[name]=fn},
    reportValidity() {return true},
    setAttribute() {}, removeAttribute() {}, reset() {reset=true;fields['#message'].value=''}
  };
  const context = {
    document: {querySelector(selector) {return selector==='#email-contact-form'?form:fields[selector]}},
    window:{location:{protocol:'https:',hostname:'abdulhakeemor.com',search:'',href:`https://abdulhakeemor.com${basePath}/${language}/contact.html`,assign(url){destination=url}}},
    URLSearchParams, URL, AbortSignal,
    FormData: class extends Map {constructor(){super([['name','Audit'],['email','audit@example.com'],['subject','Test'],['message','Retain this message']])}},
    fetch:async()=>{
      if(outcome==='network')throw Error('simulated');
      if(outcome==='timeout'){const e=new Error('simulated');e.name='TimeoutError';throw e}
      const codes={success:200,'rate-limit':429,validation:422,unavailable:503,unexpected:200};
      return {ok:codes[outcome]===200,status:codes[outcome],json:async()=>({ok:outcome==='success'})}
    }
  };
  vm.runInNewContext(block, context);
  await listeners.submit({preventDefault(){}});
  assert.equal(button.disabled,false);
  assert.equal(reset,outcome==='success');
  if(outcome!=='success') assert.equal(fields['#message'].value,'Retain this message');
  if(outcome==='success')assert.equal(destination,`https://abdulhakeemor.com${basePath}/${language}/contact-success.html`);
  else assert.equal(destination,'');
  if(outcome==='rate-limit')assert.match(status.textContent,/Too many attempts/);
  if(outcome==='validation')assert.match(status.textContent,/check your details/);
  if(outcome==='unavailable')assert.match(status.textContent,/temporarily unavailable/);
  if(outcome==='timeout')assert.match(status.textContent,/may send it twice/);
  return {outcome,status:status.textContent,retained:fields['#message'].value,button:button.textContent};
}
(async()=>{for(const outcome of ['success','rate-limit','validation','unavailable','timeout','network','unexpected'])console.log(JSON.stringify(await run(outcome)));await run('success','ar');await run('success','en','/review');await run('success','ar','/review')})().catch(e=>{console.error(e);process.exitCode=1});
