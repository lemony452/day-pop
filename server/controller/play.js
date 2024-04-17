const User = require("../models/user");
const Popsong = require("../models/play");
const { AppError } = require("../utils/error");

module.exports = {
  getPopsong: async (req, res) => {
    const userId = req.userId;
    const { trackId } = req.params;

    const foundPopsong = await Popsong.findOne({ trackId, userId });

    if (foundPopsong) res.status(200).json(foundPopsong);
    else res.status(400).json("학습한 적이 없는 팝송입니다");
  },
  addStudyingPopsong: async (req, res) => {
    const userId = req.userId;
    const foundUser = await User.findById(userId);

    const newStudyingPopsong = new Popsong(req.body);
    newStudyingPopsong.userId = userId;

    foundUser.studyingList.push(newStudyingPopsong._id); // 팝송 학습 시 히스토리에 기록
    await foundUser.save();
    await newStudyingPopsong.save();

    res.status(200).json({
      popsongId: newStudyingPopsong._id,
      message: "성공적으로 팝송을 저장하였습니다",
    });
  },
  editStudyingPopsong: async (req, res) => {
    const userId = req.userId;
    const { popsongId } = req.params;
    const reqData = req.body;

    if (reqData.score && reqData.grade) {
      const foundUser = await User.findById(userId);
      const newScore = foundUser.score + reqData.score; // 새로 학습한 점수 누적
      const avgScore = newScore / 2; // 평균 점수

      let avgGrade = foundUser.grade; // 평균 랭크
      if (avgScore >= 10) avgGrade = "S";
      else if (avgScore >= 8) avgGrade = "A+";
      else if (avgScore >= 7) avgGrade = "A";
      else if (avgScore >= 6) avgGrade = "B";
      else if (avgScore >= 5) avgGrade = "C";
      else if (avgScore >= 4) avgGrade = "D";
      else avgGrade = "F";

      foundUser.score = newScore;
      foundUser.grade = avgGrade;

      await foundUser.save();
    }

    const updatePopsong = await Popsong.findByIdAndUpdate(popsongId, reqData, {
      runValidators: true,
      new: true,
    });
    if (updatePopsong) return res.status(200).json("성공적으로 저장하였습니다");
    res.status(500).json("저장에 실패하였습니다");
  },
};
