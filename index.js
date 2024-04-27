import WORDS from "./words.js";

const totalRows = 6;
let guessesRemaining = totalRows;
let currentGuess = [];
let currentTile = 0;
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)];

function initBoard() {
  let board = document.getElementById("game-board");

  for (let i = 0; i < totalRows; i++) {
    let row = document.createElement("div");
    row.className = "letter-row";

    for (let j = 0; j < 5; j++) {
      let box = document.createElement("div");
      box.className = "letter-box";
      row.appendChild(box);
    }

    board.appendChild(row);
  }
}

document.addEventListener("keyup", (e) => {
  let pressedKey = e.key;

  if (pressedKey === "Backspace") {
    removeLetterFromBoard();
  }

  let letterMatched = pressedKey.match(/[a-z]/gi);

  if (!letterMatched || letterMatched.length > 1) {
    return;
  } else {
    addLetterToBoard(pressedKey);
  }
});

function addLetterToBoard(pressedKey) {
  if (currentTile === 5) {
    return;
  }
  pressedKey = pressedKey.toLowerCase();

  let currentRow =
    document.getElementsByClassName("letter-row")[6 - guessesRemaining];
  let box = currentRow.children[currentTile];

  box.textContent = pressedKey;
  box.classList.add("filled-box");
  currentGuess.push(pressedKey);
  currentTile += 1;
}

function removeLetterFromBoard() {
  if (currentTile === 0) return;
  let currentRow =
    document.getElementsByClassName("letter-row")[6 - guessesRemaining];
  let box = currentRow.children[currentTile - 1];

  box.textContent = "";
  currentGuess.pop();
  currentTile -= 1;
}

initBoard();
