const squares = document.querySelectorAll('.square');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');
let playerTurn = true;
let gameOver = false;
let board = ['', '', '', '', '', '', '', '', ''];

// Function to check if the game is over
function checkGameOver() {
  // Check rows
  for (let i = 0; i < 9; i += 3) {
    if (board[i] !== '' && board[i] === board[i + 1] && board[i] === board[i + 2]) {
      gameOver = true;
      return board[i];
    }
  }
  // Check columns
  for (let i = 0; i < 3; i++) {
    if (board[i] !== '' && board[i] === board[i + 3] && board[i] === board[i + 6]) {
      gameOver = true;
      return board[i];
    }
  }
  // Check diagonals
  if (board[0] !== '' && board[0] === board[4] && board[0] === board[8]) {
    gameOver = true;
    return board[0];
  }
  if (board[2] !== '' && board[2] === board[4] && board[2] === board[6]) {
    gameOver = true;
    return board[2];
  }
  // Check for tie
  if (!board.includes('')) {
    gameOver = true;
    return 'tie';
  }
  return '';
}

// Function to reset the game
function reset() {
  playerTurn = true;
  gameOver = false;
  board = ['', '', '', '', '', '', '', '', ''];
  message.textContent = '';
  squares.forEach(square => {
    square.classList.remove('x');
    square.classList.remove('o');
    square.removeEventListener('click', makeMove);
    square.addEventListener('click', makeMove);
  });
}

// Function to make a move
function makeMove(event) {
  if (gameOver) return;
  const square = event.target;
  const index = Array.from(squares).indexOf(square);
  if (board[index] !== '') return;
  board[index] = playerTurn ? 'x' : 'o';
  square.classList.add(playerTurn ? 'x' : 'o');
  square.removeEventListener('click', makeMove);
  const winner = checkGameOver();
  if (winner !== '') {
    if (winner === 'tie') {
      message.textContent = "It's a tie!";
    } else {
      message.textContent = `${winner.toUpperCase()} wins!`;
    }
    gameOver = true;
    return;
  }
  playerTurn = !playerTurn;
  if (!playerTurn) {
    // Make computer move
    const availableSquares = Array.from(squares).filter(square => !square.classList.contains('x') && !square.classList.contains('o'));
    const randomIndex = Math.floor(Math.random() * availableSquares.length);
    availableSquares[randomIndex].dispatchEvent(new Event('click'));
  }
}

// Initialize the game
resetButton.addEventListener('click', reset);
squares.forEach(square => {
  square.addEventListener('click', makeMove);
});