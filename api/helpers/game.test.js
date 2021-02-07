const GameHelpers = require("./game");

describe("Game Helpers", () => {
  it("should return empty if game is not complete", () => {
    // ["", "", "", "", "", "", "", "", ""]
    const game = ["", "", "X", "", "O", "", "", "", ""];
    expect(GameHelpers.getGameStatus(game)).toBe("");
  });

  it("should return [Player] if game is horizontal won by [Player]", () => {
    const game = ["X", "X", "X", "O", "X", "O", "O", "O", "X"];
    const game2 = ["X", "O", "O", "X", "X", "X", "O", "X", "O"];
    const game3 = ["X", "X", "O", "O", "O", "X", "X", "X", "X"];

    expect(GameHelpers.getGameStatus(game)).toBe("X");
    expect(GameHelpers.getGameStatus(game2)).toBe("X");
    expect(GameHelpers.getGameStatus(game3)).toBe("X");
  });
  it("should return [Player] if partial game is won by [Player]", () => {
    const game = ["X", "X", "X", "O", "X", "", "O", "", ""];

    expect(GameHelpers.getGameStatus(game)).toBe("X");
  });
  it("should return [Player] if game is vertically won by [Player]", () => {
    const game = ["O", "X", "O", "O", "X", "O", "O", "O", "X"];
    const game2 = ["O", "X", "O", "O", "X", "X", "X", "X", "O"];
    const game3 = ["O", "O", "X", "X", "O", "X", "O", "X", "X"];
    expect(GameHelpers.getGameStatus(game)).toBe("O");
    expect(GameHelpers.getGameStatus(game2)).toBe("X");
    expect(GameHelpers.getGameStatus(game3)).toBe("X");
  });
  it("should return [Player] if game is diagonal won by [Player]", () => {
    const game = ["X", "O", "O", "X", "X", "O", "O", "O", "X"];
    const game2 = ["X", "X", "O", "X", "O", "X", "O", "X", "X"];
    expect(GameHelpers.getGameStatus(game)).toBe("X");
    expect(GameHelpers.getGameStatus(game2)).toBe("O");
  });
  it("should return - if game is tied", () => {
    const game = ["X", "O", "O", "O", "X", "X", "O", "X", "O"];
    expect(GameHelpers.getGameStatus(game)).toBe("-");
  });
});
