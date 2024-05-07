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

const deleteMail = async (req, res) => {
  const { mailID } = req.query;
  try {
    const mail = await Mail.findByIdAndDelete(mailID);
    if (mail) {
      res.json({ success: "Mail successfully deleted" });
    }
  } catch (error) {
    console.log(error);
  }
};

const upDateMail = async (req, res) => {
  const { mailID, status } = req.body;
  try {
    const mail = await Mail.findByIdAndUpdate(mailID, { status: status });
    if (mail && status === "true") {
      res.json({ success: "Mail marked as read successfully" });
    }
    if (mail && status === "false") {
      res.json({ success: "Mail marked as unread successfully" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { sendMail, deleteMail, upDateMail };
