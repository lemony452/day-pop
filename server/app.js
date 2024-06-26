const dotenv = require("dotenv");
if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: __dirname + ".env.production" });
} else if (process.env.NODE_ENV === "development") {
  dotenv.config({ path: __dirname + ".env.development" });
} else {
  dotenv.config({ path: __dirname + ".env.local" });
}

// console.log("환경 : ", process.env.NODE_ENV);
// console.log("클라이언트 도메인 : ", process.env.CLIENT_DOMAIN);
// express server setting
const express = require("express");
const connectServer = require("./server");
const app = express();
connectServer();

const userRouter = require("./routes/users");
const playRouter = require("./routes/play");
const cors = require("cors");
const corsOptions = {
  origin: process.env.CLIENT_DOMAIN,
};

// express using
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(__dirname + "/client"));

// routing path setting
app.use("/api", userRouter);
app.use("/api/popsong", playRouter);

// nextjs에서 라우트 처리를 하도록 설정
// app.get("*", (req, res) => {
//   res.sendFile(__dirname + "/client/index.html");
// });

// 오류 처리 미들웨어
app.use((err, req, res, next) => {
  const { status = 500, message = "예기치 못한 오류가 발생하였습니다" } = err;
  res.status(status).json(message);
});

app.listen(8080, () => {
  console.log(`listening on port 8080`);
});
