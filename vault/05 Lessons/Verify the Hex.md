---
status: draft
tags: [lesson]
category: opsec
appears_in: "Ch4a.2 set piece"
---

# Verify the Hex

**Principle:** The hardware wallet's ugly little screen is the only screen that isn't lying to you.
**Failure mode:** malware replaces/patches the wallet browser extension and spoofs the transaction *summary*; humans — especially exhausted ones — sign without verifying the raw destination on the device.
**Real case:** **Nexus Mutual / Hugh Karp (Dec 2020, $8M / 370,000 NXM)** — compromised MetaMask spoofed a transaction; the hardware wallet showed the true hex, unchecked.
**Mitigation:** verify destination address and contract data on the physical device against a known whitelist, every time, *especially* when tired.
**In the game:** the Ch4a.2 set piece — the player must actively click [EXPAND RAW DATA] and diff the hex. At Burnout ≥ 60 the hex renders in dithered hard-to-read type. This is the research's flagship mechanic.
