const bcrypt = require("bcrypt");

module.exports = {
  async hashPassword(password) {
    try {
      const hash = await bcrypt.hash(password, 10);
      return hash;
    } catch (error) {
      console.log(error);
    }
  },
};
