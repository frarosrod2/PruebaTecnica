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
      const randomPersonId = Math.floor(Math.random() * 88) + 1;
      const randomPlanetId = Math.floor(Math.random() * 61) + 1;

      const randomPerson = await peopleFactory(randomPersonId, null, true);
      const randomPlanet = new Planet(randomPlanetId, true);
      console.log({ randomPerson, randomPlanet });
      await randomPlanet.init(true);
      const weightOnPlanet =
        getWeightOnPlanet(randomPerson.getMass(), randomPlanet.getGravity()) ??
        null;
      res.send({ weightOnPlanet });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  });

  server.get("/hfswapi/getLogs", async (req, res) => {
    const data = await app.db.logging.findAll();
    res.send(data);
  });
};

module.exports = applySwapiEndpoints;
