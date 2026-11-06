"""Exercise the real PHP discussion endpoints against disposable private SQLite data.

Requires a local PHP executable with PDO SQLite; no messages or real comments are sent.
"""
import argparse
import base64
import hashlib
from http.cookiejar import CookieJar
import json
import os
from pathlib import Path
import re
import shutil
import socket
import sqlite3
import subprocess
import tempfile
import time
from urllib.error import HTTPError
from urllib.request import build_opener, HTTPCookieProcessor, Request

ROOT = Path(__file__).resolve().parent.parent


class Client:
    def __init__(self, base):
        self.base = base
        self.cookies = CookieJar()
        self.opener = build_opener(HTTPCookieProcessor(self.cookies))

    def send(self, path, body=None, headers=None, method=None):
        extra = dict(headers or {})
        data = None
        if body is not None:
            if isinstance(body, dict):
                data = json.dumps(body, ensure_ascii=False).encode()
                extra['Content-Type'] = 'application/json'
            else:
                data = body.encode()
            extra.setdefault('Origin', self.base)
        request = Request(self.base + path, data=data, headers=extra, method=method)
        try:
            response = self.opener.open(request, timeout=10)
        except HTTPError as error:
            response = error
        raw = response.read().decode('utf-8')
        content = json.loads(raw) if 'application/json' in response.headers.get('Content-Type', '') else raw
        return response.status, content, response.headers


def fixture(php, folder):
    public = folder / 'public_html'
    public.mkdir()
    for language in ('', 'en', 'ar'):
        (public / language).mkdir(exist_ok=True)
        for source in (ROOT / language).glob('*.html'):
            shutil.copy2(source, public / language / source.name)
        (public / language / 'content').mkdir(exist_ok=True)
        for name in ('articles.json', 'projects.json'):
            shutil.copy2(ROOT / language / 'content' / name, public / language / 'content' / name)
    for prefix in ('', 'review'):
        target = public / prefix
        target.mkdir(exist_ok=True)
        for name in ('article-feedback.php', 'feedback-core.php'):
            shutil.copy2(ROOT / 'hosting/namecheap' / name, target / name)
        shutil.copytree(ROOT / 'hosting/namecheap/feedback-admin', target / 'feedback-admin')
        if prefix:
            p = target / 'feedback-core.php'
            p.write_text(p.read_text(encoding='utf-8').replace("const FEEDBACK_BASE_PATH = '';", "const FEEDBACK_BASE_PATH = '/review';"), encoding='utf-8')
        (target / 'content').mkdir(exist_ok=True)
        shutil.copy2(ROOT / 'content/articles.json', target / 'content/articles.json')
    router = folder / 'router.php'
    asset_root = str(ROOT / 'assets').replace('\\', '/')
    router.write_text('''<?php
$_SERVER['SERVER_ADDR']='127.0.0.1';
$path=parse_url($_SERVER['REQUEST_URI'],PHP_URL_PATH);
if (str_contains($path,'feedback-admin')) {
  if (($_SERVER['PHP_AUTH_USER']??'')==='aor-moderator' && ($_SERVER['PHP_AUTH_PW']??'')==='fixture-password') $_SERVER['REMOTE_USER']='aor-moderator';
  else unset($_SERVER['REMOTE_USER']);
}
if (str_starts_with($path,'/assets/')) {
 $root=realpath(ASSET_ROOT);$file=realpath($root.'/'.substr($path,8));
 if (!$file || !str_starts_with($file,$root.DIRECTORY_SEPARATOR) || !is_file($file)) {http_response_code(404);exit;}
 $types=['js'=>'text/javascript','css'=>'text/css','svg'=>'image/svg+xml','png'=>'image/png','webp'=>'image/webp','jpg'=>'image/jpeg','ttf'=>'font/ttf'];
 header('Content-Type: '.($types[pathinfo($file,PATHINFO_EXTENSION)]??'application/octet-stream'));readfile($file);exit;
}
return false;
'''.replace('ASSET_ROOT', json.dumps(asset_root)), encoding='utf-8')
    with socket.socket() as listener:
        listener.bind(('127.0.0.1', 0))
        port = listener.getsockname()[1]
    base = f'http://127.0.0.1:{port}'
    env = dict(os.environ, AOR_FEEDBACK_TESTING='1', AOR_FEEDBACK_PRIVATE_DIR=str(folder / 'private'))
    command = [str(php), '-n', '-d', 'extension_dir=' + str(php.parent / 'ext'), '-d', 'extension=pdo_sqlite', '-S', f'127.0.0.1:{port}', '-t', str(public), str(router)]
    log = (folder / 'php.log').open('w', encoding='utf-8')
    process = subprocess.Popen(command, env=env, stdout=log, stderr=log)
    client = Client(base)
    for _ in range(80):
        try:
            client.send('/index.html')
            return process, log, base
        except OSError:
            if process.poll() is not None:
                raise RuntimeError((folder / 'php.log').read_text())
            time.sleep(.1)
    raise RuntimeError('PHP test server did not start.')


def api_checks(base, slug, folder):
    endpoint = '/article-feedback.php?article=' + slug
    a, b, anonymous, admin = (Client(base) for _ in range(4))
    code, initial, _ = a.send(endpoint)
    assert code == 200 and initial['likes'] == 0 and initial['token'] == '' and len(a.cookies) == 0, initial
    assert a.send('/article-feedback.php?article=does-not-exist')[0] == 404
    assert a.send(endpoint + '&participate=1')[0] == 403
    code, own, headers = a.send(endpoint + '&participate=1', headers={'X-AOR-Feedback':'1'})
    assert code == 200 and own['token'] and 'HttpOnly' in headers.get('Set-Cookie', '')
    token = own['token']

    def post(client, action, token=token, **values):
        return client.send('/article-feedback.php', {'article':slug, 'token':token, 'action':action, **values})

    assert post(a, 'like', token='bad', liked=True)[0] == 403
    assert a.send('/article-feedback.php', {'article':slug,'token':token,'action':'like','liked':True}, headers={'Origin':'https://unrelated.example'})[0] == 403
    assert post(a, 'like', liked=True)[1]['likes'] == 1
    assert post(a, 'like', liked=True)[1]['likes'] == 1
    assert post(a, 'like', liked=False)[1]['likes'] == 0
    assert post(a, 'comment', name='Test', body='test', website='bot')[0] == 422
    assert post(a, 'comment', name='Test', body='x'*2001)[0] == 422
    payload = '<script>alert(1)</script> تجربة'
    code, result, _ = post(a, 'comment', name='Public name', body=payload)
    assert code == 201 and result['comments'][0]['pending'] and result['comments'][0]['body'] == payload
    comment_id = result['comments'][0]['id']
    assert anonymous.send(endpoint)[1]['comments'] == []
    b_token = b.send(endpoint + '&participate=1', headers={'X-AOR-Feedback':'1'})[1]['token']
    assert post(b, 'delete', token=b_token, id=comment_id)[0] == 404
    assert admin.send('/feedback-admin/index.php')[0] == 403
    assert admin.send('/feedback-admin/index.php', headers={'Remote-User':'aor-moderator'})[0] == 403
    forged = 'Basic ' + base64.b64encode(b'aor-moderator:wrong').decode()
    assert admin.send('/feedback-admin/index.php', headers={'Authorization':forged})[0] == 403
    auth = 'Basic ' + base64.b64encode(b'aor-moderator:fixture-password').decode()
    code, page, _ = admin.send('/feedback-admin/index.php', headers={'Authorization':auth})
    assert code == 200 and '&lt;script&gt;' in page and '<script>alert' not in page
    admin_token = re.search(r'name="token" value="([a-f0-9]+)"', page)[1]
    from urllib.parse import urlencode
    def moderate(action, identifier, csrf=admin_token):
        return admin.send('/feedback-admin/index.php', urlencode({'token':csrf,'id':identifier,'action':action}), headers={'Authorization':auth,'Content-Type':'application/x-www-form-urlencoded'})
    assert moderate('approve', comment_id, 'bad')[0] == 403
    assert moderate('approve', comment_id)[0] == 200
    visible = anonymous.send(endpoint)[1]['comments']
    assert len(visible) == 1 and not visible[0]['pending'] and not visible[0]['mine']
    assert post(a, 'delete', id=comment_id)[0] == 200
    assert anonymous.send(endpoint)[1]['comments'] == []
    # Five comments/hour is shared across the IP; the sixth is rejected.
    for index in range(4):
        assert post(a, 'comment', name='Test', body=f'Pending {index}')[0] == 201
    assert post(a, 'comment', name='Test', body='Excess')[0] == 429
    # Review data, cookies and totals must be isolated from production.
    review = Client(base)
    code, separate, _ = review.send('/review' + endpoint)
    assert code == 200 and separate['likes'] == 0 and separate['comments'] == []
    assert (folder / 'private/production.sqlite').is_file()
    assert (folder / 'private/review.sqlite').is_file()
    assert not list((folder / 'public_html').rglob('*.sqlite'))
    # An old pending record is cleaned up; an approved record is retained.
    with sqlite3.connect(folder / 'private/production.sqlite') as db:
        db.execute('UPDATE comments SET created=?', (int(time.time())-31*86400,))
    post(a, 'like', liked=True)
    with sqlite3.connect(folder / 'private/production.sqlite') as db:
        assert db.execute('SELECT COUNT(*) FROM comments').fetchone()[0] == 0
    print('PASS: real PHP/SQLite persistence, idempotent likes, CSRF/origin checks, pending privacy, authenticated moderation, escaped content, ownership deletion, rate limits, cleanup and review isolation.')
    return admin, auth


def browser_checks(base, slug, admin, auth):
    from check_browser import Browser, EDGE
    from urllib.parse import urlencode
    browser = None
    with tempfile.TemporaryDirectory(prefix='aor-discussion-browser-', ignore_cleanup_errors=True) as profile:
        process = subprocess.Popen([str(EDGE),'--headless=new','--disable-gpu','--no-first-run','--remote-debugging-port=0','--remote-allow-origins=*',f'--user-data-dir={profile}','about:blank'], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        try:
            marker = Path(profile) / 'DevToolsActivePort'
            for _ in range(100):
                if marker.exists(): break
                time.sleep(.1)
            from urllib.request import urlopen
            pages = json.load(urlopen('http://127.0.0.1:' + marker.read_text().splitlines()[0] + '/json/list'))
            browser = Browser(next(p['webSocketDebuggerUrl'] for p in pages if p['type']=='page'))
            browser.call('Runtime.enable'); browser.call('Page.enable')
            browser.call('Emulation.setFocusEmulationEnabled', {'enabled':True})
            selector = '#article-' + slug
            def wait(expression):
                for _ in range(100):
                    if browser.evaluate(expression): return
                    time.sleep(.1)
                raise AssertionError('Browser wait failed: ' + expression)
            def visit(lang):
                browser.call('Page.navigate', {'url':base+'/'+lang+'/articles.html'})
                wait("document.readyState==='complete'&&!!document.querySelector(" + json.dumps(selector) + ")")
                time.sleep(.4)
                browser.evaluate("document.querySelector(" + json.dumps(selector+' .article-details') + ").open=true")
            visit('en')
            browser.evaluate("document.querySelector(" + json.dumps(selector+' [data-article-action=like]') + ").click()")
            wait("document.querySelector(" + json.dumps(selector+' [data-article-action=like]') + ").getAttribute('aria-pressed')==='true'")
            browser.evaluate("document.querySelector(" + json.dumps(selector+' [data-article-action=comment]') + ").click()")
            wait("!document.querySelector(" + json.dumps(selector+' [data-article-action=comment]') + ").disabled")
            browser.evaluate("(() => {const f=document.querySelector(" + json.dumps(selector+' .article-comment-form') + ");f.elements.name.value='Display name';f.elements.body.value='Like';f.requestSubmit()})()")
            wait("document.querySelector(" + json.dumps(selector+' .article-comment-list') + ").textContent.includes('Awaiting approval')")
            data = browser.evaluate("fetch('/article-feedback.php?article="+slug+"').then(r=>r.json())")
            identifier = next(c['id'] for c in data['comments'] if c['body']=='Like')
            page = admin.send('/feedback-admin/index.php', headers={'Authorization':auth})[1]
            token = re.search(r'name="token" value="([a-f0-9]+)"',page)[1]
            assert admin.send('/feedback-admin/index.php', urlencode({'token':token,'id':identifier,'action':'approve'}), headers={'Authorization':auth,'Content-Type':'application/x-www-form-urlencoded'})[0] == 200
            visit('ar')
            browser.evaluate("document.querySelector(" + json.dumps(selector+' [data-article-action=comment]') + ").click()")
            wait("!document.querySelector(" + json.dumps(selector+' [data-article-action=comment]') + ").disabled")
            assert browser.evaluate("document.querySelector(" + json.dumps(selector+' .article-comment-list [data-user-content]') + ").textContent") == 'Display name'
            assert browser.evaluate("document.querySelector(" + json.dumps(selector+' .article-comment-list p[data-user-content]') + ").textContent") == 'Like'
            assert browser.evaluate("document.querySelector(" + json.dumps(selector+' [data-article-action=like]') + ").getAttribute('aria-pressed')") == 'true'
            for lang in ('en','ar'):
                visit(lang)
                for width in (375,1440):
                    browser.call('Emulation.setDeviceMetricsOverride',{'width':width,'height':900,'deviceScaleFactor':1,'mobile':width<500})
                    assert not browser.evaluate('document.documentElement.scrollWidth>innerWidth')
                    assert browser.evaluate("getComputedStyle(document.querySelector('.article-meta')).columnGap") == '10px'
            assert not browser.errors, browser.errors
            print('PASS: browser like/comment submission, moderated cross-language persistence, original user text preservation, 10px metadata gap and mobile/desktop layouts.')
        finally:
            if browser: browser.socket.close()
            process.terminate()
            try: process.wait(timeout=15)
            except subprocess.TimeoutExpired: process.kill();process.wait(timeout=5)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--php', type=Path, default=ROOT/'.tmp-privacy/php-runtime/php.exe')
    parser.add_argument('--browser', action='store_true')
    args = parser.parse_args()
    if not args.php.is_file(): raise SystemExit('Supply --php with a local PHP executable that supports PDO SQLite.')
    (ROOT/'.tmp-privacy').mkdir(exist_ok=True)
    with tempfile.TemporaryDirectory(prefix='feedback-test-',dir=ROOT/'.tmp-privacy',ignore_cleanup_errors=True) as temporary:
        folder=Path(temporary)
        process,log,base=fixture(args.php.resolve(),folder)
        try:
            articles=json.loads((ROOT/'content/articles.json').read_text(encoding='utf-8'))['articles']
            admin,auth=api_checks(base,articles[0]['slug'],folder)
            if args.browser:
                # The preceding abuse test deliberately exhausts this IP's quota.
                # Start the independent browser journey with a fresh test quota.
                with sqlite3.connect(folder / 'private/production.sqlite') as db:
                    db.execute('DELETE FROM limits')
                browser_checks(base,articles[1]['slug'],admin,auth)
        finally:
            process.terminate();process.wait(timeout=10);log.close()


if __name__=='__main__':main()
