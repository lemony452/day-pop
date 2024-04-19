const express = require("express");
const {
  getCode,
  spotifyLogin,
  getRefreshToken,
} = require("../controller/spotifyAuth");
const { login, signup, refresh, getUserInfo } = require("../controller/auth");
const authJWT = require("../utils/middleware");
const { wrapAsync } = require("../utils/error");

const router = express.Router();

router.route("/code").get(getCode);

router.route("/spotify/login").get(spotifyLogin);

router.route("/spotify/refresh").post(getRefreshToken);

router.route("/login").post(wrapAsync(login));

router.route("/signup").post(wrapAsync(signup));

router.route("/refresh").post(wrapAsync(refresh));

router.route("/user").get(authJWT, wrapAsync(getUserInfo));

module.exports = router;
