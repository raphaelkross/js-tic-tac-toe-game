const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");

const GameRepository = require("./api/repositories/game");
const GameService = require("./api/services/game");
const GameController = require("./api/controllers/game");

// Serve static files.
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

module.exports = (initialGames) => {
  // Repositories.
  const gameRepository = new GameRepository(initialGames);

  // Services.
  const gameService = new GameService(gameRepository);

  // Controllers.
  const gameController = new GameController(gameService);

  // Declare routes.
  router.post("/game", (req, res) => gameController.create(req, res));
  router.get("/game", (req, res) => gameController.get(req, res));
  router.post("/move", (req, res) => gameController.move(req, res));

  // Set API prefix.
  app.use("/api/v1", router);

  return app;
};
