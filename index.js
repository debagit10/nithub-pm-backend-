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

const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const bcrypt = require("bcrypt");

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

// const SECRET_KEY = "your_secret_key";

// // Function to generate JWT token with encryption
// const generateEncryptedToken = (payload) => {
//   // Generate a random initialization vector (IV)
//   const iv = crypto.randomBytes(32);

//   // Encrypt the payload using AES encryption with CBC mode
//   const cipher = crypto.createCipheriv(
//     "aes-256-cbc",
//     Buffer.from(SECRET_KEY),
//     Buffer.from(iv, "base64")
//   );
//   let encryptedPayload = cipher.update(
//     JSON.stringify(payload),
//     "utf8",
//     "base64"
//   );
//   encryptedPayload += cipher.final("base64");

//   // Generate JWT token with encrypted payload
//   const token = jwt.sign(
//     { iv: iv.toString("base64"), encryptedPayload },
//     SECRET_KEY
//   );
//   return token;
// };

// // Function to decrypt and verify JWT token
// const verifyDecryptedToken = (token) => {
//   // Verify JWT token and extract IV and encrypted payload
//   const { iv, encryptedPayload } = jwt.verify(token, SECRET_KEY);

//   // Decrypt the payload using AES decryption with CBC mode
//   const decipher = crypto.createDecipheriv(
//     "aes-256-cbc",
//     Buffer.from(SECRET_KEY),
//     iv
//   );
//   let decryptedPayload = decipher.update(encryptedPayload, "base64", "utf8");
//   decryptedPayload += decipher.final("utf8");

//   // Return decrypted payload
//   return JSON.parse(decryptedPayload);
// };

// app.post("/token", (req, res) => {
//   const payload = { userId: 123, username: "example_user" };
//   const encryptedToken = generateEncryptedToken(payload);
//   res.send("Encrypted JWT token:", encryptedToken);
// });

// app.get("/getToken", (req, res) => {
//   const { token } = req.query;
//   const decryptedPayload = verifyDecryptedToken(token);
//   res.json({ decryptedPayload });
// });

// app.get("/hash", async (req, res) => {
//   const { createHmac } = await import("node:crypto");

//   const secret = "abcdefg";
//   const hash = createHmac("sha256", secret)
//     .update("I love cupcakes")
//     .digest("hex");
//   res.send(hash);
// });

// app.post("/token", async (req, res) => {
//   const { token } = req.body;
//   // const payload = {
//   //   user_id: 123456,
//   //   username: "example_user",
//   //   exp: Math.floor(Date.now() / 1000) + 60 * 5, // Token expiration time (24 hours)
//   // };

//   // // Define your secret key
//   // const secretKey = "your_secret_key_here";

//   // // Generate the token
//   // const token = jwt.sign(payload, secretKey, { algorithm: "HS256" });

//   const salt = bcrypt.genSaltSync(10);
//   const hashedPassword = bcrypt.hashSync(token, salt);
//   res.json({ token: token, hashedToken: hashedPassword });
// });

// app.get("/token", async (req, res) => {
//   const { hashedToken, token } = req.body;

//   const success = await bcrypt.compare(token, hashedToken);
//   if (success) {
//     res.send(success);
//   } else {
//     res.send("failed");
//   }
// });

app.get("/verify", async (req, res) => {
  const { token } = req.body;
  const decodedToken = jwt.decode(token);
  res.json(decodedToken);
  // if (decodedToken && decodedToken.exp) {
  //   const expirationTime = decodedToken.exp;

  //   // Get the current time (in seconds since Unix epoch)
  //   const currentTime = Math.floor(Date.now() / 1000);

  //   // Compare the current time with the expiration time
  //   if (currentTime < expirationTime) {
  //     console.log(
  //       "Token is valid. Expiration time:",
  //       new Date(expirationTime * 1000)
  //     );
  //   } else {
  //     res.json("Token has expired.");
  //   }
  // } else {
  //   res.json("Token does not have an expiration time (exp claim).");
  // }
});

const secretKey = "secret key 123";

// Encrypt function
//function encryptMessage(req, res) {}

// Decrypt function

app.post("/encrypt", (req, res) => {
  const { message } = req.body;
  const encrypted = CryptoJS.AES.encrypt(message, secretKey).toString();
  res.json(encrypted);
});

app.post("/decrypt", (req, res) => {
  const { message } = req.body;
  const decrypted = CryptoJS.AES.decrypt(message, secretKey).toString(
    CryptoJS.enc.Utf8
  );
  res.json(decrypted);
});

// Example usage

app.listen(PORT, console.log(`Server listening on ${PORT}`));
