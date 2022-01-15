# A Wordle Helper

Despite liking words, I'm not great at word based games.  Scrabble, Jumble, etc. -- anything that requires exact spelling and a knowledge of the sometimes contradictory rules of the english language isn't something I'm naturally good at.  As a result, I tend to skip most word games, which means I never exercise the skills needed to get better at them.

So when [Wordle](https://www.powerlanguage.co.uk/wordle/) came along I felt left out of the fun.  One thing I can do is program, so I decided to create a helper program that would let me play through each day's puzzle but have the computer do the heavy lifting for me.

This isn't a particularly sophisticated program and might even contain bugs -- but it lets me work through the puzzles and not feel left out of the game.  I don't, however, post the results anywhere because

1. Some might consider that bad form
2. Twitter and Facebook are too often ugly places

You'll need [a version of Node.js](https://nodejs.org/en/) to run this program.  I built this with Node 14 but it should work with other versions.  If it doesn't feel free to open an issue or make a PR.

## To Use

To run the program, just install your dependencies with npm

    $ npm install

and then run the program

    $ node helper.js

 However, before you do that, you'll need to fill out the scenario.yaml file that comes with the repo. This file contains information about the state of your current guesses.

    # File: scenario.yaml
    scenario:
      # guesses is an array of the words you've guessed so far
      guesses:
        - adieu
      # knownPositions is a five character array that contains
      # the letters you know are correct (greens)
      knownPositions: [null,null,null,null,null]

      # knownPositions is a nested array of arrays, with each array
      # containing a letter we know is in the word, but at a position
      # we known is wrong (yellows)
      knownButNotInPositions:
        - []
        - []
        - []
        - []
        - []

As you fill out this file and run `node helper.js`, the program will return a list of possible words that are still valid for the puzzle.  For example, if your file looked like this

    # File: scenario.yaml
    scenario:
      # guesses is an array of the words you've guessed so far
      guesses:
        - adieu
        - liars
        - cabin
      # knownPositions is a five character array that contains
      # the letters you know are correct (greens)
      knownPositions: [null,'a',null,'i',null]

      # knownPositions is a nested array of arrays, with each array
      # containing a letter we know is in the word, but at a position
      # we known is wrong (yellows)
      knownButNotInPositions:
        - ['c','a']
        - ['i']
        - ['i','a']
        - []
        - ['n']

which, by the way, represents a puzzle that looks like this

![wordle](https://user-images.githubusercontent.com/184372/149635955-953f8dec-35e2-4b82-b264-7f4ed1f14f60.png)

then running the helper would return the only two words that are left as valid solutions (bringing a small to the face of goths and punks of a certain age)

    $ node helper.js
    panic
    manic

