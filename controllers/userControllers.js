const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../config/generateToken");

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

module.exports = { registerUser, loginUser };
