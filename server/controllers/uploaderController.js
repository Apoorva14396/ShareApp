const express = require("express");
const cors = require("cors");
const multer = require("multer");
const bodyParser = require("body-parser");
var router = express.Router;
const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.listen(3000, () => {
  console.log("server started");
});

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, `${file.originalname}`);
  }
});
var upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.send(
    `<h1 style="text-align:center">
      Welcome to Image Uploads
      <br />
      <br />
      <b style="font-size:182px;">😃👻</b>
    </h1>`
  );
});
app.post("/file", upload.single("file"), (req, res, next) => {
  const file = req.file;
  console.log(file.filename);
  if (!file) {
    const error = new Error("No File");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(file);
});
app.post("/multipleFiles", upload.array("files"), (req, res, next) => {
  const files = req.files;
  console.log(files);
  if (!files) {
    const error = new Error("No File");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send({ status: "ok" });
});
module.exports = router;
