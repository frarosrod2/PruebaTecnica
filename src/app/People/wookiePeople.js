const { AbstractPeople } = require("./abstractPeople");

class WookiePeople extends AbstractPeople {
  constructor(id) {
    super(id);
  }
}
module.exports = { WookiePeople };
