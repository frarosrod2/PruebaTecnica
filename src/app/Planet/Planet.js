const { getPlanetById } = require("../../server/services/planetService");

class Planet {
  constructor(id) {
    this.id = id;
  }

  async init(isUsingApi = false) {
    const planet = await getPlanetById(this.id, isUsingApi);
    this.name = planet.name ?? "";
    let gravity = null;
    if (isUsingApi) {
      const parsedGravity = +planet.gravity?.split(" ")?.[0].trim(); //If the returned gravity is a string with details (case to improve the api results)
      if (!isNaN(parsedGravity)) {
        gravity = parsedGravity;
      }
    } else {
      gravity = planet.gravity;
    }
    this.gravity = gravity ?? null;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getGravity() {
    return this.gravity;
  }
}

module.exports = { Planet };
