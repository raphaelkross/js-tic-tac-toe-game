/**
 * Game Helpers.
 */

const { check } = require("prettier");

const checkWinner = (player, game) => {
  // Convert array to matrix.
  let matrix = [];

  const gameMod = game.slice(0, game.length);

  for (let i = 3; i > 0; i--) {
    matrix.push(gameMod.splice(0, Math.ceil(gameMod.length / i)));
  }

  /*
    [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8]
    ]
  */

  // Check if there's horizontal winner.
  for (let row = 0; row < 3; row++) {
    if (
      matrix[row][0] == player &&
      matrix[row][1] == player &&
      matrix[row][2] == player
    ) {
      return true;
    }
  }

  // Check if there's vertical winner.
  for (let col = 0; col < 3; col++) {
    if (
      matrix[0][col] == player &&
      matrix[1][col] == player &&
      matrix[2][col] == player
    ) {
      return true;
    }
  }

  // Check diagonals.
  if (
    (matrix[0][0] == player &&
      matrix[1][1] == player &&
      matrix[2][2] == player) ||
    (matrix[0][2] == player && matrix[1][1] == player && matrix[2][0] == player)
  ) {
    return true;
  }

  return false;
};

module.exports = {
  getGameStatus: (game) => {
    // Check if empty cells on the game.
    const isThereEmptyCells = game.find((cell) => cell === "");

    const isXWinner = checkWinner("X", game);
    const isOWinner = checkWinner("O", game);

    if (isXWinner) {
      return "X";
    }

    if (isOWinner) {
      return "O";
    }

    // Tie.
    if (!isOWinner && !isXWinner && isThereEmptyCells != "") {
      return "-";
    }

    // Return empty, game to go...
    return "";
  },
};
