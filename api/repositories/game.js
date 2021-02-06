/**
 * Store Game Server State.
 */

class GameRepository {
  constructor() {
    // Store latest game ID.
    this.latestGameID = 0;
    // Store each game into a key.
    this.games = {};
  }

  get(id) {
    return this.games[id];
  }

  save(game) {
    const gameWithID = Object.assign({}, game, {
      id: this.latestGameID,
    });

    this.games = Object.assign(this.games, { [this.latestGameID]: gameWithID });

    this.latestGameID++;

    return gameWithID;
  }
}

module.exports = GameRepository;
