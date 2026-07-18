#!/usr/bin/env python3
"""Catch the Ren'Py literal-percent crash across ALL dialogue branches.

Ren'Py's `say` path runs `what % tag_quoting_dict`, so a literal `%` in a
say string (e.g. "65% of ventures") is parsed as a format code and crashes
at runtime with a TypeError — something `renpy lint` does NOT catch. A
literal percent must be written `%%`.

This scans every say statement in game/*.rpy (so it covers every branch,
not just one playthrough) and flags any string that would fail the `%`
formatting. With --fix it rewrites the offending strings in place.

Usage:
  python3 scripts/lint_dialogue.py         # report (exit 1 if problems)
  python3 scripts/lint_dialogue.py --fix   # auto-escape and rewrite
"""
import glob
import os
import re
import sys

# Say-statement speaker tokens defined in game/script.rpy.
SPEAKERS = ["narrator", "pc", "mod", "maya", "jordan", "alex", "vera",
            "spectre", "atlas", "m", "j", "a", "v", "s", "w"]
SAY_RE = re.compile(
    r'^(\s*)(' + "|".join(SPEAKERS) + r')(\s+)'
    r'("(?:[^"\\]|\\.)*")'          # the (first) quoted string
    r'(.*)$'
)

GAME_DIR = os.path.join(os.path.dirname(__file__), "..", "game")


def formatting_fails(inner):
    """True if this string would raise when Ren'Py runs `s % tag_quoting_dict`."""
    try:
        inner % {}
        return False
    except (TypeError, ValueError, KeyError):
        return True


def escape(inner):
    """Double every % that isn't already part of a %% pair (idempotent)."""
    return re.sub(r'%%|%', lambda m: '%%', inner)


def main():
    fix = "--fix" in sys.argv
    problems = 0
    fixed = 0
    for path in sorted(glob.glob(os.path.join(GAME_DIR, "*.rpy"))):
        lines = open(path, encoding="utf-8").read().split("\n")
        changed = False
        for i, line in enumerate(lines):
            mobj = SAY_RE.match(line)
            if not mobj:
                continue
            literal = mobj.group(4)          # includes surrounding quotes
            inner = literal[1:-1]
            if not formatting_fails(inner):
                continue
            problems += 1
            rel = os.path.relpath(path, os.path.join(GAME_DIR, ".."))
            if fix:
                new_inner = escape(inner)
                lines[i] = (mobj.group(1) + mobj.group(2) + mobj.group(3) +
                            '"' + new_inner + '"' + mobj.group(5))
                changed = True
                fixed += 1
                print(f"FIXED  {rel}:{i+1}")
            else:
                print(f"CRASH  {rel}:{i+1}  {line.strip()[:80]}")
        if fix and changed:
            open(path, "w", encoding="utf-8").write("\n".join(lines))
    if fix:
        print(f"\n{fixed} string(s) escaped.")
        return 0
    if problems:
        print(f"\n{problems} say string(s) will crash at runtime. Run with --fix.")
        return 1
    print("All say statements are percent-safe.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
