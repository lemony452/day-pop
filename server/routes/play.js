const express = require("express");
const {
  addStudyingPopsong,
  editStudyingPopsong,
  getPopsong,
} = require("../controller/play");
const authJWT = require("../utils/middleware");
const { wrapAsync } = require("../utils/error");

const router = express.Router();

router.route("/").post(authJWT, addStudyingPopsong);

router.route("/:popsongId").patch(authJWT, wrapAsync(editStudyingPopsong));

router.route("/:trackId").get(authJWT, wrapAsync(getPopsong));

module.exports = router;
