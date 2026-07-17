---
status: draft
tags: [assets]
---

# Asset List

**Finding from prototype rip:** the three web prototypes contain **zero bitmap assets** — everything was CSS/emoji, with pixel art *specified* (Retrodiffusion prompts in code) but never generated. So there was nothing to extract except palettes, prompts, and layouts (captured in [[Art Style Guide]] and [[Prototype Archaeology]]). Everything below must be generated.

Status legend: ⬜ needed · 🟨 placeholder generated (scripted PIL, in `game/images/`) · ✅ final

## Character sprites (per [[Art Style Guide]] §2)

| Character | Expressions | Status |
|-----------|-------------|--------|
| Maya | neutral, focused, tired, proud, alarmed | 🟨 (neutral placeholder ×5 tints) |
| Jordan | neutral, hyped, hurt, determined, exhausted | 🟨 |
| Alex | neutral, smirk, calculating, defensive, sincere | 🟨 |
| Vera | neutral, wry, stern, warm | 🟨 |
| Spectre | hooded-neutral, typing-glow, alert, almost-vulnerable | 🟨 |
| Atlas | neutral, generous, guarded, predatory-calm | 🟨 |

= 28 final sprite images (6 bases × expressions).

## Backgrounds (1920×1080)

| BG | Used in | Status |
|----|---------|--------|
| coworking space | Ch1 | 🟨 |
| discord server (stylized) | Ch1–5 | 🟨 |
| conference hall | Ch2, Ch5 | 🟨 |
| late-night apartment | Ch3, Ch5 | 🟨 |
| blockchain abstract (nodes, cyan/magenta) | TGE, Ch4 | 🟨 |
| rooftop (dawn) | Ch5 endings | 🟨 |
| wallet/signing UI close-up | Ch4a set piece | 🟨 |
| faction map / governance dashboard | Ch3.8 | 🟨 |

## UI / GUI

- Title screen logo + animated bg (cherry blossoms × token geometry — from daoromance) ⬜
- Textbox, namebox, choice buttons, frame (PC-98 skin over Ren'Py defaults) 🟨 (recolored defaults)
- Lesson Learned popup frame ⬜ · Codex screen ⬜ · Stats sidebar icons (Vibes/Treasury/Security/Morale/Burnout) 🟨 (text glyphs)
- Ending cards ×8 ⬜

## Audio (all ⬜, v1 ships silent or with CC0 chiptune)

- Music: title, daily-life loop, tension loop, attack stinger, elegiac ending, hopeful ending, "Late Night Multisig" (Jordan's 3 a.m. scenes — name mandatory, from daoromance)
- SFX: text blip, choice confirm, lesson popup chime, alert klaxon, coin, heartbeat (burnout)

## CG / special illustrations (v2 wishlist)

Launch night crowd · the signing-screen hex diff · faction map splash · per-ending card art
