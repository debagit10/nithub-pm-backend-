const User = require("../models/userModel");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name: name,
    email: email,
    password: password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      password: user.password,
      pic: user.pic,
    });
  } else {
    res.status(400);
    throw new Error("Registration failed!!");
  }
};

module.exports = { registerUser };
