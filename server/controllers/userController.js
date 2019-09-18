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

const handleSearch = (req, res) => {
  UserModel.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      res.status(400).send({ message: "cannot send" });
    } else {
      res
        .status(200)
        .send({ id: user._id, email: user.email, name: user.name });
    }
  });
};

// const checkToken = (req, res, next) => {
//   const header = req.headers["authorization"];

//   if (typeof header !== "undefined") {
//     const bearer = header.split(" ");
//     const token = bearer[1];

//     req.token = token;
//     next();
//   } else {
//     //If header is undefined return Forbidden (403)
//     res.sendStatus(403);
//   }
// };

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

const requestAlready = (req, res) => {
  console.log(req.body.id, req.body.formvalue);

  UserModel.findOne({ _id: req.body.id }, (err, sender) => {
    if (err) {
      return res
        .status(404)
        .send({ message: "Your are not a registered user" });
    }
    UserModel.findOne({ email: req.body.formvalue.email }, (err, user) => {
      if (!user) {
        res.status(400).send({ message: "Not a Registered user" });
      } else {
        console.log(req.body.formvalue.email);
        //console.log(req.body.id);
        //console.log(typeof req.body.formvalue.email);
        console.log(user.pendingrequest);
        console.log(typeof user.pendingrequest);
        //console.log(typeof req.body.formvalue.senderemail);
        //console.log(req.body.senderemail === user.pendingrequest[0].email[0]);
        const reqArray = [];
        for (let request of user.pendingrequest) {
          reqArray.push(request.email[0]);
        }
        console.log(reqArray);
        cnt = 0;
        found = false;
        while (cnt < reqArray.length) {
          if (sender.email === reqArray[cnt]) {
            console.log("Request have been already sent!");
            found = true;
            // res.send({ message: "Request have been already sent!" });
            return res
              .status(400)
              .send("you have already sent request to him.");
          } else {
            console.log(cnt, reqArray[cnt]);
            cnt++;
          }
        }
        if (found == false) {
          UserModel.updateOne(
            { _id: req.body.id },
            { $push: { sentRequest: { email: req.body.formvalue.email } } },
            (err, user) => {
              if (!user) {
                res.status(400).send({ message: "Nooo" });
              } else {
                console.log(req.body.formvalue.email);
                console.log(req.body.id);
                // res.status(200).send({ message: "ok" });
              }
            }
          );
          UserModel.updateOne(
            { email: req.body.formvalue.email },
            { $push: { pendingrequest: { email: sender.email } } },
            (err, user) => {
              if (!user) {
                res.status(400).send({ message: "cannot send" });
              } else {
                console.log(req.body.formvalue.email);
                console.log(sender.email);
                // res.status(200).send({ message: "ok" });
              }
            }
          );
        }
      }
    });
  });
  //console.log("got", sender);
};

// const receiveRequest = (req, res) => {
//   UserModel.updateOne(
//     { email: req.body.email },
//     {
//       $push: { pendingrequest: { email: req.body.senderemail } }
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

router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.post("/login/check", verifyToken, handleCheck);
router.get("/register/verifyemail/:token", handleMail);
router.post("/searchUser", handleSearch);
router.post("/requestAlready", requestAlready);
// router.post("/sendRequest", sendRequest);
//router.post("/receiveRequest", receiveRequest);
module.exports = router;
