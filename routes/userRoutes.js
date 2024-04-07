const express = require("express");
const {
  registerUser,
  loginUser,
  githubAuth,
  githubAuthCallback,
} = require("../controllers/userControllers");

const router = express.Router();

router.post("/signup", registerUser);
router.get("/login", loginUser);
router.get("/auth/github", githubAuth);
router.get("/auth/github/callback", githubAuthCallback);

module.exports = router;
