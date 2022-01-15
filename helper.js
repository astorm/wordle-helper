'use strict';

const {
  loadWords,
  generateMisses,
  foundMiss,
  includesKnownLetters,
  matchesKnownPositions,
  hasRightLetterInWrongPlace,
  loadCurrentInputs
} = require('./lib/util.js')

/**
 * Main function logic
 *
 * @return {undefined}
 */
function helper() {
  const {
    guesses, knownLetters, knownPositions, knownButNotInPositions,
  } = loadCurrentInputs('./scenario.yaml');

  // misses is an array that contains all the letters we know
  // are not in the word
  const misses = generateMisses(guesses, knownLetters, knownPositions);

  const words = loadWords();
  for (const [, word] of words.entries()) {
    const parts = word.split('');

    if (foundMiss(misses, parts)) {
      continue;
    }
    if (!includesKnownLetters(knownLetters, parts)) {
      continue;
    }
    if (!matchesKnownPositions(knownPositions, parts)) {
      continue;
    }
    if (hasRightLetterInWrongPlace(knownButNotInPositions, parts)) {
      continue;
    }
    console.log(word);
  }
}

/**
 * Main entry point
 * @return {undefined}
 */
function main() {
  helper();
}
main();
