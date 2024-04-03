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

    res.status(200).json({ access_token, refresh_token });
  },
  /**
   * 만료된 엑세스 토큰 및 리프레시 토큰을 재발급하는 함수
   * @param {object} req req.headers { Authorizaiton, refreshToken }
   * @param {} res
   */
  refresh: async (req, res) => {
    const { Authorizaiton, refreshToken } = req.headers;
    const access_token = Authorizaiton.split("Bearer ")[1];
    const refresh_token = refreshToken;

    if (!access_token || !refresh_token)
      throw new AppError(401, "로그인이 필요합니다");

    const checkToken = verify(access_token);
    // 1. 액세스 토큰이 만료되지 않은 경우
    if (checkToken.ok)
      throw new AppError(400, "엑세스 토큰이 만료되지 않았습니다");

    // 2. 엑세스 토큰이 만료된 경우
    const decoded = jwt.decode(access_token);
    if (!decoded) throw new AppError(401, "로그인이 필요합니다");
    // 유저 고유 id를 가져와 리프레시 토큰 검증하기
    const checkRefresh = verifyRefresh(refresh_token, decoded.id);

    // 2.1 리프레시 토큰도 만료된 경우 로그인 필요
    if (!checkRefresh.ok) throw new AppError(401, "로그인이 필요합니다");
    // 2.2 액세스 토큰을 재발급하기
    const newAccessToken = sign(decoded.id);
    res.status(200).json({ access_token: newAccessToken, refresh_token });
  },
};
