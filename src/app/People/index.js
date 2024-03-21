const { WookieePeople } = require("./wookiePeople");
const { CommonPeople } = require("./CommonPeople");

const peopleFactory = async (person, lang) => {
  let people = null;
  if (lang == "wookiee") {
    people = new WookieePeople(person.id);
  } else {
    people = new CommonPeople(person.id);
  }
  await people.init(person);
  return people;
};

module.exports = { peopleFactory };
