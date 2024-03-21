const { WookieePeople } = require("./wookiePeople");
const { CommonPeople } = require("./CommonPeople");

const peopleFactory = async (id, lang, isUsingApi = false) => {
  let people = null;
  if (lang == "wookiee") {
    people = new WookieePeople(id);
  } else {
    people = new CommonPeople(id);
  }
  await people.init(isUsingApi);
  return people;
};

module.exports = { peopleFactory };
