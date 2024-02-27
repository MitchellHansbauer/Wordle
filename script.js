import { checkWordPositions } from "./wordle.js";
import { addTogglefunction } from "./toggle-dark-mode.js";

const wordleGrid = document.getElementById(`wordle-grid`);
addTogglefunction();

let gameConfig;

async function initializeGame() {
    const word = await getWord();
    gameConfig = {
        rows: 5,
        cols: 5,
        word: word
    };
    createGameGrid();
}

initializeGame();

function addCellToGrid(row, col) {
    const cell = document.createElement(`div`);
    cell.classList.add(`letter`);
    cell.id = `${row}-${col}`;
    wordleGrid.appendChild(cell);
}

function createGameGrid() {
    for (let row = 0; row < gameConfig.rows; row++) {
        for (let col = 0; col < gameConfig.cols; col++) {
            addCellToGrid(row, col);
        }
    }
}

function addLetterToBox(letter, row, col) {
    const cell = document.getElementById(`${row}-${col}`);
    cell.innerText = letter;
}

const gameState = {
    currentAttempt: 0,
    currentPosition: 0,
    currentGuess: ''
}

function isLetter(letter) {
    return letter.match(/[a-z]/i)
}

async function getWord() {
    const response = await fetch('https://it3049c-hangman.fly.dev');
    const data = await response.json();
    return data.word;
}

async function isWordValid(word) {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`).then((response) => response.json())
    return Array.isArray(response) && response.length > 0;
}

function updateAttemptGrid(){
    const results = checkWordPositions(gameState.currentGuess, gameConfig.word);
    results.forEach((result, index) => {
        const cell = document.getElementById(`${gameState.currentAttempt}-${index}`);
        cell.classList.add(result);
    });
}

document.addEventListener('keydown', async(event) => {
    if(event.key === 'Enter') {
        if (gameState.currentAttempt === gameConfig.rows) {
            console.log('Game Over');
            return;
        }
        if (gameState.currentGuess.length === gameConfig.cols) {
            if (! await (isWordValid(gameState.currentGuess))) {
                console.log('You guessed an invalid word');
                return;
            }
            updateAttemptGrid();
            gameState.currentAttempt++;
        }
        if (gameState.currentGuess === gameConfig.word) {
            console.log('You win');
            return;
        }
        
        gameState.currentPosition = 0;
        gameState.currentGuess = '';
    }
    else if(event.key === 'Backspace') {
        const letter = '';
        gameState.currentGuess = gameState.currentGuess.slice(0, -1);
        addLetterToBox(letter, gameState.currentAttempt, gameState.currentPosition); 
        if (gameState.currentPosition != 0) {
            gameState.currentPosition--;
        }
        return;
        }   
    else if(event.key === 'Delete'){
        return;
    }
    else if(event.key === 'Control'){
        return;
    }
    else if(event.key === 'Shift'){
        return;
    }
    else if(event.key === 'Meta'){
        return;
    }
    else if(event.key === 'Alt'){
        return;
    }
    else if(event.key === 'CapsLock'){
        return;
    }
    else if(event.key === 'Tab'){
        return;
    }else if(event.key === 'Insert'){
        return;
    }
    else if(event.key === 'Escape'){
        return;
    }
    else if(isLetter(event.key) && gameState.currentGuess.length !== gameConfig.cols) {
        const letter = event.key;
        addLetterToBox(letter, gameState.currentAttempt, gameState.currentPosition)
        gameState.currentGuess += letter;
        if(gameState.currentPosition !== gameConfig.cols - 1){
            gameState.currentPosition++;
        }
        }   
        else{
            return
        }      
});
