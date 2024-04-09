const express = require("express");
const passport = require("passport");
const {
  registerUser,
  loginUser,
  googleAuth,
  googleAuthCallback,
} = require("../controllers/userControllers");

const router = express.Router();

router.post("/signup", registerUser);
router.get("/login", loginUser);

router.get("/auth/google", googleAuth);
router.get("/auth/google/callback", googleAuthCallback);

module.exports = router;
