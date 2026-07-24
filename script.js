// Elements
const setNameElement = document.getElementById("set-name");
const germanWordElement = document.getElementById("german-word");
const answerInput = document.getElementById("answer-input");
const checkButton = document.getElementById("check-button");
const feedbackElement = document.getElementById("feedback");
const scoreElement = document.getElementById("score");

//global variables
let currentWord = null;
let currentSet = null;
let score = 0;
let lastWordIndex = 0;

// Functions
async function loadVocabularySets() {
    const response = await fetch("vocabulary.json");
    if (!response.ok) {
        throw new Error("Die JSON-Datei kann nicht geladen werden!");
    }
    return await response.json();
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
    const germanWordElement = document.getElementById("german-word");
    germanWordElement.textContent = word.german;
}

function checkAnswer() {
    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswer = currentWord.italian.trim().toLowerCase();

    if (userAnswer === correctAnswer) {
        feedbackElement.textContent = "Richtig!!";
        score = score + 10;
        scoreElement.textContent = score;

        setTimeout(function() {
            nextWord();
        }, 1000);

    } else {
        feedbackElement.textContent = "Falsch " + currentWord.italian;
        nextWord();

        setTimeout(function() {
            feedbackElement.textContent = "";
        }, 4000)
    }
}

function nextWord () {
    feedbackElement.textContent = "";
    answerInput.value = "";
    answerInput.focus();
    currentWord = getRandomWord(currentSet);
    showWord(currentWord);
}

async function main() {
    const vocabularySets = await loadVocabularySets();
    currentSet = vocabularySets[0];

    const setNameElement = document.getElementById("set-name");
    setNameElement.textContent = currentSet.name;
    
    nextWord();
}

//Events
checkButton.addEventListener("click", checkAnswer);

answerInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        checkAnswer();
    }
})
//Program
main();