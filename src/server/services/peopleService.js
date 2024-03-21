const db = require("../../app/db/index");
const { genericRequest } = require("../../app/swapiFunctions/index");

const getPersonById = async (personId, isUsingApi) => {
  const personData = await findPersonById(personId, isUsingApi);
  if (!personData) {
    throw new Error("Person not found");
  }
  return personData;
};

const findPersonById = async (personId, isUsingApi) => {
  if (isUsingApi) {
    return await genericRequest(
      `https://swapi.py4e.com/api/people/${personId}`,
      "GET",
      null,
      true
    );
  } else {
    return await db.swPeople.findByPk(personId);
  }
};

module.exports = { getPersonById };
