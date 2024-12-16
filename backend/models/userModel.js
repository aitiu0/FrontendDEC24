const { all } = require("express/lib/application");
const { status } = require("express/lib/response");
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      default: "",
    },
    name: {
      type: String,
    },
    lastName: {
      type: String,
    },
    username: {
      type: String,
      lowercase: true,
      unique: true,
    },
    dwp: {
      type: Boolean,
    },
    userType: {
      type: String,
      enum: ["Guest", "Admin"],
      default: "Guest",
    },
    tradename: {
      type: String,
      default: "",
    },
    allowPlusOne: {
      type: Boolean,
      default: false,
    },
    plusOne: {
      type: Boolean,
      default: false,
    },
    allergies: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Declined"],
      default: "Pending",
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(passportLocalMongoose, { usernameQueryFields: ["email"] });

module.exports = User = mongoose.model("User", userSchema);
