/**
 * Store Game Server State.
 */

class GameRepository {
  constructor(intialGames) {
    // Store latest game ID.
    this.latestGameID = 0;
    // Store each game into a key.
    this.games = intialGames ? intialGames : {};
  }

  findOne(id) {
    if (!this.games.hasOwnProperty(id)) {
      return false;
    }

    return this.games[id];
  }

  create(game) {
    const gameWithID = Object.assign({}, game, {
      id: this.latestGameID,
    });

    this.games = Object.assign(this.games, { [this.latestGameID]: gameWithID });

    this.latestGameID++;

    return gameWithID;
  }

  update(id, game) {
    this.games = Object.assign(this.games, { [id]: game });

    return this.findOne(id);
  }
}

module.exports = GameRepository;
