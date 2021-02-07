const app = require("../../server");
const supertest = require("supertest");
const mockGames = require("./games.mock");
const request = supertest(app(mockGames));

beforeAll(async (done) => {
  done();
});

describe("Game controller", () => {
  it("should start a game sucessfully", async (done) => {
    // Sends GET Request to /test endpoint
    const res = await request.post("/api/v1/game");

    const { status, body } = res;

    const expected = {
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
      id: 0,
    };

    expect(status).toBe(200);
    expect(body).toStrictEqual(expected);
    done();
  });

  it("should return invalid game when ID do not exist", async (done) => {
    // Sends GET Request to /test endpoint
    const res = await request.get("/api/v1/game?id=200");

    const { status, body } = res;

    const expected = {
      Error: "Invalid id",
    };

    expect(status).toBe(200);
    expect(body).toStrictEqual(expected);

    done();
  });

  it("should return valid game when ID exist", async (done) => {
    // Sends GET Request to /test endpoint
    const res = await request.get("/api/v1/game?id=0");

    const { status, body } = res;

    const expected = {
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
      id: 0,
    };

    expect(status).toBe(200);
    expect(body).toStrictEqual(expected);

    done();
  });

  it("should do a valid move", async (done) => {
    // Sends GET Request to /test endpoint
    const res = await request.post("/api/v1/move").send({
      id: 0,
      subgame: 0,
      cell: 8,
    });

    const { status, body } = res;

    const expected = {
      board: [
        ["", "", "", "", "", "", "", "", "X"],
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
      turn: "O",
      valid_subgames: [8],
      id: 0,
    };

    expect(status).toBe(200);
    expect(body).toStrictEqual(expected);

    done();
  });

  it("should return invalid game id when move into an invalid game", async (done) => {
    // Sends GET Request to /test endpoint
    const res = await request.post("/api/v1/move").send({
      id: 100,
      subgame: 0,
      cell: 8,
    });

    const { status, body } = res;

    const expected = {
      Error: "Invalid id",
    };

    expect(status).toBe(200);
    expect(body).toStrictEqual(expected);

    done();
  });

  it("should return invalid subgame when move into an invalid subgame", async (done) => {
    // Sends GET Request to /test endpoint
    const res = await request.post("/api/v1/move").send({
      id: 0,
      subgame: 20,
      cell: 8,
    });

    const { status, body } = res;

    const expected = {
      Error: "Invalid subgame",
    };

    expect(status).toBe(200);
    expect(body).toStrictEqual(expected);

    done();
  });

  it("should return invalid cell when move into an invalid cell", async (done) => {
    // Sends GET Request to /test endpoint
    const res = await request.post("/api/v1/move").send({
      id: 0,
      subgame: 0,
      cell: 10,
    });

    const { status, body } = res;

    const expected = {
      Error: "Invalid subgame",
    };

    expect(status).toBe(200);
    expect(body).toStrictEqual(expected);

    done();
  });

  it("should return invalid move when move into an invalid subgame", async (done) => {
    // Sends GET Request to /test endpoint
    const res = await request.post("/api/v1/move").send({
      id: 0,
      subgame: 6,
      cell: 4,
    });

    const { status, body } = res;

    const expected = {
      Error: "Invalid move",
    };

    expect(status).toBe(200);
    expect(body).toStrictEqual(expected);

    done();
  });

  it("should return occupied cell when move into an occupied cell", async (done) => {
    // Sends GET Request to /test endpoint
    const res = await request.post("/api/v1/move").send({
      id: 77,
      subgame: 0,
      cell: 0,
    });

    const { status, body } = res;

    const expected = {
      Error: "Occupied cell",
    };

    expect(status).toBe(200);
    expect(body).toStrictEqual(expected);

    done();
  });

  it("should return all valid_subgames when move into an won game", async (done) => {
    // Sends GET Request to /test endpoint
    const res = await request.post("/api/v1/move").send({
      id: 78,
      subgame: 0,
      cell: 1,
    });

    const { status, body } = res;

    const expected = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    expect(status).toBe(200);
    expect(body.valid_subgames).toStrictEqual(expected);

    done();
  });

  it("should return winner = true when you won 3 tic tac toe games in a row", async (done) => {
    // Sends GET Request to /test endpoint
    const res = await request.post("/api/v1/move").send({
      id: 79,
      subgame: 0,
      cell: 0,
    });

    const { status, body } = res;

    expect(status).toBe(200);
    expect(body.winner).toStrictEqual("X");

    done();
  });
});
