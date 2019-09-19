// const express = require("express");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const nodeMailer = require("../utils/nodeMailer");
// const saltRounds = 10;

// var router = express.Router();

// var { UserModel } = require("../models/userModel.js");
// const handleRegister = async (req, res) => {
//   hash = await bcrypt.hash(req.body.password, saltRounds);

//   var user = new UserModel({
//     name: req.body.name,
//     dob: req.body.dob,
//     email: req.body.email,
//     password: hash
//   });

//   user.save((err, doc) => {
//     if (!err) {
//       res.send(doc);
//     } else {
//       console.log("Error in saving :" + JSON.stringify(err, undefined, 2));
//     }
//     let token = jwt.sign({ email: doc.email }, "secretkey", {
//       expiresIn: "1h"
//     });
//     doc.emailToken = token;
//     doc.save();
//     nodeMailer.createTemplate(doc, token);
//     nodeMailer.setReceivers(doc.email);
//     nodeMailer.sendMailer();
//   });
// };
// const handleMail = async (req, res) => {
//   console.log("token", req.params.token);
//   let decodedToken = await jwt.verify(req.params.token, "secretkey");
//   console.log("decoded token", decodedToken);
//   let updatedUser = await UserModel.findOneAndUpdate(
//     { email: decodedToken.email },
//     { $set: { emailVerified: true } },
//     { new: true }
//   );
//   console.log(updatedUser.emailVerified);
//   res.send("your email has been verified proceed to login");
// };
// router.post("/register", handleRegister);

// router.get("/register/verifyemail/:token", handleMail);

// // router.post("/sendRequest", sendRequest);
// //router.post("/receiveRequest", receiveRequest);
// module.exports = router;
