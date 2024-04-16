const express = require("express");
const {
  getCode,
  spotifyLogin,
  getRefreshToken,
} = require("../controller/spotifyAuth");
const { login, signup, refresh, getUserInfo } = require("../controller/auth");
const authJWT = require("../utils/middleware");

const router = express.Router();

router.route("/code").get(getCode);

router.route("/spotify/login").get(spotifyLogin);

router.route("/spotify/refresh").post(getRefreshToken);

router.route("/login").post(login);

router.route("/signup").post(signup);

router.route("/refresh").post(refresh);

router.route("/user").get(authJWT, getUserInfo);

module.exports = router;
