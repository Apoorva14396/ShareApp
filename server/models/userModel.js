const mongoose = require("mongoose");

var UserModel = mongoose.model(
  "Users",
  {
    name: { type: String },
    dob: { type: String },
    email: { type: String },
    password: { type: String },
    role: { type: String, default: "user" }
  },
  "users"
);
module.exports = { UserModel };
