import axios from "axios";

async function main() {
    const allWords = (await axios.get<Record<string, number>>('https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json')).data;

    console.log(allWords.a);
    console.log(allWords.sgnaingiasning);
}

main();
