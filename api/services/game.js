/**
 * Manage Games.
 */

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

    return game;
  }

  move(id, subgame, cell) {
    const game = this.gameRepository.findOne(id);

    // Get turn.
    const turn = game.turn;

    // Add movement.
    const board = game.board;

    board[subgame][cell] = turn;

    // Change turn;
    const newTurn = turn == "X" ? "O" : "X";

    // Valid subgame.
    const validSubgames = [cell];

    // Make new game.
    const movedGame = Object.assign({}, game, {
      board: board,
      turn: newTurn,
      valid_subgames: validSubgames,
    });

    return this.gameRepository.update(id, movedGame);
  }
}

module.exports = GameService;
