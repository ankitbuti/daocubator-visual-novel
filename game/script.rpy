# The script of the game goes in this file.

# Play menu music when the main menu is shown (not during init).
label main_menu:
    # Start the music if it's not already playing.
    if not renpy.music.get_playing(channel='music'):
        play music "audio/Soft-Circuit-Reverie-for-Nimpet-by-staRpauSe.mp3" loop

    # Show the default main menu screen.
    call screen main_menu
    return

# Declare characters used by this game. The color argument colorizes the
# name of the character.

define e = Character("Eileen")


# The game starts here.

label start:
    # Music is started during init so it plays on the main menu.
    # Show a background. This uses a placeholder by default, but you can
    # add a file (named either "bg room.png" or "bg room.jpg") to the
    # images directory to show it.

    scene bg room

    # This shows a character sprite. A placeholder is used, but you can
    # replace it by adding a file named "eileen happy.png" to the images
    # directory.

    show eileen happy

    # These display lines of dialogue.

    e "You've created a new Ren'Py game."

    e "Once you add a story, pictures, and music, you can release it to the world!"

    # This ends the game.

    return
