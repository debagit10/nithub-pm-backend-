const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema(
  {
    team_id: { type: String, required: true },
    title: { type: String, required: true },
    day: { type: String, required: true },
    time: { type: String, required: true },
    status: { type: Boolean, default: false },
    link: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

const Meeting = mongoose.model("Meeting", meetingSchema);

module.exports = Meeting;
