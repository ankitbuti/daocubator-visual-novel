---
status: draft
tags: [chapter]
day: 60
---

# Chapter 4 — The Attack

**Dramatic question:** Can the thing you built survive contact with an adversary?
**Structure rule:** the game chooses the vector you're *most vulnerable to* (priority: 4a if `opsec=rushed` → 4b if `whale_in` or Atlas rel high with no time-locks → 4c if `treasury_mix=mono` → else 4b at reduced strength). Consequences must trace visibly to earlier shortcuts.

If Spectre ≥ 60: a pre-attack warning scene fires first (one extra preparation choice, any vector).

## 4a — The Phish (opsec vector)
Lessons: [[Verify the Hex]] · [[Ice Phishing]]
- **4a.1** Maya's wallet behaves oddly; a routine treasury transaction is queued at 1 a.m.
- **4a.2 SET PIECE 🔍:** the signing screen. The player sees a plausible transaction summary. The *correct* move is to click **[EXPAND RAW DATA]** and compare the destination hex against the whitelist, mimicking the Nexus Mutual hack. Fatigued founders (Burnout ≥ 60) see the hexes rendered in a harder-to-read dithered font — diegetic error rate.
  - Sign without checking → Treasury −60, straight to 4.5 triage.
  - Verify and catch it → Security +15, attacker pivots to front end (4a.3).
- **4a.3** Ice phishing: injected approval-harvesting script on the site (Badger DAO). **Choice:** take the front end down now (Vibes −10, correct) / "keep it up, mint is live" (users drained, Vibes −30).

## 4b — The 51% (governance capture vector)
Lessons: [[Governance Capture]] · [[Flash Loans and Time-locks]]
- **4b.1** RED ALERT (Maya, if present): one entity controls 45% of governance tokens. Proposal queued: "Treasury Diversification Initiative" — professionally written; hidden drain logic (Beanstalk's Trojan pattern, with a charity distraction proposal).
- **4b.2 KEYSTONE choice:** emergency pause (Security +, Vibes −20, "decentralized until it's inconvenient", fork risk) / **community defense** — pooled small-holder delegation, needs Jordan ≥ 60 or Vibes ≥ 50 (Vera: "solidarity is a governance primitive") / negotiate with Atlas (Treasury −50, "governance tax", Atlas rel +).
- **4b.3** Resolution + `alex_loyal` reveal beat either way.

## 4c — The Spiral (treasury vector)
Lesson: [[Treasury Death Spiral]]
- **4c.1** Macro crash; native token −70% in a week. Payroll due. If mono-treasury: purchasing power gone exactly when needed.
- **4c.2** **Choice:** sell native into the crash (accelerates spiral, Vibes −20) / emergency raise from Atlas (whale enters late, Ch5 leverage) / cut everything and hibernate (Morale −25, survive small).

## 4.5 — Triage (all vectors converge)
- Casualty accounting: stats, who left, what the community is saying.
- **Lesson popup** for the vector's case study, with real numbers (Build Finance $470k / Beanstalk $181M / Badger $121M / Nexus Mutual $8M).
- Burnout +20. If that pushes ≥ 80 → forced rest scene or [[Burnout Crash]] risk.

## Open questions
- Should a flawless Ch1–3 run skip Ch4 entirely? Proposal: no — you get 4b at reduced strength and win it, because the *lesson is that attacks come regardless*.
