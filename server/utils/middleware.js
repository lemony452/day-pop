const { verify } = require("./jwt_utils");

// 인증이 필요한 라우팅의 토큰을 검증하기 위한 미들웨어
module.exports = authJWT = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.split("Bearer ")[1];
    const checkToken = verify(token);
    if (checkToken.ok) {
      next();
    } else {
      res.status(401).json({
        ok: false,
        message: checkToken.message,
      });
    }
  }
};
