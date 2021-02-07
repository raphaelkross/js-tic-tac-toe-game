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

  get(req, res) {
    const { id } = req.query;

    const game = this.gameService.get(id);

    res.status(200).json(game);
  }

  move(req, res) {
    const { id, subgame, cell } = req.body;

    const movedGame = this.gameService.move(
      parseInt(id),
      parseInt(subgame),
      parseInt(cell)
    );

    res.status(200).json(movedGame);
  }
}

module.exports = GameController;
