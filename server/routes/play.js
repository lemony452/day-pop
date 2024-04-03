const express = require("express");
const {
  addStudyingPopsong,
  editStudyingPopsong,
  getPopsong,
} = require("../controller/play");
const authJWT = require("../utils/middleware");

const router = express.Router();

router
  .route("/")
  .post(authJWT, addStudyingPopsong)
  .patch(authJWT, editStudyingPopsong);

router.route("/:trackId").get(authJWT, getPopsong);

module.exports = router;
