import axios from "axios";

export const letters = [
    'a', 'b', 'c', 'd', 'e', 'f',
    'g', 'h', 'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p', 'q', 'r',
    's', 't', 'u', 'v', 'w', 'x',
    'y', 'z'
  ];

async function main() {
    const allWords = (await axios.get<Record<string, number>>('https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json')).data;

    console.log(allWords.a);
    console.log(allWords.sgnaingiasning);
}

export function possibleNextWords(word: string, letters: string[]) {
    const possibleWords: Set<string> = new Set();

    // For every letter in the alphabet, add it to the front of my word
    letters.forEach((l) => possibleWords.add(`${l}${word}`));

    // For every letter in my word, insert a letter after it, trying all letters in the alphabet
    word.split('').forEach((wordLetter, index, splitWord) => {
        const front = splitWord.slice(0, index + 1);
        const back = splitWord.slice(index + 1);
        letters.forEach((l) => {
           possibleWords.add(`${front.join('')}${l}${back.join('')}`)
        });
    })

    return Array.from(possibleWords);
}

if (require.main === module) {
    main();
  }
