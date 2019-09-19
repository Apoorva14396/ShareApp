const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodeMailer = require("../utils/nodeMailer");
const saltRounds = 10;

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
// const sendRequest = (req, res) => {
//   console.log("Hi");
//   UserModel.updateOne(
//     { _id: req.body.id },
//     { $push: { sentRequest: { email: req.body.email } } },
//     (err, user) => {
//       if (!user) {
//         res.status(400).send({ message: "Nooo" });
//       } else {
//         console.log(req.body.email);
//         console.log(req.body.id);
//         res.status(200).send({ message: "ok" });
//       }
//     }
//   );
// };
const handleSearch = (req, res) => {
  console.log(req.body);
  console.log("Sender's email", req.email);
  senderemail = req.email;
  receiveremail = req.body.email;
  if (senderemail == receiveremail) {
    res.status(400).send({ message: "are you dumb" });
  } else {
    UserModel.findOne({ email: req.body.email }, (err, user) => {
      if (!user) {
        res.status(400).send({ message: "cannot send" });
      } else {
        res
          .status(200)
          .send({ id: user._id, email: user.email, name: user.name });
      }
    });
  }
};

const requestAlready = (req, res) => {
  UserModel.findOne({ email: req.email }, (err, sender) => {
    if (err) {
      return res
        .status(404)
        .send({ message: "Your are not a registered user" });
    }
    UserModel.findOne({ email: req.body.email }, (err, user) => {
      if (!user) {
        res.status(400).send({ message: "Not a Registered user" });
      } else {
        receiveremail = req.body.email;
        console.log(receiveremail);
        console.log("sender's email:", req.email);
        console.log("receiver's email:", req.body.email);
        console.log(user.pendingrequest);
        const reqArray = [];
        for (let request of user.pendingrequest) {
          reqArray.push(request.email[0]);
        }
        console.log(reqArray);
        cnt = 0;
        found = false;
        while (cnt < reqArray.length) {
          if (req.email === reqArray[cnt]) {
            console.log("Request have been already sent!");
            found = true;
            return res
              .status(400)
              .send("you have already sent request to him.");
          } else {
            console.log(cnt, reqArray[cnt]);
            cnt++;
          }
        }
        if (found == false && receiveremail !== req.email) {
          UserModel.updateOne(
            { email: req.email },
            { $push: { sentRequest: { email: req.body.email } } },
            (err, user) => {
              if (!user) {
                res.status(400).send({ message: "Nooo" });
              } else {
                console.log(req.body.email);
              }
            }
          );
          UserModel.updateOne(
            { email: req.body.email },
            { $push: { pendingrequest: { email: req.email } } },
            (err, user) => {
              if (!user) {
                res.status(400).send({ message: "cannot send" });
              } else {
                console.log(req.body.email);
              }
            }
          );
        }
      }
    });
  });
};

const notification = (req, res) => {
  UserModel.findOne({ email: req.email }, (err, user) => {
    if (!user) {
      res.status(400).send({ message: "noo" });
    } else {
      console.log(user.pendingrequest);
      console.log(typeof user.pendingrequest);
      res.status(200).send({ pendingrequest: user.pendingrequest });
    }
  });
};

const accept = (req, res) => {
  UserModel.findOne({ email: req.email }, (err, user) => {
    if (!user) {
      res.status(400).send({ message: "noo" });
    } else {
    }
  });
};
// const receiveRequest = (req, res) => {
//   UserModel.updateOne(
//     { email: req.body.email },
//     {
//       $push: { request: { email: req.body.senderemail } },
//       $inc: { totalRequest: 1 }
//     },
//     (err, user) => {
//       if (!user) {
//         res.status(400).send({ message: "cannot send" });
//       } else {
//         console.log(req.body.email);
//         console.log(req.body.senderemail);
//         res.status(200).send({ message: "ok" });
//       }
//     }
//   );
// };

router.post("/searchUser", verifyToken, handleSearch);
router.post("/requestAlready", verifyToken, requestAlready);
router.get("/notification", verifyToken, notification);

module.exports = router;
