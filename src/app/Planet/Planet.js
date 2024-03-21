class Planet {
  constructor(id) {
    this.id = id;
  }

  async init(planet) {
    this.name = planet.name;
    this.gravity = planet.gravity;
  }

  getName() {
    return this.name;
  }

  getGravity() {
    return this.gravity;
  }
}

module.exports = { Planet };
