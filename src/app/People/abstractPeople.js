const { getPersonById } = require("../../server/services/peopleService");

class AbstractPeople {
  constructor(id) {
    if (this.constructor == AbstractPeople) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    this.id = id;
  }

  async init(isUsingApi) {
    const person = await getPersonById(this.id, isUsingApi);
    this.name = person.name ?? "";
    this.mass = person.mass ?? null;
    this.height = person.height ?? null;
    this.homeworldName = person.homeworld_name ?? "";
    this.homeworldId = isUsingApi
      ? +person.homeworld?.split("api/planets/")?.[1]?.replaceAll("/", "") ?? ""
      : +person.homeworld_id?.split("planets/")?.[1]?.replaceAll("/", "") ?? "";
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
