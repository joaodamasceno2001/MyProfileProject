module.exports = {
  StringAsArray(arrayAsString) {
    return arrayAsString.split(",").map((item) => item.trim());
  },
};
