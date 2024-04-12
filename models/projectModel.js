const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    team_id: { type: String, required: true },
    title: { type: String, required: true },
    about: { type: String, required: true },
    deadline: { type: String, required: true },
    links: { type: Array },
    files: { type: Array },
    status: { type: Boolean, default: false },
    collaborator: { type: Array },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
