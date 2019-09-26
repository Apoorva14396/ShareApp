const mongoose = require("mongoose");

var UserModel = mongoose.model(
  "Users",
  {
    name: { type: String },
    createdAt: { type: Date, required: true, default: Date.now },
    dob: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    role: { type: String, default: "user" },
    emailVerified: { type: Boolean, default: false },
    emailToken: { type: String, default: null },
    image: { data: Buffer, contentType: String },
    sentRequest: [
      {
        name: { type: String },
        email: { type: String, default: "", unique: true }
      }
    ],
    pendingrequest: [
      {
        name: { type: String },
        email: { type: Array, default: "", unique: true }
      }
    ],
    friendList: [
      {
        name: { type: String },
        email: { type: Array, default: "", unique: true }
      }
    ],
    image: { type: String, default: false },
    totalRequest: { type: Number, default: 0 }
  },

  "users"
);
module.exports = { UserModel };
