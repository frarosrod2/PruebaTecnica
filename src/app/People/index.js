const { WookieePeople } = require("./wookiePeople");
const { CommonPeople } = require("./CommonPeople");

const peopleFactory = async (person, lang) => {
  let people = null;
  if (lang == "wookiee") {
    people = new WookieePeople(person);
  } else {
    people = new CommonPeople(person);
  }
  await people.init();
  return people;
};

module.exports = { peopleFactory };
