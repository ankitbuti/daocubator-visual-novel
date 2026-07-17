---
status: draft
tags: [production]
---

# Sync Workflow

Three surfaces, one truth:

```
┌─────────────────────┐     export      ┌──────────────────┐
│  OBSIDIAN VAULT     │ ──────────────▶ │   GOOGLE DOC     │
│  vault/ (in git)    │                 │  (collab review) │
│  SOURCE OF TRUTH    │ ◀────────────── │                  │
└─────────┬───────────┘   fold back     └──────────────────┘
          │ implements
          ▼
┌─────────────────────┐
│  REN'PY GAME        │
│  game/*.rpy         │
└─────────────────────┘
```

## Rules

1. **The vault is canonical.** If the Doc and the vault disagree, the vault wins *after* the disagreement is resolved on purpose (i.e., someone folds the Doc comments back in).
2. **The Google Doc is the review surface** for daocubator collaborators who don't live in Obsidian/git. It mirrors the *Overview* layer (premise, themes, structure, characters, chapter summaries, endings, lessons index) — not every scene card.
3. **The Ren'Py scripts implement the vault.** Every `.rpy` chapter file references its vault note in a header comment; every Lesson popup id matches a note in `05 Lessons/`.

## Cadence (suggested)

- Collaborators comment/edit in the Google Doc anytime.
- On each design pass (weekly?): fold Doc feedback → vault notes (bump `status:` fields), then update `game/*.rpy` where affected, then re-export the Doc. Asking Claude to "sync the three surfaces" does exactly this loop.
- `scripts/export_overview.py` builds `build/overview.md` + `build/overview.html` from the vault — that HTML is what gets pushed to the Doc.

## Change tracking

- Vault lives in git — normal commits are the changelog.
- Each vault note's `status:` field: `idea → draft → review → locked`. The Doc export stamps a generation date + git hash so reviewers know what version they're commenting on.

## Adding new things (characters / branches / lessons)

1. Copy the relevant `_Template` note in the vault; fill it in; link it from [[Home]] and the chapter notes it touches.
2. Re-run the export → update the Doc.
3. Implement in Ren'Py (see [[Renpy Mapping]]).
This order matters: design in vault → review in Doc → implement in game.
