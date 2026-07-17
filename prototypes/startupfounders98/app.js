const { useState, useEffect, useCallback, useRef } = React;

// PC-98 Color Palette
const COLORS = {
    black: '#0f0f23',
    darkBlue: '#1a1a4e',
    blue: '#2929aa',
    cyan: '#00aaaa',
    magenta: '#aa00aa',
    pink: '#ff55ff',
    yellow: '#ffff55',
    orange: '#ff8844',
    white: '#ffffff',
    gray: '#555555',
    lightGray: '#aaaaaa',
    red: '#ff5555',
    green: '#55ff55',
    cream: '#e8dcc8'
};

// Character Portraits - Using Retrodiffusion API
const PORTRAITS = {
    player: '/api/retrodiffusion/image/256/256/portrait?prompt=young+determined+startup+founder+messy+hair+hoodie+confident+expression+anime+style+90s&seed=42',
    techWizard: '/api/retrodiffusion/image/256/256/portrait?prompt=genius+hacker+with+glasses+messy+black+hair+intense+eyes+anime+90s+style&seed=101',
    hustler: '/api/retrodiffusion/image/256/256/portrait?prompt=charismatic+salesperson+slicked+back+hair+confident+smirk+suit+anime+90s+style&seed=102',
    opsGuru: '/api/retrodiffusion/image/256/256/portrait?prompt=calm+professional+woman+neat+bun+serious+expression+blazer+anime+90s+style&seed=103',
    sharkVC: '/api/retrodiffusion/image/256/256/portrait?prompt=intimidating+venture+capitalist+sharp+suit+cold+eyes+power+tie+anime+90s+style&seed=104',
    angel: '/api/retrodiffusion/image/256/256/portrait?prompt=kind+elderly+tech+mentor+warm+smile+casual+sweater+wise+eyes+anime+90s+style&seed=105',
    narrator: null
};

// Backgrounds
const BACKGROUNDS = {
    office: '/api/retrodiffusion/image/512/256/texture?prompt=pixel+art+startup+office+interior+desks+computers+whiteboard+windows+90s+aesthetic&seed=200',
    coffeeshop: '/api/retrodiffusion/image/512/256/texture?prompt=pixel+art+cozy+coffee+shop+interior+tables+plants+warm+lighting+90s+aesthetic&seed=201',
    pitchroom: '/api/retrodiffusion/image/512/256/texture?prompt=pixel+art+corporate+boardroom+conference+table+projector+screen+intimidating+90s+aesthetic&seed=202',
    coworking: '/api/retrodiffusion/image/512/256/texture?prompt=pixel+art+trendy+coworking+space+open+plan+bean+bags+monitors+90s+aesthetic&seed=203',
    garage: '/api/retrodiffusion/image/512/256/texture?prompt=pixel+art+startup+garage+workspace+servers+whiteboards+pizza+boxes+90s+aesthetic&seed=204'
};

// Game Story Data
const STORY = {
    start: {
        id: 'start',
        chapter: 'Prologue',
        background: 'garage',
        speaker: null,
        portrait: null,
        text: [
            "The year is 1998. The dot-com bubble is inflating beautifully.",
            "You've just quit your stable job at BigCorp to chase your dream.",
            "Armed with a laptop, a revolutionary idea, and exactly $50,000 in savings...",
            "Your startup journey begins NOW."
        ],
        choices: [
            { text: "Let's do this!", next: 'intro_name' }
        ]
    },
    intro_name: {
        id: 'intro_name',
        chapter: 'Chapter 1: The Beginning',
        background: 'garage',
        speaker: 'NARRATOR',
        portrait: null,
        text: [
            "But first, what should we call you, founder?"
        ],
        inputPrompt: 'Enter your name:',
        defaultInput: 'Alex',
        next: 'first_day'
    },
    first_day: {
        id: 'first_day',
        chapter: 'Chapter 1: The Beginning',
        background: 'garage',
        speaker: 'player',
        portrait: 'player',
        text: [
            "Day 1. My garage. My kingdom.",
            "The code is coming together, but I can't do this alone.",
            "I need a co-founder. But who should I reach out to?"
        ],
        choices: [
            { text: "Maya - The Tech Wizard (Brilliant but difficult)", next: 'meet_tech', stat: { reputation: 1 } },
            { text: "Derek - The Hustler (Great at sales, ethically... flexible)", next: 'meet_hustler', stat: { runway: 5000 } },
            { text: "Sam - The Ops Guru (Reliable but risk-averse)", next: 'meet_ops', stat: { morale: 1 } }
        ]
    },
    meet_tech: {
        id: 'meet_tech',
        chapter: 'Chapter 1: The Beginning',
        background: 'coffeeshop',
        speaker: 'Maya',
        portrait: 'techWizard',
        text: [
            "You want ME to join your startup?",
            "*adjusts glasses skeptically*",
            "I've seen a hundred of these fail. What makes yours different?",
            "...Actually, show me the codebase first. Then we'll talk equity."
        ],
        choices: [
            { text: "50/50 split - we're equal partners", next: 'tech_equal', stat: { morale: 2, reputation: -1 } },
            { text: "60/40 - I had the idea first", next: 'tech_less', stat: { morale: -1, reputation: 1 } },
            { text: "Let's do vesting over 4 years", next: 'tech_vesting', stat: { morale: 1 } }
        ],
        wisdom: "WISDOM UNLOCKED: Equity splits are emotional. Vesting protects everyone."
    },
    meet_hustler: {
        id: 'meet_hustler',
        chapter: 'Chapter 1: The Beginning',
        background: 'coffeeshop',
        speaker: 'Derek',
        portrait: 'hustler',
        text: [
            "*finger guns* My FAVORITE founder!",
            "Listen, I can get us meetings with ANYONE.",
            "I know people at Sequoia, a]16z, you name it.",
            "Just give me the right incentives and watch me work magic."
        ],
        choices: [
            { text: "30% equity + sales commission", next: 'hustler_deal', stat: { runway: -10000, reputation: 2 } },
            { text: "20% equity, standard package", next: 'hustler_standard', stat: { morale: -1, reputation: 1 } },
            { text: "Actually, let me think about this...", next: 'first_day', stat: { stress: 1 } }
        ],
        wisdom: "WISDOM UNLOCKED: Salespeople live on commission. Align incentives carefully."
    },
    meet_ops: {
        id: 'meet_ops',
        chapter: 'Chapter 1: The Beginning',
        background: 'coffeeshop',
        speaker: 'Sam',
        portrait: 'opsGuru',
        text: [
            "I've reviewed your business plan thoroughly.",
            "The market analysis is... optimistic. But I see potential.",
            "I can build the systems to scale this properly.",
            "But I need to know - what's your runway situation?"
        ],
        choices: [
            { text: "Be honest - $50k, maybe 8 months", next: 'ops_honest', stat: { morale: 2, stress: 1 } },
            { text: "We're well-funded, don't worry", next: 'ops_lie', stat: { morale: -1, reputation: -1 } },
            { text: "Let's bootstrap and stay lean", next: 'ops_lean', stat: { runway: 5000, morale: 1 } }
        ],
        wisdom: "WISDOM UNLOCKED: Honesty with co-founders builds trust. Lies create landmines."
    },
    tech_equal: {
        id: 'tech_equal',
        chapter: 'Chapter 1: The Beginning',
        background: 'garage',
        speaker: 'Maya',
        portrait: 'techWizard',
        text: [
            "*surprised* Equal? Most founders would never...",
            "You know what? I respect that.",
            "Let's build something that changes the world.",
            "MAYA HAS JOINED YOUR STARTUP!"
        ],
        choices: [
            { text: "Time to build!", next: 'three_months' }
        ],
        setCofounder: 'tech'
    },
    tech_less: {
        id: 'tech_less',
        chapter: 'Chapter 1: The Beginning',
        background: 'garage',
        speaker: 'Maya',
        portrait: 'techWizard',
        text: [
            "*frowns* 60/40? The idea is worth nothing without execution.",
            "Fine. But I want that in writing with acceleration clauses.",
            "And I pick the tech stack. Non-negotiable.",
            "MAYA HAS JOINED YOUR STARTUP! (She seems slightly resentful)"
        ],
        choices: [
            { text: "Deal.", next: 'three_months' }
        ],
        setCofounder: 'tech'
    },
    tech_vesting: {
        id: 'tech_vesting',
        chapter: 'Chapter 1: The Beginning',
        background: 'garage',
        speaker: 'Maya',
        portrait: 'techWizard',
        text: [
            "Four-year vesting with one-year cliff?",
            "That's... actually the smart move.",
            "You've done your homework. I'm impressed.",
            "MAYA HAS JOINED YOUR STARTUP! (She seems genuinely excited)"
        ],
        choices: [
            { text: "Let's build!", next: 'three_months' }
        ],
        setCofounder: 'tech',
        stat: { reputation: 1 }
    },
    hustler_deal: {
        id: 'hustler_deal',
        chapter: 'Chapter 1: The Beginning',
        background: 'garage',
        speaker: 'Derek',
        portrait: 'hustler',
        text: [
            "NOW we're talking! Commission-based? Love it.",
            "Watch me turn this garage into a unicorn factory.",
            "I'm already drafting emails to every VC in the Valley.",
            "DEREK HAS JOINED YOUR STARTUP!"
        ],
        choices: [
            { text: "Let's hustle!", next: 'three_months' }
        ],
        setCofounder: 'hustler'
    },
    hustler_standard: {
        id: 'hustler_standard',
        chapter: 'Chapter 1: The Beginning',
        background: 'garage',
        speaker: 'Derek',
        portrait: 'hustler',
        text: [
            "*less enthusiastic* Twenty percent, huh?",
            "Alright, alright. But when I close that Series A...",
            "We're renegotiating. Deal?",
            "DEREK HAS JOINED YOUR STARTUP! (He seems motivated... for now)"
        ],
        choices: [
            { text: "Deal.", next: 'three_months' }
        ],
        setCofounder: 'hustler'
    },
    ops_honest: {
        id: 'ops_honest',
        chapter: 'Chapter 1: The Beginning',
        background: 'garage',
        speaker: 'Sam',
        portrait: 'opsGuru',
        text: [
            "I appreciate the honesty. Most founders would lie.",
            "Eight months is tight but doable if we're disciplined.",
            "I can help stretch that runway with proper systems.",
            "SAM HAS JOINED YOUR STARTUP!"
        ],
        choices: [
            { text: "Let's be efficient!", next: 'three_months' }
        ],
        setCofounder: 'ops'
    },
    ops_lie: {
        id: 'ops_lie',
        chapter: 'Chapter 1: The Beginning',
        background: 'garage',
        speaker: 'Sam',
        portrait: 'opsGuru',
        text: [
            "*raises eyebrow* Well-funded? Interesting.",
            "I'll take the job, but I want to see the books.",
            "...Soon.",
            "SAM HAS JOINED YOUR STARTUP! (She seems suspicious)"
        ],
        choices: [
            { text: "Sure, eventually...", next: 'three_months' }
        ],
        setCofounder: 'ops'
    },
    ops_lean: {
        id: 'ops_lean',
        chapter: 'Chapter 1: The Beginning',
        background: 'garage',
        speaker: 'Sam',
        portrait: 'opsGuru',
        text: [
            "Bootstrapping? That's my language.",
            "No investor pressure, no artificial timelines.",
            "Let's build something sustainable.",
            "SAM HAS JOINED YOUR STARTUP!"
        ],
        choices: [
            { text: "Efficiency is key!", next: 'three_months' }
        ],
        setCofounder: 'ops'
    },
    three_months: {
        id: 'three_months',
        chapter: 'Chapter 2: The Grind',
        background: 'office',
        speaker: null,
        portrait: null,
        text: [
            "THREE MONTHS LATER...",
            "The product is taking shape. Users are trickling in.",
            "But the runway is getting shorter.",
            "It's time to make some crucial decisions."
        ],
        choices: [
            { text: "Continue...", next: 'funding_decision' }
        ],
        stat: { runway: -15000, stress: 1 }
    },
    funding_decision: {
        id: 'funding_decision',
        chapter: 'Chapter 2: The Grind',
        background: 'office',
        speaker: 'player',
        portrait: 'player',
        text: [
            "We need to talk about money.",
            "The bank account is looking thin.",
            "What's our play here?"
        ],
        choices: [
            { text: "Pitch to VCs - go big or go home", next: 'meet_vc', stat: { stress: 2 } },
            { text: "Find an angel investor - patient capital", next: 'meet_angel', stat: { stress: 1 } },
            { text: "Keep bootstrapping - we'll find a way", next: 'bootstrap_hard', stat: { runway: -5000, morale: 1 } }
        ]
    },
    meet_vc: {
        id: 'meet_vc',
        chapter: 'Chapter 2: The Grind',
        background: 'pitchroom',
        speaker: 'Marcus',
        portrait: 'sharkVC',
        text: [
            "*steeples fingers* Interesting pitch.",
            "I see potential, but the valuation is... ambitious.",
            "I'll give you $2M. But I want 40% and a board seat.",
            "Take it or leave it. I have three other meetings today."
        ],
        choices: [
            { text: "Deal! We need the money.", next: 'vc_accept', stat: { runway: 200000, reputation: 2, morale: -1 } },
            { text: "That's too much equity. Can we negotiate?", next: 'vc_negotiate', stat: { stress: 1 } },
            { text: "No deal. We'll find other options.", next: 'funding_decision', stat: { reputation: 1, stress: 1 } }
        ],
        wisdom: "WISDOM UNLOCKED: First term sheets are rarely the best. But desperation kills negotiating power."
    },
    vc_accept: {
        id: 'vc_accept',
        chapter: 'Chapter 2: The Grind',
        background: 'pitchroom',
        speaker: 'Marcus',
        portrait: 'sharkVC',
        text: [
            "*smiles coldly* Smart choice.",
            "I'll have my lawyers send the docs.",
            "Oh, and I'll be introducing you to my portfolio companies.",
            "We're going to 10x this thing. Or die trying."
        ],
        choices: [
            { text: "Gulp...", next: 'six_months' }
        ],
        setInvestor: 'sharkVC'
    },
    vc_negotiate: {
        id: 'vc_negotiate',
        chapter: 'Chapter 2: The Grind',
        background: 'pitchroom',
        speaker: 'Marcus',
        portrait: 'sharkVC',
        text: [
            "*checks watch* Fine. 35%, but that's my final offer.",
            "And I still want that board seat.",
            "You've got until Friday to decide.",
            "My fund has a thesis, and you're either in it or you're not."
        ],
        choices: [
            { text: "35% is still high, but okay...", next: 'vc_accept', stat: { runway: 200000, reputation: 1 } },
            { text: "Let me explore other options", next: 'meet_angel', stat: { stress: 1 } }
        ]
    },
    meet_angel: {
        id: 'meet_angel',
        chapter: 'Chapter 2: The Grind',
        background: 'coffeeshop',
        speaker: 'Eleanor',
        portrait: 'angel',
        text: [
            "*sips tea thoughtfully* I've been watching your progress.",
            "You remind me of myself, thirty years ago.",
            "I can offer $200k for 10%. No board seat, no pressure.",
            "Build something meaningful. That's all I ask."
        ],
        choices: [
            { text: "Thank you, Eleanor. Deal!", next: 'angel_accept', stat: { runway: 20000, morale: 2 } },
            { text: "We need more capital than that...", next: 'meet_vc', stat: { stress: 1 } },
            { text: "Can you mentor us too?", next: 'angel_mentor', stat: { morale: 1, reputation: 1 } }
        ],
        wisdom: "WISDOM UNLOCKED: Angel investors often provide more than money - they provide wisdom."
    },
    angel_accept: {
        id: 'angel_accept',
        chapter: 'Chapter 2: The Grind',
        background: 'coffeeshop',
        speaker: 'Eleanor',
        portrait: 'angel',
        text: [
            "*warm smile* I'm excited to be part of this journey.",
            "My door is always open if you need advice.",
            "Now go build something the world needs.",
            "ELEANOR HAS INVESTED IN YOUR STARTUP!"
        ],
        choices: [
            { text: "Thank you!", next: 'six_months' }
        ],
        setInvestor: 'angel'
    },
    angel_mentor: {
        id: 'angel_mentor',
        chapter: 'Chapter 2: The Grind',
        background: 'coffeeshop',
        speaker: 'Eleanor',
        portrait: 'angel',
        text: [
            "*laughs softly* I was hoping you'd ask.",
            "Let's make it official - advisor shares, 1%.",
            "Monthly dinners. Bring your hardest problems.",
            "ELEANOR IS NOW YOUR INVESTOR AND MENTOR!"
        ],
        choices: [
            { text: "This is perfect!", next: 'six_months' }
        ],
        setInvestor: 'angel',
        stat: { morale: 2 }
    },
    bootstrap_hard: {
        id: 'bootstrap_hard',
        chapter: 'Chapter 2: The Grind',
        background: 'garage',
        speaker: 'player',
        portrait: 'player',
        text: [
            "We're going to do this ourselves.",
            "No investors telling us what to do.",
            "Ramen profitability, here we come.",
            "It's going to be tough, but we own our destiny."
        ],
        choices: [
            { text: "Let's grind!", next: 'six_months' }
        ],
        setInvestor: 'bootstrap'
    },
    six_months: {
        id: 'six_months',
        chapter: 'Chapter 3: The Pivot',
        background: 'office',
        speaker: null,
        portrait: null,
        text: [
            "SIX MONTHS LATER...",
            "The product is live. Users are growing... slowly.",
            "But the market is shifting.",
            "A critical decision awaits."
        ],
        choices: [
            { text: "Continue...", next: 'pivot_moment' }
        ],
        stat: { runway: -20000 }
    },
    pivot_moment: {
        id: 'pivot_moment',
        chapter: 'Chapter 3: The Pivot',
        background: 'office',
        speaker: 'player',
        portrait: 'player',
        text: [
            "Our core product isn't getting traction.",
            "But users LOVE this one small feature we added as an afterthought.",
            "Do we pivot everything to focus on that?",
            "Or stay the course with our original vision?"
        ],
        choices: [
            { text: "PIVOT! Follow the users!", next: 'pivot_yes', stat: { morale: -1, reputation: 1, stress: 2 } },
            { text: "Stay the course. Vision matters.", next: 'pivot_no', stat: { morale: 1, stress: 1 } },
            { text: "Let's A/B test both approaches", next: 'pivot_test', stat: { runway: -5000, morale: 1 } }
        ],
        wisdom: "WISDOM UNLOCKED: The best pivots follow user behavior, not founder ego. But timing is everything."
    },
    pivot_yes: {
        id: 'pivot_yes',
        chapter: 'Chapter 3: The Pivot',
        background: 'office',
        speaker: 'player',
        portrait: 'player',
        text: [
            "We're pivoting. Full speed ahead on the new direction.",
            "Three months of work... thrown away.",
            "But the users have spoken. We listen.",
            "The team isn't thrilled, but they're on board."
        ],
        choices: [
            { text: "Let's rebuild!", next: 'betrayal_setup' }
        ]
    },
    pivot_no: {
        id: 'pivot_no',
        chapter: 'Chapter 3: The Pivot',
        background: 'office',
        speaker: 'player',
        portrait: 'player',
        text: [
            "We're staying the course.",
            "The vision is bigger than one feature.",
            "We'll find our market. Eventually.",
            "The team respects the conviction."
        ],
        choices: [
            { text: "Stay strong!", next: 'betrayal_setup' }
        ]
    },
    pivot_test: {
        id: 'pivot_test',
        chapter: 'Chapter 3: The Pivot',
        background: 'office',
        speaker: 'player',
        portrait: 'player',
        text: [
            "Data doesn't lie. Let's test both.",
            "It'll cost us time and money, but we'll know for sure.",
            "Two weeks of focused testing.",
            "The results will guide our path."
        ],
        choices: [
            { text: "Test results in...", next: 'betrayal_setup' }
        ],
        stat: { reputation: 1 }
    },
    betrayal_setup: {
        id: 'betrayal_setup',
        chapter: 'Chapter 4: The Betrayal',
        background: 'office',
        speaker: null,
        portrait: null,
        text: [
            "NINE MONTHS IN...",
            "Something is wrong.",
            "Your co-founder has been acting strange lately.",
            "Missed meetings. Secret calls. Tension in the air."
        ],
        choices: [
            { text: "What's going on?", next: 'confrontation' }
        ]
    },
    confrontation: {
        id: 'confrontation',
        chapter: 'Chapter 4: The Betrayal',
        background: 'office',
        speaker: 'player',
        portrait: 'player',
        text: [
            "We need to talk.",
            "I've noticed you've been... distant.",
            "Is everything okay?",
            "Whatever it is, we can work through it."
        ],
        choices: [
            { text: "Be direct but kind", next: 'cofounder_truth', stat: { morale: 1 } },
            { text: "Demand answers immediately", next: 'cofounder_defensive', stat: { morale: -2, stress: 2 } },
            { text: "Give them space for now", next: 'cofounder_space', stat: { stress: 1 } }
        ]
    },
    cofounder_truth: {
        id: 'cofounder_truth',
        chapter: 'Chapter 4: The Betrayal',
        background: 'office',
        speaker: 'Co-founder',
        portrait: null,
        text: [
            "*sighs heavily*",
            "I've been talking to a competitor. They offered me a job.",
            "Three times our current salary. Stock options. Stability.",
            "I haven't said yes. But I'm thinking about it."
        ],
        choices: [
            { text: "I understand. What do you need to stay?", next: 'negotiation_stay', stat: { morale: 1 } },
            { text: "If you're not committed, maybe you should go.", next: 'let_go', stat: { morale: -1, reputation: 1 } },
            { text: "That's a betrayal. I'm hurt.", next: 'hurt_response', stat: { stress: 2 } }
        ],
        wisdom: "WISDOM UNLOCKED: People leave for reasons. Understanding those reasons prevents future departures."
    },
    cofounder_defensive: {
        id: 'cofounder_defensive',
        chapter: 'Chapter 4: The Betrayal',
        background: 'office',
        speaker: 'Co-founder',
        portrait: null,
        text: [
            "*defensive* You don't trust me?",
            "After everything I've done for this company?",
            "Fine. You want the truth? I'm burned out.",
            "And I don't know if I can do this anymore."
        ],
        choices: [
            { text: "I'm sorry. Let's talk about burnout.", next: 'burnout_talk', stat: { morale: 1 } },
            { text: "We all are. Suck it up.", next: 'tough_love', stat: { morale: -2, stress: 1 } }
        ]
    },
    cofounder_space: {
        id: 'cofounder_space',
        chapter: 'Chapter 4: The Betrayal',
        background: 'office',
        speaker: null,
        portrait: null,
        text: [
            "Two weeks pass in uncomfortable silence.",
            "The tension grows. Work suffers.",
            "Finally, an email arrives.",
            "Subject: My Resignation"
        ],
        choices: [
            { text: "Read the email...", next: 'resignation_email' }
        ]
    },
    negotiation_stay: {
        id: 'negotiation_stay',
        chapter: 'Chapter 4: The Betrayal',
        background: 'office',
        speaker: 'Co-founder',
        portrait: null,
        text: [
            "*surprised* You... want to work this out?",
            "I need to feel like this matters. Like I matter.",
            "More ownership. Or at least a path to it.",
            "And maybe... we should hire help so we're not drowning."
        ],
        choices: [
            { text: "Let's restructure equity. You deserve it.", next: 'restructure_equity', stat: { morale: 2, reputation: 1 } },
            { text: "We can hire, but equity is set.", next: 'hire_help', stat: { morale: 1, runway: -10000 } }
        ]
    },
    let_go: {
        id: 'let_go',
        chapter: 'Chapter 4: The Betrayal',
        background: 'office',
        speaker: 'player',
        portrait: 'player',
        text: [
            "I need people who are all in.",
            "If your heart isn't here, you should pursue what makes you happy.",
            "No hard feelings. We'll figure out a fair separation.",
            "CO-FOUNDER HAS LEFT THE STARTUP"
        ],
        choices: [
            { text: "Move forward alone...", next: 'offer_setup' }
        ],
        clearCofounder: true
    },
    hurt_response: {
        id: 'hurt_response',
        chapter: 'Chapter 4: The Betrayal',
        background: 'office',
        speaker: 'Co-founder',
        portrait: null,
        text: [
            "*tears up* I know. I'm sorry.",
            "I didn't mean for it to go this far.",
            "What do you want me to do?",
            "I'll stay. I'll recommit. Just... give me another chance."
        ],
        choices: [
            { text: "One more chance. But we need honesty.", next: 'second_chance', stat: { morale: 1, stress: 1 } },
            { text: "I don't think I can trust you anymore.", next: 'let_go', stat: { stress: 2 } }
        ]
    },
    burnout_talk: {
        id: 'burnout_talk',
        chapter: 'Chapter 4: The Betrayal',
        background: 'coffeeshop',
        speaker: 'Co-founder',
        portrait: null,
        text: [
            "We grab coffee outside the office.",
            "For the first time in months, we actually talk.",
            "About fears. About dreams. About why we started.",
            "Something shifts. The fire reignites, just a little."
        ],
        choices: [
            { text: "We'll get through this together.", next: 'offer_setup' }
        ],
        stat: { morale: 2 }
    },
    tough_love: {
        id: 'tough_love',
        chapter: 'Chapter 4: The Betrayal',
        background: 'office',
        speaker: 'Co-founder',
        portrait: null,
        text: [
            "*cold stare* Suck it up? Really?",
            "You know what? I'm done.",
            "I'll be at my desk collecting my things.",
            "Good luck with... everything."
        ],
        choices: [
            { text: "Wait...", next: 'let_go' }
        ],
        clearCofounder: true
    },
    resignation_email: {
        id: 'resignation_email',
        chapter: 'Chapter 4: The Betrayal',
        background: 'office',
        speaker: null,
        portrait: null,
        text: [
            "'I'm sorry it has to end this way.'",
            "'I've accepted a position elsewhere.'",
            "'I wish you the best with the company.'",
            "'Please contact my lawyer about equity separation.'"
        ],
        choices: [
            { text: "...Lawyer?", next: 'legal_nightmare' }
        ],
        clearCofounder: true,
        stat: { stress: 3, runway: -20000 }
    },
    legal_nightmare: {
        id: 'legal_nightmare',
        chapter: 'Chapter 4: The Betrayal',
        background: 'office',
        speaker: 'player',
        portrait: 'player',
        text: [
            "The legal battle drains time and money.",
            "But eventually, it's resolved.",
            "You're alone now, but still standing.",
            "Barely."
        ],
        choices: [
            { text: "Keep going...", next: 'offer_setup' }
        ],
        wisdom: "WISDOM UNLOCKED: Always have vesting. Always have a cliff. Always have a lawyer review founder agreements."
    },
    restructure_equity: {
        id: 'restructure_equity',
        chapter: 'Chapter 4: The Betrayal',
        background: 'office',
        speaker: 'Co-founder',
        portrait: null,
        text: [
            "*emotional* I... didn't expect that.",
            "Thank you. I won't let you down.",
            "Let's make this company everything it can be.",
            "CO-FOUNDER IS REINVIGORATED!"
        ],
        choices: [
            { text: "Together.", next: 'offer_setup' }
        ]
    },
    hire_help: {
        id: 'hire_help',
        chapter: 'Chapter 4: The Betrayal',
        background: 'office',
        speaker: 'Co-founder',
        portrait: null,
        text: [
            "*nods slowly* Okay. I can work with that.",
            "Let's bring on some help.",
            "Maybe that's what we both needed.",
            "Fresh perspectives. Less pressure."
        ],
        choices: [
            { text: "Let's grow the team.", next: 'offer_setup' }
        ]
    },
    second_chance: {
        id: 'second_chance',
        chapter: 'Chapter 4: The Betrayal',
        background: 'office',
        speaker: 'Co-founder',
        portrait: null,
        text: [
            "*determined* I won't waste it.",
            "From now on, complete transparency.",
            "We're in this together. For real this time.",
            "Let's show them what we can do."
        ],
        choices: [
            { text: "Let's do this.", next: 'offer_setup' }
        ]
    },
    offer_setup: {
        id: 'offer_setup',
        chapter: 'Chapter 5: The Offer',
        background: 'office',
        speaker: null,
        portrait: null,
        text: [
            "ONE YEAR IN...",
            "Against all odds, you've survived.",
            "The product has found its market. Growth is accelerating.",
            "And then... THE email arrives."
        ],
        choices: [
            { text: "Open the email...", next: 'acquisition_offer' }
        ]
    },
    acquisition_offer: {
        id: 'acquisition_offer',
        chapter: 'Chapter 5: The Offer',
        background: 'pitchroom',
        speaker: 'BigCorp CEO',
        portrait: 'sharkVC',
        text: [
            "We've been watching your company with great interest.",
            "Your technology would be... valuable to us.",
            "We're prepared to offer $10 million. All cash.",
            "But we need an answer by Friday."
        ],
        choices: [
            { text: "Yes! Take the money!", next: 'ending_acquihire', stat: { runway: 1000000 } },
            { text: "We're not for sale. We're going to IPO.", next: 'ending_branch', stat: { stress: 2 } },
            { text: "Let's negotiate. What else can you offer?", next: 'negotiate_acquisition', stat: { reputation: 1 } }
        ],
        wisdom: "WISDOM UNLOCKED: Acquisitions aren't failures. But know what you're giving up."
    },
    negotiate_acquisition: {
        id: 'negotiate_acquisition',
        chapter: 'Chapter 5: The Offer',
        background: 'pitchroom',
        speaker: 'BigCorp CEO',
        portrait: 'sharkVC',
        text: [
            "*raises eyebrow* A negotiator. I like that.",
            "$15 million. Team gets to stay together.",
            "You become VP of New Ventures.",
            "Final offer. What do you say?"
        ],
        choices: [
            { text: "That's a great offer. Deal.", next: 'ending_acquihire' },
            { text: "Still no. We're building something bigger.", next: 'ending_branch' }
        ]
    },
    ending_branch: {
        id: 'ending_branch',
        chapter: 'Chapter 5: The Offer',
        background: 'office',
        speaker: 'player',
        portrait: 'player',
        text: [
            "We said no to the acquisition.",
            "We're going for it all.",
            "The next two years will decide everything...",
            ""
        ],
        choices: [
            { text: "See our fate...", next: 'calculate_ending' }
        ]
    },
    calculate_ending: {
        id: 'calculate_ending',
        chapter: 'Epilogue',
        background: 'office',
        speaker: null,
        portrait: null,
        text: ["Calculating your ending..."],
        calculateEnding: true
    },
    ending_acquihire: {
        id: 'ending_acquihire',
        chapter: 'Epilogue: Acqui-hire',
        background: 'office',
        speaker: null,
        portrait: null,
        text: [
            "🤝 ENDING: ACQUI-HIRE 🤝",
            "",
            "You sold the company. The team got jobs.",
            "The product was absorbed into BigCorp's offerings.",
            "You're wealthy, but something feels... incomplete.",
            "",
            "Not a failure. Not quite a win.",
            "But you lived to fight another day."
        ],
        ending: 'acquihire',
        choices: [
            { text: "Start New Game", next: 'restart' }
        ]
    },
    ending_unicorn: {
        id: 'ending_unicorn',
        chapter: 'Epilogue: Unicorn',
        background: 'pitchroom',
        speaker: null,
        portrait: null,
        text: [
            "🚀 ENDING: UNICORN 🚀",
            "",
            "Against all odds, you did it.",
            "IPO day. The bell rings. Your name is everywhere.",
            "The team that stayed with you shares in the success.",
            "",
            "You changed the world. And got rich doing it.",
            "This is the dream. You're living it."
        ],
        ending: 'unicorn',
        choices: [
            { text: "Start New Game", next: 'restart' }
        ]
    },
    ending_sustainable: {
        id: 'ending_sustainable',
        chapter: 'Epilogue: Sustainable Success',
        background: 'coffeeshop',
        speaker: null,
        portrait: null,
        text: [
            "🎯 ENDING: SUSTAINABLE SUCCESS 🎯",
            "",
            "You built something that lasts.",
            "Not a unicorn, but profitable. Growing steadily.",
            "Your team is happy. Your investors are happy.",
            "",
            "You're not on magazine covers.",
            "But you sleep well at night."
        ],
        ending: 'sustainable',
        choices: [
            { text: "Start New Game", next: 'restart' }
        ]
    },
    ending_fallout: {
        id: 'ending_fallout',
        chapter: 'Epilogue: Founder Fallout',
        background: 'office',
        speaker: null,
        portrait: null,
        text: [
            "💔 ENDING: FOUNDER FALLOUT 💔",
            "",
            "The relationships couldn't survive the pressure.",
            "Lawsuits. Accusations. Former friends turned enemies.",
            "The company limps along, but the soul is gone.",
            "",
            "Some lessons are learned the hard way.",
            "Next time, choose your partners more carefully."
        ],
        ending: 'fallout',
        choices: [
            { text: "Start New Game", next: 'restart' }
        ]
    },
    ending_failure: {
        id: 'ending_failure',
        chapter: 'Epilogue: Spectacular Failure',
        background: 'garage',
        speaker: null,
        portrait: null,
        text: [
            "🔥 ENDING: SPECTACULAR FAILURE 🔥",
            "",
            "The money ran out. The dream died.",
            "You're back where you started.",
            "But you have something nobody can take away:",
            "",
            "Experience. Wisdom. Battle scars.",
            "The next startup will be different. You'll make sure of it."
        ],
        ending: 'failure',
        choices: [
            { text: "Start New Game", next: 'restart' }
        ]
    },
    restart: {
        id: 'restart',
        restart: true
    }
};

// Audio Context for chiptune sounds
class AudioManager {
    constructor() {
        this.ctx = null;
        this.enabled = true;
    }

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
    }

    playBlip() {
        if (!this.enabled || !this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.frequency.value = 800;
        osc.type = 'square';
        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.05);
    }

    playConfirm() {
        if (!this.enabled || !this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.frequency.value = 600;
        osc.type = 'square';
        gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
        osc.frequency.setValueAtTime(800, this.ctx.currentTime + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.1);
    }

    playDramatic() {
        if (!this.enabled || !this.ctx) return;
        [200, 180, 160, 150].forEach((freq, i) => {
            setTimeout(() => {
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();
                osc.connect(gain);
                gain.connect(this.ctx.destination);
                osc.frequency.value = freq;
                osc.type = 'square';
                gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
                osc.start();
                osc.stop(this.ctx.currentTime + 0.2);
            }, i * 150);
        });
    }

    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }
}

const audio = new AudioManager();

// Main App Component
const App = () => {
    const [gameState, setGameState] = useState(() => {
        const saved = localStorage.getItem('startupFounders98_state');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error('Failed to parse saved state');
            }
        }
        return null;
    });

    const [currentScene, setCurrentScene] = useState('start');
    const [displayedText, setDisplayedText] = useState([]);
    const [textIndex, setTextIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [showChoices, setShowChoices] = useState(false);
    const [playerName, setPlayerName] = useState('Alex');
    const [nameInput, setNameInput] = useState('');
    const [stats, setStats] = useState({
        runway: 50000,
        morale: 3,
        reputation: 2,
        stress: 0
    });
    const [cofounder, setCofounder] = useState(null);
    const [investor, setInvestor] = useState(null);
    const [showMenu, setShowMenu] = useState(true);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [scanlines, setScanlines] = useState(true);
    const [endings, setEndings] = useState(() => {
        const saved = localStorage.getItem('startupFounders98_endings');
        return saved ? JSON.parse(saved) : [];
    });
    const [wisdom, setWisdom] = useState([]);
    const [showWisdom, setShowWisdom] = useState(false);
    const [currentWisdom, setCurrentWisdom] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const textContainerRef = useRef(null);

    // Initialize audio on first interaction
    useEffect(() => {
        const initAudio = () => {
            audio.init();
            document.removeEventListener('click', initAudio);
        };
        document.addEventListener('click', initAudio);
        return () => document.removeEventListener('click', initAudio);
    }, []);

    // Save game state
    useEffect(() => {
        if (!showMenu && currentScene !== 'start') {
            const state = {
                currentScene,
                playerName,
                stats,
                cofounder,
                investor,
                wisdom
            };
            localStorage.setItem('startupFounders98_state', JSON.stringify(state));
        }
    }, [currentScene, playerName, stats, cofounder, investor, wisdom, showMenu]);

    // Typewriter effect
    useEffect(() => {
        const scene = STORY[currentScene];
        if (!scene || showMenu) return;

        if (textIndex < scene.text.length) {
            setIsTyping(true);
            const currentText = scene.text[textIndex].replace('{player}', playerName);
            
            if (charIndex < currentText.length) {
                const timer = setTimeout(() => {
                    setDisplayedText(prev => {
                        const newText = [...prev];
                        if (!newText[textIndex]) newText[textIndex] = '';
                        newText[textIndex] = currentText.substring(0, charIndex + 1);
                        return newText;
                    });
                    setCharIndex(c => c + 1);
                    audio.playBlip();
                }, 30);
                return () => clearTimeout(timer);
            } else {
                const timer = setTimeout(() => {
                    setTextIndex(t => t + 1);
                    setCharIndex(0);
                }, 500);
                return () => clearTimeout(timer);
            }
        } else {
            setIsTyping(false);
            if (!scene.inputPrompt) {
                setShowChoices(true);
            }
        }
    }, [currentScene, textIndex, charIndex, playerName, showMenu]);

    // Scroll text into view
    useEffect(() => {
        if (textContainerRef.current) {
            textContainerRef.current.scrollTop = textContainerRef.current.scrollHeight;
        }
    }, [displayedText]);

    const skipText = () => {
        const scene = STORY[currentScene];
        if (!scene) return;

        if (isTyping) {
            const fullText = scene.text.map(t => t.replace('{player}', playerName));
            setDisplayedText(fullText);
            setTextIndex(scene.text.length);
            setCharIndex(0);
            setIsTyping(false);
            if (!scene.inputPrompt) {
                setShowChoices(true);
            }
        }
    };

    const handleChoice = (choice) => {
        audio.playConfirm();
        
        const scene = STORY[currentScene];
        
        // Apply stats from choice
        if (choice.stat) {
            setStats(prev => {
                const newStats = { ...prev };
                Object.keys(choice.stat).forEach(key => {
                    newStats[key] = Math.max(0, Math.min(
                        key === 'morale' ? 5 : key === 'reputation' ? 5 : key === 'stress' ? 10 : 1000000,
                        (newStats[key] || 0) + choice.stat[key]
                    ));
                });
                return newStats;
            });
        }

        // Show wisdom if present
        if (scene.wisdom) {
            setCurrentWisdom(scene.wisdom);
            setShowWisdom(true);
            setWisdom(prev => [...prev, scene.wisdom]);
        } else {
            navigateToScene(choice.next);
        }
    };

    const navigateToScene = (nextSceneId) => {
        const nextScene = STORY[nextSceneId];
        if (!nextScene) return;

        // Handle restart
        if (nextScene.restart) {
            setCurrentScene('start');
            setDisplayedText([]);
            setTextIndex(0);
            setCharIndex(0);
            setShowChoices(false);
            setStats({ runway: 50000, morale: 3, reputation: 2, stress: 0 });
            setCofounder(null);
            setInvestor(null);
            setWisdom([]);
            setShowMenu(true);
            localStorage.removeItem('startupFounders98_state');
            return;
        }

        // Handle calculate ending
        if (nextScene.calculateEnding) {
            const endingId = calculateEnding();
            navigateToScene(endingId);
            return;
        }

        // Set cofounder if specified
        if (nextScene.setCofounder) {
            setCofounder(nextScene.setCofounder);
        }

        // Clear cofounder if specified
        if (nextScene.clearCofounder) {
            setCofounder(null);
        }

        // Set investor if specified
        if (nextScene.setInvestor) {
            setInvestor(nextScene.setInvestor);
        }

        // Apply stats from scene
        if (nextScene.stat) {
            setStats(prev => {
                const newStats = { ...prev };
                Object.keys(nextScene.stat).forEach(key => {
                    newStats[key] = Math.max(0, Math.min(
                        key === 'morale' ? 5 : key === 'reputation' ? 5 : key === 'stress' ? 10 : 1000000,
                        (newStats[key] || 0) + nextScene.stat[key]
                    ));
                });
                return newStats;
            });
        }

        // Record ending if present
        if (nextScene.ending) {
            audio.playDramatic();
            const newEndings = [...endings];
            if (!newEndings.includes(nextScene.ending)) {
                newEndings.push(nextScene.ending);
                setEndings(newEndings);
                localStorage.setItem('startupFounders98_endings', JSON.stringify(newEndings));
            }
        }

        setCurrentScene(nextSceneId);
        setDisplayedText([]);
        setTextIndex(0);
        setCharIndex(0);
        setShowChoices(false);
    };

    const calculateEnding = () => {
        const score = (stats.runway / 10000) + (stats.morale * 5) + (stats.reputation * 5) - (stats.stress * 3);
        
        if (score > 30 && stats.morale >= 3 && cofounder) {
            return 'ending_unicorn';
        } else if (score > 15 && stats.morale >= 2) {
            return 'ending_sustainable';
        } else if (stats.stress >= 8 || (!cofounder && stats.morale < 2)) {
            return 'ending_fallout';
        } else if (stats.runway < 5000 || score < 5) {
            return 'ending_failure';
        } else {
            return 'ending_sustainable';
        }
    };

    const handleNameSubmit = () => {
        const name = nameInput.trim() || 'Alex';
        setPlayerName(name);
        audio.playConfirm();
        navigateToScene('first_day');
    };

    const startNewGame = () => {
        setShowMenu(false);
        setCurrentScene('start');
        setDisplayedText([]);
        setTextIndex(0);
        setCharIndex(0);
        setShowChoices(false);
        setStats({ runway: 50000, morale: 3, reputation: 2, stress: 0 });
        setCofounder(null);
        setInvestor(null);
        setWisdom([]);
        setNameInput('');
        localStorage.removeItem('startupFounders98_state');
        audio.playConfirm();
    };

    const continueGame = () => {
        const saved = localStorage.getItem('startupFounders98_state');
        if (saved) {
            const state = JSON.parse(saved);
            setCurrentScene(state.currentScene);
            setPlayerName(state.playerName);
            setStats(state.stats);
            setCofounder(state.cofounder);
            setInvestor(state.investor);
            setWisdom(state.wisdom || []);
            setShowMenu(false);
            setDisplayedText([]);
            setTextIndex(0);
            setCharIndex(0);
            setShowChoices(false);
            audio.playConfirm();
        }
    };

    const toggleSound = () => {
        const enabled = audio.toggle();
        setSoundEnabled(enabled);
    };

    const scene = STORY[currentScene];

    // Main Menu
    if (showMenu) {
        return React.createElement('div', { className: 'game-container' },
            React.createElement('div', { className: 'crt-frame' },
                scanlines && React.createElement('div', { className: 'scanlines' }),
                React.createElement('div', { className: 'menu-screen' },
                    React.createElement('div', { className: 'title-container' },
                        React.createElement('h1', { className: 'game-title' }, 'STARTUP'),
                        React.createElement('h1', { className: 'game-title title-sub' }, 'FOUNDERS'),
                        React.createElement('div', { className: 'title-year' }, "'98")
                    ),
                    React.createElement('div', { className: 'menu-options' },
                        React.createElement('button', { 
                            className: 'menu-button',
                            onClick: startNewGame
                        }, '▶ NEW GAME'),
                        localStorage.getItem('startupFounders98_state') && 
                        React.createElement('button', { 
                            className: 'menu-button',
                            onClick: continueGame
                        }, '▶ CONTINUE'),
                        React.createElement('button', { 
                            className: 'menu-button small',
                            onClick: toggleSound
                        }, soundEnabled ? '♪ SOUND: ON' : '♪ SOUND: OFF'),
                        React.createElement('button', { 
                            className: 'menu-button small',
                            onClick: () => setScanlines(!scanlines)
                        }, scanlines ? '▤ CRT: ON' : '▤ CRT: OFF')
                    ),
                    React.createElement('div', { className: 'endings-display' },
                        React.createElement('div', { className: 'endings-title' }, 'ENDINGS DISCOVERED'),
                        React.createElement('div', { className: 'endings-list' },
                            React.createElement('span', { className: endings.includes('unicorn') ? 'unlocked' : 'locked' }, '🚀'),
                            React.createElement('span', { className: endings.includes('sustainable') ? 'unlocked' : 'locked' }, '🎯'),
                            React.createElement('span', { className: endings.includes('acquihire') ? 'unlocked' : 'locked' }, '🤝'),
                            React.createElement('span', { className: endings.includes('fallout') ? 'unlocked' : 'locked' }, '💔'),
                            React.createElement('span', { className: endings.includes('failure') ? 'unlocked' : 'locked' }, '🔥')
                        )
                    ),
                    React.createElement('div', { className: 'menu-footer' },
                        '"Every startup is a leap of faith."'
                    )
                )
            ),
            React.createElement('footer', { className: 'app-footer' },
                'Made with 🍓 by ',
                React.createElement('a', { href: 'https://berrry.app', target: '_blank' }, 'berrry.app')
            )
        );
    }

    // Wisdom Modal
    if (showWisdom) {
        return React.createElement('div', { className: 'game-container' },
            React.createElement('div', { className: 'crt-frame' },
                scanlines && React.createElement('div', { className: 'scanlines' }),
                React.createElement('div', { className: 'wisdom-modal' },
                    React.createElement('div', { className: 'wisdom-icon' }, '📚'),
                    React.createElement('div', { className: 'wisdom-text' }, currentWisdom),
                    React.createElement('button', { 
                        className: 'wisdom-button',
                        onClick: () => {
                            setShowWisdom(false);
                            const scene = STORY[currentScene];
                            if (scene.choices && scene.choices.length > 0) {
                                // Find the choice that was selected and navigate
                                navigateToScene(scene.choices[0].next);
                            }
                        }
                    }, 'UNDERSTOOD')
                )
            )
        );
    }

    // Game Screen
    return React.createElement('div', { className: 'game-container' },
        React.createElement('div', { className: 'crt-frame' },
            scanlines && React.createElement('div', { className: 'scanlines' }),
            
            // Header
            React.createElement('div', { className: 'game-header' },
                React.createElement('div', { className: 'header-title' }, 'STARTUP FOUNDERS \'98'),
                React.createElement('div', { className: 'header-chapter' }, scene?.chapter || ''),
                React.createElement('div', { className: 'header-controls' },
                    React.createElement('button', { 
                        className: 'header-btn',
                        onClick: () => setShowMenu(true),
                        title: 'Menu'
                    }, '☰')
                )
            ),

            // Main game area
            React.createElement('div', { className: 'game-main' },
                // Portrait and background area
                React.createElement('div', { className: 'portrait-area' },
                    React.createElement('div', { 
                        className: 'background-layer',
                        style: { 
                            backgroundImage: scene?.background ? `url(${BACKGROUNDS[scene.background]})` : 'none'
                        }
                    }),
                    scene?.portrait && React.createElement('img', { 
                        className: 'character-portrait',
                        src: PORTRAITS[scene.portrait],
                        alt: scene.speaker || 'Character'
                    })
                ),

                // Stats sidebar
                React.createElement('div', { className: 'stats-panel' },
                    React.createElement('div', { className: 'stat-item' },
                        React.createElement('div', { className: 'stat-label' }, '💰 RUNWAY'),
                        React.createElement('div', { className: 'stat-value money' }, 
                            '$' + stats.runway.toLocaleString()
                        )
                    ),
                    React.createElement('div', { className: 'stat-item' },
                        React.createElement('div', { className: 'stat-label' }, '❤️ MORALE'),
                        React.createElement('div', { className: 'stat-value' }, 
                            '❤️'.repeat(stats.morale) + '🖤'.repeat(5 - stats.morale)
                        )
                    ),
                    React.createElement('div', { className: 'stat-item' },
                        React.createElement('div', { className: 'stat-label' }, '⭐ REPUTATION'),
                        React.createElement('div', { className: 'stat-value' }, 
                            '⭐'.repeat(stats.reputation) + '☆'.repeat(5 - stats.reputation)
                        )
                    ),
                    React.createElement('div', { className: 'stat-item' },
                        React.createElement('div', { className: 'stat-label' }, '☕ STRESS'),
                        React.createElement('div', { className: 'stat-value' }, 
                            '☕'.repeat(Math.min(stats.stress, 10))
                        )
                    ),
                    cofounder && React.createElement('div', { className: 'stat-item' },
                        React.createElement('div', { className: 'stat-label' }, '👥 CO-FOUNDER'),
                        React.createElement('div', { className: 'stat-value small' }, 
                            cofounder === 'tech' ? 'Maya' : 
                            cofounder === 'hustler' ? 'Derek' : 
                            cofounder === 'ops' ? 'Sam' : '—'
                        )
                    ),
                    investor && React.createElement('div', { className: 'stat-item' },
                        React.createElement('div', { className: 'stat-label' }, '💼 INVESTOR'),
                        React.createElement('div', { className: 'stat-value small' }, 
                            investor === 'sharkVC' ? 'Marcus (VC)' : 
                            investor === 'angel' ? 'Eleanor' : 
                            investor === 'bootstrap' ? 'Self-funded' : '—'
                        )
                    )
                )
            ),

            // Dialogue box
            React.createElement('div', { className: 'dialogue-area', onClick: skipText },
                scene?.speaker && React.createElement('div', { className: 'speaker-name' }, 
                    scene.speaker === 'player' ? playerName.toUpperCase() : scene.speaker.toUpperCase()
                ),
                React.createElement('div', { className: 'dialogue-box', ref: textContainerRef },
                    displayedText.map((text, i) => 
                        React.createElement('p', { key: i, className: 'dialogue-text' }, text)
                    ),
                    isTyping && React.createElement('span', { className: 'cursor' }, '▌')
                ),
                !isTyping && !showChoices && !scene?.inputPrompt && 
                    React.createElement('div', { className: 'advance-indicator' }, '▼ CLICK TO CONTINUE')
            ),

            // Name input
            scene?.inputPrompt && !isTyping && React.createElement('div', { className: 'input-area' },
                React.createElement('div', { className: 'input-prompt' }, scene.inputPrompt),
                React.createElement('input', {
                    type: 'text',
                    className: 'name-input',
                    value: nameInput,
                    onChange: (e) => setNameInput(e.target.value),
                    onKeyPress: (e) => e.key === 'Enter' && handleNameSubmit(),
                    placeholder: scene.defaultInput,
                    maxLength: 20,
                    autoFocus: true
                }),
                React.createElement('button', {
                    className: 'submit-button',
                    onClick: handleNameSubmit
                }, 'CONFIRM')
            ),

            // Choices
            showChoices && scene?.choices && React.createElement('div', { className: 'choices-area' },
                scene.choices.map((choice, i) => 
                    React.createElement('button', {
                        key: i,
                        className: 'choice-button',
                        onClick: () => handleChoice(choice)
                    }, 
                        React.createElement('span', { className: 'choice-number' }, (i + 1) + '.'),
                        React.createElement('span', { className: 'choice-text' }, choice.text)
                    )
                )
            )
        ),
        React.createElement('footer', { className: 'app-footer' },
            'Made with 🍓 by ',
            React.createElement('a', { href: 'https://berrry.app', target: '_blank' }, 'berrry.app')
        )
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));