require("dotenv").config();
// express server setting
const express = require("express");
const connectServer = require("./server");
const app = express();
connectServer();

const router = require("./routes/users");
const cors = require("cors");

// express using
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routing path setting
app.use("/api", router);

app.listen(8080, () => {
  console.log(`listening on port 8080}`);
});
