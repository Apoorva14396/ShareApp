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
    sentRequest: [
      {
        name: { type: String },
        email: { type: String, default: "", unique: true }
      }
    ],
    pendingrequest: [
      {
        // userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
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
    totalRequest: { type: Number, default: 0 }
  },
  "users"
);
module.exports = { UserModel };
