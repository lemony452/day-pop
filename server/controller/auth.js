const User = require("../models/user");
const { AppError } = require("../utils/error");
const { sign, refresh, verify, verifyRefresh } = require("../utils/jwt_utils");
const { getHash } = require("../utils/utils");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  login: async (req, res) => {
    const { id, passwordValue } = req.body;
    const user = await User.findOne({ userId: id });
    if (!user) throw new AppError(400, "회원가입이 필요합니다");

    if (bcrypt.compareSync(passwordValue, user.userPassword)) {
      const access_token = sign(user._id);
      const refresh_token = refresh();
      user.refreshToken = refresh_token;
      await user.save();

      return res.status(200).json({ access_token, refresh_token });
    } else {
      throw new AppError(401, "아이디 또는 패스워드가 일치하지 않습니다");
    }
  },
  signup: async (req, res) => {
    const { id, passwordValue, nickname, spotifyId } = req.body;
    const newUser = new User({
      userId: id,
      nickname,
      grade: "-",
      score: 0,
      spotifyId,
    });
    // 비밀번호를 해시 암호화 후 저장하기
    const hashedPassword = getHash(passwordValue);
    newUser.userPassword = hashedPassword;

    // 유저 고유 값으로 액세스 토큰 발급하기
    const access_token = sign(newUser._id);
    const refresh_token = refresh();

    newUser.refreshToken = refresh_token;
    await newUser.save();

    if (access_token && refresh_token) {
      return res.status(200).json({ access_token, refresh_token });
    }
    throw new AppError(500, "회원가입에 실패하였습니다");
  },
  /**
   * 만료된 엑세스 토큰 및 리프레시 토큰을 재발급하는 함수
   * @param {object} req req.headers { Authorizaiton, refreshToken }
   * @param {} res
   */
  refresh: async (req, res) => {
    const { authorizaiton, refreshtoken } = req.headers;
    const access_token = authorizaiton.split("Bearer ")[1];
    const refresh_token = refreshtoken;

    if (!access_token || !refresh_token)
      throw new AppError(401, "로그인이 필요합니다");

    const checkToken = verify(access_token);
    // 1. 액세스 토큰이 만료되지 않은 경우
    if (checkToken.ok)
      throw new AppError(204, "엑세스 토큰이 만료되지 않았습니다");

    // 2. 엑세스 토큰이 만료된 경우
    const decoded = jwt.decode(access_token);
    if (!decoded) throw new AppError(401, "로그인이 필요합니다");
    // 유저 고유 id를 가져와 리프레시 토큰 검증하기
    const checkRefresh = await verifyRefresh(refresh_token, decoded.id);
    // 2.1 리프레시 토큰도 만료된 경우 로그인 필요
    if (!checkRefresh.ok) throw new AppError(401, "로그인이 필요합니다");
    // 2.2 액세스 토큰을 재발급하기
    const newAccessToken = sign(decoded.id);
    res.status(200).json({ access_token: newAccessToken, refresh_token });
  },
  getUserInfo: async (req, res) => {
    const userId = req.userId;
    const foundUser = await User.findById(userId).populate({
      path: "studyingList",
      select: ["title", "artist"],
      options: {
        sort: { date: -1 },
      },
    });

    const totalPopsongs = foundUser.studyingList.length;
    const history =
      totalPopsongs < 6
        ? [...foundUser.studyingList]
        : foundUser.studyingList.slice(0, 5);

    if (foundUser) {
      return res.status(200).json({
        totalPopsongs,
        grade: foundUser.grade,
        history,
        nickname: foundUser.nickname,
      });
    }
    throw new AppError(500, "유저 정보를 찾는데 실패하였습니다");
  },
};
