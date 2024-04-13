const express = require("express");
const {
  addStudyingPopsong,
  editStudyingPopsong,
  getPopsong,
} = require("../controller/play");
const authJWT = require("../utils/middleware");

const router = express.Router();

router.route("/").post(authJWT, addStudyingPopsong);

router.route("/:popsongId").patch(authJWT, editStudyingPopsong);

router.route("/:trackId").get(authJWT, getPopsong);

module.exports = router;
