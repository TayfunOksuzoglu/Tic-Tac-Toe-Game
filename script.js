const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#status-text');
const restartButton = document.querySelector('#restart-button');
const scoreX = document.querySelector('#score-x');
const scoreO = document.querySelector('#score-o');
const resetScoreButton = document.querySelector('#reset-scoreboard-button');
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let options = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let running = false;
let playerXScore = 0;
let playerOScore = 0;

initializeGame();

function initializeGame() {
  cells.forEach((cell) => {
    cell.addEventListener('click', cellClicked);
  });
  restartButton.addEventListener('click', restartGame);
  resetScoreButton.addEventListener('click', resetScoreboard);
  statusText.textContent = `${currentPlayer}'s turn`;
  running = true;
}

function cellClicked() {
  const cellIndex = this.getAttribute('cellIndex');

  if (options[cellIndex] !== '' || !running) {
    return;
  }

  updateCell(this, cellIndex);
  checkWinner();
}

function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
  let roundWon = false;
  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i]; // winCondition array for example [3,4,5]
    const cellA = options[condition[0]]; // For example 3 inside the above ⬆️array
    const cellB = options[condition[1]]; // For example 4 inside the above ⬆️array
    const cellC = options[condition[2]]; // For example 5 inside the above ⬆️array

    if (cellA === '' || cellB === '' || cellC === '') {
      continue;
    }

    if (cellA === cellB && cellB === cellC) {
      roundWon = true;
      break;
    }
  }

  if (roundWon === true) {
    statusText.textContent = `${currentPlayer} Won`;

    updateScoreBoard(currentPlayer);

    running = false;

    setTimeout(() => {
      restartGame();
    }, 1000);
  } else if (!options.includes('')) {
    statusText.textContent = `Draw`;
  } else {
    changePlayer();
  }
}

function restartGame() {
  currentPlayer = 'X';
  options = ['', '', '', '', '', '', '', '', ''];
  statusText.textContent = `${currentPlayer}'s turn`;
  cells.forEach((cell) => (cell.textContent = ''));
  running = true;
}

function resetScoreboard() {
  playerXScore = 0;
  playerOScore = 0;
  scoreX.textContent = `Player X's Score: 0`;
  scoreO.textContent = `Player O's Score: 0`;
}

function updateScoreBoard(currentPlayer) {
  if (currentPlayer === 'X') {
    playerXScore++;
    scoreX.textContent = `Player X's Score: ${playerXScore}`;
  } else {
    playerOScore++;
    scoreO.textContent = `Player O's Score: ${playerOScore}`;
  }
}
