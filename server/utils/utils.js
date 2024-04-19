const crypto = require("crypto");
const bcrypt = require("bcrypt");

const generateRandomString = (length) => {
  return crypto.randomBytes(60).toString("hex").slice(0, length);
};

const saltRounds = 5;

const getHash = (value) => {
  return bcrypt.hashSync(value, saltRounds);
};

module.exports = { generateRandomString, getHash };
