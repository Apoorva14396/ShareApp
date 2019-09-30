const express = require("express");
const multer = require("multer");
const jwt = require("jsonwebtoken");

var { UserModel } = require("../models/userModel.js");

var router = express.Router();

const verifyToken = (req, res, next) => {
  //console.log("authorize", req.headers.authorization);
  if (!req.headers.authorization) {
    return res.status(401).send("auth is null Unauthorized request");
  }
  const token = req.headers.authorization.split(" ")[1];
  console.log(token);
  if (token === "null") {
    return res.status(401).send("token is null Unauthorized request");
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
/* Storage Engine */
const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, "./uploads/");
  },
  filename: (_req, file, callback) => {
    callback(null, `${file.originalname}`);
  }
});
var upload = multer({ storage: storage });

router.get("/", (_req, res) => {
  res.send(
    `<h1 style="text-align:center">
      Welcome to Image Uploads
      <br />
      <br />
      <b style="font-size:182px;"></b>
    </h1>`
  );
});

/* Upload Single File */
const singleFile = (req, res, _next) => {
  const file = req.file;

  UserModel.updateOne(
    { email: req.email },
    {
      $push: {
        uploadedFiles: { name: req.file.path }
      }
    },
    (_err, user) => {
      if (!user) {
        res.status(400).send({ message: "Nooo" });
      } else {
        res.send(file);
        console.log("saved");
      }
    }
  );
};

/* Upload Multiple Files */
const multipleFiles = (req, res, next) => {
  const files = req.files;

  UserModel.updateOne(
    { email: req.email },
    {
      $push: {
        uploadedFiles: { name: req.files.path }
      }
    },
    (_err, user) => {
      if (!user) {
        res.status(400).send({ message: "Nooo" });
      } else {
        res.send(files);
        console.log("saved");
      }
    }
  );
};
/* Send File*/
const sendFile = (req, res, next) => {
  console.log("sender's email", req.email);
  console.log("receiver's email", req.body.email);
  UserModel.findOne({ email: req.email }, (err, sender) => {
    if (err) {
      return res.status(404).send({ message: "cannot send" });
    } else {
      console.log("sender's friendList", sender.friendList);
      for (let request of sender.friendList) {
        console.log(request.email[0]);
        req1 = request.email[0];
      }
      if (req1 === req.body.email) {
        console.log("Hoiiiii", req.body.email);
        UserModel.updateOne(
          { email: req.body.email },
          {
            $push: {
              receivedFiles: { name: req.file.filename }
            }
          },
          (err, updatedUser) => {
            if (!updatedUser) {
              res.status(400).send({ message: "noo" });
            } else {
              console.log("Shared successfully");
            }
          }
        );
      }
    }
  });
};

const fetchFiles = (req, res, next) => {
  UserModel.findOne({ email: req.email }, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(user.uploadedFiles);
    }
  });
};

router.use(express.static("../uploads"));

router.post("/file", verifyToken, upload.single("file"), singleFile);
//router.post("/sendFile", verifyToken, sendFile);
router.post("/multipleFiles", upload.array("files"), multipleFiles);
router.get("/fetchFiles", verifyToken, fetchFiles);

module.exports = router;
