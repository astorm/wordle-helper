'use strict';
const fs = require('fs');
const yaml = require('js-yaml');

/**
 * Loads inputs from a scenario.yaml file
 *
 * @param {file} path to scenario.yaml
 * @return {object}
 */
function loadCurrentInputs(file) {
  const doc = yaml.load(fs.readFileSync(file, 'utf8'));
  const data = doc.scenario;

  // derive known letters from knownPositions and knownButNotInPositions
  data.knownLetters = data.knownPositions.concat(
      data.knownButNotInPositions.flat(),
  ).filter((item)=>item);

  return data;
}

/**
 * Shuffles an array in place, also returns it
 *
 * @param {array} array
 * @return {array}
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Loads words.txt from disk, shuffles order for variety
 *
 * @return {array}
 */
function loadWords() {
  const words = fs.readFileSync('./words.txt').toString().split('\n');
  return shuffleArray(words);
}

/**
 * Looks at what you know, returns array of letters that can't be in word
 *
 * @param {array} guesses array of string with your guesses so far
 * @param {array} knownLetters array of letters we know are in the word
 * @param {array} knownPositions an array containing known letter positions
 *
 * @return {array}
 */
function generateMisses(guesses, knownLetters, knownPositions) {
  const misses = [];
  for (const [, letter] of guesses.join('').split('').entries()) {
    if (knownLetters.indexOf(letter) !== -1) {
      continue;
    }
    if (knownPositions.indexOf(letter) !== -1) {
      continue;
    }
    misses.push(letter);
  }
  return misses;
}

/**
 * Did we find a letter we know is not in the word
 *
 * A "miss" is a letter that's not in the word
 *
 * @param {array} misses array of letters known to not be in the word
 * @param {array} parts word represented as a 5 long array
 *
 * @return {boolean}
 */
function foundMiss(misses, parts) {
  for (const [, letter] of misses.entries()) {
    if (parts.indexOf(letter) != -1) {
      return true;
    }
  }
  return false;
}

/**
 * Does the word contain one of our known letters?
 *
 * @param {array} knownLetters array of letters known to be in word
 * @param {array} parts word represented as a 5 long array
 *
 * @return {boolean}
 */
function includesKnownLetters(knownLetters, parts) {
  for (const [, letter] of knownLetters.entries()) {
    if (parts.indexOf(letter) === -1) {
      return false;
    }
  }
  return true;
}

/**
 * Does the word contain one of our known letters at a known position
 *
 * @param {array} knownPositions 5 long array of letters at positions we know
 * @param {array} parts word represented as a 5 long array
 *
 * @return {boolean}
 */
function matchesKnownPositions(knownPositions, parts) {
  for (const [index, letter] of knownPositions.entries()) {
    if (!letter) {
      continue;
    }
    if (parts[index] !== letter) {
      return false;
    }
  }
  return true;
}

/**
 * Does the word have a known letter, but that letter is in a wrong place
 *
 * @param {array} knownButNotInPositions 5 long array of arrays, each sub array
 *                                       has letters known to not be in that
 *                                       position ("yellow")
 * @param {array} parts word represented as a 5 long array
 *
 * @return {boolean}
 */
function hasRightLetterInWrongPlace(knownButNotInPositions, parts) {
  for (const [position, letters] of knownButNotInPositions.entries()) {
    for (const [, knownLetter] of letters.entries()) {
      if (parts[position] === knownLetter) {
        return true;
      }
    }
  }
  return false;
}

module.exports = {
  shuffleArray,
  loadWords,
  generateMisses,
  foundMiss,
  includesKnownLetters,
  matchesKnownPositions,
  hasRightLetterInWrongPlace,
  loadCurrentInputs,
};
