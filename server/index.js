const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const upload = require("./controllers/uploaderController");
const { mongoose } = require("./db.js");
var userController = require("./controllers/userController");
//var loginController = require("./controllers/loginController");
// var registerController = require("./controllers/registerController");
var requestController = require("./controllers/requestController");

var app = express();
/////
app.use(cors());

app.use(bodyParser.json());
app.listen(3000, () => {
  console.log("Server started at port 3000");
});
app.use("/", userController);
//app.use("/", loginController);
app.use("/", requestController);
