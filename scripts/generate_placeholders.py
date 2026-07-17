#!/usr/bin/env python3
"""Generate PC-98-flavored placeholder art for DAOCUBATOR.

Backgrounds and character sprites are scripted stand-ins that obey the
16-color palette in vault/06 Assets/Art Style Guide.md, so scenes read
correctly until real art replaces them (see vault/06 Assets/Asset List.md).

Usage: python3 scripts/generate_placeholders.py
Writes into game/images/ using Ren'Py auto-image naming
("bg coworking.png", "maya neutral.png", ...).
"""
import os
from PIL import Image, ImageDraw

ROOT = os.path.join(os.path.dirname(__file__), "..", "game", "images")

# PC-98 palette (Art Style Guide)
P = {
    "black": (0, 0, 0), "deepblue": (0, 0, 128), "blue": (0, 0, 170),
    "cyan": (0, 170, 170), "bcyan": (85, 255, 255), "magenta": (170, 0, 170),
    "bmagenta": (255, 85, 255), "pink": (255, 85, 170), "orange": (255, 170, 85),
    "brown": (170, 85, 0), "yellow": (255, 255, 85), "red": (255, 85, 85),
    "green": (85, 255, 85), "gray": (170, 170, 170), "dgray": (85, 85, 85),
    "white": (255, 255, 255),
}

BAYER4 = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]]

W, H = 1920, 1080
CELL = 8  # chunky pixel size


def dither_gradient(draw, w, h, top, bottom, cell=CELL):
    """Ordered-dither vertical gradient between two palette colors."""
    rows, cols = h // cell, w // cell
    for r in range(rows):
        t = r / max(rows - 1, 1)
        for c in range(cols):
            thresh = (BAYER4[r % 4][c % 4] + 0.5) / 16.0
            color = bottom if t > 1 - thresh else top
            draw.rectangle([c * cell, r * cell, (c + 1) * cell - 1, (r + 1) * cell - 1], fill=color)


def scanlines(img, alpha=28):
    overlay = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(overlay)
    for y in range(0, img.size[1], 4):
        d.line([(0, y), (img.size[0], y)], fill=(0, 0, 0, alpha))
    return Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")


def label(draw, w, text, color=P["white"]):
    """Big blocky caption bar so placeholders self-identify on screen."""
    draw.rectangle([0, 24, w, 84], fill=P["black"])
    draw.rectangle([0, 24, w, 28], fill=color)
    draw.rectangle([0, 80, w, 84], fill=color)
    draw.text((32, 40), "PLACEHOLDER BG :: " + text.upper(), fill=color)


def rect(d, x0, y0, x1, y1, fill, outline=None):
    d.rectangle([x0, y0, x1, y1], fill=fill, outline=outline, width=4 if outline else 0)


def bg_coworking(d):
    dither_gradient(d, W, H, P["deepblue"], P["black"])
    rect(d, 0, 720, W, H, P["dgray"])                      # floor
    for x in range(120, W, 440):                            # desks + monitors
        rect(d, x, 600, x + 320, 720, P["brown"])
        rect(d, x + 60, 480, x + 260, 600, P["black"], P["cyan"])
        rect(d, x + 80, 500, x + 240, 580, P["cyan"])
    rect(d, 1500, 120, 1840, 420, P["blue"], P["bcyan"])    # window
    label(d, W, "coworking space", P["orange"])


def bg_discord(d):
    dither_gradient(d, W, H, P["black"], P["deepblue"])
    rect(d, 0, 0, 280, H, P["dgray"])                       # server rail
    for i, y in enumerate(range(140, H - 80, 140)):
        d.ellipse([80, y, 200, y + 120], fill=list(P.values())[3 + (i % 8)])
    for y in range(200, H - 100, 160):                      # chat bubbles
        rect(d, 380, y, 380 + 900, y + 90, P["deepblue"], P["cyan"])
    label(d, W, "discord, late night", P["bmagenta"])


def bg_conference(d):
    dither_gradient(d, W, H, P["blue"], P["deepblue"])
    rect(d, 200, 160, W - 200, 560, P["black"], P["bcyan"])  # big screen
    rect(d, 260, 220, W - 260, 500, P["cyan"])
    rect(d, 0, 820, W, H, P["dgray"])                        # stage floor
    for x in range(260, W - 200, 300):                       # audience heads
        d.ellipse([x, 900, x + 120, 1020], fill=P["black"])
    label(d, W, "conference hall", P["bcyan"])


def bg_apartment(d):
    dither_gradient(d, W, H, P["black"], P["magenta"])
    rect(d, 1280, 100, 1860, 640, P["deepblue"], P["magenta"])  # city window
    for x in range(1320, 1820, 120):
        for y in range(160, 600, 90):
            if (x + y) % 3:
                rect(d, x, y, x + 40, y + 40, P["yellow"])
    rect(d, 120, 700, 900, 900, P["brown"])                  # couch
    rect(d, 300, 560, 720, 700, P["black"], P["bcyan"])      # laptop glow
    rect(d, 330, 580, 690, 680, P["bcyan"])
    label(d, W, "apartment, 3 a.m.", P["pink"])


def bg_blockchain(d):
    dither_gradient(d, W, H, P["black"], P["deepblue"])
    import math
    nodes = [(int(W / 2 + math.cos(i / 12 * 6.283) * 620), int(H / 2 + math.sin(i / 12 * 6.283) * 380)) for i in range(12)]
    for i, (x, y) in enumerate(nodes):
        for x2, y2 in nodes[i + 1::3]:
            d.line([x, y, x2, y2], fill=P["cyan"], width=4)
    for i, (x, y) in enumerate(nodes):
        c = P["bmagenta"] if i % 2 else P["bcyan"]
        rect(d, x - 44, y - 44, x + 44, y + 44, P["black"], c)
        rect(d, x - 24, y - 24, x + 24, y + 24, c)
    label(d, W, "the chain (abstract)", P["bcyan"])


def bg_rooftop(d):
    dither_gradient(d, W, H, P["magenta"], P["orange"])      # dawn sky
    d.ellipse([W // 2 - 140, 240, W // 2 + 140, 520], fill=P["yellow"])
    for x, hgt in [(0, 380), (300, 300), (620, 460), (980, 340), (1350, 420), (1650, 300)]:
        rect(d, x, H - hgt, x + 260, H, P["black"])
    rect(d, 0, H - 160, W, H, P["dgray"])                    # rooftop deck
    label(d, W, "rooftop, dawn", P["yellow"])


def bg_signing(d):
    dither_gradient(d, W, H, P["black"], P["black"])
    rect(d, 360, 120, W - 360, H - 120, P["deepblue"], P["gray"])   # wallet modal
    rect(d, 400, 180, W - 400, 300, P["black"], P["cyan"])          # summary row
    rect(d, 400, 340, W - 400, 720, P["black"], P["dgray"])         # raw data area
    for y in range(380, 700, 60):
        rect(d, 440, y, 440 + 990, y + 28, P["dgray"])
    rect(d, 400, 780, 880, 900, P["green"])                          # confirm
    rect(d, 960, 780, 1440, 900, P["red"])                           # reject
    label(d, W, "signing screen", P["green"])


def bg_factionmap(d):
    dither_gradient(d, W, H, P["deepblue"], P["black"])
    for cx, cy, rr, c in [(560, 480, 300, P["bcyan"]), (1200, 420, 260, P["orange"]), (930, 800, 220, P["bmagenta"])]:
        d.ellipse([cx - rr, cy - rr, cx + rr, cy + rr], outline=c, width=8)
        d.ellipse([cx - 30, cy - 30, cx + 30, cy + 30], fill=c)
    label(d, W, "faction map", P["gray"])


BACKGROUNDS = {
    "coworking": bg_coworking, "discord": bg_discord, "conference": bg_conference,
    "apartment": bg_apartment, "blockchain": bg_blockchain, "rooftop": bg_rooftop,
    "signing": bg_signing, "factionmap": bg_factionmap,
}

# character: (accent color, expressions)
CHARACTERS = {
    "maya": ("bcyan", ["neutral", "focused", "tired", "proud", "alarmed"]),
    "jordan": ("bmagenta", ["neutral", "hyped", "hurt", "determined", "exhausted"]),
    "alex": ("orange", ["neutral", "smirk", "calculating", "defensive", "sincere"]),
    "vera": ("magenta", ["neutral", "wry", "stern", "warm"]),
    "spectre": ("cyan", ["neutral", "typing", "alert", "vulnerable"]),
    "atlas": ("yellow", ["neutral", "generous", "guarded", "predatory"]),
}

# simple mouth/brow variants so expressions are visually distinct
EXPR_FACE = {
    "neutral": ("flat", "flat"), "focused": ("down", "flat"), "tired": ("down", "down"),
    "proud": ("up", "up"), "alarmed": ("up", "o"), "hyped": ("up", "up"),
    "hurt": ("down", "down"), "determined": ("down", "up"), "exhausted": ("down", "down"),
    "smirk": ("flat", "smirk"), "calculating": ("down", "flat"), "defensive": ("up", "down"),
    "sincere": ("flat", "up"), "wry": ("flat", "smirk"), "stern": ("down", "flat"),
    "warm": ("up", "up"), "typing": ("down", "flat"), "alert": ("up", "o"),
    "vulnerable": ("up", "down"), "generous": ("up", "up"), "guarded": ("down", "flat"),
    "predatory": ("down", "smirk"),
}


def sprite(name, accent, expr):
    w, h = 560, 880
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    body = P[accent]
    dark = tuple(max(0, v - 110) for v in body)
    hooded = name == "spectre"
    # torso
    d.polygon([(120, h), (w - 120, h), (w - 90, 520), (280, 480), (150, 520)], fill=dark, outline=body)
    # head
    if hooded:
        d.polygon([(180, 460), (w - 180, 460), (w - 220, 180), (280, 140), (220, 180)], fill=dark, outline=body)
        d.ellipse([230, 210, w - 230, 440], fill=P["black"], outline=body, width=6)
    else:
        d.ellipse([180, 130, w - 180, 460], fill=body, outline=dark, width=8)
    fy = 300
    brow, mouth = EXPR_FACE.get(expr, ("flat", "flat"))
    eye = P["bcyan"] if hooded else P["black"]
    mx = w // 2
    eye_xs = (mx - 60, mx + 10) if hooded else (mx - 80, mx + 25)
    for ex in eye_xs:
        dy = {"up": -14, "down": 14}.get(brow, 0)
        d.line([ex, fy - 40 + dy, ex + 60, fy - 40 - dy], fill=eye, width=10)
        d.rectangle([ex + 10, fy, ex + 50, fy + 34], fill=eye)
    if mouth == "up":
        d.arc([mx - 60, fy + 60, mx + 60, fy + 140], 0, 180, fill=eye, width=10)
    elif mouth == "down":
        d.arc([mx - 60, fy + 100, mx + 60, fy + 180], 180, 360, fill=eye, width=10)
    elif mouth == "o":
        d.ellipse([mx - 30, fy + 90, mx + 30, fy + 150], outline=eye, width=10)
    elif mouth == "smirk":
        d.line([mx - 50, fy + 120, mx + 50, fy + 100], fill=eye, width=10)
    else:
        d.line([mx - 50, fy + 110, mx + 50, fy + 110], fill=eye, width=10)
    # nameplate
    d.rectangle([60, h - 130, w - 60, h - 40], fill=P["black"], outline=body, width=4)
    d.text((90, h - 112), f"{name.upper()} [{expr}]", fill=body)
    d.text((90, h - 78), "placeholder sprite", fill=P["gray"])
    return img


def main():
    os.makedirs(ROOT, exist_ok=True)
    for bgname, fn in BACKGROUNDS.items():
        img = Image.new("RGB", (W, H), P["black"])
        fn(ImageDraw.Draw(img))
        scanlines(img).save(os.path.join(ROOT, f"bg {bgname}.png"))
        print("bg", bgname)
    for cname, (accent, exprs) in CHARACTERS.items():
        for expr in exprs:
            sprite(cname, accent, expr).save(os.path.join(ROOT, f"{cname} {expr}.png"))
        print("sprite", cname, len(exprs), "expressions")


if __name__ == "__main__":
    main()
