#!/usr/bin/env python3
"""Generate the background-asset art brief as an .xlsx sheet.

Output: vault/06 Assets/Background Assets.xlsx
Data is grounded in the actual `scene bg X` references in game/*.rpy.
Regenerate any time: python3 scripts/gen_asset_sheet.py
"""
import os
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side

OUT = os.path.join(os.path.dirname(__file__), "..", "vault", "06 Assets", "Background Assets.xlsx")

# filename, uses, where it appears, what to depict, status
BACKGROUNDS = [
    ("bg conference.png", 13, "Alex's intro, Vera's mixer, Atlas's 500 ETH offer + treasury debate, Proposal #17, final vote, whale negotiation, acquisition offer",
     "Crypto-conference hall / pitch stage — big screen with DAO/ETH banners, seating. The public, formal, high-stakes room.", "placeholder"),
    ("bg discord.png", 8, "Jordan's intro, community launch, the leak, delegation debate, wallet-cluster warning, community defense, Death-by-Democracy ending",
     "Stylized Discord server at 2-3am — channel/member rail, chat column, dark glow. The online / community space.", "placeholder"),
    ("bg coworking.png", 7, "Opening / venture choice, Maya's intro + equity talk, Maya's 3x crisis, morning-after triage, Sustainable ending",
     "Startup co-working office — desks, monitors, whiteboard, window. Where the team actually works.", "placeholder"),
    ("bg blockchain.png", 7, "Cold open, TGE / mint night, token design, attack intro, 51% / spiral vectors, Hostile-Takeover ending",
     "Abstract on-chain visualization — glowing node graph + edges, cyan/magenta on black. 'The chain.'", "placeholder"),
    ("bg apartment.png", 7, "Spectre's 2:47am DM, audit ask, 4am burnout mirror, phish setup, Jordan's 3am call, forced-rest",
     "Late-night apartment — laptop glow, city lights through a window. The alone / personal / exhausted space.", "placeholder"),
    ("bg factionmap.png", 4, "Ch3 faction map, the 76.2% pie-chart moment, ending recap",
     "Governance dashboard / diagram — faction circles (Decentralists / Pragmatists / Opportunists), pie charts. More UI than place.", "placeholder"),
    ("bg rooftop.png", 2, "Vera's closing argument, Golden 'Collective Prosperity' ending",
     "Rooftop at dawn — city skyline, magenta->orange sky. The resolution / hope beat.", "placeholder"),
    ("bg signing.png", 1, "Ch4a 'verify the hex' set piece",
     "A hardware-wallet / MetaMask signing modal — 'SIGN TRANSACTION?', summary rows, an [EXPAND RAW DATA] hex block, green Confirm / red Reject. A UI mockup, not a location.", "placeholder"),
    ("(scene black)", 0, "Burnout-Crash ending + a few transitions",
     "No asset needed — Ren'Py generates solid black automatically. Listed for completeness.", "built-in"),
]

SPECS = [
    ("Resolution", "1920 x 1080 (the game's virtual size)."),
    ("Style", "PC-98 16-color palette (deep blue / cyan / magenta / orange / cream on black), ordered dithering for gradients, flat perspective, scanline-friendly."),
    ("Composition", "Leave the left/right thirds usable for 1-2 character sprites; keep key detail center/background."),
    ("Format", ".png (or .jpg -- both resolve). Use .png for the crisp UI ones: signing, factionmap."),
    ("Naming rule", "Ren'Py auto-image: a file 'bg conference.png' is referenced in script as 'scene bg conference'. Keep the exact name (with the space) or the script breaks."),
    ("Location", "Drop finished files in game/images/, replacing the current scripted placeholders (same filenames)."),
    ("Palette source", "vault/06 Assets/Art Style Guide.md"),
]

HEADER_FILL = PatternFill("solid", fgColor="1A1A4E")
HEADER_FONT = Font(bold=True, color="FFFFFF", size=11)
TITLE_FONT = Font(bold=True, size=14, color="1A1A4E")
WRAP = Alignment(wrap_text=True, vertical="top")
TOP = Alignment(vertical="top")
THIN = Side(style="thin", color="CCCCCC")
BORDER = Border(left=THIN, right=THIN, top=THIN, bottom=THIN)


def style_header(ws, row, ncols):
    for c in range(1, ncols + 1):
        cell = ws.cell(row=row, column=c)
        cell.fill = HEADER_FILL
        cell.font = HEADER_FONT
        cell.alignment = Alignment(wrap_text=True, vertical="center")
        cell.border = BORDER


def main():
    wb = Workbook()

    # ---- Sheet 1: Backgrounds ----
    ws = wb.active
    ws.title = "Backgrounds"
    ws["A1"] = "DAOCUBATOR / \"Get Rich Together\" — Background Assets"
    ws["A1"].font = TITLE_FONT
    ws["A2"] = "8 backgrounds to generate (grounded in the game's actual scene bg calls). 1920x1080, PC-98 palette. See the Specs tab."
    ws["A2"].font = Font(italic=True, color="555555")

    headers = ["Filename", "Uses", "Where it appears", "What to depict", "Status"]
    hrow = 4
    for c, h in enumerate(headers, 1):
        ws.cell(row=hrow, column=c, value=h)
    style_header(ws, hrow, len(headers))

    for i, (fn, uses, where, depict, status) in enumerate(BACKGROUNDS):
        r = hrow + 1 + i
        ws.cell(row=r, column=1, value=fn).font = Font(name="Menlo", size=10, bold=True)
        ws.cell(row=r, column=2, value=(uses if uses else ""))
        ws.cell(row=r, column=3, value=where)
        ws.cell(row=r, column=4, value=depict)
        ws.cell(row=r, column=5, value=status)
        for c in range(1, 6):
            cell = ws.cell(row=r, column=c)
            cell.alignment = WRAP if c in (3, 4) else TOP
            cell.border = BORDER

    ws.column_dimensions["A"].width = 20
    ws.column_dimensions["B"].width = 7
    ws.column_dimensions["C"].width = 46
    ws.column_dimensions["D"].width = 60
    ws.column_dimensions["E"].width = 13
    ws.freeze_panes = "A5"

    # ---- Sheet 2: Specs & Notes ----
    ws2 = wb.create_sheet("Specs & Notes")
    ws2["A1"] = "Technical specs & conventions"
    ws2["A1"].font = TITLE_FONT
    for c, h in enumerate(["Item", "Detail"], 1):
        ws2.cell(row=3, column=c, value=h)
    style_header(ws2, 3, 2)
    for i, (k, v) in enumerate(SPECS):
        r = 4 + i
        a = ws2.cell(row=r, column=1, value=k)
        a.font = Font(bold=True)
        a.alignment = TOP
        a.border = BORDER
        b = ws2.cell(row=r, column=2, value=v)
        b.alignment = WRAP
        b.border = BORDER
    ws2.column_dimensions["A"].width = 16
    ws2.column_dimensions["B"].width = 90
    ws2.freeze_panes = "A4"

    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    wb.save(OUT)
    print("wrote", os.path.abspath(OUT))


if __name__ == "__main__":
    main()
