const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodeMailer = require("../utils/nodeMailer");
const saltRounds = 10;

var router = express.Router();

var { UserModel } = require("../models/userModel.js");
const handleRegister = async (req, res) => {
  hash = await bcrypt.hash(req.body.password, saltRounds);

  var user = new UserModel({
    name: req.body.name,
    dob: req.body.dob,
    email: req.body.email,
    password: hash
  });
  user.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log("Error in saving :" + JSON.stringify(err, undefined, 2));
    }
    let token = jwt.sign({ email: doc.email }, "secretkey", {
      expiresIn: "12h"
    });
    doc.emailToken = token;
    doc.save();
    nodeMailer.createTemplate(doc, token);
    nodeMailer.setReceivers(doc.email);
    nodeMailer.sendMailer();
  });
};
const handleMail = async (req, res) => {
  console.log(req.params.token);
  res.send("Your email has been verified, proceed to login.");
  let decodedToken = await jwt.verify(req.params.token, "secretkey");
  console.log(decodedToken);
  let updatedUser = await UserModel.findOneAndUpdate(
    { email: decodedToken.email },
    { $set: { emailVerified: true } },
    { new: true }
  );
  console.log(updatedUser);
};
const handleLogin = (req, res) => {
  UserModel.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      res.status(401).send({ message: "email doesn't exist" });
    } else if (!bcrypt.compare(req.body.password, user.password)) {
      res.status(400).send({ message: "Password doesn't match" });
    } else {
      let token = jwt.sign({ user: user }, "secretkey", { expiresIn: "30s" });
      res.send({ id: user._id, role: user.role, token: token });
    }
  });
};
const verifyToken = (req, res, next) => {
  // console.log(req);
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

router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.post("/login/check", verifyToken, handleCheck);
router.get("/register/verifyemail/:token", handleMail);
module.exports = router;
