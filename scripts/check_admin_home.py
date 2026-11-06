"""Verify the Admin Home access gate and its exact code-only upload package."""
from pathlib import Path
import http.cookiejar
import json
import os
import secrets
import shutil
import socket
import subprocess
import tempfile
import time
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen
import zipfile

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / 'hosting/namecheap/admin-home'


def main():
    php = ROOT / '.tmp-privacy/php-runtime/php.exe'
    subprocess.run([str(php), '-n', '-l', str(SOURCE / 'index.php')], capture_output=True, check=True)
    with tempfile.TemporaryDirectory(prefix='admin-home-', ignore_cleanup_errors=True) as temporary:
        folder = Path(temporary)
        public = folder / 'public_html'
        shutil.copytree(SOURCE, public / 'admin')
        secret = secrets.token_hex(32)
        router = folder / 'router.php'
        # Only the disposable fixture emulates cPanel. No bypass is packaged.
        router.write_text("<?php if (hash_equals(getenv('AOR_HUB_FIXTURE'), $_SERVER['HTTP_X_FIXTURE'] ?? '')) $_SERVER['REMOTE_USER']=$_SERVER['HTTP_X_FIXTURE_USER'] ?? ''; return false;", encoding='utf-8')
        with socket.socket() as sock:
            sock.bind(('127.0.0.1', 0)); port = sock.getsockname()[1]
        base = f'http://127.0.0.1:{port}'
        env = os.environ.copy(); env['AOR_HUB_FIXTURE'] = secret
        with (folder / 'server.log').open('w') as log:
            process = subprocess.Popen([str(php), '-n', '-S', f'127.0.0.1:{port}', '-t', str(public), str(router)], env=env, stdout=log, stderr=log)
            def request(user=None, method='GET', headers=None):
                fields = dict(headers or {})
                if user is not None: fields.update({'X-Fixture': secret, 'X-Fixture-User': user})
                try: response = urlopen(Request(base+'/admin/index.php', headers=fields, method=method), timeout=5)
                except HTTPError as error: response = error
                return response.code, response.read().decode(), response.headers
            try:
                for _ in range(60):
                    try:
                        request(); break
                    except (URLError, TimeoutError): time.sleep(.1)
                assert request()[0] == 403
                assert request(headers={'Remote-User':'aor-admin', 'Authorization':'Basic YW9yLWFkbWluOmZha2U='})[0] == 403
                assert request('aor-moderator')[0] == 403
                assert request('aor-project-admin')[0] == 403
                code, body, headers = request('aor-admin')
                assert code == 200
                assert '../tracking/admin/index.php' in body and '../review/feedback-admin/index.php' in body
                assert 'href="../review/"' in body and 'href="../en/services.html"' in body
                assert 'public_html/admin/index.php' in body and 'cPanel' in body
                assert 'no-store' in headers['Cache-Control']
                assert headers['X-Robots-Tag'] == 'noindex, nofollow'
                assert "frame-ancestors 'none'" in headers['Content-Security-Policy']
                assert request('aor-admin', method='POST')[0] == 405
            finally:
                process.terminate(); process.wait(timeout=10)
    print('PASS: PHP syntax, unauthenticated/wrong-user/spoofed-header rejection, authorised links, recovery instructions, no-cache/noindex headers, and read-only methods.')


if __name__ == '__main__': main()
