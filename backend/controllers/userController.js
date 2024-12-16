const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const User = require("../models/userModel");

dotenv.config();

module.exports.getUser = asyncHandler(async (req, res) => {

  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

module.exports.getLoginData = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json({
        username: user.username,
        userType: user.userType,
        profileImage: user.profileImage,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    // Handle other potential errors, e.g., database errors
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports.logout = (req, res) => {
  try {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.localPassport = (req, res) => {
  const user = req.user;
  res.json({
    id: user._id,
    username: user.username,
    userType: user.userType,
    profileImage: user.profileImage,
  });
};

module.exports.inviteResponse = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    // Check if the user exists
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    // Check if the user has already responded
    if (user.status !== "Pending") {
      res.status(400).json({ message: "User has already responded" });
    }
    // Acceptance flow
    if (req.body.accept && req.body.accept === "Y") {
      // If user have a plus one, check if the user has allowed a plus one
      if (user.allowPlusOne === true && req.body.plusOne === "Y") {
        user.plusOne = true;
      } else {
        user.plusOne = false;
      }
      // Add allergies if the user has any
      if (req.body.allergies) {
        user.allergies = req.body.allergies;
      }
      user.status = "Accepted";
    } else if (req.body.accept && req.body.accept === "N") {
      user.status = "Declined";
      user.allergies = "";
      user.plusOne = false;
    }
    // Save the user
    const updatedUser = await user.save();
    if (updatedUser) {
      res.json({ message: "User updated successfully" });
    }
  } catch (error) {
    // Handle other potential errors, e.g., database errors
    res.status(500).json({ message: "Internal server error" });
  }
});
