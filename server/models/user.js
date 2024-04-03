const mongoose = require("mongoose");
const { Schema } = mongoose;

const Popsong = require("../models/play");

const UserSchema = new Schema({
  nickname: String,
  refreshToken: String,
  grade: { type: String, default: "-" },
  score: { type: Number, default: 0 },
  spotifyId: {
    type: String,
    unique: true,
  },
  userId: String,
  userPassword: String,
  studyingList: [
    {
      type: Schema.Types.ObjectId,
      ref: Popsong,
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
