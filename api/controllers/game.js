/**
 * Game Controller.
 */

class GameController {
  constructor(gameService) {
    this.gameService = gameService;
  }

  create(req, res) {
    const newGame = this.gameService.create();

    res.status(200).json(newGame);
  }
}

module.exports = GameController;
