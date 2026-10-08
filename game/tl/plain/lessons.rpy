# Plain-mode Lesson popups — vault: 07 Production/Plain Mode Style Guide.md
translate plain strings:

    # equal_split — THE EQUAL SPLIT TRAP
    old "Equal splits are chosen to avoid a conversation, not to be fair."
    new "People often choose an equal split to avoid a hard talk, not because it is fair."

    old "73% of startups split equity within the first month of founding. Teams that default to an equal split are ~3x more likely to be unhappy with it later. (Wasserman, 'The Founder's Dilemmas')"
    new "73 percent of startups split equity in the first month. Equity means who owns how much of the company. Teams that choose an equal split are about 3 times more likely to be unhappy with it later. (Source: Wasserman, 'The Founder's Dilemmas')"

    # vesting — VESTING & DEAD EQUITY
    old "Always vesting. Always a cliff. Always a lawyer on the founder agreement."
    new "Always use vesting. Always have a cliff. Always get a lawyer for the founder agreement."

    old "A co-founder who leaves in month 9 without vesting keeps everything — 'dead equity' that kills investor interest or costs a treasury-sized buyout. Standard fix: 4-year vesting, 1-year cliff. Bonus trap: miss the 30-day IRS 83(b) window and get taxed on paper gains forever."
    new "Vesting means you earn your shares over time. Without it, a co-founder who leaves in month 9 keeps everything. That is 'dead equity': it scares away investors, or costs a huge sum to buy back. The standard fix is 4-year vesting with a 1-year cliff: leave before one year and you get nothing. Extra trap: miss the 30-day deadline for the US IRS 83(b) form, and you keep paying tax on gains that exist only on paper."

    # partnership — THE PARTNERSHIP TRAP
    old "If your DAO has no legal wrapper, YOU are the legal wrapper."
    new "If your DAO has no legal wrapper, YOU are the legal wrapper. You are personally responsible."

    old "CFTC v. Ooki DAO: an unincorporated DAO was ruled a general partnership — members were served through the website's help chat box. Default judgment: $634,542 penalty. Sarcuni v. bZx reached the same theory. A ~$15k legal wrapper is cheap insurance."
    new "In CFTC v. Ooki DAO, a court said a DAO with no legal company form was a general partnership. That means every member can be held personally responsible. Members were served legal papers through the website's help chat box. The DAO did not defend itself, so the court ruled against it: a $634,542 penalty. The case Sarcuni v. bZx used the same idea. A legal wrapper costs about $15k. That is cheap insurance."

    # death_spiral — TREASURY DEATH SPIRAL
    old "A treasury that's 90% your own token is a bet that you'll never have a bad month."
    new "If 90 percent of your treasury is your own token, you are betting you will never have a bad month."

    old "When trouble hits, the native token crashes exactly when cash is needed; selling to raise cash crashes it further. Research fix: the barbell — keep 30–50% in uncorrelated stables and pay the boring swap fees."
    new "When trouble comes, your native token crashes just when you need cash. Selling it to get cash makes the price fall even more. The fix from research is the barbell: keep 30–50 percent in stables (stablecoins) that don't move with your token. Yes, this means paying boring swap fees."

    # recoupment — PREDATORY RECOUPMENT
    old "An advance is a loan you repay at 10–20 cents on the dollar."
    new "An advance is a loan. Only 10–20 cents of every dollar you earn goes to paying it back."

    old "360 deals take cuts of touring and merch the label didn't build. Cross-collateralization ties Album A's debt to Album B's profits — a permanent debt trap dressed as support."
    new "A 360 deal lets the label take a cut of your touring and merch, even though the label didn't build them. Cross-collateralization links Album A's debt to Album B's profits. So the debt from one album eats the money from the next one. It looks like support, but it is a debt trap that never ends."

    # chargeback — CHARGEBACK DEATH SPIRAL
    old "Your payment processor is a partner with a 1% tolerance for your mistakes."
    new "Your payment processor is a partner that accepts only about 1 percent of problem orders."

    old "Past roughly a 1% chargeback rate, Stripe/PayPal freeze or terminate the account — locking the WHOLE treasury, not just disputed orders. Proactive refunds beat fighting disputes."
    new "A chargeback is when a buyer asks their bank to take the money back. Above about a 1 percent chargeback rate, Stripe or PayPal can freeze or close your account. That locks the WHOLE treasury, not just the disputed orders. Giving refunds early works better than fighting each dispute."

    # overfunding — THE OVERFUNDING PARADOX
    old "Overfunding isn't free money — it's unplanned scale on a fixed-price promise."
    new "Overfunding is not free money. It is growth you didn't plan for, on a promise with a fixed price."

    old "Coolest Cooler (2014): $50k goal, $13.2M raised, 62,000 backers at $185 — below true at-scale unit cost. Sold at retail for $499 before fulfilling backers. Bankruptcy; 20,000+ backers never got one."
    new "Coolest Cooler (2014) asked for $50k and raised $13.2M. 62,000 backers paid $185 each. That was less than the real unit cost: the cost to make one cooler at that size. The company sold coolers in stores for $499 before backers got theirs. It went bankrupt, and more than 20,000 backers never got a cooler."

    # apathy — VOTER APATHY & DELEGATION
    old "A governance system nobody uses is an attack surface, not a democracy."
    new "A governance system that nobody uses is not a democracy. It is a weak spot that attackers can use."

    old "Average DAO turnout: ~6.3%. The usual fix, delegation, quietly re-centralizes: the top 10% of voters ends up controlling up to 76.2% of voting power — a board of directors with no fiduciary duty."
    new "Average DAO turnout, the share of members who vote, is about 6.3 percent. The usual fix is delegation: you give your vote to someone else. But this quietly puts power back in a few hands. The top 10 percent of voters can end up with up to 76.2 percent of the voting power. It is like a company board, but with no legal duty to protect the members."

    # capture — GOVERNANCE CAPTURE
    old "If votes can be bought, someone is pricing your treasury."
    new "If votes can be bought, someone is already working out the price of your treasury."

    old "Build Finance DAO (2022): an attacker accumulated tokens, passed a malicious mint on a low-turnout retry, minted 1B+ tokens and drained ~160 ETH (~$470k). Capture doesn't look like a heist. It looks like help."
    new "Build Finance DAO (2022): an attacker slowly collected tokens. When few people were voting, they passed a harmful proposal on a second try. It let them mint over 1 billion new tokens and take about 160 ETH (about $470k). Governance capture doesn't look like a robbery. It looks like help."

    # flashloan — FLASH LOANS & TIME-LOCKS
    old "Any governance path that executes instantly will eventually execute an attack instantly."
    new "If a governance decision can run instantly, one day an attack will run instantly too."

    old "Beanstalk (2022, $181M): a flash-borrowed voting supermajority passed a Trojan proposal and executed it in the same transaction via an emergency path — paired with a charity proposal as the distraction. A non-zero delay between vote and execution would have stopped it cold."
    new "Beanstalk (2022, $181M): an attacker used a flash loan, a huge loan borrowed and repaid in seconds, to get most of the votes. They passed a harmful 'Trojan' proposal and ran it at once, in one transaction, through an emergency path. A charity proposal was used as a distraction. Any delay between the vote and the action, like a time-lock, would have stopped it."

    # credentials — CREDENTIAL HYGIENE
    old "A seed phrase in a shared doc is already stolen — you just don't know by whom yet."
    new "A seed phrase in a shared document is already stolen. You just don't know who has it yet."

    old "8ight Finance lost $1.75M after private keys were pasted into a shared Google Doc and sent over Facebook group chat. Keep 5–10% max in hot wallets; multi-sig cold storage above ~$10k."
    new "8ight Finance lost $1.75M. Its private keys were pasted into a shared Google Doc and sent in a Facebook group chat. Keep only 5–10 percent at most in hot wallets, which are always online. Above about $10k, use multi-sig cold storage: kept offline, and several people must sign."

    # verify_hex — VERIFY THE HEX
    old "The hardware wallet's ugly little screen is the only screen that isn't lying to you."
    new "The small, ugly screen on your hardware wallet is the only screen you can trust."

    old "Nexus Mutual's founder lost $8M (370,000 NXM) in Dec 2020 to a compromised MetaMask that spoofed the transaction summary. The true destination was on the hardware wallet screen the whole time — unchecked."
    new "In December 2020, Nexus Mutual's founder lost $8M (370,000 NXM tokens). The founder's MetaMask wallet had been hacked to show a fake transaction summary. The real destination was on the hardware wallet screen the whole time. Nobody checked it."

    # ice_phishing — ICE PHISHING
    old "Your front end is part of your smart contract."
    new "Your front end, your website, is part of your smart contract's security."

    old "Badger DAO (2021, $121M): a stolen Cloudflare API key let attackers inject a script into the site that harvested token approvals from users. No contract bug required. DNS, CDN and API keys are security boundaries."
    new "Badger DAO (2021, $121M): attackers stole a Cloudflare API key. They used it to add a hidden script to the website. The script tricked users into giving token approvals, which let the attackers move their tokens. This trick is called ice phishing. There was no bug in the contract. DNS, CDN and API keys must be protected too."

    # burnout — BURNOUT & IDENTITY FUSION
    old "You are not the venture. If it must die, it should not take you with it."
    new "You are not the venture. If the project must die, it should not take you with it."

    old "Solopreneur failure research: identity-venture fusion turns stagnation into personal failure and blocks rational pivots. Exhaustion measurably degrades decisions — which is why this game's hints stop being trustworthy when your Burnout is high."
    new "Research on solo founders shows a danger. When your identity and your project become one, a slow month feels like a personal failure. It also stops you from changing direction when you should. Exhaustion makes decisions measurably worse. That is why this game's hints stop being trustworthy when your Burnout is high."

    # greenwash — THE GREENWASHING TRAP
    old "Verify the physical asset before you financialize it."
    new "Check the real-world thing before you turn it into a financial product. If you don't, you risk greenwashing: looking green without being green."

    old "KlimaDAO/Toucan: 'sweeping the floor' of cheap carbon credits revived worthless legacy offsets (2011-era hydro dams). Scientists and registries disavowed the pools; price and trust collapsed together."
    new "KlimaDAO and Toucan bought up the cheapest carbon credits. People called this 'sweeping the floor'. It brought old, worthless offsets back to life, like hydro dams from around 2011. Scientists and the official credit registries rejected these pools. The price and people's trust fell together."
