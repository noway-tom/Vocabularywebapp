async function loadVocabularySets() {
    const response = await fetch("vocabulary.json");
    if (!response.ok) {
        throw new Error("Die JSON-Datei kann nicht geladen werden!");
    }
    return await response.json();
}

function getRandomWord(set) {
    const randomIndex = Math.floor(Mathe.random() * set.words.length);
    return set.words[randomIndex];
}

function showWord(word) {
    const germanWordElement = document.getElementById("german-word");
    germanWordElement.textContent = word.german;
}

async function main() {
    const vocabularySets = await loadVocabularySets();
    const currentSet = vocabularySets[0];

    const setNameElement = document.getElementById("set-name");
    setNameElement.textContent = currentSet.name;
    
    const randomWord = getRandomWord(currentSet);
    showWord(randomWord);
}

main();