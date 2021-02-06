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

    const savedGame = this.gameRepository.save(initialGame);

    return savedGame;
  }
}

module.exports = GameService;
