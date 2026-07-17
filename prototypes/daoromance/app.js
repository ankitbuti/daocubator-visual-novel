const { useState, useEffect, useCallback, useRef } = React;

// PC-98 Color Palette
const COLORS = {
  deepPurple: '#2a1a4a',
  hotPink: '#ff6b9d',
  cyan: '#00d4ff',
  warmOrange: '#ff9b4a',
  cream: '#fff4e6',
  darkBg: '#0a0a12',
  gold: '#ffd700',
  softPink: '#ffb3d9',
  darkPurple: '#1a0a2e',
  neonGreen: '#39ff14'
};

// Character Data
const CHARACTERS = {
  aiko: {
    name: 'AIKO',
    title: 'The True Believer',
    color: '#ff6b9d',
    description: 'Pastel pink hair, starry eyes, always wearing DAO merch. Intense idealist energy.',
    stats: { loyalty: 85, trust: 70, influence: 60 },
    expressions: ['neutral', 'happy', 'flustered', 'determined']
  },
  drake: {
    name: 'DRAKE',
    title: 'The Mercenary',
    color: '#ffd700',
    description: 'Sharp features, expensive taste, always checking prices. Dangerous charm.',
    stats: { loyalty: 45, trust: 35, influence: 90 },
    expressions: ['neutral', 'smirk', 'intense', 'calculating']
  },
  spectre: {
    name: 'SPECTRE',
    title: 'The Ghost',
    color: '#00d4ff',
    description: 'Hoodie shadow, only known by PFP. Anonymous contributor with trust issues.',
    stats: { loyalty: 60, trust: 25, influence: 75 },
    expressions: ['neutral', 'curious', 'withdrawn', 'vulnerable']
  },
  maya: {
    name: 'MAYA',
    title: 'The Builder',
    color: '#39ff14',
    description: 'Practical aesthetic, always has laptop. Ships code, not vibes.',
    stats: { loyalty: 90, trust: 80, influence: 70 },
    expressions: ['neutral', 'focused', 'tired', 'proud']
  },
  senator: {
    name: 'SENATOR',
    title: 'The Politician',
    color: '#ff9b4a',
    description: 'Polished appearance, perfect smile, strategic everything.',
    stats: { loyalty: 50, trust: 40, influence: 95 },
    expressions: ['neutral', 'charming', 'scheming', 'sincere']
  },
  atlas: {
    name: 'ATLAS',
    title: 'The Whale',
    color: '#9b4aff',
    description: 'Luxurious presence, mysterious wealth, protective energy.',
    stats: { loyalty: 70, trust: 55, influence: 100 },
    expressions: ['neutral', 'generous', 'guarded', 'tender']
  }
};

// Story Chapters
const STORY = {
  chapter1: {
    title: 'Genesis',
    subtitle: 'Day 1 - The Beginning',
    scenes: [
      {
        id: 'intro',
        background: 'discord',
        dialogue: [
          { speaker: 'narrator', text: 'The Discord notification echoes through your apartment at 2:47 AM...' },
          { speaker: 'narrator', text: 'Another sleepless night. Another governance proposal. Another dream of collective prosperity.' },
          { speaker: 'aiko', text: 'Hey! You\'re still up? Perfect timing - I have this CRAZY idea for our tokenomics...', expression: 'happy' },
          { speaker: 'narrator', text: 'Her enthusiasm is infectious, even through pixels and text.' }
        ],
        choices: [
          { text: '💭 "Tell me everything, I\'m all ears"', effects: { aiko: 10, treasury: 0 }, tag: 'ROMANTIC' },
          { text: '📊 "Send me the spreadsheet first"', effects: { aiko: -5, treasury: 5 }, tag: 'GOVERNANCE' },
          { text: '😴 "Can this wait until morning?"', effects: { aiko: -10, treasury: 0 }, tag: 'RISKY' }
        ]
      },
      {
        id: 'first_meeting',
        background: 'conference',
        dialogue: [
          { speaker: 'narrator', text: 'ETHDenver. The hallways buzz with builders, dreamers, and opportunists.' },
          { speaker: 'drake', text: 'Well, well... if it isn\'t the mysterious founder. Your token charts look... interesting.', expression: 'smirk' },
          { speaker: 'narrator', text: 'His eyes flick to his phone - checking prices even as he speaks to you.' },
          { speaker: 'drake', text: 'I could help you with that liquidity problem. For the right... arrangement.', expression: 'intense' }
        ],
        choices: [
          { text: '🤝 "What kind of arrangement?"', effects: { drake: 10, treasury: -10 }, tag: 'RISKY' },
          { text: '🚫 "We don\'t do backroom deals"', effects: { drake: -5, trust: 10 }, tag: 'GOVERNANCE' },
          { text: '😏 "Buy me a drink first"', effects: { drake: 15, treasury: 0 }, tag: 'ROMANTIC' }
        ]
      },
      {
        id: 'late_night',
        background: 'apartment',
        dialogue: [
          { speaker: 'narrator', text: 'The hotel room is quiet. Too quiet. A message appears...' },
          { speaker: 'spectre', text: '[ENCRYPTED] Saw the smart contract. There\'s a vulnerability. We should talk.', expression: 'neutral' },
          { speaker: 'narrator', text: 'No profile picture. No real name. Just a reputation for being right.' },
          { speaker: 'spectre', text: 'Voice call? I\'ll keep my camera off. Old habits.', expression: 'curious' }
        ],
        choices: [
          { text: '📞 Accept the call', effects: { spectre: 15, security: 10 }, tag: 'SECURITY' },
          { text: '❓ "Who are you really?"', effects: { spectre: -5, trust: 5 }, tag: 'RISKY' },
          { text: '💬 "Text only. For now."', effects: { spectre: 5, security: 5 }, tag: 'GOVERNANCE' }
        ]
      }
    ]
  },
  chapter2: {
    title: 'Coordination',
    subtitle: 'Day 23 - Building Together',
    scenes: [
      {
        id: 'governance_debate',
        background: 'discord',
        dialogue: [
          { speaker: 'maya', text: '*typing sounds* The voting mechanism is flawed. I can prove it mathematically.', expression: 'focused' },
          { speaker: 'senator', text: 'Math is one thing, politics is another. We need buy-in, not just correctness.', expression: 'charming' },
          { speaker: 'aiko', text: 'Why can\'t we have BOTH? This is supposed to be different!', expression: 'determined' },
          { speaker: 'narrator', text: 'The tension in the voice chat is palpable. Everyone is waiting for you to decide.' }
        ],
        choices: [
          { text: '🧮 Side with Maya\'s technical approach', effects: { maya: 15, senator: -10, governance: 10 }, tag: 'GOVERNANCE' },
          { text: '🎭 Support Senator\'s political strategy', effects: { senator: 15, maya: -10, governance: -5 }, tag: 'RISKY' },
          { text: '💕 Ask Aiko to help find middle ground', effects: { aiko: 10, maya: 5, senator: 5 }, tag: 'ROMANTIC' }
        ]
      },
      {
        id: 'treasury_crisis',
        background: 'conference',
        dialogue: [
          { speaker: 'atlas', text: 'I could solve your runway problem. One transaction.', expression: 'generous' },
          { speaker: 'narrator', text: 'The offer hangs in the air. 500 ETH. No strings attached. Or so they say.' },
          { speaker: 'atlas', text: 'I believe in what you\'re building. Let me... support you.', expression: 'tender' },
          { speaker: 'drake', text: '*whispering* Careful. Whales always want something.', expression: 'calculating' }
        ],
        choices: [
          { text: '💰 Accept the investment', effects: { atlas: 20, treasury: 50, governance: -15 }, tag: 'RISKY' },
          { text: '🤔 "What do you want in return?"', effects: { atlas: 5, trust: 10 }, tag: 'GOVERNANCE' },
          { text: '❌ Politely decline', effects: { atlas: -10, treasury: -20, governance: 10 }, tag: 'SECURITY' }
        ]
      }
    ]
  },
  chapter3: {
    title: 'Tension',
    subtitle: 'Day 47 - Pre-TGE Chaos',
    scenes: [
      {
        id: 'the_leak',
        background: 'apartment',
        dialogue: [
          { speaker: 'narrator', text: 'Your phone buzzes at 3 AM. Then again. And again.' },
          { speaker: 'maya', text: 'Someone leaked the tokenomics. CT is going crazy. We need damage control NOW.', expression: 'tired' },
          { speaker: 'senator', text: 'I can spin this. But I need you to trust me completely.', expression: 'sincere' },
          { speaker: 'spectre', text: '[ENCRYPTED] I know who leaked it. But you won\'t like the answer.', expression: 'withdrawn' }
        ],
        choices: [
          { text: '🎭 Let Senator handle PR', effects: { senator: 15, spectre: -10, trust: -10 }, tag: 'RISKY' },
          { text: '🔍 Investigate with Spectre', effects: { spectre: 20, senator: -5, security: 15 }, tag: 'SECURITY' },
          { text: '💪 Address it yourself publicly', effects: { governance: 10, trust: 5 }, tag: 'GOVERNANCE' }
        ]
      },
      {
        id: 'late_night_call',
        background: 'apartment',
        dialogue: [
          { speaker: 'narrator', text: 'The Discord call has been going for hours. Everyone else has dropped off.' },
          { speaker: 'aiko', text: 'Hey... are you still there? I couldn\'t sleep either.', expression: 'flustered' },
          { speaker: 'narrator', text: 'Her voice is softer now. More vulnerable. The professional distance melting away.' },
          { speaker: 'aiko', text: 'Do you ever wonder if we\'re doing the right thing? Building something real?', expression: 'neutral' }
        ],
        choices: [
          { text: '💕 "I know we are. Especially with you here."', effects: { aiko: 25 }, tag: 'ROMANTIC' },
          { text: '🤔 "I have doubts too. But we push forward."', effects: { aiko: 10, trust: 5 }, tag: 'GOVERNANCE' },
          { text: '😔 "Maybe we should get some sleep..."', effects: { aiko: -5 }, tag: 'RISKY' }
        ]
      }
    ]
  }
};

// Image cache to track loaded images
const imageCache = new Map();

// Preload an image and return a promise
const preloadImage = (url) => {
  if (imageCache.has(url)) {
    return Promise.resolve(imageCache.get(url));
  }
  
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      imageCache.set(url, url);
      resolve(url);
    };
    img.onerror = () => {
      reject(new Error(`Failed to load: ${url}`));
    };
    img.src = url;
  });
};

// Utility functions
const getCharacterPortrait = (charId, expression = 'neutral') => {
  const prompts = {
    aiko: `anime+girl+pink+hair+starry+eyes+${expression}+expression+pc98+style+pixel+art+portrait+retro+dating+sim`,
    drake: `anime+man+sharp+features+expensive+suit+${expression}+expression+pc98+style+pixel+art+portrait+retro+dating+sim`,
    spectre: `mysterious+anime+figure+hoodie+shadow+${expression}+expression+pc98+style+pixel+art+portrait+retro`,
    maya: `anime+woman+practical+style+laptop+coffee+${expression}+expression+pc98+style+pixel+art+portrait+retro`,
    senator: `anime+man+polished+politician+${expression}+expression+pc98+style+pixel+art+portrait+retro+dating+sim`,
    atlas: `anime+person+luxurious+wealthy+mysterious+${expression}+expression+pc98+style+pixel+art+portrait+retro`
  };
  const seed = charId.length * 100 + expression.length;
  return `/api/retrodiffusion/image/256/256/portrait?prompt=${prompts[charId] || prompts.aiko}&seed=${seed}`;
};

// Background configs with seeds for consistency
const BACKGROUNDS = {
  discord: {
    prompt: 'dark+discord+server+interface+late+night+computer+screen+pc98+aesthetic+pixel+art+vaporwave+purple+glow',
    seed: 42
  },
  conference: {
    prompt: 'crypto+conference+hall+ethereum+banners+neon+lights+pc98+style+pixel+art+cyberpunk+crowd',
    seed: 123
  },
  apartment: {
    prompt: 'cozy+apartment+night+city+view+computer+desk+warm+lighting+pc98+style+pixel+art+aesthetic+window',
    seed: 256
  },
  rooftop: {
    prompt: 'rooftop+bar+night+city+skyline+neon+signs+pc98+style+pixel+art+romantic+atmosphere+stars',
    seed: 789
  }
};

const getBackground = (bgType) => {
  const bg = BACKGROUNDS[bgType] || BACKGROUNDS.discord;
  return `/api/retrodiffusion/image/512/256/texture?prompt=${bg.prompt}&seed=${bg.seed}`;
};

// Title background
const getTitleBackground = () => {
  return `/api/retrodiffusion/image/512/512/texture?prompt=ethereal+cherry+blossoms+floating+ethereum+symbols+hearts+dark+purple+background+pc98+aesthetic+pixel+art+romantic&seed=777`;
};

// Components
const Scanlines = () => {
  return React.createElement('div', { className: 'scanlines' });
};

const PixelBorder = ({ children, className = '' }) => {
  return React.createElement('div', { className: `pixel-border ${className}` }, children);
};

const TypewriterText = ({ text, speed = 30, onComplete }) => {
  const [displayed, setDisplayed] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    setDisplayed('');
    setIsComplete(false);
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setIsComplete(true);
        onComplete && onComplete();
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text]);
  
  return React.createElement('span', { className: 'typewriter-text' }, 
    displayed,
    !isComplete && React.createElement('span', { className: 'cursor' }, '▌')
  );
};

const RelationshipMeter = ({ character, value }) => {
  const char = CHARACTERS[character];
  return React.createElement('div', { className: 'relationship-meter' },
    React.createElement('div', { className: 'meter-label', style: { color: char.color } }, char.name),
    React.createElement('div', { className: 'meter-bar-container' },
      React.createElement('div', { 
        className: 'meter-bar',
        style: { width: `${value}%`, background: `linear-gradient(90deg, ${char.color}, ${COLORS.hotPink})` }
      }),
      Array.from({ length: 10 }).map((_, i) => 
        React.createElement('div', { key: i, className: 'meter-segment' })
      )
    ),
    React.createElement('div', { className: 'meter-hearts' },
      Array.from({ length: 5 }).map((_, i) => 
        React.createElement('span', { 
          key: i, 
          className: value > i * 20 ? 'heart-filled' : 'heart-empty' 
        }, '♥')
      )
    )
  );
};

const TreasuryPanel = ({ treasury, governance }) => {
  return React.createElement('div', { className: 'treasury-panel' },
    React.createElement('div', { className: 'treasury-header' }, '◆ TREASURY STATUS ◆'),
    React.createElement('div', { className: 'treasury-stats' },
      React.createElement('div', { className: 'stat-row' },
        React.createElement('span', { className: 'stat-label' }, 'ETH BALANCE'),
        React.createElement('span', { className: 'stat-value lcd-text' }, `${treasury.toFixed(2)} Ξ`)
      ),
      React.createElement('div', { className: 'stat-row' },
        React.createElement('span', { className: 'stat-label' }, 'GOVERNANCE'),
        React.createElement('div', { className: 'governance-bar' },
          React.createElement('div', { 
            className: 'governance-fill',
            style: { width: `${governance}%` }
          })
        )
      ),
      React.createElement('div', { className: 'stat-row' },
        React.createElement('span', { className: 'stat-label' }, 'RISK LEVEL'),
        React.createElement('span', { 
          className: 'stat-value',
          style: { color: governance < 40 ? COLORS.warmOrange : COLORS.neonGreen }
        }, governance < 40 ? '⚠ HIGH' : '✓ STABLE')
      )
    )
  );
};

// LoadingImage component with retry and fallback
const LoadingImage = ({ src, alt, className, fallbackColor = COLORS.deepPurple, onLoad }) => {
  const [status, setStatus] = useState('loading');
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 2;
  
  const handleLoad = () => {
    setStatus('loaded');
    onLoad && onLoad();
  };
  
  const handleError = () => {
    if (retryCount < maxRetries) {
      setRetryCount(prev => prev + 1);
      setStatus('loading');
    } else {
      setStatus('error');
    }
  };
  
  // Add cache-busting for retries
  const imageSrc = retryCount > 0 ? `${src}&retry=${retryCount}` : src;
  
  return React.createElement('div', { 
    className: `loading-image-container ${className || ''}`,
    style: { position: 'relative', width: '100%', height: '100%' }
  },
    status === 'loading' && React.createElement('div', { 
      className: 'image-loading-placeholder',
      style: { 
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(45deg, ${fallbackColor}, ${COLORS.darkPurple})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    },
      React.createElement('div', { className: 'loading-spinner' }, '◆')
    ),
    status === 'error' && React.createElement('div', { 
      className: 'image-error-placeholder',
      style: { 
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(135deg, ${fallbackColor}, ${COLORS.darkPurple})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    },
      React.createElement('span', { 
        style: { 
          color: COLORS.hotPink,
          fontSize: '2rem',
          textShadow: `0 0 10px ${COLORS.hotPink}`
        }
      }, '✧')
    ),
    React.createElement('img', {
      src: imageSrc,
      alt,
      onLoad: handleLoad,
      onError: handleError,
      style: { 
        opacity: status === 'loaded' ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      },
      className: status === 'loaded' ? 'image-loaded' : ''
    })
  );
};

const CharacterSprite = ({ character, expression = 'neutral', position = 'center' }) => {
  const [loaded, setLoaded] = useState(false);
  const charData = CHARACTERS[character];
  
  return React.createElement('div', { 
    className: `character-sprite ${position} ${loaded ? 'visible' : ''}` 
  },
    React.createElement('div', { className: 'sprite-wrapper' },
      React.createElement(LoadingImage, {
        src: getCharacterPortrait(character, expression),
        alt: charData?.name || character,
        className: 'sprite-image-container',
        fallbackColor: charData?.color || COLORS.hotPink,
        onLoad: () => setLoaded(true)
      })
    ),
    React.createElement('div', { className: 'sprite-glow', style: { background: charData?.color } })
  );
};

const DialogueBox = ({ speaker, text, onAdvance, showChoices }) => {
  const [textComplete, setTextComplete] = useState(false);
  const char = CHARACTERS[speaker];
  
  return React.createElement('div', { className: 'dialogue-box', onClick: textComplete && !showChoices ? onAdvance : null },
    speaker !== 'narrator' && React.createElement('div', { 
      className: 'speaker-name',
      style: { background: char?.color || COLORS.cream }
    }, char?.name || speaker.toUpperCase()),
    React.createElement('div', { className: 'dialogue-text' },
      React.createElement(TypewriterText, { 
        text, 
        speed: 25,
        onComplete: () => setTextComplete(true)
      })
    ),
    textComplete && !showChoices && React.createElement('div', { className: 'continue-indicator' }, '▼ CLICK TO CONTINUE')
  );
};

const ChoiceButton = ({ choice, onSelect, index }) => {
  const tagColors = {
    ROMANTIC: COLORS.hotPink,
    GOVERNANCE: COLORS.cyan,
    RISKY: COLORS.warmOrange,
    SECURITY: COLORS.neonGreen
  };
  
  return React.createElement('button', {
    className: 'choice-button',
    onClick: () => onSelect(choice),
    style: { animationDelay: `${index * 0.1}s` }
  },
    React.createElement('span', { className: 'choice-text' }, choice.text),
    choice.tag && React.createElement('span', { 
      className: 'choice-tag',
      style: { background: tagColors[choice.tag] || COLORS.cream }
    }, `[${choice.tag}]`)
  );
};

const TitleScreen = ({ onStart, onContinue, hasSave }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setShowMenu(true), 1000);
    return () => clearTimeout(timer);
  }, []);
  
  return React.createElement('div', { className: 'title-screen' },
    React.createElement('div', { className: 'title-bg' },
      React.createElement(LoadingImage, {
        src: getTitleBackground(),
        alt: 'background',
        className: 'title-bg-image',
        fallbackColor: COLORS.deepPurple,
        onLoad: () => setBgLoaded(true)
      })
    ),
    React.createElement('div', { className: 'title-content' },
      React.createElement('div', { className: 'title-logo' },
        React.createElement('div', { className: 'title-jp' }, 'ダオロマンス'),
        React.createElement('h1', { className: 'title-main' }, 'DAO ROMANCE'),
        React.createElement('div', { className: 'title-sub' }, '~ Collective Prosperity & Love ~')
      ),
      showMenu && React.createElement('div', { className: 'title-menu' },
        React.createElement('button', { className: 'menu-button', onClick: onStart }, '► NEW GAME'),
        hasSave && React.createElement('button', { className: 'menu-button', onClick: onContinue }, '► CONTINUE'),
        React.createElement('button', { className: 'menu-button disabled' }, '► GALLERY'),
        React.createElement('button', { className: 'menu-button disabled' }, '► SETTINGS')
      ),
      React.createElement('div', { className: 'title-footer' },
        'Press any key to start • 2024 berrry.app'
      )
    ),
    React.createElement('div', { className: 'floating-tokens' },
      ['Ξ', '♥', '◆', '✦', '♦'].map((token, i) => 
        React.createElement('span', { 
          key: i, 
          className: 'floating-token',
          style: { 
            animationDelay: `${i * 0.5}s`,
            left: `${15 + i * 18}%`
          }
        }, token)
      )
    )
  );
};

const GameScreen = ({ gameState, onChoice, onAdvance }) => {
  const { currentScene, dialogueIndex, relationships, treasury, governance } = gameState;
  const scene = currentScene;
  const currentDialogue = scene?.dialogue[dialogueIndex];
  const showChoices = dialogueIndex >= scene?.dialogue.length;
  const activeCharacter = currentDialogue?.speaker !== 'narrator' ? currentDialogue?.speaker : null;
  
  return React.createElement('div', { className: 'game-screen' },
    React.createElement('div', { className: 'game-frame' },
      // Background
      React.createElement('div', { className: 'scene-background' },
        React.createElement(LoadingImage, {
          src: getBackground(scene?.background),
          alt: 'scene background',
          className: 'bg-image',
          fallbackColor: COLORS.darkPurple
        }),
        React.createElement('div', { className: 'bg-overlay' })
      ),
      
      // Character display area
      React.createElement('div', { className: 'character-area' },
        activeCharacter && React.createElement(CharacterSprite, {
          character: activeCharacter,
          expression: currentDialogue?.expression,
          position: 'center'
        })
      ),
      
      // Quick menu
      React.createElement('div', { className: 'quick-menu' },
        ['SAVE', 'LOAD', 'LOG', 'AUTO'].map(btn =>
          React.createElement('button', { key: btn, className: 'quick-btn' }, btn)
        )
      ),
      
      // Status indicators
      React.createElement('div', { className: 'status-bar' },
        React.createElement('span', { className: 'chapter-indicator' }, 
          `Day ${gameState.day} • ${gameState.chapterTitle}`
        ),
        React.createElement('span', { className: 'treasury-mini' }, `Ξ ${treasury.toFixed(1)}`)
      ),
      
      // Dialogue or choices
      !showChoices ? React.createElement(DialogueBox, {
        speaker: currentDialogue?.speaker,
        text: currentDialogue?.text,
        onAdvance,
        showChoices: false
      }) : React.createElement('div', { className: 'choices-container' },
        scene.choices.map((choice, i) => 
          React.createElement(ChoiceButton, {
            key: i,
            choice,
            index: i,
            onSelect: onChoice
          })
        )
      )
    ),
    
    // Side panel (relationships)
    React.createElement('div', { className: 'side-panel' },
      React.createElement(TreasuryPanel, { treasury, governance }),
      React.createElement('div', { className: 'relationships-panel' },
        React.createElement('div', { className: 'panel-header' }, '♥ BONDS ♥'),
        Object.keys(relationships).map(char =>
          React.createElement(RelationshipMeter, {
            key: char,
            character: char,
            value: relationships[char]
          })
        )
      )
    ),
    
    React.createElement(Scanlines)
  );
};

const WisdomPopup = ({ wisdom, onClose }) => {
  return React.createElement('div', { className: 'wisdom-overlay', onClick: onClose },
    React.createElement('div', { className: 'wisdom-popup' },
      React.createElement('div', { className: 'wisdom-header' }, '◆ PROTOCOL INSIGHT ◆'),
      React.createElement('div', { className: 'wisdom-text' }, wisdom),
      React.createElement('div', { className: 'wisdom-footer' }, '[ CLICK TO CONTINUE ]')
    )
  );
};

const EndingScreen = ({ ending, onRestart }) => {
  const endings = {
    moon_mission: { title: 'MOON MISSION 🌙', desc: 'The DAO succeeded. You found true love. Collective prosperity achieved.' },
    soft_rug: { title: 'SOFT RUG 💔', desc: 'The project failed... but the relationships survived.' },
    hard_fork: { title: 'HARD FORK ⚡', desc: 'The DAO split. Your faction thrives on its own path.' },
    ragequit_romance: { title: 'RAGEQUIT ROMANCE 💕', desc: 'You left the DAO. But you kept the love.' },
    solo_founder: { title: 'SOLO FOUNDER 👤', desc: 'Success achieved. But at what cost?' },
    coordination_failure: { title: 'COORDINATION FAILURE ❌', desc: 'Everything fell apart. A lesson in what not to do.' }
  };
  
  const e = endings[ending] || endings.coordination_failure;
  const endingSeed = ending ? ending.length * 111 : 999;
  const endingPrompt = ending && ending.includes('romance') 
    ? 'anime+couple+romantic+scene+sunset+pc98+style+pixel+art+ending+scene+happy'
    : 'anime+dramatic+scene+sunset+pc98+style+pixel+art+ending+scene+emotional';
  
  return React.createElement('div', { className: 'ending-screen' },
    React.createElement('div', { className: 'ending-content' },
      React.createElement('div', { className: 'ending-label' }, '~ ENDING ACHIEVED ~'),
      React.createElement('h2', { className: 'ending-title' }, e.title),
      React.createElement('p', { className: 'ending-desc' }, e.desc),
      React.createElement('div', { className: 'ending-cg' },
        React.createElement(LoadingImage, {
          src: `/api/retrodiffusion/image/256/256/portrait?prompt=${endingPrompt}&seed=${endingSeed}`,
          alt: 'ending scene',
          fallbackColor: COLORS.hotPink
        })
      ),
      React.createElement('button', { className: 'menu-button', onClick: onRestart }, '► NEW GAME'),
      React.createElement('div', { className: 'ending-stats' },
        'Thank you for playing DAO ROMANCE',
        React.createElement('br'),
        'More endings await...'
      )
    )
  );
};

// Main App
const App = () => {
  const [screen, setScreen] = useState('title');
  const [gameState, setGameState] = useState({
    chapter: 'chapter1',
    sceneIndex: 0,
    dialogueIndex: 0,
    currentScene: null,
    chapterTitle: 'Genesis',
    day: 1,
    relationships: {
      aiko: 50,
      drake: 30,
      spectre: 20,
      maya: 40,
      senator: 35,
      atlas: 25
    },
    treasury: 100,
    governance: 65,
    trust: 50,
    security: 40,
    flags: {},
    ending: null
  });
  const [showWisdom, setShowWisdom] = useState(null);
  const [hasSave, setHasSave] = useState(false);
  
  // Check for save on mount
  useEffect(() => {
    const save = localStorage.getItem('dao_romance_save');
    if (save) setHasSave(true);
  }, []);
  
  // Load scene
  useEffect(() => {
    if (screen === 'game') {
      const chapter = STORY[gameState.chapter];
      if (chapter && chapter.scenes[gameState.sceneIndex]) {
        setGameState(prev => ({
          ...prev,
          currentScene: chapter.scenes[gameState.sceneIndex],
          chapterTitle: chapter.title
        }));
      }
    }
  }, [screen, gameState.chapter, gameState.sceneIndex]);
  
  const startNewGame = () => {
    setGameState(prev => ({
      ...prev,
      chapter: 'chapter1',
      sceneIndex: 0,
      dialogueIndex: 0,
      day: 1,
      relationships: { aiko: 50, drake: 30, spectre: 20, maya: 40, senator: 35, atlas: 25 },
      treasury: 100,
      governance: 65,
      trust: 50,
      security: 40,
      flags: {},
      ending: null
    }));
    setScreen('game');
    
    // Show intro wisdom
    setTimeout(() => {
      setShowWisdom('DAOs are experiments in collective coordination. Every choice ripples through the network. Choose wisely, founder.');
    }, 2000);
  };
  
  const loadGame = () => {
    const save = localStorage.getItem('dao_romance_save');
    if (save) {
      setGameState(JSON.parse(save));
      setScreen('game');
    }
  };
  
  const saveGame = () => {
    localStorage.setItem('dao_romance_save', JSON.stringify(gameState));
    setHasSave(true);
  };
  
  const advanceDialogue = () => {
    setGameState(prev => ({
      ...prev,
      dialogueIndex: prev.dialogueIndex + 1
    }));
  };
  
  const handleChoice = (choice) => {
    const effects = choice.effects;
    
    setGameState(prev => {
      const newRelationships = { ...prev.relationships };
      let newTreasury = prev.treasury;
      let newGovernance = prev.governance;
      let newTrust = prev.trust;
      let newSecurity = prev.security;
      
      Object.entries(effects).forEach(([key, value]) => {
        if (newRelationships[key] !== undefined) {
          newRelationships[key] = Math.max(0, Math.min(100, newRelationships[key] + value));
        } else if (key === 'treasury') {
          newTreasury = Math.max(0, newTreasury + value);
        } else if (key === 'governance') {
          newGovernance = Math.max(0, Math.min(100, newGovernance + value));
        } else if (key === 'trust') {
          newTrust = Math.max(0, Math.min(100, newTrust + value));
        } else if (key === 'security') {
          newSecurity = Math.max(0, Math.min(100, newSecurity + value));
        }
      });
      
      // Move to next scene
      const chapter = STORY[prev.chapter];
      let nextSceneIndex = prev.sceneIndex + 1;
      let nextChapter = prev.chapter;
      let nextDay = prev.day + 1;
      
      if (nextSceneIndex >= chapter.scenes.length) {
        // Move to next chapter
        const chapters = Object.keys(STORY);
        const chapterIndex = chapters.indexOf(prev.chapter);
        if (chapterIndex < chapters.length - 1) {
          nextChapter = chapters[chapterIndex + 1];
          nextSceneIndex = 0;
          nextDay = prev.day + 10;
          
          // Show wisdom between chapters
          const wisdoms = [
            'Governance is not just voting. It\'s building trust over time.',
            'In DAOs, your reputation IS your identity. Guard it well.',
            'The hardest coordination problems are the human ones.',
            'Treasury management is stewardship, not ownership.'
          ];
          setTimeout(() => {
            setShowWisdom(wisdoms[chapterIndex] || wisdoms[0]);
          }, 500);
        } else {
          // Game end - determine ending
          const ending = determineEnding(newRelationships, newTreasury, newGovernance, newTrust);
          return { ...prev, ending };
        }
      }
      
      saveGame();
      
      return {
        ...prev,
        relationships: newRelationships,
        treasury: newTreasury,
        governance: newGovernance,
        trust: newTrust,
        security: newSecurity,
        sceneIndex: nextSceneIndex,
        chapter: nextChapter,
        dialogueIndex: 0,
        day: nextDay
      };
    });
  };
  
  const determineEnding = (relationships, treasury, governance, trust) => {
    const maxRelationship = Object.entries(relationships).reduce((a, b) => b[1] > a[1] ? b : a);
    
    if (treasury > 80 && governance > 70 && maxRelationship[1] > 80) {
      return 'moon_mission';
    } else if (treasury < 20 && maxRelationship[1] > 60) {
      return 'soft_rug';
    } else if (governance < 30) {
      return 'hard_fork';
    } else if (maxRelationship[1] > 90 && treasury < 50) {
      return 'ragequit_romance';
    } else if (treasury > 70 && maxRelationship[1] < 40) {
      return 'solo_founder';
    } else {
      return 'coordination_failure';
    }
  };
  
  // Check for ending
  useEffect(() => {
    if (gameState.ending) {
      setScreen('ending');
    }
  }, [gameState.ending]);
  
  return React.createElement('div', { className: 'app-container' },
    screen === 'title' && React.createElement(TitleScreen, {
      onStart: startNewGame,
      onContinue: loadGame,
      hasSave
    }),
    
    screen === 'game' && gameState.currentScene && React.createElement(GameScreen, {
      gameState,
      onChoice: handleChoice,
      onAdvance: advanceDialogue
    }),
    
    screen === 'ending' && React.createElement(EndingScreen, {
      ending: gameState.ending,
      onRestart: startNewGame
    }),
    
    showWisdom && React.createElement(WisdomPopup, {
      wisdom: showWisdom,
      onClose: () => setShowWisdom(null)
    }),
    
    React.createElement('footer', { className: 'game-footer' },
      'Built with 🍓 by ',
      React.createElement('a', { href: 'https://berrry.app', target: '_blank' }, 'berrry.app'),
      ' | Press F to pay respects to failed DAOs'
    )
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));