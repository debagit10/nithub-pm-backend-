const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../config/generateToken");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const GitHubStrategy = require("passport-github").Strategy;
require("dotenv").config();

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400).json({ error: "User already exists" });
  } else {
    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        pic: user.pic,
        token: generateToken(user._id, user.email),
      });
    } else {
      res.status(400).json({ error: "Registration failed" });
    }
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.query;

  const user = await User.findOne({ email: email });

  if (!user) {
    res.status(400).json({ error: "User does not exist" });
  } else {
    const success = await bcrypt.compare(password, user.password);
    if (success) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        pic: user.pic,
        token: generateToken(user._id, user.email),
      });
    } else {
      res.status(400).json({ error: "Incorrect password" });
    }
  }
};

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/user/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      // This function will be called after successful authentication
      console.log(profile);
      return cb(null, profile);
    }
  )
);

const githubAuth = passport.authenticate("github", { scope: ["user:email"] });

const githubAuthCallback = passport.authenticate("github", {
  failureRedirect: "http://localhost:5173",
  successRedirect: "http://localhost:5173/home",
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      passReqToCallback: true,
      callbackURL: "http://localhost:5000/api/user/auth/google/callback",
    },
    function (request, accessToken, refreshToken, profile, done) {
      console.log(profile._json, accessToken);
    }
  )
);

const googleAuth = passport.authenticate("google", {
  scope: ["email", "profile"],
});

const googleAuthCallback = passport.authenticate("google", {
  successRedirect: "http://localhost:5173/home",
  failureRedirect: "http://localhost:5173",
});

module.exports = {
  registerUser,
  loginUser,
  googleAuth,
  googleAuthCallback,
  githubAuth,
  githubAuthCallback,
};
