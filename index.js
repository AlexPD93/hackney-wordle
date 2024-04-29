import WORDS from "./words.js";

const totalRows = 6;
const maxLettersPerRow = 5;

// Amount of guess rows remaining
let guessesRemaining = totalRows;

// Array of letters that make up the current guess
let currentGuess = [];

// Tile that letter will go in
let currentTile = 0;

// Randomly pick a word from the words array
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)];

// Event listner to recognise when a letter key, enter or backspace is pressed
document.addEventListener("keyup", handleKeyPress);

// Event listner to recognise when a letter key, enter or delete is clicked
document.addEventListener("click", handleKeyClick);

function handleKeyPress(e) {
  let pressedKey = e.key;

  if (pressedKey === "Backspace") removeLetterFromBoard();

  if (pressedKey === "Enter") checkGuess();

  let letterMatched = pressedKey.match(/[a-z]/gi);

  if (!letterMatched || letterMatched.length > 1) {
    return;
  } else {
    addLetterToBoard(pressedKey);
  }
}

function handleKeyClick(e) {
  let clickedKey = e.target.innerHTML;

  if (clickedKey === "Del") removeLetterFromBoard();

  if (clickedKey === "Enter") checkGuess();

  let letterMatched = clickedKey.match(/[a-z]/gi);

  if (!letterMatched || letterMatched.length > 1) {
    return;
  } else {
    addLetterToBoard(clickedKey);
  }
}

function addLetterToBoard(letter) {
  // Won't add a letter to the row if there is a letter in the 5th tile of the row
  if (currentTile === maxLettersPerRow) {
    return;
  }
  letter = letter.toLowerCase();

  // To determine current row it takes the guessesRemaining away from 6. guessesRemaining will not go below 1
  let currentRow =
    document.getElementsByClassName("letter-row")[6 - guessesRemaining];

  let box = currentRow.children[currentTile];

  box.textContent = letter;
  box.classList.add("filled-box");
  currentGuess.push(letter);
  currentTile++;
}

function removeLetterFromBoard() {
  if (currentTile === 0) return;
  let currentRow =
    document.getElementsByClassName("letter-row")[6 - guessesRemaining];
  let box = currentRow.children[currentTile - 1];

  box.textContent = "";
  box.classList.remove("filled-box");
  currentGuess.pop();
  currentTile--;
}

function checkGuess() {
  let currentRow =
    document.getElementsByClassName("letter-row")[6 - guessesRemaining];
  let guessString = "";

  guessString = currentGuess.join("");

  if (guessString.length < maxLettersPerRow) {
    showWarningMessage("Not enough letters");
    return;
  }

  if (!WORDS.includes(guessString)) {
    showWarningMessage("Not in word list");
    return;
  }

  for (let i = 0; i < currentGuess.length; i++) {
    let box = currentRow.children[i];

    let letter = currentGuess[i];

    // Position of letter within currentGuess string
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
    showSuccessMessage("Genius!", "success");
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

function showWarningMessage(message) {
  swal(message, {
    buttons: false,
    timer: 1500,
    icon: "warning",
  });
}

function showSuccessMessage(message) {
  swal(message, {
    buttons: false,
    timer: 1500,
    icon: "success",
  });
}

const modeToggleButton = document.getElementById("modeToggleButton");
let lightMode = true;
modeToggleButton.addEventListener("click", toggleMode);

function toggleMode() {
  let body = document.body;
  const button = modeToggleButton.querySelector("i");
  if (lightMode) {
    button.classList.remove("fa-moon");
    button.classList.add("fa-sun");
    body.classList.replace("light-mode-body", "dark-mode-body");
  } else {
    button.classList.remove("fa-sun");
    button.classList.add("fa-moon");
    body.classList.replace("dark-mode-body", "light-mode-body");
  }
  lightMode = !lightMode;
}
