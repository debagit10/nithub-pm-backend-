const express = require("express");
const passport = require("passport");
const {
  registerUser,
  loginUser,
  googleAuth,
  googleAuthCallback,
  githubAuth,
  githubAuthCallback,
} = require("../controllers/userControllers");

const router = express.Router();

router.post("/signup", registerUser);
router.get("/login", loginUser);

router.get("/auth/github", githubAuth);
router.get("/auth/github/callback", githubAuthCallback);

router.get("/auth/google", googleAuth);
router.get("/auth/google/callback", googleAuthCallback);

module.exports = router;
