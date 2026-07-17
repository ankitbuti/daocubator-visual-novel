---
status: draft
tags: [character, contributor]
color: "#00AAAA"
sprite: spectre
relationship_start: 10
---

# Spectre — The Ghost

**Role:** Anonymous security contributor. Hoodie-shadow PFP, camera never on, timezone unknown. (From daoromance, rebuilt as the opsec teacher.)
**Voice:** Encrypted messages, lowercase, no small talk. "your cloudflare key is in a public gist. fix it."
**Want:** to protect things without being known.
**Need:** one context where being known doesn't get them hurt.
**Flaw:** trust issues cut both ways — the team never knows if Spectre is guardian or inside threat, and low-trust players act on that suspicion wrongly.
**Lessons they embody:** [[Verify the Hex]], [[Ice Phishing]], [[Credential Hygiene]]

## Arc by chapter

- **Ch1:** First encrypted DM: they found a vulnerability in the token contract *before launch*. Accepting the camera-off call starts the trust track.
- **Ch2:** Pushes back on "ship fast" opsec culture; the `opsec` flag is largely set by whether the player funds their audit ask.
- **Ch3:** Quietly flags Atlas's wallet clusters accumulating. Trust < 40 → the player has no reason to believe them.
- **Ch4:** The star of 4a: the spoofed-transaction set piece (player must actually expand the transaction and compare hex against the whitelist — research's flagship mechanic). If trust ≥ 60 they intercept the front-end attack in time.
- **Ch5:** Optional: reveals a sliver of identity if trust ≥ 80. Never the full face. (Sprite stays hooded in all endings — hard rule.)

## Relationship mechanics

- ≥ 60: pre-attack warning scene before Ch4 (any vector).
- Funding their audit in Ch2: Security +15, Treasury −20, `opsec = hardened`.

## Expressions needed

neutral(hooded), typing-glow, alert, almost-vulnerable
