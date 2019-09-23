const express = require("express");
const jwt = require("jsonwebtoken");

var router = express.Router();

var { UserModel } = require("../models/userModel.js");
const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized request");
  }
  const token = req.headers.authorization.split(" ")[1];
  console.log(token);
  if (token === "null") {
    return res.status(401).send("Unauthorized request");
  }
  const payload = jwt.verify(token, "secretkey", (err, res) => {
    if (err) {
      return res.status(500).send("Unauthorized request");
    }
    console.log("res", res);
    req.email = res.user;
    next();
  });
};

const blockUser = (req, res) => {
  UserModel.findOneAndUpdate(
    { email: req.body.email },
    { $set: { emailVerified: false } },
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send("User access denied");
      }
    }
  );
};

const unblockUser = (req, res) => {
  UserModel.findOneAndUpdate(
    { email: req.body.email },
    { $set: { emailVerified: true } },
    (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send("User access restored");
      }
    }
  );
};
/* Routes */
router.post("/blockUser", verifyToken, blockUser);
router.post("/unblockUser", verifyToken, unblockUser);

module.exports = router;
