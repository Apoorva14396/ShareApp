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
    sentRequest: [{ email: { type: String, default: "" } }],
    acceptedRequest: [{ email: { type: String, default: "" } }],
    pendingrequest: [
      {
        // userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
        email: { type: Array, default: "" }
      }
    ],
    totalRequest: { type: Number, default: 0 },
    notification: [{ type: { type: String }, body: { type: String } }]
  },
  "users"
);
module.exports = { UserModel };
