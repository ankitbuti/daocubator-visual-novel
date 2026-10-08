#!/usr/bin/env python3
"""Validate the glossary (game/glossary.rpy) against the script.

Checks:
  1. Every <id|...> link in an entry body points at a real entry.
  2. Every say line / menu choice survives the linker with balanced tags, and
     gloss_unlink() restores it exactly (menu translation lookups depend on it).
  3. Reachability: every entry is either mentioned in the story (dialogue,
     choices, lesson text — original OR plain) or reachable by following links
     from one that is. An unreachable entry can never be unlocked.

Also prints which terms are story-unlocked vs link-only, plus per-term hit counts.

Usage:
  python3 scripts/check_glossary.py            # summary (exit 1 on problems)
  python3 scripts/check_glossary.py --lines    # also print every linked line
"""
import ast
import glob
import os
import re
import sys
import textwrap

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
GAME = os.path.join(ROOT, "game")
STR = r'"(?:[^"\\]|\\.)*"'
SAY_RE = re.compile(r'^\s*(?:[A-Za-z_]\w*\s+)?(' + STR + r')(?:\s+(?:with|id)\b.*)?\s*$')
MENU_RE = re.compile(r'^\s*(' + STR + r')\s*(?:if\s+.*?)?:\s*$')
NEW_RE = re.compile(r'^\s*new\s+(' + STR + r')\s*$')


def load_glossary_block():
    """Exec the pure-python `init -10 python:` block of glossary.rpy."""
    src = open(os.path.join(GAME, "glossary.rpy"), encoding="utf-8").read().split("\n")
    start = next(i for i, l in enumerate(src) if l.startswith("init -10 python:"))
    body = []
    for line in src[start + 1:]:
        if line and not line[0].isspace():
            break
        body.append(line)
    ns = {}
    exec(textwrap.dedent("\n".join(body)), ns)
    return ns


def load_lessons():
    src = open(os.path.join(GAME, "lessons.rpy"), encoding="utf-8").read()
    m = re.search(r"define LESSONS = (\{.*?\n\})", src, re.S)
    return ast.literal_eval(m.group(1))


def story_strings():
    """(path:line, text) for say lines, menu choices, and translated strings."""
    out = []
    files = sorted(glob.glob(os.path.join(GAME, "*.rpy")))
    files += sorted(glob.glob(os.path.join(GAME, "tl", "plain", "*.rpy")))
    for path in files:
        base = os.path.basename(path)
        if base in ("screens.rpy", "gui.rpy", "options.rpy", "glossary.rpy", "common.rpy"):
            continue
        for n, line in enumerate(open(path, encoding="utf-8"), 1):
            s = line.rstrip("\n")
            if s.lstrip().startswith(("#", "old ", "$", "define", "default", "label", "call", "jump", "show", "scene", "hide", "play", "text ")):
                continue
            m = NEW_RE.match(s) or MENU_RE.match(s) or SAY_RE.match(s)
            if m:
                out.append(("%s:%d" % (os.path.relpath(path, ROOT), n), ast.literal_eval(m.group(1))))
    return out


def balanced(s):
    stack = []
    for tag in re.findall(r"\{(?!\{)([^{}]*)\}", s):
        name = tag.split("=", 1)[0]
        if name in ("w", "p", "nw", "fast", "done", "clear", "#"):
            continue
        if name.startswith("/"):
            if not stack or stack[-1] != name[1:]:
                return False
            stack.pop()
        else:
            stack.append(name)
    return not stack


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    show_lines = "--lines" in sys.argv
    g = load_glossary_block()
    GLOSS, GLOSSARY = g["GLOSS"], g["GLOSSARY"]
    problems = 0

    # 1. dangling links / duplicate ids / body sanity
    if len(GLOSS) != len(GLOSSARY):
        print("BUG    duplicate glossary ids")
        problems += 1
    for e in GLOSSARY:
        for gid, _ in g["gloss_body_links"](e["text"]):
            if gid not in GLOSS:
                print("BUG    %s links to missing entry <%s>" % (e["id"], gid))
                problems += 1
        if re.search(r"[\[\]{}]", e["text"]):
            print("BUG    %s body contains [ ] { } — breaks screen text" % e["id"])
            problems += 1

    # 2. linker over every displayed string
    hits = {e["id"]: 0 for e in GLOSSARY}
    texts = story_strings()
    for _, lesson in load_lessons().items():
        texts += [("lessons.rpy", lesson[1]), ("lessons.rpy", lesson[2])]
    for where, t in texts:
        linked = g["gloss_link_text"](t)
        if g["gloss_unlink"](linked) != t:
            print("BUG    unlink(link(text)) != text — menu translations would break  %s" % where)
            problems += 1
        if not balanced(linked):
            print("BUG    unbalanced tags after linking  %s\n       %s" % (where, linked))
            problems += 1
        for gid in g["gloss_find_ids"](t):
            hits[gid] += 1
        if show_lines and linked != t:
            print("%-28s %s" % (where, linked))

    # 3. reachability
    story = {gid for gid, n in hits.items() if n}
    seen, frontier = set(story), list(story)
    while frontier:
        cur = frontier.pop()
        for gid, _ in g["gloss_body_links"](GLOSS[cur]["text"]):
            if gid in GLOSS and gid not in seen:
                seen.add(gid)
                frontier.append(gid)
    unreachable = [e["id"] for e in GLOSSARY if e["id"] not in seen]
    for gid in unreachable:
        print("BUG    unreachable entry: %s (never in the story, no inbound link from a reachable entry)" % gid)
        problems += 1

    link_only = sorted(seen - story)
    print("\n%d entries · %d unlock in the story · %d link-only: %s"
          % (len(GLOSSARY), len(story), len(link_only), ", ".join(link_only) or "-"))
    print("Story hits: " + ", ".join("%s=%d" % kv for kv in sorted(hits.items(), key=lambda kv: -kv[1]) if kv[1]))
    if problems:
        print("\n%d problem(s)." % problems)
        return 1
    print("Glossary OK.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
