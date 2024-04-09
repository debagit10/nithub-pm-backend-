const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../config/generateToken");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

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

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
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
      const userData = {
        name: profile.displayName,
        email: profile.emails[0].value,
        pic: profile.photos[0].value,
        password: "",
      };

      User.findOne({ email: profile.emails[0].value })
        .then((existingUser) => {
          if (existingUser) {
            // If the user already exists, return the existing user
            console.log(existingUser);
            return done(null, existingUser);
          } else {
            // If the user doesn't exist, create a new user in the database
            return User.create(userData)
              .then((newUser) => done(null, newUser))
              .catch((err) => done(err));
          }
        })
        .catch((err) => {
          console.log(err);
          done(err);
        });
    }
  )
);

const googleAuth = passport.authenticate("google", {
  scope: ["email", "profile"],
});

const googleAuthCallback = passport.authenticate("google", {
  failureRedirect: "http://localhost:5173",
  successRedirect: "http://localhost:5173/home",
});

module.exports = {
  registerUser,
  loginUser,
  googleAuth,
  googleAuthCallback,
};
