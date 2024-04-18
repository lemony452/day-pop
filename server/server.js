const mongoose = require("mongoose");

const LOCAL_MONGODB_URL = "mongodb://127.0.0.1:27017/day-pop";
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
