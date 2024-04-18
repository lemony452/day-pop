const mongoose = require("mongoose");

const LOCAL_MONGODB_URI = process.env.LOCAL_MONGODB_URI;
const MONGODB_URI = process.env.MONGODB_URI;

const connectServer = () => {
  mongoose
    .connect(MONGODB_URI)
    .then(() => {
      console.log("Mongoose Connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectServer;
