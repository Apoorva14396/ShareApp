const crypto = require("crypto");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const path = require("path");
const multer = require("multer");
// Create storage engine
const mongoURI = "mongodb://127.0.0.1:27017/shareapp";
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    console.log(file);
    var username = "Apoorva";
    console.log(username);
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads",
          metadata: filename
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });
module.exports = upload;
