const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

const PORT = process.env.PORT;

connectDB();

const app = express();

app.use(express.json());

app.use("/api/user", userRoutes);

app.listen(PORT, console.log(`Server listening on ${PORT}`));
