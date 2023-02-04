// Constants to define the size of the game board
const ROWS = 8;
const COLS = 8;
const MINES = 10;

// A 2D array to represent the game board
let board = [];

// A 2D array to represent the fog of war
let fog = [];

// An array to keep track of the positions of mines on the board
let mines = [];

// Initialize the board and fog
for (let row = 0; row < ROWS; row++) {
  board[row] = [];
  fog[row] = [];
  for (let col = 0; col < COLS; col++) {
    board[row][col] = "#";
    fog[row][col] = "#";
  }
}

for (var i = 0; i < MINES; i++) {
  var row = Math.floor(Math.random() * ROWS);
  var col = Math.floor(Math.random() * COLS);
  if (board[row][col] !== "*") {
    board[row][col] = "*";
    mines.push([row, col]);
  } else {
    i--;
  }
}

// Function to display the game board in the console
function displayBoard() {
  console.log("  " + [...Array(COLS).keys()].join(" "));
  for (let row = 0; row < ROWS; row++) {
    console.log(row + " " + fog[row].join(" "));
  }
}

// Function to count the number of mines around a cell
function countMines(row, col) {
  var count = 0;
  for (var r = Math.max(0, row - 1); r <= Math.min(row + 1, ROWS - 1); r++) {
    for (var c = Math.max(0, col - 1); c <= Math.min(col + 1, COLS - 1); c++) {
      if (board[r][c] === "*") {
        count++;
      }
    }
  }
  return count;
}

// Populate the board with the number of mines around each cell
for (var i = 0; i < mines.length; i++) {
  var row = mines[i][0];
  var col = mines[i][1];
  for (var r = Math.max(0, row - 1); r <= Math.min(row + 1, ROWS - 1); r++) {
    for (var c = Math.max(0, col - 1); c <= Math.min(col + 1, COLS - 1); c++) {
      if (board[r][c] !== "*") {
        board[r][c]++;
      }
    }
  }
}

// Function to reveal the cell
function revealCell(row, col) {
  if (board[row][col] === "*") {
    fog[row][col] = "*";
    console.log("You Lost! :(");
    return;
  }

  let count = countMines(row, col);
  fog[row][col] = count;
  board[row][col] = count;

  if (count === 0) {
    for (let r = Math.max(0, row - 1); r <= Math.min(row + 1, ROWS - 1); r++) {
      for (
        let c = Math.max(0, col - 1);
        c <= Math.min(col + 1, COLS - 1);
        c++
      ) {
        if (fog[r][c] === "#") {
          revealCell(r, c);
        }
      }
    }
  }

  let emptySpaces = 0;
  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      if (fog[i][j] === "#") {
        emptySpaces++;
      }
    }
  }

  if (emptySpaces === MINES) {
    console.log("You win! :)");
  }
}

// Function to reveal the fog of war
function reveal(x, y) {
  if (fog[x][y] === "#") {
    revealCell(x, y);
  }
}

//For your test:
//reveal(1, 5);

// Call the displayBoard function to display the initial state of the board
displayBoard();
