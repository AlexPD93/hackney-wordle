import WORDS from "./words.js";

const totalRows = 6;
let guessesRemaining = totalRows;
let currentGuess = [];
let currentTile = 0;
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)];
console.log(rightGuessString);
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

  if (pressedKey === "Enter") {
    checkGuess();
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

function checkGuess() {
  let currentRow =
    document.getElementsByClassName("letter-row")[6 - guessesRemaining];
  let guessString = "";

  guessString = currentGuess.join("");

  if (guessString.length < 5) {
    console.log("not enough letters");
    return;
  }

  if (!WORDS.includes(guessString)) {
    console.log("word not in list!");
    return;
  }

  for (let i = 0; i < currentGuess.length; i++) {
    let box = currentRow.children[i];

    let letter = currentGuess[i];

    let letterPosition = rightGuessString.indexOf(currentGuess[i]);

    if (letterPosition === -1) {
      let grey = "#787C7E";
      fillTile(box, grey);
      fillKeyboard(letter, grey);
    } else {
      if (currentGuess[i] === rightGuessString[i]) {
        let green = "#6AAA64";
        fillTile(box, green);
        fillKeyboard(letter, green);
      } else {
        let yellow = "#C9B458";
        fillTile(box, yellow);
        fillKeyboard(letter, yellow);
      }
    }
  }

  if (guessString === rightGuessString) {
    console.log("You won!");
    guessesRemaining = 0;
  }

  guessesRemaining -= 1;
  currentGuess = [];
  currentTile = 0;
}

function fillTile(box, letterColour) {
  box.style.backgroundColor = letterColour;
}

function fillKeyboard(letter, letterColour) {
  let keys = document.getElementsByClassName("keyboard-button");

  Array.from(keys).forEach((key) => {
    if (letter === key.textContent) {
      key.style.backgroundColor = letterColour;
    }
  });
}

initBoard();

// If guess has double letter but correct word only has one only highlight one letter
