const User = require("../models/user");
const Popsong = require("../models/play");
const { AppError } = require("../utils/error");

module.exports = {
  getPopsong: async (req, res) => {
    const userId = req.userId;
    const { trackId } = req.params;
    console.log("유저 id : ", userId);
    console.log("트랙 id : ", trackId);

    // const studyingList = await User.findById(userId).populate("studyingList");
    // console.log("내가 학습한 팝송들 : ", studyingList);

    const foundPopsong = await Popsong.findOne({ trackId, userId });

    if (foundPopsong) res.status(200).json(foundPopsong);
    else res.status(400).json("학습한 적이 없는 팝송입니다");
    // throw new AppError(400, "학습한 적이 없는 팝송입니다");
  },
  addStudyingPopsong: async (req, res) => {
    const userId = req.userId;
    const newStudyingPopsong = new Popsong(req.body);
    newStudyingPopsong.userId = userId;
    await newStudyingPopsong.save();
    res.status(200).json({
      popsongId: newStudyingPopsong._id,
      message: "성공적으로 팝송을 저장하였습니다",
    });
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
