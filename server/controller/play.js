const User = require("../models/user");
const Popsong = require("../models/play");
const { AppError } = require("../utils/error");

module.exports = {
  getPopsong: async (req, res) => {
    const userId = req.userId;
    const { trackId } = req.params;

    const studyingList = await User.findById(userId).populate("studyingList");
    const foundPopsong = await studyingList.findOne({ trackId });

    if (foundPopsong) return res.status(200).json(foundPopsong);
    else throw new AppError(400, "학습한 적이 없는 팝송입니다");
  },
  addStudyingPopsong: async (req, res) => {
    const newStudyingPopsong = new Popsong(req.body);
    await newStudyingPopsong.save();
    res.status(200).json("성공적으로 저장하였습니다");
  },
  editStudyingPopsong: async (req, res) => {
    const { popsongId } = req.params;
    await Popsong.findByIdAndUpdate(popsongId, req.body, {
      runValidators: true,
      new: true,
    });
    res.status(200).json("성공적으로 저장하였습니다");
  },
};
