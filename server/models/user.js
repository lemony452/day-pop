const mongoose = require("mongoose");
const { Schema } = mongoose;

const PlaylistSchema = new Schema({
  title: String,
  artist: String,
  date: { type: Date, default: Date.now },
  grade: String,
  result: {
    grade: String,
    score: Number,
  },
});

const UserSchema = new Schema({
  nickname: String,
  refreshToken: String,
  grade: String,
  score: Number,
  email: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
