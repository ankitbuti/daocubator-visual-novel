# DAO Romance: A PC-98 Style Visual Novel

Create an immersive PC-98 aesthetic visual novel game where players navigate the chaotic world of DAO governance while building romantic relationships with co-founders. The game blends cryptocurrency/Web3 mechanics with dating sim elements in authentic retro style.

## App Type
**React Web App** - Best suited for complex state management, branching dialogue systems, relationship meters, and multiple game screens with visual novel mechanics.

## Visual Style & Aesthetic

### PC-98 Authentic Look
- **Color Palette**: Limited 16-color palette typical of PC-98 games - deep purples, hot pinks, cyans, warm oranges, cream whites against dark backgrounds
- **Resolution Feel**: Chunky pixel aesthetic with sharp edges, dithering patterns for gradients and shadows
- **Typography**: Pixel fonts for dialogue, retro bitmap-style headers with slight glow effects
- **Scanline Overlay**: Subtle CRT scanline effect across the entire game for authenticity
- **Border Frame**: Decorative pixel art frame around the game viewport reminiscent of 90s Japanese PC games

### Character Art Style
- Anime-style character portraits with PC-98 dithering and limited color shading
- Characters have multiple expressions (neutral, happy, flustered, angry, seductive, mysterious)
- Portrait positions: left, center, right for dialogue scenes
- Slight animation on portraits (breathing effect, blinking)

## UI Elements

### Title Screen
- Stylized logo "DAO ROMANCE" with pixel art cherry blossoms and ethereum-style geometric shapes
- Retro Japanese text aesthetic with English translation
- Menu options: "New Game", "Continue", "Gallery", "Settings"
- Animated background with floating tokens and hearts
- Atmospheric synth-wave inspired background music indicator

### Main Game Screen

#### Dialogue Box
- Bottom 1/3 of screen with ornate pixel border in gold/cream
- Character name displayed in colored tab at top-left of dialogue box
- Text appears with typewriter effect (skippable)
- Semi-transparent dark background with dithered edges

#### Character Display Area
- Upper 2/3 of screen for character portraits and backgrounds
- Layered system: background scene → character sprites → effects
- Backgrounds: Discord server mockup, conference room, rooftop bar, late-night apartment, etc.

#### Quick Menu Bar
- Small icons for: Save, Load, Auto-play, Skip, Log, Settings
- Positioned at top-right, styled as pixel art buttons

### Status Dashboard (Accessible via tab/button)

#### Treasury Panel
- Pixel art wallet icon with animated coins
- ETH balance displayed in retro LCD-style numbers
- Token distribution pie chart in limited color palette
- "Treasury Health" meter (green to red gradient with dithering)

#### Governance Stats
- Voting power percentage bar
- "Decentralization Score" meter
- Active proposals counter with pixel document icons
- "51% Attack Risk" warning indicator

#### Relationship Meters
- Character portrait thumbnails in a row
- Heart-shaped meters below each (0-100%)
- Color coding: Blue (trust), Pink (romance), Red (tension)
- Sparkle effects when relationships level up

#### Day/Chapter Indicator
- "Day 47 - Chapter 3: Pre-TGE Chaos"
- Pixel calendar icon with animated page flip on new days

### Choice Interface

#### Decision Prompts
- Choices appear as styled buttons in a vertical stack
- Each choice shows potential stat impacts with small icons (treasury ↓, romance ↑, etc.)
- Hover effects with pixel highlight and sound
- Timer bar for time-sensitive decisions (optional)
- Choices have consequences badges: [RISKY], [ROMANTIC], [GOVERNANCE], [SECURITY]

### Character Profiles Screen

#### Character Cards
- Full portrait with PC-98 style shading
- Character archetype label with icon
- Stats: Loyalty, Romance Level, Trust, Influence
- Unlocked memories/scenes gallery (locked ones show as silhouettes)
- Character backstory snippets that unlock over time

### Gallery/CG Collection
- Grid of unlocked scene illustrations
- Locked scenes show as dithered silhouettes with "???"
- Scene titles and chapter references
- PC-98 style provocative CGs with tasteful composition (suggestive but not explicit)

## Core Characters

### AIKO - The True Believer
- Pastel pink hair, starry eyes, always wearing DAO merch
- Intense idealist energy, believes in the mission completely
- Route themes: Passion vs. burnout, idealism meeting reality

### DRAKE - The Mercenary
- Sharp features, expensive taste, always checking prices
- Dangerous charm, unclear loyalties, high risk/high reward
- Route themes: Trust, redemption, whether profit and purpose can coexist

### SPECTRE - The Ghost
- Hoodie shadow, only known by PFP, mysterious past
- Anonymous contributor, trust issues, rarely shows up IRL
- Route themes: Vulnerability, identity, connection across digital barriers

### MAYA - The Builder  
- Practical aesthetic, always has laptop, coffee addiction
- Ships code, not vibes. Slow burn romance, deep respect.
- Route themes: Actions vs. words, building something that lasts

### SENATOR - The Politician
- Polished appearance, perfect smile, strategic everything
- Seductive manipulation or genuine connection? You decide.
- Route themes: Power dynamics, authenticity, political romance

### ATLAS - The Whale
- Luxurious presence, mysterious wealth, protective energy
- Sugar daddy/mommy vibes, but surprisingly vulnerable
- Route themes: Money and love, dependency, true connection

## Gameplay Mechanics

### Visual Novel Core
- Branching dialogue with meaningful choices
- Auto-save at decision points
- Dialogue log accessible via button
- Skip read text option

### DAO Management Mini-Games
- **Treasury Vote**: Drag tokens to approve/reject proposals
- **Tokenomics Slider**: Balance distribution between team, community, treasury
- **Multisig Puzzle**: Quick-time event to catch suspicious transactions
- **Governance Debate**: Choose arguments in timed dialogue battles

### Relationship System
- Every interaction affects relationship meters
- High romance + low trust = volatile outcomes
- Relationships affect who supports you in governance votes
- Late-night Discord calls as special relationship events
- IRL meetup scenes at conferences, dinners, apartments

### Crisis Events
- **The Hack**: Security breach requiring quick decisions
- **The Ragequit**: Key member threatening to leave
- **The 51% Attack**: Governance coup attempt
- **The Rug**: Someone isn't who they claimed to be
- **The Merge**: Another DAO wants to acquire you

## Story Structure

### Chapters
1. **Genesis** - Founding the DAO, meeting the co-founders
2. **Coordination** - Building governance, first conflicts
3. **Tension** - Pre-TGE drama, relationships complicate everything
4. **Crisis** - The hack/attack/drama that tests everything
5. **Resolution** - Multiple endings based on choices

### Endings (12+ variations)
- **Moon Mission**: DAO succeeds, found true love, collective prosperity achieved
- **Soft Rug**: Project fails but relationships survive
- **Hard Fork**: DAO splits but your faction thrives
- **Ragequit Romance**: Left the DAO, kept the love
- **Solo Founder**: Success but alone
- **The Merge**: Acquired but together
- **Coordination Failure**: Everything falls apart
- And more based on relationship + governance combinations

## Interactive Elements

### Notifications System
- Discord-style notification popups for messages, proposals, drama
- Player can click to respond immediately or ignore (consequences either way)
- Late-night message notifications with romantic implications

### Mini-Map/Timeline
- Visual timeline showing key events and branching points
- Helps players understand where they are in the story
- Shows relationship status at each checkpoint

### Settings Panel
- Text speed slider
- Music/SFX volume controls
- Auto-play speed
- Scanline intensity toggle
- Language options (English, weeb mode with Japanese honorifics)

## Audio Design (Indicators)
- Music track indicator in corner (track names like "Late Night Multisig", "Governance Tango")
- Sound effect badges for: notification ding, choice hover, relationship up/down, crisis alarm
- Optional: ambient Discord notification sounds

## Responsive Design
- Optimized for desktop/tablet landscape orientation
- Mobile shows "rotate device" message or compressed UI
- Touch-friendly choice buttons
- Swipe to advance dialogue on mobile

## Save System
- 10 save slots with screenshot thumbnails
- Auto-save at each chapter and major decision
- Save shows: Chapter, Day, Treasury balance, highest relationship

## Footer
- Styled as retro terminal text
- "Built with 🍓 by berrry.app | Press F to pay respects to failed DAOs"
- Links styled as command-line options

## Special Features
- **Wisdom Popups**: Real DAO lessons appear as "Protocol Insights" between chapters
- **Reference Links**: Optional tooltips explaining real DAO events (ConstitutionDAO, The DAO hack, etc.)
- **Achievement System**: Unlock badges for different endings and choices
- **New Game+**: Replay with relationship bonuses unlocked