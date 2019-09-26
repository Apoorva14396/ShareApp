const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { mongoose } = require("./db.js");
var userController = require("./controllers/userController");
var requestController = require("./controllers/requestController");
var uploaderController = require("./controllers/uploaderController");
var profilePicController = require("./controllers/profilePicController");

var app = express();
/////
app.use(cors());

port = 3001;
app.use(bodyParser.json());
app.listen(port, () => {
  console.log(`server started at ${port}`);
});
app.use("/", profilePicController);
app.use("/", userController);
app.use("/", requestController);
app.use("/", uploaderController);
