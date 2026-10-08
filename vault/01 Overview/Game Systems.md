---
status: draft
tags: [overview, systems]
---

# Game Systems

## Core stats (the research's five-variable model)

Straight from [[Research Digest]] — state vector evolves each choice; token price is coupled to Vibes × Security so failures cascade.

| Stat | Start | Range | Meaning | Prototype ancestor |
|------|-------|-------|---------|--------------------|
| **Vibes** | 50 | 0–100 | Public trust, brand, community energy | dao25 `community` + daoromance `trust` |
| **Treasury** | 100 | 0–200 | Capital in ETH-equivalents (stable + native mix tracked as flag) | all three |
| **Security** | 40 | 0–100 | Technical, legal, and opsec resilience | dao25 `security` |
| **Morale** | 60 | 0–100 | Internal team alignment | startupfounders98 `morale` |
| **Burnout** | 10 | 0–100 | *Player-character* exhaustion. High is bad. | startupfounders98 `stress` + solopreneur research |

### Cascade rules
- End of each chapter: if `treasury_mix == "mono"` and Vibes dropped this chapter, Treasury takes an extra hit (token price ∝ Vibes × Security).
- **Burnout ≥ 60:** the UI starts lying — one choice per menu shows a *slightly wrong* consequence hint (the research's "decision error rate" mechanic, rendered diegetically).
- **Burnout ≥ 80:** forced rest scene; skip it and risk the [[Burnout Crash]] ending.

## Relationships (0–100, start varies)

Maya 40 · Jordan 50 · Alex 30 · Vera 20 · Spectre 10 · Atlas 25

Relationships are **governance capital** (Pillar P3): they gate warnings, unlock compromise branches, and convert to votes in Ch3/Ch5. They are *not* romance meters in v1 — see [[Premise]] open questions.

## Flags (booleans/enums that branch late-game content)

| Flag | Set in | Effect |
|------|--------|--------|
| `venture` (label/streetwear/collective) | Ch1 | Scene flavor + one swapped lesson |
| `equity` (equal/merit/vesting) | Ch1 | Ch3 co-founder crisis severity |
| `wrapper` (none/verein) | Ch1 | Ch5 regulator beat |
| `treasury_mix` (mono/barbell) | Ch2 | Cascade rule; Ch4c eligibility |
| `whale_in` (bool) | Ch2 | Ch4b eligibility; Atlas scenes |
| `opsec` (rushed/hardened) | Ch2–3 | Ch4a eligibility |
| `veto_used` (bool) | Ch3 | [[Founders Capture]] ending eligibility |
| `apathy` (0–3 counter) | Ch3 | [[Death by Democracy]] ending eligibility |

## Lesson Learned popups

Unified version of startupfounders98's "WISDOM UNLOCKED" + daoromance's "PROTOCOL INSIGHT": full-screen PC-98 modal after a consequence lands, with (1) the principle, (2) the real case study + real numbers, (3) link shown in the in-game Codex. Content lives in [[Lessons Index]] notes — **one note = one popup = one Ren'Py screen call**.

## Glossary (in-game, collectible)

*Playtest feedback: "unfamiliar terminology."* ~94 terms across five tabs: Business, Crypto & Tech, Money & DeFi, DAO & Governance, Game Stats. The data lives in `game/glossary.rpy`; dao25's original 8 entries are all included. Progress is **persistent**, so it carries across playthroughs, like endings.

- **Meet it in the story → unlock.** Glossary words in dialogue are auto-linked (yellow, underlined), and the first time a line containing one is *shown*, the term unlocks with a "◆ NEW TERM ◆" toast. Words in menu choices are underlined and unlock when the menu appears. Words in Lesson popups are linked too.
- **Click to read.** Clicking a yellow word opens the Glossary on that entry. You can also press **G**, use the quick menu, use the main/game menu, or click a stat in the HUD.
- **Explore links → unlock.** Entry text links to other entries. Links to undiscovered entries show as magenta **◇**, and following one unlocks it ("★ NEW DISCOVERY ★"). Some terms (TGE, Phishing, Greenwashing, Blockchain…) can *only* be found this way.
- **Gamification:**
  - Locked entries show as `V·····` (first letter + length).
  - The header shows a progress bar, per-tab counts, and a "◇ via links" counter.
  - A rank climbs with discoveries: Tourist → Lurker → Anon → Contributor → Core Contributor → Delegate → DAO Elder.
  - Entries you haven't opened yet are marked NEW.
- **Option:** Preferences → Glossary → *Link Terms* turns off dialogue links. Terms still unlock.
- `python3 scripts/check_glossary.py` checks that every link resolves and that every term is reachable from the story, either directly or through links.

## Plain Mode (experience picker)

*Playtest feedback: newcomers and ESL players bounced off the jargon-dense writing.* At **Start**, the player picks:

- **I'M NEW TO THIS → Plain mode:** short sentences, B1-level English, terms explained inline, and **TIP** lines before keystone choices that explain the options neutrally (never which one is "right").
- **I SPEAK FOUNDER → Original:** the current script, unchanged.

Same story, same choices, same stats, same endings. The player can switch any time under Preferences → Story Text. It's implemented as a Ren'Py language called `plain` (`game/tl/plain/`), so the story logic exists once. Writing rules: [[Plain Mode Style Guide]].

## Endings

Eight — see [[Endings Overview]] for triggers and order of evaluation.
