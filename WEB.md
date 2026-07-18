# Web build — DAOCUBATOR / "Get Rich Together"

A browser (WASM) build so collaborators can **play in a browser with no Ren'Py install**.
The build output (`web-build/`) is gitignored — it's ~48 MB of WASM/data blobs; regenerate it with the steps below.

## Prerequisites (one-time): install Ren'Py web support

The SDK at `~/renpy-8.5.0-sdk` doesn't ship web support by default. Install it once:

```bash
curl -s "http://update.renpy.org/8.5.3/renpy-8.5.3-web.update.gz" -o /tmp/web.update.gz
gzip -dc /tmp/web.update.gz | tar xf - -C ~/renpy-8.5.0-sdk web/
```

(If you upgrade the SDK, swap `8.5.3` for the new version — check `renpy.sh --version`.)

## Build

```bash
~/renpy-8.5.0-sdk/renpy.sh ~/renpy-8.5.0-sdk/launcher web_build . --dest ./web-build
```

Produces `web-build/` (index.html + renpy.wasm + renpy.data + game.zip + icons).

## Play locally

Ren'Py web requires cross-origin isolation (COOP/COEP headers), which a plain
`python -m http.server` does NOT set. Use the wrapper:

```bash
python3 scripts/serve_web.py 8055      # serves ./web-build with COOP/COEP
# open http://127.0.0.1:8055/index.html
```

First load is slow (~1–2 min): the browser downloads + unpacks the WASM runtime,
the placeholder images, and the music track, then compiles the script. It's cached
after the first load. Click **Start** to play.

## Hosting for collaborators

Standard options for a Ren'Py web build:
- **itch.io** — upload `web-build/` as an HTML project, tick "SharedArrayBuffer support". Easiest; handles the COOP/COEP headers.
- **Any static host that lets you set headers** — the page needs
  `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Embedder-Policy: require-corp`.
  (GitHub Pages can't set these directly; the build's bundled service worker works around it on most browsers, but itch.io is the path of least resistance.)

## Note on automated testing

Automated click-through of the web build (or the desktop app) doesn't work in a
headless/background sandbox: when the window/tab isn't the OS-foreground surface, the
engine's event loop is throttled and injected input isn't processed. Verify dialogue/logic
statically instead — `python3 scripts/lint_dialogue.py` + `renpy.sh . lint` — and click
through a real, focused browser/desktop window for interactive confirmation.
