---
status: draft
tags: [production]
---

# Ren'Py Mapping

How vault design maps onto `game/` (Ren'Py 8.5):

| Vault | Ren'Py |
|-------|--------|
| [[Game Systems]] stats & flags | `script.rpy` — `default` variables + `adjust()` helper |
| Character notes (`color:` frontmatter) | `script.rpy` — `Character()` defs with matching colors |
| [[Chapter 1 - Genesis Block]] … | `ch1_genesis.rpy` … `ch5_resolution.rpy` (one file per chapter; scene cards → labels, `# vault: 1.3` comments) |
| [[Endings Overview]] | `endings.rpy` — `label compute_ending` mirrors the trigger table order |
| `05 Lessons/*` | `lessons.rpy` — one `LESSONS["id"]` entry per note + `lesson` screen |
| dao25 glossary + new terms | `lessons.rpy` — `CODEX` dict + codex screen |
| [[Art Style Guide]] palette | `placeholders.rpy` + `gui.rpy` color overrides |
| [[Asset List]] placeholders | `game/images/` PNGs from `scripts/generate_placeholders.py` |

## Conventions

- Label naming: `ch{n}_{slug}` (e.g. `ch3_proposal17`). Scene-card ids in vault (`3.2`) appear as comments.
- Stat changes only via `adjust(vibes=+10, burnout=+5)` so clamping/cascade rules live in one place.
- Lesson popups: `call lesson("equal_split")` — id = lesson note's slug.
- Flags exactly as named in [[Game Systems]].
- Run/lint: `~/renpy-8.5.0-sdk/renpy.sh . lint` and `~/renpy-8.5.0-sdk/renpy.sh .` from repo root.
