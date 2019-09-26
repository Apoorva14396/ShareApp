const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

var router = express.Router();
router.use(cors());

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
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

router.get("/file1", (req, res) => {
  gfs.files.findOne({ metadata: "Apoorva" }, function(err, file) {
    if (!file || file.length === 0) {
      return res.status(401).json({ err: "File doesn't exist" });
    }
    if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
      var rs = gfs.createReadStream(file.filename);
      rs.pipe(res);
    } else {
      return res.status(401).json({ err: "Not Image" });
    }
    var length = 0;
    rs.on("open", function(chunk) {
      length = length + chunk.length;
    }).on("end", function() {
      console.log("Length:", length);
    });
  });
});
module.exports = router;
