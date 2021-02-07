/**
 * Manage Games.
 */

const GameHelpers = require("../helpers/game");

class GameService {
  constructor(gameRepository) {
    this.gameRepository = gameRepository;
  }

  create() {
    const initialGame = {
      board: [
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
        ["", "", "", "", "", "", "", "", ""],
      ],
      winner: "",
      turn: "X",
      valid_subgames: [0, 1, 2, 3, 4, 5, 6, 7, 8],
    };

    const savedGame = this.gameRepository.create(initialGame);

    return savedGame;
  }

  get(id) {
    const game = this.gameRepository.findOne(id);

    if (!game) {
      return this.generateError("Invalid id");
    }

    return game;
  }

  move(id, subgame, cell) {
    const game = this.gameRepository.findOne(id);

    // Is a valid game?
    if (!game) {
      return this.generateError("Invalid id");
    }

    // Is a valid range of subgame?
    if (subgame < 0 || subgame > 8) {
      return this.generateError("Invalid subgame");
    }

    // Is a valid range of cell?
    if (cell < 0 || cell > 8) {
      return this.generateError("Invalid subgame");
    }

    // Is the movement to the correct subgame?
    if (!game.valid_subgames.includes(subgame)) {
      return this.generateError("Invalid move");
    }

    // Is the destination cell NOT occupied?
    if (game.board[subgame][cell] != "") {
      return this.generateError("Occupied cell");
    }

    // Get turn.
    const turn = game.turn;

    // Add movement.
    const board = game.board;

    board[subgame][cell] = turn;

    // Change turn;
    const newTurn = turn == "X" ? "O" : "X";

    // Make new game.
    const movedGame = Object.assign({}, game, {
      board: board,
      turn: newTurn,
    });

    // Valid subgame
    let validSubgames = [cell];

    if (GameHelpers.getGameStatus(game.board[cell]) != "") {
      validSubgames = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    }

    movedGame.valid_subgames = validSubgames;

    // Check winner before saving.
    const superTicTacToeBoard = movedGame.board.map((board) =>
      GameHelpers.getGameStatus(board)
    );
    const theWinner = GameHelpers.getGameStatus(superTicTacToeBoard);

    if (theWinner != "") {
      movedGame.winner = theWinner;
    }

    return this.gameRepository.update(id, movedGame);
  }

  generateError(msg) {
    return {
      Error: msg,
    };
  }
}

module.exports = GameService;
