const express = require("express");
const router = express.Router();
const passport = require("passport");
const userController = require("../controllers/userController");
const {
  validCaptchaToken,
  isLoggedIn,
} = require("../middleware/authMiddleware");

// Login
router.post(
  "/login",
  validCaptchaToken,
  passport.authenticate("local", {
    failureMessage: "Username or password is wrong",
  }),
  userController.localPassport
);

// isLogged
router.get("/islogged", isLoggedIn, userController.getLoginData);
// Logout
router.get("/logout", userController.logout);
// Accept/Decline invitation
router.post("/invite-response/:id", userController.inviteResponse);

router.get("/", userController.getUser);

module.exports = router;
