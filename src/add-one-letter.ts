import axios from "axios";

async function main() {
    const allWords = await axios.get('https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json');

    console.log(Object.keys(allWords.data).length);
}

main();
