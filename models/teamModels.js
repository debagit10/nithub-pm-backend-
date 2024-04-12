const mongoose = require("mongoose");

const teamSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    admin_id: { type: String, required: true },
    code: { type: String, required: true },
    members: { type: Array },
  },
  {
    timestamps: true,
  }
);

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
