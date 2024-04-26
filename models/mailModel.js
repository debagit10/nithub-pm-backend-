const mongoose = require("mongoose");

const mailSchema = new mongoose.Schema(
  {
    userID: { type: String, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Mail = mongoose.model("Mail", mailSchema);

module.exports = Mail;
