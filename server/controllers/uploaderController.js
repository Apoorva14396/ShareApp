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
  const payload = jwt.verify(token, "secretkey", (err, result) => {
    if (err) {
      return res.status(500).send("Unauthorized request");
    }
    console.log("res", result);
    req.email = result.user;
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
  console.log(req.file.path);

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
const multipleFiles = (req, res, _next) => {
  console.log("Hiiiiii");
  var filePath = [];
  console.log(req.files);
  for (let i = 0; i < req.files.length; i++) {
    filePath.push(req.files[i].path);
    UserModel.updateOne(
      { email: req.email },
      {
        $push: {
          uploadedFiles: { name: req.files[i].path }
        }
      },
      (_err, user) => {
        try {
          if (!user) {
            res.status(400).send({ message: "Nooo" });
          } else {
            res.status(200).send(filePath);
            console.log("saved");
          }
        } catch (err) {
          console.log(err);
        }
      }
    );
  }
};
/* Delete File */
// const deleted = (req, res) => {
//   console.log(req.file);
//   UserModel.findOneAndUpdate(
//     { email: req.email },
//     {
//       $pull: {
//         uploadedFiles: req.file.path
//       }
//     },
//     (err, doc) => {
//       if (err) {
//         res.status(500).send(err);
//       } else {
//         res.json("deleted");
//       }
//     }
//   );
// };

/* Send File*/
const sendFile = (req, res, _next) => {
  console.log("sender's email", req.email);
  console.log("receiver's email", req.body.list);
  UserModel.findOne({ email: req.email }, (err, sender) => {
    if (!sender) {
      return res.status(404).send({ message: "cannot send" });
    } else {
      UserModel.updateMany(
        { email: { $in: req.body.list } },
        {
          $addToSet: {
            receivedFiles: { name: req.body.value }
          }
        },
        (_err, updatedUser) => {
          if (!updatedUser) {
            res.status(400).send({ message: "noo" });
          } else {
            console.log("Shared successfully");
          }
        }
      );
    }
  });
};

/*Fetch Files*/
const fetchFiles = (req, res) => {
  UserModel.findOne({ email: req.email }, (err, user) => {
    if (!user) {
      console.log(err);
    } else {
      console.log(user.uploadedFiles);
      res.status(200).send(user.uploadedFiles);
    }
  });
};

/* Fetch Uploaded Files */
const receivedFiles = (req, res) => {
  UserModel.findOne({ email: req.email }, (err, user) => {
    if (!user) {
      console.log(err);
    } else {
      console.log(user.receivedFiles);
      res.status(200).send(user.receivedFiles);
    }
  });
};
/* Routes */
router.use(express.static("../uploads"));
router.post("/file", verifyToken, upload.single("file"), singleFile);
router.post(
  "/multipleFiles",
  verifyToken,
  upload.array("files"),
  multipleFiles
);
router.post("/sendFile", verifyToken, sendFile);
router.get("/fetchFiles", verifyToken, fetchFiles);
router.get("/receivedFiles", verifyToken, receivedFiles);
module.exports = router;
