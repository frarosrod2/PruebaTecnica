const db = require("../../app/db/index");
const { genericRequest } = require("../../app/swapiFunctions/index");

const getPlanetById = async (planetId, isUsingApi) => {
  const planetData = await findPlanetById(planetId, isUsingApi);
  if (!planetData) {
    if (isUsingApi) throw new Error("Planet not found");
    else {
      return await findPlanetById(planetId, true);
    }
  }

  return planetData;
};

const findPlanetById = async (planetId, isUsingApi) => {
  if (isUsingApi) {
    return await genericRequest(
      `https://swapi.py4e.com/api/planets/${planetId}`,
      "GET",
      null,
      true
    );
  } else {
    return await db.swPlanet.findByPk(planetId);
  }
};

module.exports = { getPlanetById };
