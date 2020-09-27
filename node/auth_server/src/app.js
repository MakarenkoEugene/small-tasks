require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const usersRoute = require("./route/users");
const app = express();

const corsOptionsDelegate = function (req, callback) {
  callback(null, {
    origin: [null, "null"].includes(req.header("Origin")),
    method: ["GET", "PUT", "POST"],
  });
};

app.use(cors(corsOptionsDelegate));
app.use(bodyParser());

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.use("/users", usersRoute);

module.exports = app;
