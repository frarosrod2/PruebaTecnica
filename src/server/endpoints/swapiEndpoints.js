const { peopleFactory } = require("../../app/People");
const { getWeightOnPlanet } = require("../../app/swapiFunctions");
const { Planet } = require("../../app/Planet/index");

const _isWookieeFormat = (req) => {
  if (req.query.format && req.query.format == "wookiee") {
    return true;
  }
  return false;
};

const applySwapiEndpoints = (server, app) => {
  server.get("/hfswapi/test", async (req, res) => {
    const data = await app.swapiFunctions.genericRequest(
      "https://swapi.py4e.com/api/",
      "GET",
      null,
      true
    );
    res.send(data);
  });

  server.get("/hfswapi/getPeople/:id", async (req, res) => {
    try {
      const personId = req.params.id;
      const person = await peopleFactory(personId);

      const formattedPerson = {
        name: person.getName(),
        mass: person.getMass(),
        height: person.getHeight(),
        homeworldName: person.getHomeworldName(),
        homeworldId: person.getHomeworldId(),
      };

      res.send(formattedPerson);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  });

  server.get("/hfswapi/getPlanet/:id", async (req, res) => {
    try {
      const planetId = req.params.id;
      const planet = new Planet(planetId);
      await planet.init();

      const formattedPlanet = {
        name: planet.getName(),
        gravity: planet.getGravity(),
      };

      res.send(formattedPlanet);
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  });

  server.get("/hfswapi/getWeightOnPlanetRandom", async (req, res) => {
    try {
      const randomPersonId = Math.floor(Math.random() * 88) + 1; //Last personId in api is 88 (some people returns unkown mass)
      const randomPlanetId = Math.floor(Math.random() * 61) + 1; //Last planetId in api is 61 (some planets returns unkown gravity)
      const isUsingApi = true;

      const randomPerson = await peopleFactory(
        randomPersonId,
        null, //or "wookiee"
        isUsingApi
      );
      const randomPlanet = new Planet(randomPlanetId, isUsingApi);
      await randomPlanet.init(true);
      console.log({ randomPerson });
      if (randomPerson.homeworldId === randomPlanet.getId()) {
        throw new Error(
          "The person home planet is the same as the obtained planet"
        );
      }

      const weightOnPlanet =
        getWeightOnPlanet(randomPerson.getMass(), randomPlanet.getGravity()) ??
        null;
      res.send({ weightOnPlanet });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  });

  server.get("/hfswapi/getLogs", async (req, res) => {
    try {
      const data = await app.db.logging.findAll({
        raw: true,
      });
      console.log({ data });
      res.send(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
};

module.exports = applySwapiEndpoints;
