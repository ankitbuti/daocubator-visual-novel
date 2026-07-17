---
status: draft
tags: [lesson]
category: opsec
appears_in: "Ch4a.3"
---

# Ice Phishing

**Principle:** Your front end is part of your smart contract.
**Failure mode:** attacker steals infra credentials (e.g., a Cloudflare API key), injects a script into the dApp front end, harvests ERC-20 spend approvals from your *users*, drains their wallets. No contract bug required.
**Real case:** **Badger DAO (late 2021, $121M)** — Cloudflare API key → front-end injection → approval harvesting targeting high-balance wallets.
**Mitigation:** treat DNS, CDN, and API keys as security boundaries; monitor for anomalous approval prompts; when users report weirdness, take the site down *first* and investigate second.
**In the game:** Ch4a.3 — taking the front end down mid-mint costs Vibes and is correct; keeping it up drains your community's wallets, which is the one loss you can't refund.
