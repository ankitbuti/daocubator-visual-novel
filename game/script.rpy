# DAOCUBATOR / "Get Rich Together" — core definitions
# vault: 01 Overview/Game Systems.md · 02 Characters/*  (vault/ is the source of truth)

################################################################################
## Characters (colors match vault character frontmatter / Art Style Guide)

define narrator = Character(None)
define pc  = Character("[player_name]", color="#FFFFFF")
define m   = Character("Maya",    color="#55FFFF", image="maya")
define j   = Character("Jordan",  color="#FF55FF", image="jordan")
define a   = Character("Alex",    color="#FFAA55", image="alex")
define v   = Character("Vera",    color="#AA00AA", image="vera")
define s   = Character("Spectre", color="#00AAAA", image="spectre", what_prefix="{i}", what_suffix="{/i}")
define w   = Character("Atlas",   color="#FFFF55", image="atlas")
define mod = Character("Mod (pixel_pal)", color="#AAAAAA")

################################################################################
## Core stats — the research's five-variable model

default vibes    = 50
default treasury = 100
default security = 40
default morale   = 60
default burnout  = 10
default day      = 1

## Relationships (governance capital, not romance meters)
default rel_maya    = 40
default rel_jordan  = 50
default rel_alex    = 30
default rel_vera    = 20
default rel_spectre = 10
default rel_atlas   = 25

## Flags — vault: Game Systems.md
default venture      = None      # "label" | "streetwear" | "collective"
default equity       = None      # "equal" | "merit" | "vesting"
default wrapper      = None      # "none" | "verein"
default treasury_mix = None      # "mono" | "barbell"
default whale_in     = False
default opsec        = "rushed"  # "rushed" | "hardened"
default timelocks    = False
default veto_used    = False
default apathy       = 0
default mentor       = False
default maya_gone    = False
default alex_loyal   = False
default attack_vector = None     # set at ch4 start: "phish" | "fiftyone" | "spiral"
default player_name  = "Kai"
default pivotal      = []        # run recap: (choice, consequence) strings
default codex_seen   = set()

init python:
    def clamp(x, lo, hi):
        return max(lo, min(hi, x))

    def adjust(vibes=0, treasury=0, security=0, morale=0, burnout=0,
               maya=0, jordan=0, alex=0, vera=0, spectre=0, atlas=0):
        """All stat changes flow through here (clamping + one place for cascade hooks)."""
        st = renpy.store
        st.vibes    = clamp(st.vibes + vibes, 0, 100)
        st.treasury = clamp(st.treasury + treasury, 0, 200)
        st.security = clamp(st.security + security, 0, 100)
        st.morale   = clamp(st.morale + morale, 0, 100)
        st.burnout  = clamp(st.burnout + burnout, 0, 100)
        st.rel_maya    = clamp(st.rel_maya + maya, 0, 100)
        st.rel_jordan  = clamp(st.rel_jordan + jordan, 0, 100)
        st.rel_alex    = clamp(st.rel_alex + alex, 0, 100)
        st.rel_vera    = clamp(st.rel_vera + vera, 0, 100)
        st.rel_spectre = clamp(st.rel_spectre + spectre, 0, 100)
        st.rel_atlas   = clamp(st.rel_atlas + atlas, 0, 100)

    def max_rel():
        st = renpy.store
        return max(st.rel_maya, st.rel_jordan, st.rel_alex,
                   st.rel_vera, st.rel_spectre, st.rel_atlas)

    def mark(text):
        """Record a pivotal choice for the ending recap screen."""
        renpy.store.pivotal.append(text)

################################################################################
## Stats HUD — top bar, PC-98 flavored

screen stats_hud():
    zorder 50
    frame:
        xalign 0.5
        ypos 0
        background "#000000cc"
        padding (20, 8)
        hbox:
            spacing 28
            text "DAY [day]" color "#FFFFFF" size 22
            text "VIBES [vibes]" color "#FF55FF" size 22
            text "TREASURY [treasury]Ξ" color "#FFFF55" size 22
            text "SECURITY [security]" color "#55FF55" size 22
            text "MORALE [morale]" color "#55FFFF" size 22
            text "BURNOUT [burnout]" color ("#FF5555" if burnout >= 60 else "#AAAAAA") size 22

################################################################################
## Chapter close bookkeeping — cascade rule + burnout gate
## vault: Game Systems.md (token price ∝ Vibes × Security)

label chapter_close(new_day, vibes_at_open):
    if treasury_mix == "mono" and vibes < vibes_at_open:
        $ adjust(treasury=-15)
        narrator "{color=#FF5555}Your token dips with the mood. A treasury that IS your token dips with it. (Treasury -15){/color}"
    if burnout >= 80:
        call forced_rest
    $ day = new_day
    return

label forced_rest:
    scene bg apartment with fade
    narrator "You don't remember deciding to lie down."
    narrator "Your body files a governance proposal of its own. It passes unanimously."
    menu:
        "Actually rest. Delegate for a week.":
            $ adjust(burnout=-30, treasury=-5)
            narrator "The collective survives a week without you. That fact is either humbling or liberating. You choose liberating."
        "Rest is for people with runway.":
            $ adjust(burnout=+10, morale=-10)
            narrator "You reopen the laptop. Somewhere, Vera sighs without knowing why."
    return

################################################################################
## Main menu — start the theme (Soft Circuit Reverie for Nimpet, by staRpauSe)
## and keep it playing into the game.

label main_menu:
    if not renpy.music.get_playing(channel='music'):
        play music "audio/Soft-Circuit-Reverie-for-Nimpet-by-staRpauSe.mp3" loop
    call screen main_menu
    return

################################################################################
## Start

label start:
    $ pivotal = []
    scene bg blockchain with fade
    narrator "2025. The age of DAOs has truly begun — again — for the third or fourth time."
    narrator "NounsDAO. MakerDAO. The Aragon crisis. Build Finance. Beanstalk. You watched them all rise, and you read every post-mortem on the way down."
    narrator "Roughly 65%% of ventures like the one you're about to start die from the inside. Not the market. The people. The structure. The deferred conversations."
    narrator "You're going to be different. Everyone says that."
    python:
        player_name = renpy.input("What do they call you, founder?", default="Kai", length=20).strip() or "Kai"
    show screen stats_hud
    jump ch1_genesis
