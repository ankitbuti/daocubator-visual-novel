# DAO '25 - NEAR AI PRIVATE CHAT EDITION

Create an immersive PC-98 style visual novel game exploring DAO governance, collective ownership, and the perils of decentralized organization building. The player is a startup founder building a creative collective using web3 mechanics.

## App Type

**React Web App** - Best suited for this narrative-driven experience with complex state management, branching dialogue trees, and multiple game systems.

## Visual Style: PC-98 Aesthetic

### Color Palette
- Limited 16-color palette inspired by NEC PC-98:
  - Deep blues (#000080, #0000AA)
  - Cyans (#00AAAA, #55FFFF)
  - Magentas (#AA00AA, #FF55FF)
  - Warm skin tones (#FFAA55, #AA5500)
  - Black background (#000000)
  - Off-white text (#AAAAAA, #FFFFFF)

### Typography
- Pixel-style fonts (use Google Font "Press Start 2P" or similar)
- CRT scanline overlay effect
- Text appears letter-by-letter with typing sound effect simulation

### Character Art Style
- Anime-style character portraits with limited color dithering
- Characters positioned on left/right of dialogue box
- Expression changes based on dialogue (happy, concerned, scheming, angry)

## UI Elements

### Main Game Screen Layout

#### Top Status Bar
- **Treasury Display**: Shows current ETH/token balance with retro coin icon
- **Governance Score**: 0-100 meter showing decentralization health
- **Community Trust**: Heart meter showing member satisfaction
- **Day Counter**: "DAY 47 / SEASON 2"

#### Center Stage Area
- **Background Scene**: Pixel art locations (co-working space, Discord server visualization, conference room, blockchain visualization)
- **Character Sprites**: Up to 3 characters on screen with portrait frames
- **Special Effects**: Glitch effects for attacks, sparkles for successful votes, rain for dramatic moments

#### Dialogue Box (Bottom Third)
- Bordered text window with decorative pixel corners
- Character name tag in contrasting color
- Scrolling text with adjustable speed
- Sound toggle icon

#### Choice Panel
- When choices appear, 2-4 options in styled buttons
- Hover effect shows brief consequence hint
- Timer bar for time-sensitive decisions (optional pressure mechanic)

### Side Panel (Collapsible)

#### DAO Dashboard Tab
- Token distribution pie chart (pixel art style)
- Active proposals list with vote counts
- Member roster with trust indicators
- Treasury transaction log

#### Relationships Tab
- Co-founder portraits with relationship meters
- Faction alignment indicators (Decentralists vs Pragmatists vs Opportunists)
- Key community member status

### Menu Screen
- "NEW GAME" - Start fresh
- "CONTINUE" - Load from localStorage
- "GLOSSARY" - Web3 terms encyclopedia
- "ENDINGS" - Shows unlocked endings (silhouettes for locked ones)
- "CREDITS"

## Characters (Generate with Retrodiffusion API)

### Main Cast
1. **YOU (Customizable)** - The founder, determined expression
2. **MAYA** - Technical co-founder, glasses, pragmatic, blue-tinted
3. **JORDAN** - Community lead, charismatic, warm colors, idealist
4. **ALEX** - Treasury/Finance, sharp suit, calculating expression
5. **THE WHALE** - Anonymous antagonist, shadowy figure with question mark avatar
6. **VERA** - Union organizer mentor, older, wise, experienced

### Supporting Cast
- **Troll Farm Operator** - Multiple identical avatars, mischievous
- **Quiet Quitter** - Fading transparency effect
- **Vocal Non-Contributor** - Megaphone, empty hands
- **Aragon Ghost** - Spectral figure representing failed DAOs past

## Game Mechanics & Functionality

### Core Stats System
```
Treasury: 0-1000 ETH
Decentralization: 0-100%
Community Trust: 0-100%
Governance Efficiency: 0-100%
Security: 0-100%
```

### Chapter Structure

**Chapter 1: Genesis Block**
- Choose your collective type (Record Label / Fashion Brand / Artist Collective)
- Select 2 of 4 potential co-founders
- Design initial token distribution
- First treasury decision

**Chapter 2: Token Generation Event**
- Navigate TGE mechanics
- Handle early investor pressure
- Community building choices

**Chapter 3: First Governance Crisis**
- Controversial proposal appears
- Clique formation begins
- First signs of coordination problems

**Chapter 4: The Attack**
- Face one of: 51% attack, social engineering, whale manipulation
- Emergency response decisions
- Trust fractures

**Chapter 5: Resolution**
- Final governance reform vote
- Ending determined by accumulated choices

### Decision Types

1. **Governance Proposals**
   - Vote YES/NO/ABSTAIN
   - Propose amendments
   - Delegate or vote directly

2. **Treasury Allocation**
   - Fund projects
   - Security investments
   - Community rewards
   - Emergency reserves

3. **Relationship Choices**
   - Side with factions
   - Mediate conflicts
   - Private negotiations

4. **Crisis Responses**
   - Rapid response vs deliberation
   - Transparency vs strategic silence
   - Individual action vs collective decision

### Ending Conditions

- **Golden Ending**: All stats above 70%, specific key choices
- **Tragic Ending**: Security below 20%, treasury drained
- **Bureaucratic Ending**: Governance Efficiency below 30%, 20+ unresolved proposals
- **Dictatorship Ending**: Decentralization below 25%
- **Community Fracture**: Community Trust below 30%, 2+ faction wars

## Interactive Elements

### Mini-Games
1. **Proposal Defense**: Quick-time event defending against hostile amendments
2. **Whale Watching**: Spot the accumulating wallet addresses
3. **Discord Diplomacy**: Timed dialogue choices in simulated chat

### Educational Popups
- Glossary terms highlighted in dialogue
- "Learn More" expandable sections about real DAO events
- Reference links to actual case studies (Aragon, NounsDAO, etc.)

## Sound Design (CSS Animations for Visual Feedback)
- Screen shake for dramatic moments
- Glitch effect for attacks/hacks
- Soft pulse for positive outcomes
- Static/noise for uncertainty

## Responsive Design

### Desktop (Primary)
- Full visual novel layout
- Side panel always visible
- Keyboard shortcuts (1-4 for choices, Space to advance)

### Tablet
- Collapsible side panel
- Touch-friendly choice buttons
- Slightly larger text

### Mobile
- Stacked layout
- Swipe to access dashboard
- Simplified UI elements
- Portrait mode optimized

## Footer
- Retro-styled footer with pixelated border
- "Built by 🍓 berrry.app" with link
- "NEAR AI PRIVATE CHAT EDITION" badge
- Save/Load indicators

## localStorage Persistence
- Current chapter and scene
- All stat values
- Relationship states
- Unlocked endings
- Dialogue history (for review)
- Settings (text speed, sound)

## Additional Features

### Glossary/Encyclopedia
- DAO terminology with real-world examples
- Character bios unlocked through gameplay
- Historical DAO events database
- Strategy tips (unlocked after endings)

### Replayability
- Track all endings achieved
- Show percentage of content seen
- Alternate paths highlighted on replay
- "What If" mode to replay key decisions

The game should balance education and entertainment, teaching real governance lessons through engaging narrative while maintaining the aesthetic charm of classic PC-98 visual novels. Every choice should feel meaningful, and the consequences should reflect actual challenges faced by real DAOs.