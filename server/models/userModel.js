const mongoose = require("mongoose");

var UserModel = mongoose.model(
  "Users",
  {
    name: { type: String },
    dob: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    role: { type: String, default: "user" },
    emailVerified: { type: Boolean, default: false },
    emailToken: { type: String, default: null },
    request: [
      {
        // userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
        name: { type: String, default: "" }
      }
    ],
    totalRequest: { type: Number, default: 0 },
    notification: [{ type: { type: String }, body: { type: String } }]
  },
  "users"
);
module.exports = { UserModel };
