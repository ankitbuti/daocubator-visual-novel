const { useState, useEffect, useCallback, useRef } = React;

// Game Data
const CHARACTERS = {
  maya: { name: 'MAYA', role: 'Technical Co-founder', color: '#55FFFF', trait: 'pragmatic' },
  jordan: { name: 'JORDAN', role: 'Community Lead', color: '#FF55FF', trait: 'idealist' },
  alex: { name: 'ALEX', role: 'Treasury/Finance', color: '#FFAA55', trait: 'calculating' },
  vera: { name: 'VERA', role: 'Union Mentor', color: '#AA55FF', trait: 'wise' },
  whale: { name: '???', role: 'Anonymous Whale', color: '#AA0000', trait: 'scheming' }
};

const COLLECTIVE_TYPES = [
  { id: 'label', name: 'Record Label', desc: 'Build a collective music empire', icon: '🎵' },
  { id: 'fashion', name: 'Fashion Brand', desc: 'Decentralized fashion collective', icon: '👗' },
  { id: 'artist', name: 'Artist Collective', desc: 'NFT art and creative works', icon: '🎨' }
];

const STORY_CHAPTERS = {
  intro: {
    scenes: [
      {
        id: 'welcome',
        bg: 'coworking',
        dialogue: [
          { speaker: null, text: "The year is 2025. The age of DAOs has truly begun..." },
          { speaker: null, text: "You've watched from the sidelines as collectives rise and fall." },
          { speaker: null, text: "NounsDAO. MakerDAO. The Aragon crisis. You've learned from them all." },
          { speaker: null, text: "Now it's your turn to build something different." }
        ],
        choices: null,
        next: 'choose_collective'
      },
      {
        id: 'choose_collective',
        bg: 'coworking',
        dialogue: [
          { speaker: null, text: "First, you must decide what kind of collective to build..." }
        ],
        choices: COLLECTIVE_TYPES.map(c => ({
          text: `${c.icon} ${c.name}`,
          effect: { collectiveType: c.id },
          next: 'meet_maya'
        }))
      },
      {
        id: 'meet_maya',
        bg: 'coworking',
        character: 'maya',
        dialogue: [
          { speaker: 'maya', text: "Hey! I heard you're starting something interesting." },
          { speaker: 'maya', text: "I'm Maya. Smart contracts, tokenomics, the whole stack." },
          { speaker: 'maya', text: "Look, I've seen too many DAOs fail from idealism alone." },
          { speaker: 'maya', text: "We need solid infrastructure. Governance that actually works." }
        ],
        choices: [
          { text: "I'd love to have you on board!", effect: { relationship_maya: 10, decentralization: -5 }, next: 'meet_jordan' },
          { text: "What's your philosophy on decentralization?", effect: { relationship_maya: 5 }, next: 'maya_philosophy' }
        ]
      },
      {
        id: 'maya_philosophy',
        bg: 'coworking',
        character: 'maya',
        dialogue: [
          { speaker: 'maya', text: "Decentralization is a spectrum, not a binary." },
          { speaker: 'maya', text: "Pure democracy sounds nice until you face a 51% attack." },
          { speaker: 'maya', text: "Aragon learned that the hard way. Remember their governance crisis?" },
          { speaker: 'maya', text: "Smart governance means knowing WHEN to decentralize." }
        ],
        choices: [
          { text: "Pragmatic. I like it. Join me?", effect: { relationship_maya: 15 }, next: 'meet_jordan' },
          { text: "Hmm, I'll think about it.", effect: { relationship_maya: -5 }, next: 'meet_jordan' }
        ]
      },
      {
        id: 'meet_jordan',
        bg: 'discord',
        character: 'jordan',
        dialogue: [
          { speaker: 'jordan', text: "Yo! Your Discord server is blowing up!" },
          { speaker: 'jordan', text: "I'm Jordan. Community building is my thing." },
          { speaker: 'jordan', text: "The tech means nothing without the people, you know?" },
          { speaker: 'jordan', text: "I can help you build something people actually BELIEVE in." }
        ],
        choices: [
          { text: "Community first! Welcome aboard!", effect: { relationship_jordan: 15, community: 10 }, next: 'meet_alex' },
          { text: "How do you handle trolls and bad actors?", effect: { relationship_jordan: 5 }, next: 'jordan_trolls' }
        ]
      },
      {
        id: 'jordan_trolls',
        bg: 'discord',
        character: 'jordan',
        dialogue: [
          { speaker: 'jordan', text: "Ah, the dark side of community building..." },
          { speaker: 'jordan', text: "Troll farms, quiet quitters, vocal non-contributors." },
          { speaker: 'jordan', text: "You need systems. Reputation. Progressive trust." },
          { speaker: 'jordan', text: "But also... sometimes you just gotta have the hard conversations." }
        ],
        choices: [
          { text: "Sounds like you've seen some things. Join us.", effect: { relationship_jordan: 15, community: 5 }, next: 'meet_alex' },
          { text: "Maybe community isn't our priority right now.", effect: { relationship_jordan: -10, community: -10 }, next: 'meet_alex' }
        ]
      },
      {
        id: 'meet_alex',
        bg: 'conference',
        character: 'alex',
        dialogue: [
          { speaker: 'alex', text: "I've been watching your tokenomics draft." },
          { speaker: 'alex', text: "Alex. DeFi background. Treasury management." },
          { speaker: 'alex', text: "You're leaving 40% unallocated? Bold choice." },
          { speaker: 'alex', text: "...Or reckless. Depends on your vesting schedule." }
        ],
        choices: [
          { text: "Show me how to do it right.", effect: { relationship_alex: 10, treasury: 50 }, next: 'token_design' },
          { text: "Community will decide allocation.", effect: { relationship_alex: -5, decentralization: 10 }, next: 'token_design' }
        ]
      },
      {
        id: 'token_design',
        bg: 'blockchain',
        dialogue: [
          { speaker: null, text: "Time to design your token distribution..." },
          { speaker: null, text: "This will shape everything that follows." }
        ],
        choices: [
          { text: "🏛️ Equal split (25% each founder)", effect: { decentralization: 20, governance: 10 }, next: 'chapter1_end' },
          { text: "📊 Merit-based (variable by contribution)", effect: { governance: 15, community: -5 }, next: 'chapter1_end' },
          { text: "🌊 Community majority (60% to treasury)", effect: { decentralization: 25, treasury: 100, governance: -10 }, next: 'chapter1_end' }
        ]
      },
      {
        id: 'chapter1_end',
        bg: 'blockchain',
        dialogue: [
          { speaker: null, text: "The Genesis Block is complete." },
          { speaker: null, text: "Your DAO has been born." },
          { speaker: null, text: "But the real challenges are just beginning..." }
        ],
        choices: [
          { text: "▶ Continue to Chapter 2: Token Generation Event", effect: { day: 30 }, next: 'tge_intro' }
        ]
      }
    ]
  },
  chapter2: {
    scenes: [
      {
        id: 'tge_intro',
        bg: 'blockchain',
        dialogue: [
          { speaker: null, text: "DAY 31. The Token Generation Event approaches." },
          { speaker: null, text: "Early believers are lining up. But so are the vultures." }
        ],
        next: 'investor_pressure'
      },
      {
        id: 'investor_pressure',
        bg: 'conference',
        character: 'alex',
        dialogue: [
          { speaker: 'alex', text: "We have a situation." },
          { speaker: 'alex', text: "A VC fund wants 15% allocation. Private sale." },
          { speaker: 'alex', text: "They're offering serious ETH. Could fund us for 2 years." },
          { speaker: 'alex', text: "But they want board seats. Veto power on major proposals." }
        ],
        choices: [
          { text: "Take the deal. We need runway.", effect: { treasury: 200, decentralization: -25, governance: -15 }, next: 'vc_aftermath' },
          { text: "Counter-offer: money, no veto power.", effect: { treasury: 100, relationship_alex: 5 }, next: 'vc_counter' },
          { text: "Reject. Stay true to decentralization.", effect: { decentralization: 15, community: 10, treasury: -20 }, next: 'vc_reject' }
        ]
      },
      {
        id: 'vc_aftermath',
        bg: 'conference',
        character: 'jordan',
        dialogue: [
          { speaker: 'jordan', text: "...The community is NOT happy." },
          { speaker: 'jordan', text: "Discord is on fire. '#SellOut' is trending." },
          { speaker: 'jordan', text: "Some OGs are threatening to dump their allocation." }
        ],
        choices: [
          { text: "Hold a community call to explain.", effect: { community: 5, governance: 5 }, next: 'tge_launch' },
          { text: "They'll understand when we ship.", effect: { community: -15 }, next: 'tge_launch' }
        ]
      },
      {
        id: 'vc_counter',
        bg: 'conference',
        character: 'alex',
        dialogue: [
          { speaker: 'alex', text: "They... actually took the counter." },
          { speaker: 'alex', text: "100 ETH, no governance rights. Advisory only." },
          { speaker: 'alex', text: "Impressive negotiation. The community respects that." }
        ],
        next: 'tge_launch'
      },
      {
        id: 'vc_reject',
        bg: 'discord',
        character: 'jordan',
        dialogue: [
          { speaker: 'jordan', text: "The community is HYPED." },
          { speaker: 'jordan', text: "'Based founders' they're calling us." },
          { speaker: 'jordan', text: "But Alex is worried about the treasury..." }
        ],
        next: 'tge_launch'
      },
      {
        id: 'tge_launch',
        bg: 'blockchain',
        dialogue: [
          { speaker: null, text: "The TGE goes live." },
          { speaker: null, text: "Tokens are distributed. Governance is active." },
          { speaker: null, text: "For better or worse, you're a real DAO now." }
        ],
        choices: [
          { text: "▶ Continue to Chapter 3: First Crisis", effect: { day: 47 }, next: 'crisis_intro' }
        ]
      }
    ]
  },
  chapter3: {
    scenes: [
      {
        id: 'crisis_intro',
        bg: 'discord',
        dialogue: [
          { speaker: null, text: "DAY 47. The honeymoon phase is over." },
          { speaker: null, text: "A controversial proposal has split the community." }
        ],
        next: 'the_proposal'
      },
      {
        id: 'the_proposal',
        bg: 'conference',
        character: 'maya',
        dialogue: [
          { speaker: 'maya', text: "We have a governance emergency." },
          { speaker: 'maya', text: "Proposal #17: 'Redistribute founder tokens to community.'" },
          { speaker: 'maya', text: "It's gaining traction. 35% support already." },
          { speaker: 'maya', text: "If this passes, we lose control of our own project." }
        ],
        choices: [
          { text: "Rally our supporters. Defeat it democratically.", effect: { governance: 10, community: -5 }, next: 'rally_defense' },
          { text: "Use our veto power.", effect: { decentralization: -30, governance: -10, security: 10 }, next: 'veto_choice' },
          { text: "Actually... maybe they have a point?", effect: { decentralization: 20, community: 15, governance: -5 }, next: 'compromise_path' }
        ]
      },
      {
        id: 'rally_defense',
        bg: 'discord',
        character: 'jordan',
        dialogue: [
          { speaker: 'jordan', text: "The vote is CLOSE." },
          { speaker: 'jordan', text: "48% against, 47% for, 5% abstaining." },
          { speaker: 'jordan', text: "We won... barely." },
          { speaker: 'jordan', text: "But factions are forming. This isn't over." }
        ],
        next: 'factions_form'
      },
      {
        id: 'veto_choice',
        bg: 'conference',
        character: 'vera',
        dialogue: [
          { speaker: 'vera', text: "Ah, the classic founder's dilemma." },
          { speaker: 'vera', text: "I've seen this before, in union organizing." },
          { speaker: 'vera', text: "You can win the battle and lose the war." },
          { speaker: 'vera', text: "The community will remember this." }
        ],
        next: 'factions_form'
      },
      {
        id: 'compromise_path',
        bg: 'conference',
        dialogue: [
          { speaker: null, text: "You propose a middle ground." },
          { speaker: null, text: "Voluntary founder token burn, 10% to community treasury." },
          { speaker: null, text: "The proposal is withdrawn. Trust is... complicated." }
        ],
        next: 'factions_form'
      },
      {
        id: 'factions_form',
        bg: 'discord',
        character: 'whale',
        dialogue: [
          { speaker: 'whale', text: "Interesting governance structure you have..." },
          { speaker: 'whale', text: "I've been... accumulating. Quietly." },
          { speaker: 'whale', text: "Don't worry. I'm just here to help." },
          { speaker: 'whale', text: "For now." }
        ],
        choices: [
          { text: "▶ Continue to Chapter 4: The Attack", effect: { day: 60 }, next: 'attack_intro' }
        ]
      }
    ]
  },
  chapter4: {
    scenes: [
      {
        id: 'attack_intro',
        bg: 'blockchain',
        dialogue: [
          { speaker: null, text: "DAY 60. Something is wrong." },
          { speaker: null, text: "On-chain activity is... unusual." }
        ],
        next: 'attack_detected'
      },
      {
        id: 'attack_detected',
        bg: 'blockchain',
        character: 'maya',
        dialogue: [
          { speaker: 'maya', text: "RED ALERT. We're under attack." },
          { speaker: 'maya', text: "Someone's accumulated 45% of governance tokens." },
          { speaker: 'maya', text: "They're pushing a proposal to drain the treasury." },
          { speaker: 'maya', text: "We have 24 hours before the vote finalizes." }
        ],
        choices: [
          { text: "Emergency protocol! Pause all governance!", effect: { security: 20, decentralization: -30, governance: -20 }, next: 'pause_governance' },
          { text: "Rally the community. We fight democratically.", effect: { community: 10, governance: 10 }, next: 'community_defense' },
          { text: "Negotiate with the whale.", effect: { treasury: -100, security: -10 }, next: 'whale_negotiation' }
        ]
      },
      {
        id: 'pause_governance',
        bg: 'conference',
        character: 'jordan',
        dialogue: [
          { speaker: 'jordan', text: "Governance is paused. The attack is stopped." },
          { speaker: 'jordan', text: "But... people are calling us hypocrites." },
          { speaker: 'jordan', text: "'Decentralized' until it's inconvenient, they say." },
          { speaker: 'jordan', text: "Some are forking. Creating 'TrueDAO'." }
        ],
        next: 'aftermath'
      },
      {
        id: 'community_defense',
        bg: 'discord',
        character: 'vera',
        dialogue: [
          { speaker: 'vera', text: "This is what solidarity looks like." },
          { speaker: 'vera', text: "Small holders are pooling votes. Delegating to trusted voices." },
          { speaker: 'vera', text: "The whale's proposal... it failed. 52% against." },
          { speaker: 'vera', text: "But they're still out there. Waiting." }
        ],
        next: 'aftermath'
      },
      {
        id: 'whale_negotiation',
        bg: 'conference',
        character: 'whale',
        dialogue: [
          { speaker: 'whale', text: "Smart. I respect pragmatism." },
          { speaker: 'whale', text: "100 ETH and I walk away." },
          { speaker: 'whale', text: "Consider it... a governance tax." },
          { speaker: null, text: "The treasury takes a hit. But the DAO survives." }
        ],
        next: 'aftermath'
      },
      {
        id: 'aftermath',
        bg: 'blockchain',
        dialogue: [
          { speaker: null, text: "The immediate crisis has passed." },
          { speaker: null, text: "But the DAO is forever changed." },
          { speaker: null, text: "Time for the final chapter." }
        ],
        choices: [
          { text: "▶ Continue to Chapter 5: Resolution", effect: { day: 90 }, next: 'resolution' }
        ]
      }
    ]
  },
  chapter5: {
    scenes: [
      {
        id: 'resolution',
        bg: 'conference',
        dialogue: [
          { speaker: null, text: "DAY 90. A governance reform proposal is on the table." },
          { speaker: null, text: "This vote will determine the future of your DAO." }
        ],
        next: 'final_vote'
      },
      {
        id: 'final_vote',
        bg: 'conference',
        character: 'maya',
        dialogue: [
          { speaker: 'maya', text: "Three paths forward." },
          { speaker: 'maya', text: "Each one will reshape everything." }
        ],
        choices: [
          { text: "🏛️ Full Decentralization - Remove all founder privileges", effect: { decentralization: 50, governance: -20 }, next: 'ending_calc' },
          { text: "⚖️ Balanced Governance - Checks and balances for all", effect: { governance: 30, community: 10 }, next: 'ending_calc' },
          { text: "👑 Benevolent Leadership - Founders guide, community advises", effect: { governance: 20, decentralization: -30 }, next: 'ending_calc' }
        ]
      },
      {
        id: 'ending_calc',
        bg: 'blockchain',
        dialogue: [
          { speaker: null, text: "The votes are tallied..." },
          { speaker: null, text: "The future unfolds..." }
        ],
        next: 'ending'
      }
    ]
  }
};

const ENDINGS = {
  golden: {
    title: "THE GOLDEN ENDING",
    subtitle: "Collective Prosperity",
    description: "Against all odds, you built something truly special. A DAO that balances decentralization with effective governance. The community thrives, the treasury grows, and your model becomes a blueprint for others.",
    color: "#FFD700"
  },
  tragic: {
    title: "THE TRAGIC ENDING",
    subtitle: "Hostile Takeover",
    description: "The whale won. The treasury is drained. Your collective is a cautionary tale, studied in every DAO governance course. 'They had good intentions,' they'll say. 'But good intentions aren't enough.'",
    color: "#AA0000"
  },
  bureaucratic: {
    title: "THE BUREAUCRATIC ENDING",
    subtitle: "Death by Democracy",
    description: "47 proposals pending. 3 months to pass a simple change. The collective still exists, technically. But nothing ever gets done. Contributors leave for more agile projects. The DAO becomes a ghost town.",
    color: "#666666"
  },
  dictatorship: {
    title: "THE DICTATORSHIP ENDING",
    subtitle: "Founder's Capture",
    description: "You kept control. Everything runs smoothly... under your direction. But is it really a DAO anymore? The community calls it 'Web2 with extra steps.' You wonder if they're wrong.",
    color: "#AA00AA"
  },
  fracture: {
    title: "THE FRACTURE ENDING",
    subtitle: "Community Split",
    description: "The fork was inevitable. Now there are three DAOs, each claiming to be the 'real' vision. None have enough resources to thrive. The dream of unity dies in Discord arguments.",
    color: "#0000AA"
  }
};

const GLOSSARY = {
  "DAO": "Decentralized Autonomous Organization - An organization governed by smart contracts and community voting rather than traditional hierarchy.",
  "TGE": "Token Generation Event - The moment when a project's tokens are created and distributed.",
  "51% Attack": "When a single entity gains majority voting power, allowing them to pass any proposal.",
  "Governance Token": "A token that grants voting rights in a DAO's decision-making process.",
  "Treasury": "The collective funds managed by the DAO, typically controlled by governance votes.",
  "Vesting": "A schedule that releases tokens gradually over time to prevent immediate selling.",
  "Whale": "A holder with a very large token position who can significantly influence markets or votes.",
  "Fork": "When a community splits, creating a new project from an existing one's code or community."
};

// Utility Functions
const typeText = (text, callback, speed = 30) => {
  let i = 0;
  const interval = setInterval(() => {
    if (i < text.length) {
      callback(text.substring(0, i + 1));
      i++;
    } else {
      clearInterval(interval);
    }
  }, speed);
  return interval;
};

// Components
const CRTOverlay = () => {
  return React.createElement('div', { className: 'crt-overlay pointer-events-none fixed inset-0 z-50' });
};

const StatusBar = ({ stats, day }) => {
  return React.createElement('div', { 
    className: 'status-bar flex flex-wrap justify-between items-center p-2 md:p-3 border-b-2 border-cyan gap-2'
  },
    React.createElement('div', { className: 'flex items-center gap-2' },
      React.createElement('span', { className: 'text-yellow text-xs' }, '💰'),
      React.createElement('span', { className: 'text-cyan text-xs' }, `${stats.treasury} ETH`)
    ),
    React.createElement('div', { className: 'flex items-center gap-2' },
      React.createElement('span', { className: 'text-xs text-white' }, 'GOV'),
      React.createElement('div', { className: 'stat-bar w-16 md:w-20' },
        React.createElement('div', { className: 'stat-fill bg-magenta', style: { width: `${stats.governance}%` }})
      )
    ),
    React.createElement('div', { className: 'flex items-center gap-2' },
      React.createElement('span', { className: 'text-xs text-white' }, '❤️'),
      React.createElement('div', { className: 'stat-bar w-16 md:w-20' },
        React.createElement('div', { className: 'stat-fill bg-pink', style: { width: `${stats.community}%` }})
      )
    ),
    React.createElement('div', { className: 'hidden sm:flex items-center gap-2' },
      React.createElement('span', { className: 'text-xs text-white' }, 'DEC'),
      React.createElement('div', { className: 'stat-bar w-16 md:w-20' },
        React.createElement('div', { className: 'stat-fill bg-cyan', style: { width: `${stats.decentralization}%` }})
      )
    ),
    React.createElement('div', { className: 'text-yellow text-xs' }, `DAY ${day}`)
  );
};

const CharacterPortrait = ({ character, expression = 'neutral' }) => {
  if (!character) return null;
  const char = CHARACTERS[character];
  if (!char) return null;
  
  return React.createElement('div', { className: 'character-portrait' },
    React.createElement('div', { 
      className: 'portrait-frame',
      style: { borderColor: char.color }
    },
      React.createElement('img', {
        src: `/api/retrodiffusion/image/128/128/portrait?prompt=anime+${char.trait}+${char.role.replace(/\//g, ' ').replace(/\s+/g, '+')}+${expression}+expression+pc98+style+limited+colors&seed=${character.length * 7}`,
        alt: char.name,
        className: 'w-full h-full object-cover'
      })
    ),
    React.createElement('div', { 
      className: 'portrait-name text-xs mt-1',
      style: { color: char.color }
    }, char.name)
  );
};

const DialogueBox = ({ speaker, text, isTyping, onAdvance }) => {
  const speakerData = speaker ? CHARACTERS[speaker] : null;
  
  return React.createElement('div', { 
    className: 'dialogue-box cursor-pointer',
    onClick: onAdvance
  },
    speakerData && React.createElement('div', { 
      className: 'speaker-name',
      style: { color: speakerData.color }
    }, speakerData.name),
    React.createElement('div', { className: 'dialogue-text' },
      text,
      isTyping && React.createElement('span', { className: 'typing-cursor' }, '▌')
    ),
    !isTyping && React.createElement('div', { className: 'advance-indicator' }, '▼ Click to continue')
  );
};

const ChoicePanel = ({ choices, onChoice, disabled }) => {
  return React.createElement('div', { className: 'choice-panel' },
    choices.map((choice, index) => 
      React.createElement('button', {
        key: index,
        className: `choice-button ${disabled ? 'opacity-50' : ''}`,
        onClick: () => !disabled && onChoice(choice),
        disabled: disabled
      },
        React.createElement('span', { className: 'choice-number' }, `[${index + 1}]`),
        React.createElement('span', { className: 'choice-text' }, choice.text)
      )
    )
  );
};

const Background = ({ scene }) => {
  const backgrounds = {
    coworking: 'modern+coworking+space+with+computers+pixel+art+pc98+style+blue+purple+tones',
    discord: 'abstract+chat+interface+digital+space+purple+neon+pixel+art+pc98',
    conference: 'corporate+meeting+room+with+screens+pixel+art+pc98+style+dark+atmosphere',
    blockchain: 'abstract+blockchain+visualization+nodes+connections+cyan+magenta+pixel+art'
  };
  
  return React.createElement('div', { className: 'game-background' },
    React.createElement('img', {
      src: `/api/retrodiffusion/image/512/256?prompt=${backgrounds[scene] || backgrounds.coworking}&seed=42`,
      alt: 'background',
      className: 'w-full h-full object-cover opacity-60'
    })
  );
};

const MenuScreen = ({ onStart, onContinue, hasSave, unlockedEndings }) => {
  const [showGlossary, setShowGlossary] = useState(false);
  const [showEndings, setShowEndings] = useState(false);
  
  if (showGlossary) {
    return React.createElement('div', { className: 'menu-screen' },
      React.createElement('h2', { className: 'menu-title text-cyan' }, 'GLOSSARY'),
      React.createElement('div', { className: 'glossary-list' },
        Object.entries(GLOSSARY).map(([term, def]) =>
          React.createElement('div', { key: term, className: 'glossary-item' },
            React.createElement('span', { className: 'term text-magenta' }, term),
            React.createElement('span', { className: 'definition text-white' }, def)
          )
        )
      ),
      React.createElement('button', { 
        className: 'menu-button mt-4',
        onClick: () => setShowGlossary(false)
      }, '← BACK')
    );
  }
  
  if (showEndings) {
    return React.createElement('div', { className: 'menu-screen' },
      React.createElement('h2', { className: 'menu-title text-cyan' }, 'ENDINGS'),
      React.createElement('div', { className: 'endings-grid' },
        Object.entries(ENDINGS).map(([key, ending]) =>
          React.createElement('div', { 
            key: key, 
            className: `ending-card ${unlockedEndings.includes(key) ? 'unlocked' : 'locked'}`
          },
            unlockedEndings.includes(key) ? 
              React.createElement('div', null,
                React.createElement('div', { style: { color: ending.color } }, ending.title),
                React.createElement('div', { className: 'text-xs text-gray' }, ending.subtitle)
              ) :
              React.createElement('div', { className: 'text-gray' }, '???')
          )
        )
      ),
      React.createElement('button', { 
        className: 'menu-button mt-4',
        onClick: () => setShowEndings(false)
      }, '← BACK')
    );
  }
  
  return React.createElement('div', { className: 'menu-screen' },
    React.createElement('div', { className: 'menu-title-container' },
      React.createElement('h1', { className: 'game-title glitch-text' }, "DAO '25"),
      React.createElement('div', { className: 'subtitle text-magenta' }, 'NEAR AI PRIVATE CHAT EDITION')
    ),
    React.createElement('div', { className: 'menu-art' },
      React.createElement('img', {
        src: '/api/retrodiffusion/image/256/256?prompt=mysterious+hooded+figure+holding+glowing+token+cyberpunk+anime+pc98+style+purple+cyan+colors&seed=2025',
        alt: 'DAO 25',
        className: 'menu-portrait'
      })
    ),
    React.createElement('div', { className: 'menu-buttons' },
      React.createElement('button', { 
        className: 'menu-button',
        onClick: onStart
      }, '▶ NEW GAME'),
      hasSave && React.createElement('button', { 
        className: 'menu-button',
        onClick: onContinue
      }, '▶ CONTINUE'),
      React.createElement('button', { 
        className: 'menu-button',
        onClick: () => setShowGlossary(true)
      }, '📖 GLOSSARY'),
      React.createElement('button', { 
        className: 'menu-button',
        onClick: () => setShowEndings(true)
      }, '🏆 ENDINGS')
    )
  );
};

const EndingScreen = ({ ending, onRestart }) => {
  const endingData = ENDINGS[ending];
  
  return React.createElement('div', { className: 'ending-screen' },
    React.createElement('div', { 
      className: 'ending-title glitch-text',
      style: { color: endingData.color }
    }, endingData.title),
    React.createElement('div', { className: 'ending-subtitle text-white' }, endingData.subtitle),
    React.createElement('div', { className: 'ending-description' }, endingData.description),
    React.createElement('div', { className: 'ending-art' },
      React.createElement('img', {
        src: `/api/retrodiffusion/image/256/256?prompt=${ending}+ending+symbolic+pixel+art+pc98+style+${endingData.color.replace('#', '')}&seed=${ending.length * 13}`,
        alt: ending,
        className: 'ending-portrait'
      })
    ),
    React.createElement('button', { 
      className: 'menu-button mt-8',
      onClick: onRestart
    }, '↻ PLAY AGAIN')
  );
};

const GameScreen = ({ scene, stats, day, currentDialogue, displayedText, isTyping, character, onAdvance, onChoice }) => {
  return React.createElement('div', { className: 'game-screen' },
    React.createElement(StatusBar, { stats, day }),
    React.createElement('div', { className: 'game-stage' },
      React.createElement(Background, { scene: scene.bg }),
      character && React.createElement('div', { className: 'character-area' },
        React.createElement(CharacterPortrait, { character })
      ),
      React.createElement('div', { className: 'dialogue-area' },
        currentDialogue && React.createElement(DialogueBox, {
          speaker: currentDialogue.speaker,
          text: displayedText,
          isTyping,
          onAdvance
        }),
        scene.choices && !isTyping && React.createElement(ChoicePanel, {
          choices: scene.choices,
          onChoice,
          disabled: isTyping
        })
      )
    )
  );
};

// Main App
const App = () => {
  const [gameState, setGameState] = useState('menu');
  const [chapter, setChapter] = useState('intro');
  const [sceneIndex, setSceneIndex] = useState(0);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [stats, setStats] = useState({
    treasury: 100,
    governance: 50,
    community: 50,
    decentralization: 50,
    security: 50
  });
  const [relationships, setRelationships] = useState({
    maya: 0,
    jordan: 0,
    alex: 0,
    vera: 0
  });
  const [day, setDay] = useState(1);
  const [collectiveType, setCollectiveType] = useState(null);
  const [unlockedEndings, setUnlockedEndings] = useState([]);
  const [currentEnding, setCurrentEnding] = useState(null);
  
  const typingRef = useRef(null);
  
  // Load save
  useEffect(() => {
    const save = localStorage.getItem('dao25_save');
    if (save) {
      const data = JSON.parse(save);
      setUnlockedEndings(data.unlockedEndings || []);
    }
  }, []);
  
  // Save game
  const saveGame = useCallback(() => {
    const saveData = {
      chapter, sceneIndex, dialogueIndex, stats, relationships, day, collectiveType, unlockedEndings
    };
    localStorage.setItem('dao25_save', JSON.stringify(saveData));
  }, [chapter, sceneIndex, dialogueIndex, stats, relationships, day, collectiveType, unlockedEndings]);
  
  // Get current scene
  const getCurrentScene = useCallback(() => {
    const chapterData = STORY_CHAPTERS[chapter];
    if (!chapterData) return null;
    return chapterData.scenes[sceneIndex];
  }, [chapter, sceneIndex]);
  
  const scene = getCurrentScene();
  const currentDialogue = scene?.dialogue?.[dialogueIndex];
  
  // Type text effect
  useEffect(() => {
    if (currentDialogue && gameState === 'playing') {
      setIsTyping(true);
      setDisplayedText('');
      if (typingRef.current) clearInterval(typingRef.current);
      typingRef.current = typeText(currentDialogue.text, setDisplayedText, 25);
      
      const timeout = setTimeout(() => {
        setIsTyping(false);
      }, currentDialogue.text.length * 25 + 100);
      
      return () => {
        if (typingRef.current) clearInterval(typingRef.current);
        clearTimeout(timeout);
      };
    }
  }, [currentDialogue, gameState]);
  
  // Calculate ending
  const calculateEnding = useCallback(() => {
    if (stats.security < 20 || stats.treasury < 0) return 'tragic';
    if (stats.governance < 30) return 'bureaucratic';
    if (stats.decentralization < 25) return 'dictatorship';
    if (stats.community < 30) return 'fracture';
    if (stats.governance > 60 && stats.community > 60 && stats.decentralization > 50) return 'golden';
    return 'fracture';
  }, [stats]);
  
  // Handle dialogue advance
  const handleAdvance = useCallback(() => {
    if (isTyping) {
      if (typingRef.current) clearInterval(typingRef.current);
      setDisplayedText(currentDialogue?.text || '');
      setIsTyping(false);
      return;
    }
    
    if (!scene) return;
    
    // If there are more dialogues
    if (scene.dialogue && dialogueIndex < scene.dialogue.length - 1) {
      setDialogueIndex(d => d + 1);
    } else if (scene.next) {
      // Go to next scene
      goToScene(scene.next);
    }
  }, [isTyping, currentDialogue, scene, dialogueIndex]);
  
  // Go to scene
  const goToScene = useCallback((sceneId) => {
    if (sceneId === 'ending') {
      const ending = calculateEnding();
      setCurrentEnding(ending);
      setUnlockedEndings(prev => {
        const newEndings = prev.includes(ending) ? prev : [...prev, ending];
        localStorage.setItem('dao25_save', JSON.stringify({ unlockedEndings: newEndings }));
        return newEndings;
      });
      setGameState('ending');
      return;
    }
    
    // Find scene in current chapter
    let foundChapter = chapter;
    let foundIndex = STORY_CHAPTERS[chapter]?.scenes.findIndex(s => s.id === sceneId);
    
    // If not found, search other chapters
    if (foundIndex === -1) {
      for (const [chapterKey, chapterData] of Object.entries(STORY_CHAPTERS)) {
        const idx = chapterData.scenes.findIndex(s => s.id === sceneId);
        if (idx !== -1) {
          foundChapter = chapterKey;
          foundIndex = idx;
          break;
        }
      }
    }
    
    if (foundIndex !== -1) {
      setChapter(foundChapter);
      setSceneIndex(foundIndex);
      setDialogueIndex(0);
      saveGame();
    }
  }, [chapter, calculateEnding, saveGame]);
  
  // Handle choice
  const handleChoice = useCallback((choice) => {
    if (choice.effect) {
      setStats(prev => {
        const newStats = { ...prev };
        Object.entries(choice.effect).forEach(([key, value]) => {
          if (key === 'day') {
            setDay(value);
          } else if (key === 'collectiveType') {
            setCollectiveType(value);
          } else if (key.startsWith('relationship_')) {
            setRelationships(r => ({
              ...r,
              [key.replace('relationship_', '')]: (r[key.replace('relationship_', '')] || 0) + value
            }));
          } else if (newStats[key] !== undefined) {
            newStats[key] = Math.max(0, Math.min(100, newStats[key] + value));
          }
        });
        return newStats;
      });
    }
    
    if (choice.next) {
      if (choice.next === 'ending_calc') {
        goToScene('ending');
      } else {
        goToScene(choice.next);
      }
    }
  }, [goToScene]);
  
  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameState !== 'playing') return;
      
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        handleAdvance();
      } else if (scene?.choices && !isTyping) {
        const num = parseInt(e.key);
        if (num >= 1 && num <= scene.choices.length) {
          handleChoice(scene.choices[num - 1]);
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, handleAdvance, scene, isTyping, handleChoice]);
  
  // Start new game
  const handleStart = () => {
    setChapter('intro');
    setSceneIndex(0);
    setDialogueIndex(0);
    setStats({ treasury: 100, governance: 50, community: 50, decentralization: 50, security: 50 });
    setRelationships({ maya: 0, jordan: 0, alex: 0, vera: 0 });
    setDay(1);
    setCollectiveType(null);
    setGameState('playing');
  };
  
  // Continue game
  const handleContinue = () => {
    const save = localStorage.getItem('dao25_save');
    if (save) {
      const data = JSON.parse(save);
      if (data.chapter) {
        setChapter(data.chapter);
        setSceneIndex(data.sceneIndex || 0);
        setDialogueIndex(data.dialogueIndex || 0);
        setStats(data.stats || { treasury: 100, governance: 50, community: 50, decentralization: 50, security: 50 });
        setRelationships(data.relationships || { maya: 0, jordan: 0, alex: 0, vera: 0 });
        setDay(data.day || 1);
        setCollectiveType(data.collectiveType || null);
        setGameState('playing');
      }
    }
  };
  
  // Check for save
  const hasSave = (() => {
    const save = localStorage.getItem('dao25_save');
    return save && JSON.parse(save).chapter;
  })();
  
  return React.createElement('div', { className: 'app-container' },
    React.createElement(CRTOverlay, null),
    gameState === 'menu' && React.createElement(MenuScreen, {
      onStart: handleStart,
      onContinue: handleContinue,
      hasSave,
      unlockedEndings
    }),
    gameState === 'playing' && scene && React.createElement(GameScreen, {
      scene,
      stats,
      day,
      currentDialogue,
      displayedText,
      isTyping,
      character: scene.character,
      onAdvance: handleAdvance,
      onChoice: handleChoice
    }),
    gameState === 'ending' && React.createElement(EndingScreen, {
      ending: currentEnding,
      onRestart: handleStart
    }),
    React.createElement('footer', { className: 'game-footer' },
      React.createElement('a', { 
        href: 'https://berrry.app',
        target: '_blank',
        rel: 'noopener noreferrer',
        className: 'footer-link'
      }, 'Built by 🍓 berrry.app'),
      React.createElement('span', { className: 'footer-badge' }, 'NEAR AI PRIVATE CHAT EDITION')
    )
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));