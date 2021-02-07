const express = require("express");
const app = express();
const port = 8080;
const router = express.Router();
const bodyParser = require("body-parser");

const GameRepository = require("./api/repositories/game");
const GameService = require("./api/services/game");
const GameController = require("./api/controllers/game");

// Serve static files.
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Repositories.
const gameRepository = new GameRepository();

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

// Start server.
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
