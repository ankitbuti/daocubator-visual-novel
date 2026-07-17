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

## Codex (in-game glossary)

dao25's 8-entry glossary (DAO, TGE, 51% Attack, Governance Token, Treasury, Vesting, Whale, Fork) + new: Vesting Cliff, 83(b), Multisig, Flash Loan, Legal Wrapper, Chargeback, Recoupment. Unlocks as terms appear in dialogue.

## Endings

Eight — see [[Endings Overview]] for triggers and order of evaluation.
