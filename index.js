const express = require("express");
const app = express();
const port = 8080;
const router = express.Router();

const GameRepository = require("./api/repositories/game");
const GameService = require("./api/services/game");
const GameController = require("./api/controllers/game");

// Serve static files.
app.use(express.static("public"));

// Repositories.
const gameRepository = new GameRepository();

// Services.
const gameService = new GameService(gameRepository);

// Controllers.
const gameController = new GameController(gameService);

// Declare routes.
router.post("/game", (req, res) => gameController.create(req, res));

// Set API prefix.
app.use("/api/v1", router);

// Start server.
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
