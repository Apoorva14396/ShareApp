const mongoose = require("mongoose");

var UserModel = mongoose.model(
  "Users",
  {
    name: { type: String },
    dob: { type: String },
    email: { type: String },
    password: { type: String },
    role: { type: String, default: "user" },
    emailVerified: { type: String, default: false },
    emailToken: { type: String, default: null }
  },
  "users"
);
module.exports = { UserModel };
