const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema(
  {
    team_id: { type: String, required: true },
    title: { type: String, required: true },
    day: { type: String, required: true },
    time: { type: String, required: true },
    status: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

const Meeting = mongoose.model("Meeting", meetingSchema);

module.exports = Meeting;
