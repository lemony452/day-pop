// express server setting
const express = require("express");
const connectServer = require("./server");
const app = express();
require("dotenv").config();
connectServer();

// const { createServer } = require("http");

// next
const next = require("next");
const { parse } = require("url");
const router = require("./routes/users");
const cors = require("cors");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 8080;

const nextApp = next({ dev, hostname, port });
const handle = nextApp.getRequestHandler();

const corsOptions = {
  origin: ["http://localhost:8080", "https://accounts.spotify.com"],
};

nextApp
  .prepare()
  .then(() => {
    // express using
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // routing path setting
    app.use("/api", router);

    app.get("/hello", (req, res) => {
      res.json("hello!!!");
    });

    app.get("*", (req, res) => {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;
      nextApp.render(req, res, pathname, query);
    });

    app.get("*", (req, res) => {
      return handle(req, res);
    });

    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
