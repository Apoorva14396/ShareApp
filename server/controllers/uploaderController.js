const express = require("express");
const cors = require("cors");
const multer = require("multer");
const jwt = require("jsonwebtoken");

var { UserModel } = require("../models/userModel.js");

var router = express.Router();

const verifyToken = (req, res, next) => {
  console.log("authorize", req.headers.Authorization);
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized request");
  }
  const token = req.headers.authorization.split(" ")[1];
  console.log(token);
  if (token === "null") {
    return res.status(401).send("Unauthorized request");
  }
  const payload = jwt.verify(token, "secretkey", (err, result) => {
    if (err) {
      return result.status(500).send("Unauthorized request");
    }
    console.log("res", result);
    req.email = result.user;
    next();
  });
};
/* Storage Engine */
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, `${file.originalname}`);
  }
});
var upload = multer({ storage: storage });

router.get("/", (req, res) => {
  res.send(
    `<h1 style="text-align:center">
      Welcome to Image Uploads
      <br />
      <br />
      <b style="font-size:182px;"></b>
    </h1>`
  );
});
router.post("/file", verifyToken, upload.single("file"), (req, res, next) => {
  const file = req.file;
  console.log(req);
  console.log(req.headers.Authorization);
  UserModel.updateOne(
    { email: "h@google.com" },
    {
      $push: {
        uploadedFiles: { name: req.file.filename }
      }
    },
    (err, user) => {
      if (!user) {
        res.status(400).send({ message: "Nooo" });
      } else {
        res.send(file);
        console.log("saved");
      }
    }
  );
});

router.post("/sendFile", (req, res) => {
  UserModel.findOne({ email: req.email }, (err, sender) => {
    if (err) {
      return res.status(404).send({ message: "cannot send" });
    } else {
      console.log(sender.friendList);
      {
        if (req.body.email === sender.friendList) {
          UserModel.updateOne(
            { email: req.body.email },
            {
              $push: {
                uploadFile: { name: req.file.filename }
              }
            },
            (err, updatedUser) => {
              if (!updatedUser) {
                res.sendStatus(400).send({ message: "noo" });
              } else {
                console.log("Shared successfully");
              }
            }
          );
        }
      }
    }
  });
});

router.post(
  "/multipleFiles",
  verifyToken,
  upload.array("files"),
  (req, res, next) => {
    const files = req.files;
    console.log(files);
    if (!files) {
      const error = new Error("No File");
      error.httpStatusCode = 400;
      return next(error);
    }
    res.send({ status: "ok" });
  }
);
router.use(express.static("../uploads"));
module.exports = router;
