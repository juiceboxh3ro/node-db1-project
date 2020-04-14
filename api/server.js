const express = require("express");
const db = require("../data/dbConfig.js");
const server = express();
const ActRouter = require('../posts/act-router')

server.use(express.json());

server.use("/api/acts", ActRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = server;