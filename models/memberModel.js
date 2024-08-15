const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    team_id: { type: String, required: true },
    member_email: { type: String, required: true },
    member_name: { type: String, required: true },
    member_id: { type: String, required: true },
    member_pic: { type: String, required: true },
    member_role: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
