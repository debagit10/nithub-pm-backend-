const User = require("../models/userModel");
const Project = require("../models/projectModel");
const Task = require("../models/taskModel");
const Team = require("../models/teamModels");
const Mail = require("../models/mailModel");

const bcrypt = require("bcrypt");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const generateToken = require("../config/generateToken");

const passport = require("passport");

const session = require("express-session");

const GoogleStrategy = require("passport-google-oauth20").Strategy;

require("dotenv").config();

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.json({ error: "User already exists" });
  } else {
    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      role: role,
    });

    if (user) {
      const token = generateToken(user._id);

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        pic: user.pic,
        token: token,
      });

      const mail = await Mail.create({
        userID: user._id,
        title: "Welcome message",
        message: `Welcome to Nithub Project Management Platform. Feel free to look around to get familiar with the environment and features`,
      });
      if (mail) {
        mail.save();
      }
    } else {
      res.status(400).json({ error: "Registration failed" });
    }
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.query;

  const user = await User.findOne({ email: email });

  if (!user) {
    res.json({ error: "User does not exist" });
  } else {
    const success = await bcrypt.compare(password, user.password);
    if (success) {
      const token = generateToken(user._id);

      res.status(201).json({
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          pic: user.pic,
          token: token,
        },
      });
    } else {
      res.json({ error: "Incorrect password" });
    }
  }
};

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      passReqToCallback: true,
      callbackURL: "http://localhost:5000/api/user/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      // const userData = {
      //   name: profile.displayName,
      //   email: profile.emails[0].value,
      //   pic: profile.photos[0].value,
      //   password: "",
      // };

      // User.findOne({ email: profile.emails[0].value })
      //   .then((existingUser) => {
      //     if (existingUser) {
      //       // If the user already exists, return the existing user
      //       //console.log(existingUser);

      //       return done(null);
      //     } else {
      //       // If the user doesn't exist, create a new user in the database
      //       return User.create(userData)
      //         .then((newUser) => done(null, newUser))
      //         .catch((err) => done(err));
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     done(err);
      //   });
      console.log(accessToken);
    }
  )
);

const googleAuth = passport.authenticate("google", {
  scope: ["email", "profile"],
});

const googleAuthCallback = passport.authenticate("google", {
  failureRedirect: "http://localhost:5000/api/user/auth/failure",
  successRedirect: "http://localhost:5173/home",
});

const userProjects = async (req, res) => {
  const user = req.user;
  if (user.error) {
    res.json("Error");
    return;
  }

  const userID = user.id;

  try {
    const projects = await Project.find({ collaborator: userID });
    if (projects) {
      res.json(projects);
    } else {
      res.json({ error: "You do not have any projects" });
    }
  } catch (error) {
    console.log(error);
  }
};

const userTasks = async (req, res) => {
  const user = req.user;
  if (user.error) {
    res.json("Error");
    return;
  }

  const userID = user.id;

  try {
    const tasks = await Task.find({ assignee_id: userID });
    if (tasks) {
      res.json(tasks);
    } else {
      res.json({ message: "You have no tasks" });
    }
  } catch (error) {
    console.log(error);
  }
};

const userTeams = async (req, res) => {
  const user = req.user;
  if (user.error) {
    res.json("Error");
    return;
  }
  const userID = user.id;

  try {
    const teams = await Team.find({
      $or: [({ members: userID }, { admin_id: userID })],
    });
    if (teams) {
      res.json(teams);
    } else {
      res.json({ message: "You do not belong to any team" });
    }
  } catch (error) {
    console.log(error);
  }
};

const userMails = async (req, res) => {
  const user = req.user;
  if (user.error) {
    res.json("Error");
    return;
  }

  const userID = user.id;
  try {
    const teams = await Mail.find({ userID: userID });
    if (teams) {
      res.json(teams);
    } else {
      res.json({ message: "You have no mail" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  googleAuth,
  googleAuthCallback,
  userProjects,
  userTasks,
  userTeams,
  userMails,
};
