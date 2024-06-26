require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const teamRoutes = require("./routes/teamRoutes");
const projectRoutes = require("./routes/projectRoutes");
const collaboratorRoutes = require("./routes/collaboratorRoutes");
const meetingRoutes = require("./routes/meetingRoutes");
const memberRoutes = require("./routes/memberRoutes");
const taskRoutes = require("./routes/taskRoutes");
const mailRoutes = require("./routes/mailRoutes");

const passport = require("passport");
const session = require("express-session");

const PORT = process.env.PORT;

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  session({
    secret: "asecret",
    resave: "false",
    saveUninitialized: "false",
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/user", userRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/collaborator", collaboratorRoutes);
app.use("/api/meeting", meetingRoutes);
app.use("/api/member", memberRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/mail", mailRoutes);

app.listen(PORT, console.log(`Server listening on ${PORT}`));
