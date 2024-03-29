const mongoose = require("mongoose");

const connectServer = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/day-pop")
    .then(() => {
      console.log("Mongoose Connected");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectServer;
