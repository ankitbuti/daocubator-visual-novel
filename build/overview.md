# DAOCUBATOR / "Get Rich Together" — Visual Novel Overview

*Generated from the Obsidian vault on 2026-07-17 (git ffbab1b). The vault is the source of truth — comment freely here; edits get folded back into the vault on each design pass. See vault/07 Production/Sync Workflow.md.*

## Premise

**DAOCUBATOR** is an educational visual novel (Ren'Py, PC-98 retro aesthetic) about why collective ventures fail — and how to build ones that don't.

You play a founder launching a **creative collective** in 2025: a record label, a streetwear brand, or an artist collective, structured as a DAO. Over 90 in-game days you recruit co-founders, design your token and equity, survive a governance crisis, get attacked, and decide what your collective becomes.

Every major decision is a real, documented failure mode drawn from the research in **Research Digest**: the equal-split trap, missing vesting, mono-token treasuries, governance capture, flash-loan attacks, wallet phishing, predatory record deals, chargeback spirals, founder burnout. When you hit one, the game names the real-world case it came from (Build Finance, Beanstalk, Badger DAO, Nexus Mutual, Coolest Cooler, KlimaDAO…) in a **Lesson Learned** popup.

### Audience

- DAOcubator community members and web3-curious creatives
- Startup founders who learn better from stories than from term-sheet blog posts
- Visual novel players who enjoy systems-driven branching (stat meters, multiple endings)

### Why a visual novel

The research explicitly recommends it: ~65% of venture failures are *people and structure* problems — co-founder conflict, incentive design, trust, exhaustion. Those are drama, not spreadsheets. A VN lets players *feel* the tempting shortcut before the delayed catastrophe lands.

### Design origin

Blend of three prototypes (see **Prototype Archaeology**):
- **dao25** → the governance-story spine, chapter structure, glossary
- **startupfounders98** → co-founder/equity/investor scenarios, Wisdom popups, chiptune audio direction
- **daoromance** → relationship meters that matter to governance outcomes, character-driven routes (kept PG-13; trust and loyalty, not dating-sim routes)

### Open questions

- Final title: the existing Ren'Py project is already named **"Get Rich Together"** (kept as the in-game title for now); "DAOCUBATOR" is used as the project codename in this vault. Pick one — or "Get Rich Together, a DAOCUBATOR game".
- Do we want the three venture types to diverge harder in later seasons (full routes per research), or stay flavor-level in v1?

---

## Themes & Pillars

Per the Vimi ("Visual Novel Design") method: settle **premise → theme → characters → outline** before drafting scenes. These are the promises every scene must keep.

### Theme (the argument)

> **Ventures don't die of bad luck. They die of deferred conversations.**

Every catastrophe in the game is preceded, chapters earlier, by a moment where the cheap-but-honest option was available and the player (like real founders) was tempted to skip it: the equity talk, the vesting doc, the treasury diversification, the security review, the "are you okay?" to a burning-out co-founder.

### Sub-themes

1. **Decentralization is a spectrum, not a virtue.** (Maya's thesis; Ch3–5)
2. **Community is an asset that compounds — and a liability that cascades.** (Jordan's arc)
3. **Money always wants something.** (Alex / Atlas; Ch2)
4. **Security is a habit, not a feature.** (Spectre; Ch4)
5. **The founder is a resource that can be drained to zero.** (Burnout stat; solopreneur research)
6. **We have been organizing collectively for a century — web3 didn't invent it.** (Vera's union-history counterpoint)

### Design pillars

- **P1 — Tempting shortcut vs. costly discipline.** Every major choice pair follows the research's Branch A/Branch B format. Shortcuts feel good *now*; the bill arrives 1–2 chapters later, visibly traceable to the choice.
- **P2 — Name the real failure.** Lesson Learned popups cite the actual case study. Education is explicit, never smuggled.
- **P3 — Relationships are governance.** Character trust meters aren't romance points — they are votes, security disclosures, and 3 a.m. warnings you only get if someone likes you.
- **P4 — Fail forward.** Bad endings are the curriculum. Ending screens summarize which decisions led here and which lesson notes to reread. Replay is expected.
- **P5 — Janky-charming PC-98.** 16-color palette, dithering, scanlines. Placeholder art embraces the constraint rather than apologizing for it.

### Tone

Warm satire. We love these people and this scene; we are honest about its absurdities. Discord drama is rendered with documentary accuracy. Never cynical about the *idea* of collective ownership — cynical only about shortcuts.

---

## Story Structure

Five chapters over 90 in-game days. The spine is linear (chapters always occur); the **branches live inside chapters** and in the accumulated state that determines Chapter 4's attack vector and the ending. This is the "braided rope" structure: local branches that re-merge, plus persistent stat/flag consequences — cheap to write, feels reactive.

```
flowchart TD
    START([New Game]) --> VT{Venture type?}
    VT -->|Record Label| C1
    VT -->|Streetwear Brand| C1
    VT -->|Artist Collective| C1
    C1[Ch1: Genesis Block<br/>Day 1-7<br/>co-founders · equity · vesting · legal wrapper] --> C2
    C2[Ch2: Token Generation Event<br/>Day 30<br/>tokenomics · treasury mix · whale money] --> C3
    C3[Ch3: Governance Wars<br/>Day 47<br/>Proposal #17 · apathy · factions · co-founder crisis] --> ATK{Attack vector<br/>chosen by state}
    ATK -->|Security low / opsec skipped| C4a[Ch4a: The Phish<br/>wallet spoof + front-end attack]
    ATK -->|Whale trusted / tokens concentrated| C4b[Ch4b: The 51%<br/>governance capture]
    ATK -->|Treasury 90% native token| C4c[Ch4c: The Spiral<br/>market crash + death spiral]
    C4a --> C5
    C4b --> C5
    C4c --> C5
    C5[Ch5: Resolution<br/>Day 90<br/>reform vote · acquisition offer] --> END{Endings ×8}
```

### Chapter summaries

| Ch | Title | Day | Dramatic question | Primary lessons |
|----|-------|-----|-------------------|-----------------|
| 1 | Chapter 1 - Genesis Block | 1–7 | Who do you build with, and on what terms? | The Equal Split Trap, Vesting and Dead Equity, The Partnership Trap |
| 2 | Chapter 2 - Token Generation Event | 30 | Whose money do you take? | Treasury Death Spiral, Predatory Recoupment, The Overfunding Paradox |
| 3 | Chapter 3 - Governance Wars | 47 | Who actually rules — and who's quietly leaving? | Voter Apathy and Delegation, Burnout and Identity Fusion |
| 4 | Chapter 4 - The Attack | 60 | Can the thing you built survive contact with an adversary? | Governance Capture, Flash Loans and Time-locks, Verify the Hex, Ice Phishing, Credential Hygiene |
| 5 | Chapter 5 - Resolution | 90 | What was all this *for*? | synthesis + Greenwashing Trap (optional beat) |

### Branch rules

- **Venture type** (Label / Streetwear / Collective) flavors scenes and swaps one lesson: Label → **Predatory Recoupment**, Streetwear → **Chargeback Death Spiral**, Collective → **The Overfunding Paradox**.
- **Chapter 4 vector** is *earned*, not chosen: the game picks the attack you are most vulnerable to, so consequences trace back to earlier shortcuts (Pillar P1).
- **Relationship gates:** Spectre warns you pre-attack only if `spectre >= 60`. Vera unlocks the compromise path in Ch3 if `vera >= 40`. Maya's Ch3 burnout crisis softens if `maya >= 50` *and* player Burnout < 60.
- **Endings** are computed from stats + flags — see **Endings Overview**.

### Pacing model (per Vimi outline method)

Each chapter note contains **scene cards**: `goal / conflict / choice / consequence / lesson`. A scene earns its place only if it changes a stat, a relationship, or a flag. Target: 8–12 scene cards per chapter, ~20–30 min per playthrough, 5 playthroughs to see everything.

---

## Game Systems

### Core stats (the research's five-variable model)

Straight from **Research Digest** — state vector evolves each choice; token price is coupled to Vibes × Security so failures cascade.

| Stat | Start | Range | Meaning | Prototype ancestor |
|------|-------|-------|---------|--------------------|
| Vibes | 50 | 0–100 | Public trust, brand, community energy | dao25 `community` + daoromance `trust` |
| Treasury | 100 | 0–200 | Capital in ETH-equivalents (stable + native mix tracked as flag) | all three |
| Security | 40 | 0–100 | Technical, legal, and opsec resilience | dao25 `security` |
| Morale | 60 | 0–100 | Internal team alignment | startupfounders98 `morale` |
| Burnout | 10 | 0–100 | *Player-character* exhaustion. High is bad. | startupfounders98 `stress` + solopreneur research |

#### Cascade rules
- End of each chapter: if `treasury_mix == "mono"` and Vibes dropped this chapter, Treasury takes an extra hit (token price ∝ Vibes × Security).
- **Burnout ≥ 60:** the UI starts lying — one choice per menu shows a *slightly wrong* consequence hint (the research's "decision error rate" mechanic, rendered diegetically).
- **Burnout ≥ 80:** forced rest scene; skip it and risk the **Burnout Crash** ending.

### Relationships (0–100, start varies)

Maya 40 · Jordan 50 · Alex 30 · Vera 20 · Spectre 10 · Atlas 25

Relationships are **governance capital** (Pillar P3): they gate warnings, unlock compromise branches, and convert to votes in Ch3/Ch5. They are *not* romance meters in v1 — see **Premise** open questions.

### Flags (booleans/enums that branch late-game content)

| Flag | Set in | Effect |
|------|--------|--------|
| `venture` (label/streetwear/collective) | Ch1 | Scene flavor + one swapped lesson |
| `equity` (equal/merit/vesting) | Ch1 | Ch3 co-founder crisis severity |
| `wrapper` (none/verein) | Ch1 | Ch5 regulator beat |
| `treasury_mix` (mono/barbell) | Ch2 | Cascade rule; Ch4c eligibility |
| `whale_in` (bool) | Ch2 | Ch4b eligibility; Atlas scenes |
| `opsec` (rushed/hardened) | Ch2–3 | Ch4a eligibility |
| `veto_used` (bool) | Ch3 | Founders Capture ending eligibility |
| `apathy` (0–3 counter) | Ch3 | Death by Democracy ending eligibility |

### Lesson Learned popups

Unified version of startupfounders98's "WISDOM UNLOCKED" + daoromance's "PROTOCOL INSIGHT": full-screen PC-98 modal after a consequence lands, with (1) the principle, (2) the real case study + real numbers, (3) link shown in the in-game Codex. Content lives in **Lessons Index** notes — **one note = one popup = one Ren'Py screen call**.

### Codex (in-game glossary)

dao25's 8-entry glossary (DAO, TGE, 51% Attack, Governance Token, Treasury, Vesting, Whale, Fork) + new: Vesting Cliff, 83(b), Multisig, Flash Loan, Legal Wrapper, Chargeback, Recoupment. Unlocks as terms appear in dialogue.

### Endings

Eight — see **Endings Overview** for triggers and order of evaluation.

---

## The Player — The Founder

Customizable name (default **Kai**). Silent-ish protagonist with attitude expressed through choices. Left a stable job to start a creative collective; carries the **Burnout and Identity Fusion** risk personally — the Burnout stat is *theirs*.

**Want:** build a collective that outlives them.
**Need:** to learn that discipline is care, and that they are not the venture.
**Flaw:** says yes to everything (each yes is a Burnout tick).

### Venture choice (Ch1)

-  **Record label** — unlocks **Predatory Recoupment** content (360 deals, cross-collateralization)
-  **Streetwear brand** — unlocks **Chargeback Death Spiral** + sourcing/tooling content
-  **Artist collective** — unlocks **The Overfunding Paradox** (viral drop overfunds 300%)

### Expressions needed

None in v1 (first-person POV, no self-sprite). Side-image "tired" variant when Burnout ≥ 60 would be a nice v2 touch.

---

## Maya — The Builder

**Role:** Technical co-founder. Smart contracts, tokenomics, infrastructure. (The only character who appears in all three prototypes — she's the load-bearing wall.)
**Voice:** "Ships code, not vibes." Dry, precise, kind underneath.
**Want:** governance that mathematically works.
**Need:** to admit she's running on fumes and let others carry weight.
**Flaw:** contempt for "community theater" isolates her; grinds toward burnout silently.
**Lessons she embodies:** **Vesting and Dead Equity**, **Burnout and Identity Fusion** (mirror of the player's own stat)

### Arc by chapter

- **Ch1:** Recruited first. Insists on talking equity + vesting *now* — the player's response sets the `equity` flag and her baseline trust.
- **Ch2:** Argues for barbell treasury; overruled if player takes whale money without conditions.
- **Ch3:** Her crisis (from startupfounders98's betrayal arc): a competitor offers 3× salary *while* she's burned out. High trust + low player Burnout → honest conversation, she stays. Low trust or `equity == equal` → resignation, and without vesting she leaves as **dead equity**.
- **Ch4:** If present, she's the one who spots the attack. Her absence makes every Ch4 vector worse (−15 Security).
- **Ch5:** Votes with the player only if trust ≥ 60.

### Relationship mechanics

- ≥ 50: warns player about treasury mix before Ch4c can trigger.
- < 30 after Ch3: leaves; `maya_gone` flag.

### Expressions needed

neutral, focused, tired, proud, alarmed

---

## Jordan — The True Believer

**Role:** Community lead. Discord shepherd, meme laureate, keeper of the mission. (dao25's Jordan fused with daoromance's Aiko — idealism + 2:47 a.m. energy.)
**Voice:** "The tech means nothing without the people." Exclamation points, then sudden 3 a.m. doubt.
**Want:** a movement people believe in.
**Need:** to learn that trust systems beat trust vibes — moderation, reputation, hard conversations.
**Flaw:** idealism blinds them to bad actors; takes every community fight personally.
**Lessons they embody:** **Voter Apathy and Delegation**, **Greenwashing Trap** (they champion the eco-partnership in Ch5's optional beat)

### Arc by chapter

- **Ch1:** Second recruit. Their intro scene teaches the troll-farm / quiet-quitter / vocal-non-contributor taxonomy.
- **Ch2:** Leads the community launch; furious if player sells allocation with veto rights attached ("#SellOut trending").
- **Ch3:** Ground zero of Proposal #17. Their handling of factions depends on whether the player invested in community systems in Ch1–2.
- **Ch4:** In 4b (51% attack), Jordan's community defense (pooled small-holder delegation) is the good path — only available if Vibes ≥ 50.
- **Ch5:** Their late-night "was it worth it?" call is the emotional climax before the final vote (lifted from daoromance's best scene).

### Relationship mechanics

- ≥ 60: community defense path in Ch4b succeeds automatically.
- < 30: Death by Democracy apathy counter +1.

### Expressions needed

neutral, hyped, hurt, determined, exhausted

---

## Alex — The Mercenary

**Role:** Treasury / finance. DeFi native, sharp suit, always checking prices. (dao25's Alex fused with daoromance's Drake — competence you can't fully trust.)
**Voice:** "…Or reckless. Depends on your vesting schedule."
**Want:** to prove profit and purpose can coexist.
**Need:** one relationship that isn't transactional.
**Flaw:** ethically flexible under pressure; unclear loyalties until Ch4.
**Lessons they embody:** **Treasury Death Spiral**, **Predatory Recoupment** (they *bring* the 360-deal term sheet, genuinely thinking it's good)

### Arc by chapter

- **Ch1:** Optional third recruit; critiques the player's token allocation draft.
- **Ch2:** The chapter is theirs: treasury mix decision, whale negotiation, and (label route) the recoupment term sheet.
- **Ch3:** Quietly courted by Atlas. Trust ≥ 50 → they disclose it; otherwise it surfaces in Ch4b as a gut-punch.
- **Ch4:** Loyalty resolves. High trust → they leak Atlas's accumulation early (+1 warning turn). Low trust → they've been advising Atlas ("it was just consulting").
- **Ch5:** If loyal, argues against the acquisition; if not, brokers it.

### Relationship mechanics

- ≥ 50 at end of Ch3: `alex_loyal` flag → early warning in Ch4b.
- < 30: they facilitate the whale (Ch4b harder).

### Expressions needed

neutral, smirk, calculating, defensive, sincere

---

## Vera — The Organizer

**Role:** Mentor. Retired union organizer turned angel investor. (dao25's Vera fused with startupfounders98's Eleanor the angel.)
**Voice:** "We were doing 'governance tokens' in 1936. We called them union cards."
**Want:** to see a new generation get collective action right.
**Need:** to accept the new generation will do it *differently*, on-chain and weird.
**Flaw:** patience reads as passivity; she won't save you unless you ask.
**Lessons she embodies:** **The Partnership Trap** (she's seen members held personally liable before), the historical counterpoint to every sub-theme.

### Arc by chapter

- **Ch1:** Met at a mixer; offers the legal-wrapper advice ("$15k for a Swiss Verein is cheap insurance"). Player can dismiss her as boomer noise — that's the **The Partnership Trap** setup.
- **Ch2:** Counteroffer to Atlas's money: smaller check ($20k for 10%, no board seat, monthly dinners) — startupfounders98's angel scene.
- **Ch3:** Trust ≥ 40 unlocks the compromise path on Proposal #17 (voluntary founder token burn) and the "win the battle, lose the war" veto warning.
- **Ch4:** In 4b, teaches pooled delegation ("solidarity is a governance primitive").
- **Ch5:** Delivers the thematic closing argument regardless of ending — tone varies.

### Relationship mechanics

- ≥ 40: Ch3 compromise path; regulator beat in Ch5 softened if `wrapper == none`.
- Taking her Ch2 deal: +20 Vera, `mentor` flag (Morale +1/chapter passive).

### Expressions needed

neutral, wry, stern, warm

---

## Spectre — The Ghost

**Role:** Anonymous security contributor. Hoodie-shadow PFP, camera never on, timezone unknown. (From daoromance, rebuilt as the opsec teacher.)
**Voice:** Encrypted messages, lowercase, no small talk. "your cloudflare key is in a public gist. fix it."
**Want:** to protect things without being known.
**Need:** one context where being known doesn't get them hurt.
**Flaw:** trust issues cut both ways — the team never knows if Spectre is guardian or inside threat, and low-trust players act on that suspicion wrongly.
**Lessons they embody:** **Verify the Hex**, **Ice Phishing**, **Credential Hygiene**

### Arc by chapter

- **Ch1:** First encrypted DM: they found a vulnerability in the token contract *before launch*. Accepting the camera-off call starts the trust track.
- **Ch2:** Pushes back on "ship fast" opsec culture; the `opsec` flag is largely set by whether the player funds their audit ask.
- **Ch3:** Quietly flags Atlas's wallet clusters accumulating. Trust < 40 → the player has no reason to believe them.
- **Ch4:** The star of 4a: the spoofed-transaction set piece (player must actually expand the transaction and compare hex against the whitelist — research's flagship mechanic). If trust ≥ 60 they intercept the front-end attack in time.
- **Ch5:** Optional: reveals a sliver of identity if trust ≥ 80. Never the full face. (Sprite stays hooded in all endings — hard rule.)

### Relationship mechanics

- ≥ 60: pre-attack warning scene before Ch4 (any vector).
- Funding their audit in Ch2: Security +15, Treasury −20, `opsec = hardened`.

### Expressions needed

neutral(hooded), typing-glow, alert, almost-vulnerable

---

## Atlas — The Whale

**Role:** Benefactor-antagonist. Enormous anonymous wealth, protective energy, patient accumulation. (daoromance's Atlas fused with dao25's THE WHALE — the game's ambiguous heavy.)
**Voice:** Generous in public, precise in private. "Consider it a governance tax."
**Want:** control, framed as stewardship. Atlas genuinely believes founders always blow it and adult supervision is a kindness.
**Need:** to be told no by someone who doesn't need their money.
**Flaw:** cannot distinguish helping from owning.
**Lessons they embody:** **Governance Capture**, **Flash Loans and Time-locks**

### Arc by chapter

- **Ch1:** Cameo — a huge early donation to the mint, unexplained. (Foreshadow: the tokens never move. They're waiting.)
- **Ch2:** The offer: 500 ETH. Player's terms (accept / conditions / decline) set `whale_in` and how Ch4b plays.
- **Ch3:** Courting Alex; buying quietly through fresh wallets (Spectre notices).
- **Ch4:** In 4b, executes the capture attempt — via market accumulation if `whale_in`, via flash loan if the player skipped time-locks. Not a cartoon villain: their proposal is professionally written and half the community *likes it*.
- **Ch5:** Depending on outcome: gracious loser, silent partner, or the new owner of everything you built.

### Design rule

Atlas must be *right about something* in every appearance. The tragedy of governance capture is that whales fund the ecosystem — the game is honest about that.

### Expressions needed

neutral, generous, guarded, predatory-calm

---

## Chapter 1 — Genesis Block

**Dramatic question:** Who do you build with, and on what terms?
**Lessons:** **The Equal Split Trap** · **Vesting and Dead Equity** · **The Partnership Trap**

### Scene cards

#### 1.1 Cold open — the resignation
- **Goal:** establish the player quit BigCorp with modest savings to start a creative collective.
- **Choice:** venture type →  label /  streetwear /  collective (`venture` flag).
- **Tone beat:** "NounsDAO. MakerDAO. The Aragon crisis. You've watched them all rise and fall. Now it's your turn."

#### 1.2 Meet **Maya**
- **Conflict:** she's interested but interrogates the player's decentralization philosophy.
- **Choice:** flatter her vs. engage the philosophy (rel±, sets her respect baseline).

#### 1.3 The equity conversation ⚖️ (KEYSTONE)
- Maya forces the talk founders defer. **Choice:** equal 50/50 ("we're friends!") / merit-based / **4-year vesting with 1-year cliff**.
- Equal: Morale +, sets `equity=equal` → Ch3 blows up harder. Vesting: Maya rel ++, Morale − (awkward now, saves you later).
- **Lesson popup:** **The Equal Split Trap** (73% of startups split in month one; 3× unhappier).

#### 1.4 Meet **Jordan**
- Discord is already growing. Troll-farm / quiet-quitter taxonomy comedy beat.
- **Choice:** community-first onboarding vs. "growth now, systems later" (Vibes vs. later apathy counter).

#### 1.5 Meet **Alex** (optional recruit)
- Critiques the token allocation draft. **Choice:** bring them in / keep treasury founder-run (sets whether Ch2 has an advocate or a blind spot).

#### 1.6 Vera at the mixer 
- **Vera** asks one question: "Who's liable when this goes wrong?" Offers the **legal wrapper** ($15k Swiss Verein).
- **Choice:** pay (Treasury −15, `wrapper=verein`) / "we're decentralized, we don't need it" (`wrapper=none`).
- **Lesson popup:** **The Partnership Trap** (Ooki DAO: served via chat box, $634,542 penalty).

#### 1.7 Spectre's DM 
- Encrypted message: vulnerability in the mint contract. **Choice:** camera-off call / text only / ignore (Spectre rel, Security ±10).

#### 1.8 Token design ceremony
- **Choice:** equal founder split / merit / 60% community treasury (Decentralization flavor; feeds Ch3 Proposal #17 rhetoric).
- Atlas cameo: an enormous anonymous mint donation. The tokens don't move. *(foreshadow)*

#### 1.9 Chapter close — Genesis
- Stats recap screen; day counter jumps to 30.

### Open questions
- Should venture type change the co-founder lineup, or only scene flavor? (v1: flavor only)

---

## Chapter 2 — Token Generation Event

**Dramatic question:** Whose money do you take, and what does it cost?
**Lessons:** **Treasury Death Spiral** · **Predatory Recoupment** / **Chargeback Death Spiral** / **The Overfunding Paradox** (by route) · **Credential Hygiene**

### Scene cards

#### 2.1 TGE eve
- Hype montage. Jordan's Discord at 10k members. "Believers and vultures line up alike."

#### 2.2 Treasury composition  (KEYSTONE)
- Maya vs. Alex debate. **Choice:** 90% native token ("aligned!") vs. **barbell: 30–50% stables** (Treasury −10 now from swap fees, `treasury_mix` flag).
- **Lesson popup:** **Treasury Death Spiral**.

#### 2.3 Atlas's offer  (KEYSTONE)
- 500 ETH. "No strings." Drake-whisper beat from Alex: *whales always want something.*
- **Choice:** accept (Treasury +50, `whale_in=true`, Vibes −10) / accept **with conditions** (advisory only, +25, Atlas rel −5) / decline (Vibes +10, Treasury −10, Atlas rel −15).

#### 2.4 Route beat (by `venture`)
- **Label:** Alex brings a distribution term sheet — 360 deal, cross-collateralized advances. Reject/negotiate/sign → **Predatory Recoupment**.
- **Streetwear:** the 8-piece collection vs. single-item pre-order niche → sourcing squeeze, **Chargeback Death Spiral** seeds.
- **Collective:** the drop goes viral, 300% overfunded → **The Overfunding Paradox** (Coolest Cooler beat: unit cost math on screen).

#### 2.5 Spectre's audit ask 
- "your launch is in 72h. i need 20 eth and admin access to audit. or don't. good luck."
- **Choice:** fund it (`opsec=hardened`, Security +15, Treasury −20) / ship fast (`opsec=rushed`, Burnout +10 — you review it yourself at 4 a.m.).

#### 2.6 The shared doc incident 
- A mod pastes the multisig seed phrase into the team Notion "just temporarily."
- **Choice:** blow up publicly (Security +10, Morale −10) / fix quietly (Security +5) / "we'll deal with it after launch" (Security −15).
- **Lesson popup:** **Credential Hygiene** (8ight Finance, $1.75M via Google Doc).

#### 2.7 Vera's counteroffer
- Small check, mentorship, monthly dinners. Take alongside/instead of Atlas → `mentor` flag.

#### 2.8 Launch night 
- Outcome text assembled from flags. Burnout +15 regardless — launches cost you either way.

#### 2.9 Chapter close — first price candle
- If `treasury_mix=mono`: dramatic irony line about how good the chart looks.

---

## Chapter 3 — Governance Wars

**Dramatic question:** Who actually rules — and who's quietly leaving?
**Lessons:** **Voter Apathy and Delegation** · **Burnout and Identity Fusion** · **Vesting and Dead Equity** (payoff)

### Scene cards

#### 3.1 Honeymoon's over
- Turnout on routine proposals: 6.3%. Jordan is answering 400 DMs a day. Apathy counter mechanics introduced.

#### 3.2 Proposal #17 ⚖️ (KEYSTONE)
- "Redistribute founder tokens to the community." 35% support and climbing. Half the arguments are *good*.
- **Choice:** rally votes democratically (Vibes −5, apathy −1) / **use founder veto** (`veto_used=true`, Vibes −15, Security +5 — **Founders Capture** eligibility) / compromise: voluntary 10% founder burn (needs Vera ≥ 40; Vibes +15).
- Vera's line on veto: "You'll win the battle. I've watched a hundred locals win that battle."

#### 3.3 The delegation debate
- Low turnout → delegation proposal. Top-decile-controls-76% stat dramatized as a pie chart on stream.
- **Choice:** open delegation / capped delegation / do nothing (apathy +1).
- **Lesson popup:** **Voter Apathy and Delegation**.

#### 3.4 Maya's 3× offer  (KEYSTONE — from startupfounders98)
- Competitor offers Maya triple salary. She's been quiet for two weeks (the player saw it, if they were looking).
- **Branches:** direct-but-kind → truth; demand answers → defensive; give space → resignation email + (if `equity=equal`, no vesting) **dead equity legal nightmare** (Treasury −20, Burnout +20).
- **Lesson popup:** **Vesting and Dead Equity** — this is where Ch1's keystone pays off, good or bad.

#### 3.5 Spectre's wallet clusters
- Fresh wallets accumulating in coordinated patterns. Believing them requires Spectre ≥ 40; otherwise the player has every reason to shrug. *(Sets up Ch4's "you were warned" trace.)*

#### 3.6 Burnout mirror 
- Forced quiet scene: the player character at 4 a.m., reading their own old launch-day post.
- **Choice:** take the weekend (Burnout −20, one small Treasury/Vibes cost) / push through ("the collective needs me") (Burnout +15).
- If Burnout ≥ 60 after this: consequence-hint corruption begins (see **Game Systems**).

#### 3.7 Alex's quiet dinner
- Atlas is courting Alex. Disclosure only if Alex ≥ 50. Otherwise a black screen: *"Somewhere across town, a dinner you weren't invited to."*

#### 3.8 Chapter close — factions
- Faction map screen: Decentralists / Pragmatists / Opportunists sized by accumulated Vibes/choices.

---

## Chapter 4 — The Attack

**Dramatic question:** Can the thing you built survive contact with an adversary?
**Structure rule:** the game chooses the vector you're *most vulnerable to* (priority: 4a if `opsec=rushed` → 4b if `whale_in` or Atlas rel high with no time-locks → 4c if `treasury_mix=mono` → else 4b at reduced strength). Consequences must trace visibly to earlier shortcuts.

If Spectre ≥ 60: a pre-attack warning scene fires first (one extra preparation choice, any vector).

### 4a — The Phish (opsec vector)
Lessons: **Verify the Hex** · **Ice Phishing**
- **4a.1** Maya's wallet behaves oddly; a routine treasury transaction is queued at 1 a.m.
- **4a.2 SET PIECE :** the signing screen. The player sees a plausible transaction summary. The *correct* move is to click **[EXPAND RAW DATA]** and compare the destination hex against the whitelist, mimicking the Nexus Mutual hack. Fatigued founders (Burnout ≥ 60) see the hexes rendered in a harder-to-read dithered font — diegetic error rate.
  - Sign without checking → Treasury −60, straight to 4.5 triage.
  - Verify and catch it → Security +15, attacker pivots to front end (4a.3).
- **4a.3** Ice phishing: injected approval-harvesting script on the site (Badger DAO). **Choice:** take the front end down now (Vibes −10, correct) / "keep it up, mint is live" (users drained, Vibes −30).

### 4b — The 51% (governance capture vector)
Lessons: **Governance Capture** · **Flash Loans and Time-locks**
- **4b.1** RED ALERT (Maya, if present): one entity controls 45% of governance tokens. Proposal queued: "Treasury Diversification Initiative" — professionally written; hidden drain logic (Beanstalk's Trojan pattern, with a charity distraction proposal).
- **4b.2 KEYSTONE choice:** emergency pause (Security +, Vibes −20, "decentralized until it's inconvenient", fork risk) / **community defense** — pooled small-holder delegation, needs Jordan ≥ 60 or Vibes ≥ 50 (Vera: "solidarity is a governance primitive") / negotiate with Atlas (Treasury −50, "governance tax", Atlas rel +).
- **4b.3** Resolution + `alex_loyal` reveal beat either way.

### 4c — The Spiral (treasury vector)
Lesson: **Treasury Death Spiral**
- **4c.1** Macro crash; native token −70% in a week. Payroll due. If mono-treasury: purchasing power gone exactly when needed.
- **4c.2** **Choice:** sell native into the crash (accelerates spiral, Vibes −20) / emergency raise from Atlas (whale enters late, Ch5 leverage) / cut everything and hibernate (Morale −25, survive small).

### 4.5 — Triage (all vectors converge)
- Casualty accounting: stats, who left, what the community is saying.
- **Lesson popup** for the vector's case study, with real numbers (Build Finance $470k / Beanstalk $181M / Badger $121M / Nexus Mutual $8M).
- Burnout +20. If that pushes ≥ 80 → forced rest scene or **Burnout Crash** risk.

### Open questions
- Should a flawless Ch1–3 run skip Ch4 entirely? Proposal: no — you get 4b at reduced strength and win it, because the *lesson is that attacks come regardless*.

---

## Chapter 5 — Resolution

**Dramatic question:** What was all this *for*?
**Lessons:** synthesis of all; optional **Greenwashing Trap** beat.

### Scene cards

#### 5.1 After the storm
- Day 90. State-of-the-DAO recap assembled from flags — every surviving character gets one line reflecting their arc.

#### 5.2 The regulator letter  (payoff of Ch1.6)
- If `wrapper=verein`: a formality, one wry Vera line. If `wrapper=none`: members are being served personally (Ooki-style, via the Discord webhook of all things). Treasury −20, Vibes −10.

#### 5.3 Optional beat — the green partnership 
- A carbon-credit protocol offers a lucrative "regenerative" partnership; Jordan champions it. The credits are 2011 Chinese hydro dams.
- **Choice:** sign fast / let Spectre & Maya diligence it (catches it; KlimaDAO cited) / decline on instinct.
- **Lesson popup:** **Greenwashing Trap**.

#### 5.4 The acquisition offer  (from startupfounders98)
- BigCorp (or a rival DAO) offers to absorb the collective. Real money for tired people.
- **Choice:** take it → **Acqui-hire** ending immediately / negotiate (better terms, still Acqui-hire, better epilogue) / refuse → continue.

#### 5.5 Jordan's 3 a.m. call ☎️ (emotional climax)
- "Was it worth it?" The player's honest answer here sets the epilogue's emotional key, not the stats.

#### 5.6 The reform vote ️ (KEYSTONE)
- Three constitutional paths: **Full decentralization** (remove founder privileges) / **Balanced governance** (time-locks + quorums + elected council) / **Benevolent leadership** (founders keep guardrails).
- Character votes are computed from relationship values — the player watches their 90 days of relationship choices tally on screen.

#### 5.7 Ending computation
- See **Endings Overview**. Ending screen lists: 3 pivotal choices this run, lessons unlocked, lessons *missed* (tease replays).

#### 5.8 Vera's closing argument
- Plays over every ending, re-keyed by outcome. Draft line: "The tools are new. The work is old. The work was always each other."

---

## Endings Overview

Evaluated in this order (first match wins), after Ch5.6 unless an early-exit ending fired. Bad endings are curriculum (Pillar P4): each ending screen names the 3 pivotal choices and links the missed lessons.

| # | Ending | Trigger | Tone |
|---|--------|---------|------|
| 1 |  Acqui-hire | Chose acquisition in 5.4 | Bittersweet. "Wealthy but incomplete. Not a failure. Not quite a win." |
| 2 |  Burnout Crash | Burnout ≥ 80 at any chapter close (and skipped the rest scene) | The venture survives you. Or doesn't. Solopreneur research payoff — identity ≠ venture. |
| 3 |  Hostile Takeover | Security < 20 or Treasury ≤ 10 | Atlas (or the phisher) owns it. "A cautionary tale studied in governance courses." |
| 4 | ️ Founder's Capture | `veto_used` and final vote = benevolent leadership | You kept control of everything except the point. "Web2 with extra steps." |
| 5 |  Death by Democracy | apathy ≥ 3 and Vibes < 40 | 47 proposals pending. Three months to approve a logo. A ghost town with perfect process. |
| 6 |  Community Split | Vibes < 30 | The fork. Three DAOs, one dream, zero momentum. Default-bad fallback. |
| 7 |  Sustainable Collective | Survived, no golden thresholds, Morale ≥ 40 | The quiet good ending. Small, profitable, humane. You sleep well. |
| 8 |  Collective Prosperity (golden) | Vibes ≥ 60 · Morale ≥ 60 · Security ≥ 50 · Treasury ≥ 80 · Burnout < 50 · final vote = balanced governance | The blueprint others copy. Every co-founder's epilogue is warm. Hard to reach on run one — by design. |

### Epilogue modifiers (stack on any ending)

- `maya_gone` → her epilogue line arrives as a LinkedIn notification.
- Spectre ≥ 80 → one extra scene: the sliver-of-identity reveal.
- `mentor` flag → Vera's closing argument is addressed to the player by name.
- Jordan's 5.5 answer re-keys the final music sting (hopeful vs. elegiac).

### Open questions
- Do we want a secret 9th ending for a flawless golden run + Spectre 80 ("The Handoff" — you leave, and it keeps working without you)? Strong thematic candidate for v2.

---

## Lessons Index

One note = one Lesson Learned popup = one entry in the in-game Codex. Union of both research versions (see **Research Digest** §6 — neither PDF is a superset).

### Startup / structure (Ch1–3)
- **The Equal Split Trap**
- **Vesting and Dead Equity** (includes the 83(b) time bomb)
- **The Partnership Trap**

### Treasury & money (Ch2, Ch4c)
- **Treasury Death Spiral**
- **Predatory Recoupment** *(label route)*
- **Chargeback Death Spiral** *(streetwear route)*
- **The Overfunding Paradox** *(collective route)*

### Governance (Ch3–4b)
- **Voter Apathy and Delegation**
- **Governance Capture**
- **Flash Loans and Time-locks**

### OpSec (Ch2, Ch4a)
- **Credential Hygiene**
- **Verify the Hex**
- **Ice Phishing**

### Human (Ch3, ending 2)
- **Burnout and Identity Fusion**

### Reputation (Ch5)
- **Greenwashing Trap**

---

## Asset List

**Finding from prototype rip:** the three web prototypes contain **zero bitmap assets** — everything was CSS/emoji, with pixel art *specified* (Retrodiffusion prompts in code) but never generated. So there was nothing to extract except palettes, prompts, and layouts (captured in **Art Style Guide** and **Prototype Archaeology**). Everything below must be generated.

Status legend: ⬜ needed ·  placeholder generated (scripted PIL, in `game/images/`) · ✅ final

### Character sprites (per **Art Style Guide** §2)

| Character | Expressions | Status |
|-----------|-------------|--------|
| Maya | neutral, focused, tired, proud, alarmed |  (neutral placeholder ×5 tints) |
| Jordan | neutral, hyped, hurt, determined, exhausted |  |
| Alex | neutral, smirk, calculating, defensive, sincere |  |
| Vera | neutral, wry, stern, warm |  |
| Spectre | hooded-neutral, typing-glow, alert, almost-vulnerable |  |
| Atlas | neutral, generous, guarded, predatory-calm |  |

= 28 final sprite images (6 bases × expressions).

### Backgrounds (1920×1080)

| BG | Used in | Status |
|----|---------|--------|
| coworking space | Ch1 |  |
| discord server (stylized) | Ch1–5 |  |
| conference hall | Ch2, Ch5 |  |
| late-night apartment | Ch3, Ch5 |  |
| blockchain abstract (nodes, cyan/magenta) | TGE, Ch4 |  |
| rooftop (dawn) | Ch5 endings |  |
| wallet/signing UI close-up | Ch4a set piece |  |
| faction map / governance dashboard | Ch3.8 |  |

### UI / GUI

- Title screen logo + animated bg (cherry blossoms × token geometry — from daoromance) ⬜
- Textbox, namebox, choice buttons, frame (PC-98 skin over Ren'Py defaults)  (recolored defaults)
- Lesson Learned popup frame ⬜ · Codex screen ⬜ · Stats sidebar icons (Vibes/Treasury/Security/Morale/Burnout)  (text glyphs)
- Ending cards ×8 ⬜

### Audio (all ⬜, v1 ships silent or with CC0 chiptune)

- Music: title, daily-life loop, tension loop, attack stinger, elegiac ending, hopeful ending, "Late Night Multisig" (Jordan's 3 a.m. scenes — name mandatory, from daoromance)
- SFX: text blip, choice confirm, lesson popup chime, alert klaxon, coin, heartbeat (burnout)

### CG / special illustrations (v2 wishlist)

Launch night crowd · the signing-screen hex diff · faction map splash · per-ending card art

---
