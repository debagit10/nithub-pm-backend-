const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const passport = require("passport");
const session = require("express-session");
const GitHubStrategy = require("passport-github").Strategy;
require("dotenv").config();

const PORT = process.env.PORT;

connectDB();

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/user/auth/github/callback",
    },
    (githubAuthSuccess = (accessToken, refreshToken, profile, cb) => {
      // This function will be called after successful authentication
      return cb(null, profile);
    })
  )
);

// Serialize and Deserialize user
passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

const app = express();

app.use(express.json());

app.use("/api/user", userRoutes);

app.listen(PORT, console.log(`Server listening on ${PORT}`));
