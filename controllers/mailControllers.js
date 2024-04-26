const Mail = require("../models/mailModel");

const sendMail = async (req, res) => {
  const { userID, title, message } = req.body;
  try {
    const mail = await Mail.create({
      userID: userID,
      title: title,
      message: message,
    });
    if (mail) {
      res.json(mail);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendMail };
