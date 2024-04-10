const mongoose = require("mongoose");

// const projectSchema = mongoose.Schema(
//   {
//     team_id: { type: String, required: true },
//     title: { type: String, required: true },
//     about: { type: String, required: true },
//     deadline: { type: Date, required: true },
//     links: { type: Array },
//     files: { type: Array },
//     status: { type: Boolean },
//   },
//   {
//     timestamps: true,
//   }
// );

// const meetingSchema = mongoose.Schema(
//   {
//     team_id: { type: String, required: true },
//     title: { type: String, required: true },
//     day: { type: Date, required: true },
//     time: { type: Date, required: true },
//     status: { type: Boolean },
//   },
//   {
//     timestamps: true,
//   }
// );

// const memberSchema = mongoose.Schema(
//   {
//     team_id: { type: String, required: true },
//     member_id: { type: String, required: true },
//     role: { type: String, required: true },
//   },
//   {
//     timestamps: true,
//   }
// );

const teamSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    admin_id: { type: String, required: true },
    code: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Team = mongoose.model("Team", teamSchema);
// const Project = mongoose.model("Project", projectSchema);
// const Meeting = mongoose.model("Meeting", meetingSchema);
// const Member = mongoose.model("Member", memberSchema);

module.exports = Team;
// module.exports = Project;
// module.exports = Meeting;
// module.exports = Member;
