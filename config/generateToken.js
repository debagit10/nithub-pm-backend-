const jwt = require("jsonwebtoken");

const generateToken = (id, email) => {
  return jwt.sign({ id }, email, {
    expiresIn: "30d",
  });
};

module.exports = generateToken;
