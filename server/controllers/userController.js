const express = require("express");
const bcrypt = require("bcrypt");
const saltRounds = 10;

var router = express.Router();

var { UserModel } = require("../models/userModel.js");
const handleRegister = (req, res) => {
  hash = bcrypt.hash(req.body.password, saltRounds);

  var user = new UserModel({
    name: req.body.name,
    dob: req.body.dob,
    email: req.body.email,
    password: hash
  });
  console.log(user.password);

  console.log(user);
  user.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log("Error in saving :" + JSON.stringify(err, undefined, 2));
    }
  });
};
const handleLogin = (req, res) => {
  console.log("handleLogin", req.body);
  UserModel.findOne({ email: req.body.email }, (err, doc) => {
    if (!doc) {
      res.status(401).send({ message: "email doesn't exist" });
    } else if (req.body.password !== doc["password"]) {
      res.status(400).send({ message: "Password doesn't match" });
    } else {
      res.send({ id: doc._id, role: doc.role });
    }
  });
};

router.post("/register", handleRegister);
router.post("/login", handleLogin);

module.exports = router;
