---
status: draft
tags: [lesson]
category: dao
appears_in: "Ch4b"
---

# Flash Loans and Time-locks

**Principle:** Any governance path that executes instantly will eventually execute an attack instantly.
**Failure mode:** attacker flash-borrows a voting supermajority for one block, passes and executes a malicious proposal via an emergency path that bypasses the time-lock; often a **Trojan proposal** (hidden drain logic) paired with a charitable-looking distraction.
**Real case:** **Beanstalk (2022, $181M)** — flash-borrowed supermajority + `emergencyCommit()` bypass; Trojan BIP18 + charity distraction BIP19.
**Mitigation:** non-zero delay between vote and execution (research scenario: 7-day review), audit proposal *code* not just prose, no emergency paths without multi-party control.
**In the game:** if the player skipped time-locks in Ch3's reform debate, Atlas doesn't even need to buy tokens — the flash-loan variant of 4b fires.
