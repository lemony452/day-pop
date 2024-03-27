const crypto = require("crypto");

const generateRandomString = (length) => {
  return crypto.randomBytes(60).toString("hex").slice(0, length);
};

module.exports = generateRandomString;
