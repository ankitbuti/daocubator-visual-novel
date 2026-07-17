# Chapter 5 — Resolution (Day 90)
# vault: 03 Chapters/Chapter 5 - Resolution.md

label ch5_resolution:
    $ ch_open_vibes = vibes

    ## 5.1 After the storm
    scene bg coworking with fade
    narrator "Day 90. Ninety days since the badge-out. The collective has a history now — which is another way of saying scars."
    if not maya_gone:
        show maya neutral at left with dissolve
        m "Infrastructure's stable. I took that vacation. It was horrible. I missed everyone. Don't quote me."
        hide maya with dissolve
    if rel_jordan >= 40:
        show jordan determined at right with dissolve
        j "Server's calmer. Not quieter — calmer. There's a difference and it took me ninety days to learn it."
        hide jordan with dissolve

    ## 5.2 The regulator letter — payoff of Ch1.6 (vault 5.2)
    scene bg conference with fade
    narrator "An envelope arrives. Actual paper. A financial regulator has Questions about your token event."
    if wrapper == "verein":
        show vera wry at right with dissolve
        v "And this is why we paid the boring $15,000. Forward it to the lawyers. Order dessert."
        $ adjust(vera=+5)
        hide vera with dissolve
    else:
        narrator "With no legal wrapper, 'the DAO' legally means... everyone. Members start getting served — one of them, elegantly, through the Discord webhook."
        $ adjust(treasury=-20, vibes=-10)
        call lesson("partnership")

    ## 5.3 Optional beat — the green partnership (vault 5.3)
    scene bg discord with fade
    show jordan hyped at right with dissolve
    j "HUGE news — a carbon-credit protocol wants us as their 'regenerative culture partner'! Real money, real mission, REAL good vibes!"
    menu:
        "Sign it fast. Mission and money, together at last.":
            $ adjust(treasury=+25, vibes=-15, jordan=-5)
            $ mark("Signed the carbon partnership without diligence")
            narrator "Three weeks later a researcher thread goes viral: the credits are 2011-era hydro dams. Retroactively, so are your vibes."
            call lesson("greenwash")
        "Let Maya and Spectre diligence the actual credits first." if not maya_gone or rel_spectre >= 40:
            $ adjust(vibes=+10, jordan=+5)
            $ mark("Diligenced the carbon deal — caught the junk credits")
            s "the 'credits' are hydro dams from 2011. already built. offsetting nothing. pass."
            narrator "You pass, publicly, with receipts. The protocol collapses a month later. Your restraint trends, briefly, as a personality."
            call lesson("greenwash")
        "Decline on instinct. If it smells like a press release...":
            $ adjust(vibes=+3, jordan=-5)
            narrator "Right call, wrong reason — instinct doesn't scale. But it works today."

    ## 5.4 The acquisition offer (vault 5.4)
    scene bg conference with fade
    narrator "Then the email. Subject line: 'Exploring Strategic Alignment.' BigCorp wants to acquire the collective. Real money, for tired people."
    menu:
        "Take it. Everyone gets paid. You get to sleep.":
            $ mark("Accepted the acquisition")
            jump ending_acquihire
        "Negotiate — better terms, team stays intact, then decide.":
            $ adjust(treasury=+10)
            narrator "They come back with more money and a 'VP of New Ventures' title for you. It's a good deal. It's also a door closing."
            menu:
                "Sign it.":
                    $ mark("Accepted the acquisition after negotiating")
                    jump ending_acquihire
                "Walk away. This thing isn't for sale.":
                    $ adjust(vibes=+10, morale=+10)
                    $ mark("Refused the acquisition")
                    narrator "You forward the rejection to the group chat. Jordan replies with nine emoji and a voice memo that's just cheering."
        "Refuse. We didn't build a exit; we built an institution.":
            $ adjust(vibes=+10, morale=+5)
            $ mark("Refused the acquisition outright")
            narrator "The reply is two lines long. You will reread the phrase 'not for sale' on bad days for years, and it will work every time."

    ## 5.5 Jordan's 3 a.m. call (vault 5.5)
    scene bg apartment with fade
    show jordan exhausted at right with dissolve
    j "Can't sleep. Ninety days, [player_name]. The hack- attempt- thing, the factions, the... everything. Just tell me straight: was it worth it?"
    menu:
        "\"Yes. Not because it worked — because of who we became running it.\"":
            $ adjust(jordan=+15, morale=+10)
            $ epilogue_key = "hopeful"
            show jordan determined
            j "...Yeah. Okay. Yeah. Same time tomorrow, founder."
        "\"Ask me after the vote.\"":
            $ epilogue_key = "elegiac"
            j "That's the most honest non-answer you've ever given me. I'll take it."
        "\"I don't know. I'm so tired, Jordan.\"":
            $ adjust(jordan=+10, burnout=-5)
            $ epilogue_key = "elegiac"
            show jordan hurt
            j "...Thank you for not doing the founder voice at me. Get some sleep. That's a governance proposal. It passed."

    ## 5.6 The reform vote — KEYSTONE (vault 5.6)
    scene bg conference with fade
    narrator "The Constitutional Vote. Ninety days of choices walk into the room wearing everyone's faces."
    $ vote_support = 0
    if not maya_gone and rel_maya >= 60:
        $ vote_support += 1
    if rel_jordan >= 60:
        $ vote_support += 1
    if rel_alex >= 50:
        $ vote_support += 1
    if rel_vera >= 40:
        $ vote_support += 1
    if rel_spectre >= 60:
        $ vote_support += 1
    narrator "You count the room: [vote_support] of your five closest people will vote with you on anything. The rest vote their conscience — which is what you built this for, allegedly."
    menu:
        "FULL DECENTRALIZATION — burn every founder privilege.":
            $ final_vote = "full"
            $ adjust(vibes=+15)
            $ mark("Final vote: full decentralization")
            narrator "The keys dissolve into the crowd. Whatever happens next, it happens without training wheels — or seatbelts."
        "BALANCED GOVERNANCE — time-locks, quorums, elected council.":
            $ final_vote = "balanced"
            $ adjust(vibes=+10, security=+10)
            $ mark("Final vote: balanced governance (time-locks + quorums + council)")
            narrator "Checks, balances, and boring, boring resilience. Vera calls it 'a constitution with calluses.'"
        "BENEVOLENT LEADERSHIP — founders keep the guardrails.":
            $ final_vote = "benevolent"
            $ adjust(security=+5, vibes=-10)
            $ mark("Final vote: benevolent leadership (founders keep control)")
            narrator "The community ratifies your stewardship. Some of them even mean it."

    ## 5.7 → endings
    jump compute_ending
