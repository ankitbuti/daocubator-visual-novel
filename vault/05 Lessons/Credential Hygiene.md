---
status: draft
tags: [lesson]
category: opsec
appears_in: "Ch2.6"
---

# Credential Hygiene

**Principle:** A seed phrase in a shared doc is already stolen — you just don't know by whom yet.
**Failure mode:** speed-over-hygiene culture: unencrypted private keys in Google Docs/Notion, credentials in group chats, everything hot.
**Real case:** **8ight Finance ($1.75M)** — private keys pasted into a shared Google Doc and sent over Facebook group chat. Also: hot-wallet over-reliance (keep 5–10% max hot; multi-sig cold storage above ~$10k).
**Mitigation:** hardware multi-sig, secrets manager, and a culture where flagging sloppy credential handling is praised, not "slowing us down."
**In the game:** Ch2.6 — a well-meaning mod pastes the multisig seed into Notion "temporarily." The *social* difficulty (calling it out without humiliating them) is the actual puzzle.
