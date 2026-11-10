"""Exercise enquiry capture against an isolated PHP server and private JSON store."""
from pathlib import Path
from urllib.error import HTTPError
from urllib.parse import urlencode
from urllib.request import Request, urlopen
import json, os, shutil, socket, subprocess, tempfile, time

ROOT = Path(__file__).resolve().parent.parent
PHP = ROOT / '.tmp-privacy/php-runtime/php.exe'


def post(url, values):
    request = Request(url, data=urlencode(values).encode(), headers={'Accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded'})
    with urlopen(request, timeout=10) as response:
        payload = response.read()
        try: body = json.loads(payload)
        except json.JSONDecodeError as error: raise AssertionError(f'Expected JSON from {url}, got {payload[:300]!r}') from error
        return response.status, body


def main():
    assert PHP.is_file(), 'Local PHP runtime is unavailable.'
    with tempfile.TemporaryDirectory(prefix='aor-enquiry-') as temporary:
        base = Path(temporary)
        public = base / 'public'; public.mkdir()
        for name in ('contact.php', 'mail-core.php', 'turnstile-config.php', 'contact-turnstile.js'):
            shutil.copy2(ROOT / 'hosting/namecheap' / name, public / name)
        shutil.copytree(ROOT / 'hosting/namecheap/lib', public / 'lib')
        shutil.copytree(ROOT / 'hosting/namecheap/tracking', public / 'tracking')
        private = base / 'private'; private.mkdir()
        config = private / 'config.php'; mail_log = private / 'mail.log'
        config.write_text("<?php return ['transport'=>'log','mail_log'=>__DIR__.'/mail.log','smtp'=>['owner_email'=>'owner@example.test'],'turnstile'=>['site_key'=>'','secret_key'=>'']];", encoding='utf-8')
        router = base / 'router.php'
        router.write_text("<?php $path=parse_url($_SERVER['REQUEST_URI'],PHP_URL_PATH); if(str_starts_with($path,'/tracking/admin/')) $_SERVER['REMOTE_USER']='aor-project-admin'; if($path==='/tracking/admin/'){require __DIR__.'/public/tracking/admin/index.php';exit;} return false;", encoding='utf-8')
        with socket.socket() as available:
            available.bind(('127.0.0.1', 0)); port = available.getsockname()[1]
        environment = os.environ.copy(); environment['AOR_PRIVATE_CONFIG'] = str(config)
        server = subprocess.Popen([str(PHP), '-S', f'127.0.0.1:{port}', '-t', str(public), str(router)], env=environment, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, creationflags=getattr(subprocess, 'CREATE_NO_WINDOW', 0))
        try:
            url = f'http://127.0.0.1:{port}'
            for _ in range(80):
                try:
                    urlopen(url + '/turnstile-config.php', timeout=.2); break
                except Exception: time.sleep(.05)
            common = {'language':'en', 'bot-field':'', 'name':'Test Client', 'email':'Client@Example.test', 'service':'web', 'timeline':'Next month'}
            assert post(url + '/contact.php', common | {'subject':'First enquiry', 'message':'First message.'}) == (200, {'ok': True})
            assert post(url + '/contact.php', common | {'email':'client@example.test', 'subject':'More detail', 'message':'Second message.'}) == (200, {'ok': True})
            records = list((base / 'aor-projects').glob('*.json')); assert len(records) == 1
            record = json.loads(records[0].read_text(encoding='utf-8'))
            assert record['stage'] == 'Enquiry' and record['revoked'] is True
            assert record['client_email'] == 'client@example.test' and len(record['enquiries']) == 2
            messages = [json.loads(line) for line in mail_log.read_text(encoding='utf-8').splitlines()]
            assert len(messages) == 4 and [item['to'] for item in messages] == ['owner@example.test', 'Client@Example.test', 'owner@example.test', 'client@example.test']
            try:
                post(url + '/contact.php', common | {'bot-field':'filled', 'subject':'Spam', 'message':'Rejected.'})
                raise AssertionError('Honeypot submission was accepted.')
            except HTTPError as error: assert error.code == 422
            with urlopen(url + '/tracking/admin/', timeout=5) as response:
                admin = response.read().decode('utf-8')
            assert 'Enquiry messages' not in admin and 'First enquiry' in admin
            print('PASS: Enquiry stage, deduplication, independent owner/customer messages, honeypot rejection, and protected workspace listing.')
        finally:
            server.terminate(); server.wait(timeout=10)


if __name__ == '__main__': main()
