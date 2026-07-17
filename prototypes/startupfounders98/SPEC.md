# Startup Founders: A PC-98 Visual Novel

Create an immersive PC-98 style visual novel where players take on the role of a startup founder navigating the treacherous waters of co-founder selection, investor meetings, and pivotal business decisions. The game combines nostalgic retro aesthetics with modern startup wisdom in an edutainment format.

## App Type

**React Web App** - Best suited for managing complex branching dialogue, game state, multiple endings, and the interactive decision-making mechanics required for a visual novel.

## Visual Style & Aesthetic

### PC-98 Graphics Style
- **Color Palette**: Limited 16-color palette typical of PC-98 era (deep blues, magentas, cyans, warm yellows, stark blacks)
- **Resolution Feel**: Crisp pixel art aesthetic with visible dithering patterns for gradients
- **Character Art**: Anime-style portrait sprites with distinctive 90s aesthetic - sharp lines, dramatic shading, expressive eyes
- **Backgrounds**: Detailed but flat environments with characteristic PC-98 dithering (offices, coffee shops, pitch rooms, co-working spaces)
- **Text**: Sharp pixelated font reminiscent of Japanese PC games, displayed in a bottom text box

### UI Frame
- Classic visual novel frame with ornate pixel borders
- CRT scanline overlay effect (subtle, toggleable)
- Slight screen curvature vignette for authenticity

## UI Elements

### Main Game Screen

#### Character Portrait Area (Top 60%)
- Large character portrait display (centered or left-aligned)
- Background scene behind character
- Subtle idle animation (blinking, slight movement)
- Character name plate when speaking

#### Dialogue Box (Bottom 30%)
- Semi-transparent dark box with pixel border
- Character name displayed in highlighted tab
- Text appears with typewriter effect (skippable)
- Click/tap to advance indicator (blinking triangle)

#### Decision Panel (When Active)
- Replaces dialogue box when choices appear
- 2-4 choice buttons styled as PC-98 menu options
- Hover states with color inversion
- Each choice shows brief consequence hint on hover

### Side Panel / Stats (Right Side, Collapsible)
- **Runway**: Cash remaining (displayed as pixel money bar)
- **Team Morale**: Heart icons (1-5)
- **Reputation**: Star rating
- **Stress Level**: Coffee cup icons (too much = bad ending risk)

### Header Bar
- Game title "STARTUP FOUNDERS '98" in retro pixel font
- Current chapter indicator
- Save/Load icons (floppy disk aesthetic)
- Settings gear icon

## Game Mechanics & Functionality

### Story Engine
- Branching narrative with multiple decision points
- Decisions affect stats and unlock different story paths
- Track relationship values with potential co-founders and investors
- Minimum 3 distinct endings (Success, Acqui-hire, Spectacular Failure)

### Character Cast
- **MC (Player)**: Customizable name, default "Alex"
- **Potential Co-founders**:
  - "Tech Wizard" - brilliant but difficult
  - "Hustler" - great at sales but ethically flexible
  - "Operations Guru" - reliable but risk-averse
- **Investors/Mentors**:
  - "Shark VC" - offers money but wants control
  - "Angel" - patient capital but limited funds
- **Wild Cards**: Competitors, journalists, early employees

### Key Decision Scenarios
1. **The Co-founder Choice** - Who to bring on and at what equity split
2. **The Pivot Moment** - Stick with vision or follow the money
3. **The Term Sheet** - Accept bad terms or keep bootstrapping
4. **The Betrayal** - How to handle a partner who's not pulling weight
5. **The Offer** - Take acquisition or go for the moon

### Educational Elements
- After each major decision, display a "Wisdom Unlocked" popup with real startup advice
- End-of-chapter summaries explaining what went right/wrong
- "Mentor's Notes" - optional reading on startup fundamentals

### Endings (Minimum 5)
- 🚀 **Unicorn**: IPO success, lasting partnerships
- 🎯 **Sustainable Success**: Profitable small business
- 🤝 **Acqui-hire**: Team gets jobs, product dies
- 💔 **Founder Fallout**: Litigation, broken relationships
- 🔥 **Spectacular Failure**: Ran out of runway, epic lessons learned

## Audio & Effects

### Sound Design (Web Audio API)
- Chiptune background music (looping, different tracks per scene mood)
- Text blip sounds as dialogue types out
- Decision confirmation sound effect
- Dramatic stinger for plot twists

## Additional Features

### Save System
- 3 save slots using localStorage
- Auto-save at chapter beginnings
- Quick save/load functionality

### Chapter Select
- After completing game once, unlock chapter select
- Shows which decisions lead to which endings

### Stats Screen
- Track endings achieved
- Decision history for current playthrough
- "Founder Score" based on accumulated wisdom

## Responsive Design

### Desktop (Primary)
- Full PC-98 aesthetic with frame
- Optimal text size and portrait display

### Mobile
- Simplified frame
- Larger tap targets for decisions
- Swipe to advance dialogue option

## Footer

Minimal footer with "Made with 🍓 by berrry.app" - styled to match PC-98 aesthetic

---

*"In the startup world, every choice echoes through your cap table. Choose wisely, founder."*