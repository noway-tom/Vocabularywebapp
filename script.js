// Elements
const setNameElement = document.getElementById("set-name");
const germanWordElement = document.getElementById("german-word");
const answerInput = document.getElementById("answer-input");
const checkButton = document.getElementById("check-button");
const feedbackElement = document.getElementById("feedback");
const scoreElement = document.getElementById("score");
const setSelect = document.getElementById("set-select");
const correctCountElement = document.getElementById("correct-count");
const wrongCountElement = document.getElementById("wrong-count");
const accuracyElement = document.getElementById("accuracy");

//global variables
let currentWord = null;
let currentSet = null;
let score = 0;
let correctCount = 0;
let wrongCount = 0;
let lastWordIndex = -1;
let vocabularySets = [];

// Functions
async function loadVocabularySets() {
    const response = await fetch("vocabulary.json");
    if (!response.ok) {
        throw new Error("Die JSON-Datei kann nicht geladen werden!");
    }
    return await response.json();
}

function createSetOptions(sets) {
    setSelect.innerHTML = "";
    sets.forEach(function(set, index) {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = set.name;

        setSelect.appendChild(option);
    });
}

function changeSet () {
    const selectedIndex = Number(setSelect.value);
    currentSet = vocabularySets[selectedIndex];

    setNameElement.textContent = currentSet.name;
    
    lastWordIndex = -1;
    nextWord();

}

function getRandomWord(set) {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * set.words.length);
    } while (
        randomIndex === lastWordIndex && set.words.length > 1
    );

    lastWordIndex = randomIndex;
    return set.words[randomIndex];
}

function showWord(word) {
    germanWordElement.textContent = word.german;
}

function checkAnswer() {
    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswer = currentWord.italian.trim().toLowerCase();

    if (userAnswer === correctAnswer) {

        score = score + 10;
        scoreElement.textContent = score;
        feedbackElement.textContent = "";

        correctCount++;
        updateStatistics();

        setTimeout(function() {
            nextWord();
        }, 1000);
    } else {
        feedbackElement.textContent = `Falsch ${currentWord.italian}`;

        wrongCount++;
        updateStatistics();

        nextWord();

        setTimeout(function() {
            feedbackElement.textContent = "";
        }, 4000)
    }
}

function updateStatistics() {
    const totalAnswers = correctCount + wrongCount;
    let accuracy = 0;

    if ( totalAnswers > 0) {
        accuracy = Math.round((correctCount / totalAnswers) * 100);
    }

    correctCountElement.textContent = correctCount;
    wrongCountElement.textContent = wrongCount;
    accuracyElement.textContent = accuracy;
}

function nextWord () {
    answerInput.value = "";
    answerInput.focus();
    currentWord = getRandomWord(currentSet);
    showWord(currentWord);
}

//Events
checkButton.addEventListener("click", checkAnswer);

answerInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        checkAnswer();
    }
})

setSelect.addEventListener("change", changeSet);

async function main() {
    vocabularySets = await loadVocabularySets();
    createSetOptions(vocabularySets);
    currentSet = vocabularySets[0];

    setNameElement.textContent = currentSet.name;
    
    nextWord();
}

//Program
main();