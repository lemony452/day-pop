require("dotenv").config();
// express server setting
const express = require("express");
const connectServer = require("./server");
const app = express();
connectServer();

const userRouter = require("./routes/users");
const playRouter = require("./routes/play");
const cors = require("cors");

// express using
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routing path setting
app.use("/api", userRouter);
app.use("/api/popsong", playRouter);

// 오류 처리 미들웨어
app.use((err, req, res, next) => {
  const { status = 500, message = "예기치 못한 오류가 발생하였습니다" } = err;
  res.status(status).json(message);
});

app.listen(8080, () => {
  console.log(`listening on port 8080`);
});
