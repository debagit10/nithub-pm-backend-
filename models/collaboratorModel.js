const mongoose = require("mongoose");

const collaboratorSchema = new mongoose.Schema(
  {
    collaborator_id: { type: String, required: true },
    collaborator_name: { type: String, required: true },
    project_id: { type: String, required: true },
    role: { type: String, required: true },
  },
  { timestamps: true }
);

const Collaborator = mongoose.model("collaborator", collaboratorSchema);

module.exports = Collaborator;
