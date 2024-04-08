const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const GitHubStrategy = require("passport-github").Strategy;
const GoogleStrategy = require("passport-google-oauth2").Strategy;
require("dotenv").config();

const PORT = process.env.PORT;

connectDB();

// // passport.use(
// //   new GoogleStrategy({
// //     clientID: "",
// //     clientSecret: "",
// //     callbackURL: "",
// //     passReqToCallback: "",
// //   })
// // );

// // Serialize and Deserialize user
// passport.serializeUser(function (user, cb) {
//   cb(null, user);
// });

// passport.deserializeUser(function (obj, cb) {
//   cb(null, obj);
// });

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/user", userRoutes);

app.listen(PORT, console.log(`Server listening on ${PORT}`));
