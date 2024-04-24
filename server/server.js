const mongoose = require("mongoose");

const MONGODB_URL = process.env.MONGODB_URL;

const connectServer = () => {
  mongoose
    .connect(MONGODB_URL)
    .then(() => {
      console.log("Mongoose Connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectServer;
