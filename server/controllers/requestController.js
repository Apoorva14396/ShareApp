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

/* Search User */
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

/* Send Request */
const requestAlready = (req, res) => {
  UserModel.findOne({ email: req.email }, (err, sender) => {
    if (err) {
      return res
        .status(404)
        .send({ message: "Your are not a registered user" });
    }
    UserModel.findOne({ email: req.body.email }, (err, friend) => {
      if (!friend) {
        res.status(400).send({ message: "Not a Registered user" });
      } else {
        receiveremail = req.body.email;
        console.log(receiveremail);
        console.log("sender's email:", req.email);
        console.log("receiver's email:", req.body.email);
        console.log(friend.pendingrequest);

        const reqArray = [];
        for (let request of friend.pendingrequest) {
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
            {
              $push: {
                sentRequest: { email: req.body.email, name: friend.name }
              }
            },
            (err, Updateduser) => {
              if (!Updateduser) {
                res.status(400).send({ message: "Nooo" });
              } else {
                console.log(req.body.email);
                console.log(sender);
              }
            }
          );
          UserModel.updateOne(
            { email: req.body.email },
            {
              $push: {
                pendingrequest: { email: req.email, name: sender.name }
              }
            },
            (err, UpdatedFriend) => {
              if (!UpdatedFriend) {
                res.status(400).send({ message: "cannot send" });
              } else {
                console.log(req.body.email);
                console.log(friend);
                res.status(200).json(friend.name);
              }
            }
          );
        }
      }
    });
  });
};

/* Receive Notification */
const notification = (req, res) => {
  UserModel.findOne({ email: req.email }, (err, friend) => {
    if (!friend) {
      res.status(400).send({ message: "noo" });
    } else {
      console.log(friend.pendingrequest);
      console.log(typeof friend.pendingrequest);
      res.status(200).send({ pendingrequest: friend.pendingrequest });
    }
  });
};

/* Accept Request */
const acceptRequest = (req, res) => {
  console.log("body", req.body);
  UserModel.updateOne(
    { email: req.email },
    {
      $push: { friendList: { email: req.body } },
      $inc: { totalRequest: 1 },
      $pull: { pendingrequest: { email: req.body } }
    },

    (err, user) => {
      if (!user) {
        res.status(400).send({ message: "cannot accept" });
      } else {
        console.log(req.email);
      }
    }
  );
  UserModel.updateOne(
    { email: req.body },
    {
      $push: { friendList: { email: req.email } },
      $inc: { totalRequest: 1 }
    },
    (err, user) => {
      if (!user) {
        res.status(400).send({ message: "cannot accept" });
      } else {
        console.log(req.body.email);
        console.log(req.email);
      }
    }
  );
};

/* Reject Request */
const rejectRequest = (req, res) => {
  UserModel.updateOne(
    { email: req.email },
    { $pull: { pendingrequest: { email: req.body } } },
    (err, user) => {
      if (!user) {
        res.status(400).send({ message: "cannot accept" });
      } else {
        console.log(req.body);
        console.log(req.email);
      }
    }
  );
};

/* Display Friend List */
const getFriends = (req, res) => {
  console.log(req.email);
  UserModel.findOne({ email: req.email }, (err, friend) => {
    if (!friend) {
      res.status(400).send({ message: "noo" });
    } else {
      console.log(friend.friendList);
      console.log(typeof friend.friendList);
      res.status(200).send({ friendList: friend.friendList });
    }
  });
};

/*Display Users*/
const getUsers = (req, res) => {
  console.log("email", req.email);
  UserModel.find(
    {},
    { email: 1, role: 1, emailVerified: 1, _id: 0 },
    (err, user) => {
      if (!user) {
        //res.status(400).send({ message: "noo" });
      } else {
        console.log(user);
        const onlyUsers = [];
        for (let u of user) {
          if (u.role == "user") {
            onlyUsers.push(u);
          }
        }
        res.send(onlyUsers);
      }
    }
  );
};
/* Routes */
router.post("/searchUser", verifyToken, handleSearch);
router.post("/requestAlready", verifyToken, requestAlready);
router.get("/notification", verifyToken, notification);
router.post("/accept", verifyToken, acceptRequest);
router.post("/reject", verifyToken, rejectRequest);
router.get("/friends", verifyToken, getFriends);
router.get("/users", verifyToken, getUsers);
module.exports = router;
