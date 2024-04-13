const jwt = require("jsonwebtoken");
const User = require("../models/user");
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  // secret키로 access 토큰 발급
  sign: (userId) => {
    const payload = { id: userId };
    return jwt.sign(payload, JWT_SECRET, {
      algorithm: "HS256", // 암호화 알고리즘
      expiresIn: "1h", // 1시간 유효기간
    });
  },
  // 토큰 검증
  verify: (token) => {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return {
        ok: true,
        id: decoded.id,
      };
    } catch (e) {
      return {
        ok: false,
        message: e.message,
      };
    }
  },
  // refresh 토큰 발급
  refresh: () => {
    return jwt.sign({}, JWT_SECRET, {
      // refresh token은 payload 없이 발급
      algorithm: "HS256",
      expiresIn: "14d", // 2주 유효기간
    });
  },
  // refresh 토큰 검증
  verifyRefresh: async (token, userId) => {
    const userData = await User.findById(userId);
    if (userData.refreshToken === token) {
      try {
        jwt.verify(token, JWT_SECRET);
        return { ok: true };
      } catch (e) {
        return {
          ok: false,
          message: e.message,
        };
      }
    } else {
      return {
        ok: false,
      };
    }
  },
};
