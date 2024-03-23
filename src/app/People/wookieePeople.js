const { AbstractPeople } = require("./abstractPeople");

class WookieePeople extends AbstractPeople {
  constructor(id) {
    super(id);
  }
}

module.exports = { WookieePeople };
