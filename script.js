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

// Functions
async function loadVocabularySets() {
    const response = await fetch("vocabulary.json");
    if (!response.ok) {
        throw new Error("Die JSON-Datei kann nicht geladen werden!");
    }
    return await response.json();
}

function getRandomWord(set) {
    const randomIndex = Math.floor(Math.random() * set.words.length);
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
        answerInput.value = "";
        answerInput.focus();

        setTimeout(function() {
            nextWord();
        }, 1000);
        
    } else {
        feedbackElement.textContent = "Falsch! " + currentWord.italian;
        nextWord();
    }
}

function nextWord () {
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

//Program
main();