class AbstractPeople {
  constructor(id) {
    if (this.constructor == AbstractPeople) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    this.id = id;
  }

  async init(person) {
    this.name = person.name;
    this.mass = person.mass;
    this.height = person.height;
    this.homeworldName = person.homeworld_name;
    this.homeworldId = person.homeworld_id;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getMass() {
    return this.mass;
  }

  getHeight() {
    return this.height;
  }

  getHomeworldName() {
    return this.homeworldName;
  }

  getHomeworldId() {
    return this.homeworldId;
  }

  getWeightOnPlanet(planetId) {
    throw new Error("To be implemented");
  }
}

module.exports = { AbstractPeople };
