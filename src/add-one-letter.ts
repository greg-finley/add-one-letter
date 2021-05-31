import axios from "axios";
var Graph = require("@dagrejs/graphlib").Graph;

var graph = new Graph();

export const letters = [
    'a', 'b', 'c', 'd', 'e', 'f',
    'g', 'h', 'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p', 'q', 'r',
    's', 't', 'u', 'v', 'w', 'x',
    'y', 'z'
  ];

const oneLetterWords = ['a', 'i'];

async function main() {
    const allWords = await getAllScrabbleWords();

    oneLetterWords.forEach((l) => graph.setNode(l));

    var currentWords: string[] = [];
    var nextWords: string[] = oneLetterWords;
    var level = 0;

    while (nextWords.length) {
        console.log(`Graph level ${level} has ${nextWords.length} distinct words`);
        level++;
        currentWords = nextWords.slice();
        nextWords = getNextWords(nextWords, allWords);
    }

    console.log(`The longest words are length ${currentWords[0].length}: ${currentWords}`);
    currentWords.forEach(printSampleAncestors);
}

async function getAllScrabbleWords() {
    const arr = (await axios.get<string[]>('https://raw.githubusercontent.com/benjamincrom/scrabble/master/scrabble/dictionary.json')).data;
    return [...arr, ...oneLetterWords].reduce((acc, val) => {acc[val] = 1; return acc;}, {} as Record<string, 1>)
}

function getNextWords(currentWords: string[], allWords: Record<string, number>) {
    return Array.from(new Set(currentWords.map((w) => filterToValidWords(possibleNextWords(w, letters), allWords)).flat()));
}

export function possibleNextWords(word: string, letters: string[]) {
    const possibleWordsSet: Set<string> = new Set();

    // For every letter in the alphabet, add it to the front of my word
    letters.forEach((l) => possibleWordsSet.add(`${l}${word}`));

    // For every letter in my word, insert a letter after it, trying all letters in the alphabet
    word.split('').forEach((_wordLetter, index, splitWord) => {
        const front = splitWord.slice(0, index + 1);
        const back = splitWord.slice(index + 1);
        letters.forEach((l) => {
           possibleWordsSet.add(`${front.join('')}${l}${back.join('')}`)
        });
    })

    return {currentWord: word, possibleWords: Array.from(possibleWordsSet)};
}

export function filterToValidWords(filterable: {currentWord: string, possibleWords: string[]}, allWords: Record<string, number>) {
    const validWords = filterable.possibleWords.filter((w) => allWords[w]);

    validWords.forEach((vw) => {
        graph.setNode(vw);
        graph.setEdge(filterable.currentWord, vw);
    })

    return validWords;
}

function printSampleAncestors(word: string) {
    console.log(`😲 A way to build ${word}:`);
    let ancestor = word;
    while (ancestor) {
        const predecessors = graph.predecessors(ancestor);
        console.log(predecessors);
        ancestor = predecessors[0];
    }
}

if (require.main === module) {
    main();
  }
