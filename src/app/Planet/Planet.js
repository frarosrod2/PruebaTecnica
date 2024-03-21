const { getPlanetById } = require("../../server/services/planetService");

class Planet {
  constructor(id) {
    this.id = id;
  }

  async init(isUsingApi = false) {
    const planet = await getPlanetById(this.id, isUsingApi);
    this.name = planet.name ?? "";
    this.gravity = planet.gravity ?? null;
  }

  getName() {
    return this.name;
  }

  getGravity() {
    return this.gravity;
  }
}

module.exports = { Planet };
