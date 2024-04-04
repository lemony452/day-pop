const mongoose = require("mongoose");
const { Schema } = mongoose;

const PopsongSchema = new Schema({
  userId: String,
  title: String,
  artist: String,
  date: { type: Date, default: new Date() },
  originalLyrics: [String],
  trackId: String,
  savedData: {
    sentenceIdx: { type: Number, default: 0 },
    studyingLyrics: { type: [String], default: [] },
    grade: { type: String, default: "-" },
    score: { type: Number, default: 0 },
    perfect: { type: Number, default: 0 },
    great: { type: Number, default: 0 },
    good: { type: Number, default: 0 },
    bad: { type: Number, default: 0 },
    miss: { type: Number, default: 0 },
  },
});

module.exports = mongoose.model("Popsong", PopsongSchema);
