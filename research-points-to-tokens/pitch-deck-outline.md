# Points-to-Token Converter — Pitch Deck Outline

**A DAOcubator ecosystem initiative**
Investor pitch · 10-slide structure (Guy Kawasaki 10/20/30 rule: 10 slides, 20 minutes, 30-point font)
Draft v1 · sourced from the internal Feasibility, Differentiation & Risk Analysis + DAOcubator project overview

---

## How to use this outline

Each slide below gives: the **headline** (the one thing that slide argues), the **3–5 talking points** that support it (keep on-slide text to the minimum — Kawasaki's 30pt rule forces brevity, so most of this becomes speaker notes), the **one visual** that should anchor the slide, and the **source** for any figure so it survives investor diligence.

Two things need your input before we build the PPT — flagged inline as **[NEEDS INPUT]**: the financial model numbers (Slide 9) and the raise amount + use of funds (Slide 10).

---

## Slide 1 — Title

**Headline:** Turn sustained engagement into ownership.

*Alternates to pick from:*
- *"Community growth that compounds into ownership."*
- *"Reward the community that shows up — again and again."*
- *"Activate conviction. Starve the mercenaries."*

- Product name + one-line positioning: *"An always-on engine that channels token rewards to the community members who actually show up — a sustained growth-and-engagement program, not a one-off airdrop, that rewards conviction and starves mercenary farmers."*
- The core reframe (per Jordan): fair distribution is table stakes; the real value is **maximizing tokens directed to genuine community growth and engagement, sustained over time** — activating engaged members instead of attracting extractive farmers.
- DAOcubator ecosystem branding + tagline.
- Presenter name, contact, date.
- Sets the tone: this is community-growth infrastructure, not another airdrop tool.

**Visual:** Clean logo lockup over the bonding-curve motif (a downward-sloping "token-per-point" curve). Ties visually to the VN project's circuit-board / abstract-painting aesthetic if you want brand cohesion.

---

## Slide 2 — Problem / Opportunity

**Headline:** The airdrop is broken — and everyone launching a token knows it.

- **78–94% of airdrop recipient wallets dump the majority of their tokens within 90 days of TGE.** (Delphi Digital, 3.7M wallets tracked over 5 years.)
- Sell pressure *accelerates*: Day-90 dump rates run 4–11 points higher than Day-30 — this is a multi-month overhang, not a blip.
- Free giveaways attract mercenary capital, create false product-market-fit signals (inflated wallet counts), and end in community backlash ("reverse harvesting").
- Named failures investors will recognize: zkSync (Binance forced to fund a $2.4M compensation pool), Starknet (arbitrary snapshot rule alienated core contributors), Wormhole ($1.66 → $1.21 day one + phishing), Sei (rewards didn't cover gas).
- The opportunity: every pre-TGE project and mature protocol needs a distribution method that rewards conviction instead of extraction.

**Visual:** Big number — "78–94% dump within 90 days" — with the four case-study logos (UNI, ARB, JUP, PENGU) and their failure one-liners beneath.

**Source:** Delphi Digital via beincrypto; feasibility report §"Market Realities."

---

## Slide 3 — Value Proposition

**Headline:** Reward conviction, not speculation — and keep rewarding it.

- **Sustained, not a one-off.** Run recurring campaigns, participation windows, and milestone tranches over time — an ongoing engagement program that keeps activating your best members, not a single airdrop event that spikes and dies.
- **Directs tokens to the community that actually shows up.** The declining curve rewards early, engaged conviction and structurally starves mercenary farmers — maximizing the share of your token that lands with real, retained members.
- **For projects:** a non-dilutive, community-friendly growth engine. Defer token dilution until you have real PMF; configure and re-run campaigns from a Web UI, no smart-contract team required.
- **For users:** a fair, gamified, opt-in redemption — 100% deterministic rates, zero MEV risk. Early conviction earns a better rate; the rules are transparent and on-chain.
- **The psychological unlock:** points turn the sunk-cost fallacy into a retention feature. Accumulated points make members invested in the program's success; responsibility sits with the participant, shielding the project from backlash.
- One line: *"We turn engaged communities into aligned owners — and keep them engaged."*

**Visual:** Two-column before/after — "Legacy airdrop" (dump, backlash, mercenaries) vs. "Points-to-Token" (aligned holders, deterministic, opt-in).

---

## Slide 4 — Underlying Magic (the technology)

**Headline:** A closed, deterministic bonding curve — not a market.

- The bonding curve here is **not** open-market price discovery. It's a **closed point-redemption engine**: the project pre-deposits a fixed pool of reward tokens (native or stablecoins), users spend accumulated points to claim a share.
- **Declining conversion rate** rewards early commitment: token-per-point rate R(P꜀) drops as cumulative committed points rise (linear / exponential / sigmoid decay — configurable). Tokens released per commitment = the definite integral of the curve over that interval.
- **MEV-immune by construction:** because math runs against the contract's internal point-supply state — no external oracles, no swap pools — conversions are 100% immune to sandwich attacks, front-running, and flash-loan manipulation. Slippage is deterministic, based only on your size vs. the curve.
- **Single-chain execution** kills the cross-chain risk class: no bridge exploits, no message latency, no validator-key compromise. Deploy on any low-cost L2/L1 (Base, Arbitrum, Starknet, Solana) — fractions-of-a-cent gas — all managed from one dashboard.

**Visual:** The decay-curve diagram (token-per-point vs. cumulative points), with the integral shaded for a sample commitment. This is the "wow" slide — make the curve beautiful.

**Source:** Feasibility report §"Bonding Curve as an Equitable Community Tool" and §"Single-Chain Architecture."

---

## Slide 5 — Business Model

**Headline:** We take a cut of every pool — plus high-margin advisory.

- **Protocol fee: 0.5%–1%** deducted directly from the project's deposited token pool. Automatic, on-chain, scales with every campaign.
- **B2B integration & consulting fees:** high-margin advisory for custom curve modeling and campaign design (leverages DAOcubator's existing advisory muscle).
- Aligned incentive: we only earn when projects actually fund and run conversions — we win when they launch well.
- Customer segments willing to pay: pre-TGE Web3 projects, existing protocols optimizing post-launch, and Web2 enterprises (retail, travel, hospitality) tokenizing loyalty programs.

**Visual:** Simple revenue-flow diagram — Project deposits pool → contract runs conversion → 0.5–1% fee routed to protocol; a second lane for consulting.

---

## Slide 6 — Go-to-Market

**Headline:** A captive pipeline from day one — then out to Web2 loyalty.

- **Phase 1 — DAOcubator's own pipeline:** embed the converter as the default, standardized distribution component for every incubated project. Instant captive client base; no cold-start problem.
- **Phase 2 — Developer self-service:** embeddable SDKs and widgets drop directly into client dApp frontends; self-auditing templates for decentralized deployment.
- **Phase 3 — Web2 enterprise loyalty:** integrate with CRM/loyalty platforms (Salesforce, Shopify) to ingest existing retail points databases — the largest TAM, gated by trust (which DAOcubator's reputation supplies).
- **Built-in virality:** milestone-unlocked tranches (next reward tier opens only when e.g. 60% of the community participates) turn top members into onboarding evangelists.

**Visual:** Three-phase funnel widening left→right (incubated projects → open Web3 → Web2 enterprise), with the viral-loop tranche mechanic called out.

---

## Slide 7 — Competitive Landscape

**Headline:** Everyone else is a questing tool, a P2P market, or a yield toy. We're the distribution engine.

| Dimension | **Our Converter** | Galxe / Enable3 | Whales Market | Pendle |
|---|---|---|---|---|
| Core | Contract-secured reward distribution, pre-funded | Loyalty questing / tasks | P2P pre-market OTC | Yield tokenization (PT/YT) |
| Liquidity | Auto-release from deposited pool via curve | Manual/off-chain claims | P2P escrow at TGE | Custom AMM |
| MEV risk | Zero (closed curve) | n/a | Speculative | Market-exposed |
| Setup | Web UI, minutes, no dev team | Integrations | Trader-facing | Advanced |

- The wedge: we shift from speculative markets and questing templates to an **automated, contract-secured reward distribution engine** — single-chain, pre-funded, dashboard-configured.
- **Moat = DAOcubator:** has advised hundreds of launches and holds an unmatched database of failure modes, which get encoded directly into the Flexible Campaign Manager. Advisory expertise → automated product features. Plus institutional credibility Web2 brands require before trusting a smart contract with their loyalty program.

**Visual:** The 2×2 or the trimmed comparison table above (keep to 4 columns on-slide; full 6-competitor version — adds AideasTech, per the research — in the appendix).

---

## Slide 8 — Team

**Headline:** Art+tech community builders who've navigated hundreds of launches.

- **Jordan Gray — Co-Founder & CEO** — Co-Founder & Managing Director, CODAME ART+TECH (15+ yrs at the SF art/tech/community intersection); DAOcubator lead. → vision, distribution, ecosystem. [linkedin.com/in/jordanjamesgray](https://www.linkedin.com/in/jordanjamesgray/)
- **Ankit Buti — Co-Founder & CTO** — Founder, StartupEd.AI; AI SaaS product & customer-engineering leader. → product, dashboard, Points API/SDK, contract architecture. [linkedin.com/in/ankitbuti](https://www.linkedin.com/in/ankitbuti/)
- **Asya Abdrahman — Co-Founder & CMO** — Artist & curator; co-ops, community, and DAO social-impact work (Primordia/Kindao, NEAR social good). → community, brand, fair-launch ethos, Web2-culture bridge. [linkedin.com/in/asya-abdrahman](https://www.linkedin.com/in/asya-abdrahman-494010204/)
- Advisory strength: DAOcubator's network of launch operators and its failure-mode database.

**[OPTIONAL]** Consider naming a smart-contract/security lead or audit partner — the model leans heavily on audited contracts, so it strengthens this slide.

**Visual:** Three headshots, name, one-line role, one credibility proof-point each.

---

## Slide 9 — Financials & Key Metrics

**Headline:** A take-rate business on top of a growing wave of token launches.

- **Unit economics:** revenue per campaign = pool size × (0.5–1%) + advisory fee. Illustrative: a $2M pool at 0.75% = $15K protocol revenue per campaign, before consulting.
- **Key metrics to drive:** # campaigns launched, total pool value converted (the core volume metric), blended take rate, ARPU per project, Web2 enterprise logos, retention (holders still holding at Day 90 — our anti-dump proof).
- **3-year model:** ramp from DAOcubator's captive pipeline → open Web3 self-serve → first Web2 enterprise deals. [NEEDS INPUT — numbers below are placeholders]

| | Yr 1 | Yr 2 | Yr 3 |
|---|---|---|---|
| Campaigns | ▢ | ▢ | ▢ |
| Pool value converted | ▢ | ▢ | ▢ |
| Protocol revenue | ▢ | ▢ | ▢ |
| Consulting revenue | ▢ | ▢ | ▢ |

**[NEEDS INPUT]** Your pipeline size, expected average pool size, and campaign cadence. Give me those and I'll build a defensible bottoms-up model (# incubated projects × conversion rate × avg pool × take rate).

**Visual:** Revenue bar chart (protocol vs. consulting stacked) + the Day-90 retention metric highlighted as the KPI that proves the product works.

---

## Slide 10 — Status, Milestones & The Ask

**Headline:** Validated design, captive market, ready to build — here's the raise.

- **Where we are:** feasibility, differentiation, and risk analysis complete; architecture defined (single-chain, pre-funded, bonding-curve redemption); DAOcubator pipeline in place.
- **Working prototype built ("Token Orbit"):** a functional React/TypeScript front-end — project-creation wizard, campaign dashboard, airdrop/distribution manager, and a compliance module (KYC/AML, sanctions, MiCA/FCA) — proving the team ships UI fast. Next: wire it to the audited bonding-curve contracts + Points API to become the live converter. *(Show a screenshot or live demo here — strongest single credibility beat in the deck.)*
- **Risks we've already scoped (and the safeguards):**
  - *Sybil / bot farming* → mandate Proof of Humanity / Gitcoin Passport + dynamic per-tranche caps.
  - *Points API as attack surface* → EIP-712 cryptographic commitment verification on-chain, enterprise API security, rate-limiting.
  - *Treasury lockup / capital drag* → offer stablecoin-funded pools to remove volatility exposure.
  - *Regulatory (SEC-CFTC March 17 2026 interpretive release; "Category 1" security risk; 1099-DA reporting)* → strict utility-only marketing guidelines, automated 1099-DA tax generation, geofencing sensitive jurisdictions.
- **Milestones (next 12–18 mo):** audited v1 contracts (Spearbit/ChainSecurity) → Points API + SDK → Web UI dashboard → first N incubated-project campaigns → first Web2 enterprise pilot.
- **The Ask: [NEEDS INPUT — $ amount].** Use of funds: smart-contract audits (recurring, the biggest line), engineering (Points API, dashboard), Web2 enterprise BD, legal/compliance.

**Visual:** Timeline/roadmap bar with milestones; the ask + use-of-funds pie beside it. Close on the tagline from Slide 1.

**Source:** Feasibility report §"Critical Weak Points" and §"Strategic Recommendations."

---

## Appendix (hold in reserve, not part of the 10)

- Full 6-way competitive matrix (incl. AideasTech, all 6 dimensions).
- Full Business Model Canvas (9 blocks) from the research.
- Bonding-curve math detail: the three decay functions and the integral formula, for technical diligence.
- Works-cited list (37 sources) from the feasibility report.

---

*Next step: confirm the [NEEDS INPUT] items (team titles, financial inputs, raise amount), then I'll build the .pptx.*
