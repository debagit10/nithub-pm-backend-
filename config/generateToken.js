const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (id) => {
  //Calculate expiration time for 2 weeks (in seconds)
  // const expirationInSeconds = Math.floor(
  //   Date.now() / 1000 + 2 * 7 * 24 * 60 * 60
  // );

  //calculate expiration time for 2 mins
  const expirationInSeconds = Math.floor(Date.now() / 1000) + 2 * 60;

  const secretKey = process.env.JWT_SECRET_KEY;

  const payload = {
    id,
  };

  const algorithm = "HS256";

  return jwt.sign(payload, secretKey, {
    expiresIn: expirationInSeconds,
    algorithm: algorithm,
  });
};
module.exports = generateToken;
