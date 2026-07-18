#!/usr/bin/env python3
"""Serve the Ren'Py web build with the COOP/COEP headers it requires.

Ren'Py web (WASM + SharedArrayBuffer) only runs when the page is served
cross-origin-isolated. Python's plain http.server doesn't set those headers,
so this wrapper adds them.

Usage: python3 scripts/serve_web.py [port]   (default 8042, dir ./web-build)
"""
import http.server
import os
import sys

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8042
ROOT = os.path.join(os.path.dirname(__file__), "..", "web-build")


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **k):
        super().__init__(*a, directory=ROOT, **k)

    def end_headers(self):
        self.send_header("Cross-Origin-Opener-Policy", "same-origin")
        self.send_header("Cross-Origin-Embedder-Policy", "require-corp")
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


if __name__ == "__main__":
    os.chdir(ROOT)
    httpd = http.server.ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    print(f"serving {ROOT} at http://127.0.0.1:{PORT}/  (COOP/COEP enabled)")
    httpd.serve_forever()
