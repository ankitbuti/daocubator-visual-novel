---
status: draft
tags: [production, accessibility]
---

# Plain Mode Style Guide

**Plain mode** is the second version of the script for players who are new to business/crypto, or whose first language isn't English. The player picks it at Start ("I'M NEW TO THIS" vs "I SPEAK FOUNDER") and can switch any time in **Preferences → Story Text**. Playtest feedback that led to it: *"unfamiliar terminology."*

Same story, same choices, same stats, same endings. Only the words change.

## How it's built

Plain mode is a Ren'Py **language** called `plain`. Its script lives in `game/tl/plain/`, and the original script is the default language.

- **Dialogue:** each `translate plain <id>:` block replaces one original say line. The block can hold **more than one** line, which is how plain mode adds explanations and **TIP** lines.
- **Menu choices and lesson text:** `translate plain strings:` blocks, as `old "<original>"` / `new "<plain>"` pairs.
- **Edits to the original:** if you edit an original line, its plain translation becomes orphaned and the line falls back to the original. Run this to add stubs for new or changed lines (existing translations are kept):
  `~/renpy-8.5.0-sdk/renpy.sh . translate plain`
  The command also regenerates `common.rpy`, `options.rpy` and `screens.rpy` in `tl/plain/` as identity copies. They're safe to delete.
- **Checks:** `python3 scripts/lint_dialogue.py` · `python3 scripts/check_glossary.py` · `renpy.sh . lint`

## Who we're writing for

- A smart adult who has never worked at a startup and has never owned crypto.
- An English learner at about CEFR **B1**: everyday vocabulary, simple grammar.
- *Not* a child. "ELI5" means simple explanations, not a childish tone.

## Rules

1. **Short sentences, one idea each.** Aim for ≤ 15 words. Split long lines into two.
2. **Common words.** "Use", not "leverage". "Money", not "capital". "Leave", not "bounce".
3. **No idioms, sarcasm or wordplay that needs decoding.** If a joke is worth keeping, make its meaning explicit. Original: *"Cool. So our rainy-day fund is made of rain."* Plain: *"Okay. But then our emergency money is the same thing that crashes in an emergency."*
4. **Keep the jargon word, then explain it.** Plain mode still teaches. Use the real term (it becomes a yellow Glossary link) and explain it in plain words the first time it matters. For example: *"Equity means who owns how much of the company."* Use the glossary spelling so the link appears (see `game/glossary.rpy`).
5. **Keep every fact.** Numbers, names, stat changes, who did what, and foreshadowing all stay. Don't add plot or reveal hidden consequences.
6. **Keep the voices:**
   - **Maya** is blunt, technical and caring underneath.
   - **Jordan** is excited, warm and uses caps when hyped.
   - **Alex** thinks about money and is a little smug.
   - **Vera** is an older union organizer: wise, dry, kind.
   - **Spectre** is *always lowercase*, short and cryptic-but-clear.
   - **Atlas** is polite, smooth and quietly threatening.
   - **The narrator** is clear and warm, with light humor.
7. **TIP lines before big choices.** In the block of the last line before a meaningful `menu`, add 1–2 lines:
   `narrator "{color=#55FF55}TIP:{/color} ..."`
   A TIP says what each option *means* and what it trades off, in neutral words. **Never say which choice is right.** Use TIPs for keystone choices and for any choice where a term would block understanding. Skip them for simple social choices.
8. **Menu choices are buttons.** Keep them short (≤ ~12 words). Keep any leading emoji or symbol (🎵 ◉ ▢). Spoken choices keep their `\"quotes\"`.

## Technical must-dos

- **Translation blocks:** change only the non-comment line(s). Keep the `# original` comment, the block id and the speaker.
- **Interpolations:** keep them exactly: `[player_name]`, `[burnout]`, `[treasury]`, `[recap_text]` and the rest.
- **Text tags:** keep them valid: `{i}…{/i}`, `{color=#hex}…{/color}`, `{size=-8}…{/size}`.
- **Percent signs:**
  - In **say lines**, write the word "percent", or `%%` if you must.
  - In **`new "..."` strings**, a single `%` is correct; never write `%%` there.
- **Brackets and braces:** no `[` `]` `{` `}` except real tags and interpolations.
- **Quotes:** escape double quotes inside strings as `\"`.

## Example

```renpy
# game/ch1_genesis.rpy:42
translate plain ch1_genesis_xxxxxxxx:

    # m "Before I write a single line: equity. Let's have the awkward conversation now, while we still like each other."
    m "Before I write any code, we need to talk about equity. Equity means who owns how much of the company."
    m "This talk is uncomfortable. It's easier now, while we still like each other."
    narrator "{color=#55FF55}TIP:{/color} An equal split is simple but ignores who does more work later. Vesting means you earn your share over time — if someone leaves early, they don't keep it all."
```

Related: [[Game Systems]] · [[Renpy Mapping]]
