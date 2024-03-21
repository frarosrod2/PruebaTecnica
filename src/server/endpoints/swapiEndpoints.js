const { peopleFactory } = require("../../app/People/index");
const { Planet } = require("../../app/Planet");

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
    const personId = req.params.id;
    const personData = await app.db.swPeople.findByPk(personId);
    if (!personData) {
      res.status(404).send("Person not found");
      return;
    }

    const person = await peopleFactory(personData, null);
    const formattedPerson = {
      name: person.getName(),
      mass: person.getMass(),
      height: person.getHeight(),
      homeworldName: person.getHomeworldName(),
      homeworldId: person.getHomeworldId(),
    };

    res.send(formattedPerson);
  });

  server.get("/hfswapi/getPlanet/:id", async (req, res) => {
    const planetId = req.params.id;
    const planetData = await app.db.swPlanet.findByPk(planetId);

    if (!planetData) {
      res.status(404).send("Planet not found");
      return;
    }

    const planet = await new Planet(planetId);
    planet.init(planetData);
    const formattedPlanet = {
      name: planet.getName(),
      gravity: planet.getGravity(),
    };

    res.send(formattedPlanet);
  });

  server.get("/hfswapi/getWeightOnPlanetRandom", async (req, res) => {
    res.sendStatus(501);
  });

  server.get("/hfswapi/getLogs", async (req, res) => {
    const data = await app.db.logging.findAll();
    res.send(data);
  });
};

module.exports = applySwapiEndpoints;
