const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// initialize board
let board = [ [0, 0, 0],
              [0, 0, 0],
              [0, 0, 0] ];
let emptySpaces = 9;
let xTurn = true;
let pause = false;

const showBoard = () => {
  let flatBoard = board.map(row => {
    return row.join('');
  });
  console.log(flatBoard.join('\n'));
}

const takeTurn = (row, col) => {
  board[row][col] = xTurn ? 1 : 2;
  xTurn = !xTurn;
  emptySpaces--;
}

const checkRows = () => {
  for (let i = 0; i < board.length; i++) {
    let rowSum = board[i].reduce((acc, val) => {
      return acc + val;
    }, 0);
    if (rowSum && rowSum % board.length === 0) { return rowSum / board.length === 1 ? 'X' : 'O'; }
  }
}

const checkCols = () => {
  for (let col = 0; col < board.length; col++) {
    let col = [];
    let colSum;

    for (let row = 0; row < board.length; row++) {
      col.push(board[row][col]);
    }
    colSum = col.reduce((acc, val) => {
      return acc + val;
    }, 0);

    if (colSum && colSum % board.length === 0) { return colSum / board.length === 1 ? 'X' : 'O'; }
  }
}

// while no winner and empty spots:
while (!pause) {
  pause = true;
  // view board
  showBoard(board);
  // show which player is next
  console.log(xTurn ? 'Player X\'s turn' : 'Player O\'s turn');
  // ask for coordinates
  rl.question('Please enter coordinates in the form of row,col: ', (coord) => {
    console.log('coord', coord);
    // check coords are valid: on the board, not already taken
      if (coord[0] > 2 || coord[2] > 2) {
        console.log('Sorry, that coordinate is out of bounds');
        pause = false;
      } else if (board[coord[0]][coord[2]]) {
        // if conflict, reject the coords and ask again
        console.log('Sorry, that spot was already taken');
        pause = false;
      } else {
        takeTurn(coord[0], coord[2]);
        // check for winner
        if (checkRows()) {
          // if winner, end game with win message
          console.log(checkRows(), 'wins!')
        } else if (checkCols()) {
          console.log(checkCols(), 'wins!');
        } else if (!emptySpaces) {
          console.log('tie game');
        } else {
          pause = false;
        }
      }
  });
}
