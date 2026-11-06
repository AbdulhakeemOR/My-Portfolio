"""Check the local pages in the installed Edge browser without dependencies."""

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.request import urlopen, Request
from urllib.parse import urlparse
import base64
import json
import os
import socket
import struct
import subprocess
import tempfile
import threading
import time
import sys


ROOT = Path(os.environ.get('AOR_PREVIEW_DIRECTORY', Path(__file__).resolve().parent.parent)).resolve()
EDGE = Path('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe')


class QuietHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def log_message(self, *args):
        pass


class PreviewServer(ThreadingHTTPServer):
    def handle_error(self, request, client_address):
        if isinstance(sys.exception(), (ConnectionResetError, ConnectionAbortedError, BrokenPipeError)):
            return
        super().handle_error(request, client_address)


class Browser:
    def __init__(self, url):
        parsed = urlparse(url)
        self.socket = socket.create_connection((parsed.hostname, parsed.port), timeout=15)
        self.socket.settimeout(15)
        key = base64.b64encode(os.urandom(16)).decode()
        request = f'GET {parsed.path} HTTP/1.1\r\nHost: {parsed.netloc}\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Key: {key}\r\nSec-WebSocket-Version: 13\r\n\r\n'
        self.socket.sendall(request.encode())
        header = b''
        while b'\r\n\r\n' not in header:
            header += self.socket.recv(1)
        if b' 101 ' not in header:
            raise RuntimeError(header.decode())
        self.sequence = 0
        self.errors = []

    def read(self, length):
        result = b''
        while len(result) < length:
            data = self.socket.recv(length - len(result))
            if not data:
                raise RuntimeError('Browser connection closed.')
            result += data
        return result

    def call(self, method, params=None):
        self.sequence += 1
        payload = json.dumps({'id': self.sequence, 'method': method, 'params': params or {}}).encode()
        mask = os.urandom(4)
        length = len(payload)
        header = bytes([129, 128 | length]) if length < 126 else bytes([129, 254]) + struct.pack('!H', length)
        self.socket.sendall(header + mask + bytes(byte ^ mask[index % 4] for index, byte in enumerate(payload)))

        while True:
            first, second = self.read(2)
            length = second & 127
            if length == 126:
                length = struct.unpack('!H', self.read(2))[0]
            elif length == 127:
                length = struct.unpack('!Q', self.read(8))[0]
            data = self.read(length)
            if first & 15 == 8:
                raise RuntimeError('Browser closed the socket.')
            if first & 15 != 1:
                continue
            result = json.loads(data)
            if result.get('method') == 'Runtime.exceptionThrown':
                self.errors.append(result['params']['exceptionDetails'])
            if result.get('id') == self.sequence:
                if 'error' in result:
                    raise RuntimeError(result['error'])
                return result.get('result', {})

    def evaluate(self, expression):
        result = self.call('Runtime.evaluate', {'expression': expression, 'returnByValue': True, 'awaitPromise': True})
        if result.get('exceptionDetails'):
            raise RuntimeError(result['exceptionDetails'])
        return result.get('result', {}).get('value')


def main():
    from browser_checks import main as check_current_site
    check_current_site()


if __name__ == '__main__':
    main()
