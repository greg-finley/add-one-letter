import axios from "axios";

const buildableWordSets: Set<string>[] = [];

export const letters = [
    'a', 'b', 'c', 'd', 'e', 'f',
    'g', 'h', 'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p', 'q', 'r',
    's', 't', 'u', 'v', 'w', 'x',
    'y', 'z'
  ];

async function main() {
    const allWords = await getAllEnglishWords();

    var nextWords = new Set(letters);

    while (nextWords.size) {
        buildableWordSets.push(nextWords);
        nextWords = getNextWordSet(nextWords, allWords);
    }

    console.log(buildableWordSets[buildableWordSets.length - 1]);
}

async function getAllEnglishWords() {
    return (await axios.get<Record<string, number>>('https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json')).data;
}

function getNextWordSet(currentSet: Set<string>, allWords: Record<string, number>) {
    return new Set(filterToValidWords(Array.from(currentSet).map((w) => possibleNextWords(w, letters)).flat(), allWords));
}

export function possibleNextWords(word: string, letters: string[]) {
    const possibleWords: Set<string> = new Set();

    // For every letter in the alphabet, add it to the front of my word
    letters.forEach((l) => possibleWords.add(`${l}${word}`));

    // For every letter in my word, insert a letter after it, trying all letters in the alphabet
    word.split('').forEach((_wordLetter, index, splitWord) => {
        const front = splitWord.slice(0, index + 1);
        const back = splitWord.slice(index + 1);
        letters.forEach((l) => {
           possibleWords.add(`${front.join('')}${l}${back.join('')}`)
        });
    })

    return Array.from(possibleWords);
}

export function filterToValidWords(possibleWords: string[], allWords: Record<string, number>) {
    return possibleWords.filter((w) => allWords[w])
}

if (require.main === module) {
    main();
  }
