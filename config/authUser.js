const jwt = require("jsonwebtoken");

require("dotenv").config();

const authUser = (req, res, next) => {
  const { token } = req.query;
  const secretKey = process.env.JWT_SECRET_KEY;

  try {
    if (!token) {
      throw new Error("Token not found"); // Throw an error if token is not found
    }

    const verify = jwt.verify(token, secretKey);
    req.user = verify;
    next(); // Proceed to the next middleware
  } catch (error) {
    req.user = { error }; // Pass the error to req.user
    next(); // Proceed to the next middleware
  }
};

module.exports = { authUser };
