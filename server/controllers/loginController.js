const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodeMailer = require("../utils/nodeMailer");
const saltRounds = 10;

var router = express.Router();

var { UserModel } = require("../models/userModel.js");
const handleLogin = (req, res) => {
  console.log(req.body);
  UserModel.findOne({ email: req.body.email }, (err, user) => {
    console.log(user.emailVerified);
    if (user.emailVerified == true) {
      let token = jwt.sign({ user: user }, "secretkey", { expiresIn: "1h" });
      res.send({
        id: user._id,
        role: user.role,
        token: token,
        name: user.name,
        email: user.email
      });
    } else if (!user) {
      res.status(401).send({ message: "email doesn't exist" });
    } else if (!bcrypt.compare(req.body.password, user.password)) {
      res.status(400).send({ message: "Password doesn't match" });
    }
  });
};
const verifyToken = (req, res, next) => {
  //Get auth header value
  const bearerHeader = req.headers["authorization"];
  //Check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    //Split at the space
    const bearer = bearerHeader.split(" ");
    //get token from array
    const bearerToken = bearer[1];
    //set the token
    req.token = bearerToken;
    //Next middleware
    jwt.verify(req.token, "secretkey", (err, authData) => {
      console.log(authData);
      if (err) {
        res.sendStatus(402);
      }
    });
    next();
  } else {
    //forbidden
    res.sendStatus(403);
  }
};

const handleCheck = (req, res) => {
  console.log("check successful");
  res.send({ message: "you can access the application" }).status(200);
};
router.post("/login", handleLogin);
router.post("/login/check", verifyToken, handleCheck);
