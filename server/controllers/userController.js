const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodeMailer = require("../utils/nodeMailer");
const saltRounds = 10;
const upload = require("../middleware/uploadProfile");

const Grid = require("gridfs-stream");

var mongoose = require("mongoose");

var router = express.Router();
const mongoURI = "mongodb://127.0.0.1:27017/shareapp";
const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true });
let gfs;

conn.once("open", () => {
  // Init Stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

var { UserModel } = require("../models/userModel.js");
const handleRegister = async (req, res) => {
  console.log(req.file);
  hash = await bcrypt.hash(req.body.password, saltRounds);

  var user = new UserModel({
    name: req.body.name,
    dob: req.body.dob,
    email: req.body.email,
    image: req.file.filename,
    password: hash
  });

  user.save((err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log("Error in saving :" + JSON.stringify(err, undefined, 2));
    }
    let token = jwt.sign({ email: doc.email }, "secretkey", {
      expiresIn: "1h"
    });
    doc.emailToken = token;
    doc.save();
    nodeMailer.createTemplate(doc, token);
    nodeMailer.setReceivers(doc.email);
    nodeMailer.sendMailer();
  });
};
const handleMail = async (req, res) => {
  console.log("token", req.params.token);
  let decodedToken = await jwt.verify(req.params.token, "secretkey");
  console.log("decoded token", decodedToken);
  let updatedUser = await UserModel.findOneAndUpdate(
    { email: decodedToken.email },
    { $set: { emailVerified: true } },
    { new: true }
  );
  console.log(updatedUser.emailVerified);
  res.send("your email has been verified proceed to login");
};
const handleLogin = (req, res) => {
  console.log(req.body);
  UserModel.findOne({ email: req.body.email }, (err, user) => {
    console.log(user.emailVerified);
    if (user.emailVerified == true) {
      let token = jwt.sign({ user: user.email }, "secretkey", {
        expiresIn: "1h"
      });
      res.send({
        id: user._id,
        role: user.role,
        token: token,
        name: user.name,
        email: user.email,
        image: user.image,
        friendList: user.friendList,
        pendingrequest: user.pendingrequest,
        sentRequest: user.sentRequest
      });
    } else if (!user) {
      res.status(401).send({ message: "email doesn't exist" });
    } else if (!bcrypt.compare(req.body.password, user.password)) {
      res.status(400).send({ message: "Password doesn't match" });
    }
  });
};
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

const handleCheck = (req, res, next) => {
  console.log(req.email);
  UserModel.findOne({ email: req.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(404).send("User Not Found.");
      } else {
        const response = {
          id: user._id,
          role: user.role,
          name: user.name,
          email: user.email,
          image: user.image,
          friendList: user.friendList,
          pendingrequest: user.pendingrequest,
          sentRequest: user.sentRequest
        };
        res.status(200).send(response);
      }
    })
    .catch(err => {
      return res.status(401).send(err.message);
    });
};
router.get("/image/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      return res.status(404).json({ err: "No file exists" });
    }
    if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
      var rs = gfs.createReadStream(file.filename);
      rs.pipe(res);
    } else {
      return res.status(401).json({ err: "Not Image" });
    }
  });
});

router.post("/register", upload.single("image"), handleRegister);
router.post("/login", handleLogin);
router.get("/user/dashboard", verifyToken, handleCheck);
router.get("/register/verifyemail/:token", handleMail);
module.exports = router;
