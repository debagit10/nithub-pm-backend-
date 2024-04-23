const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    project_id: { type: String, required: true },
    assignee_id: { type: String, required: true },
    assignee_name: { type: String, required: true },
    assigner_id: { type: String, required: true },
    assigner_name: { type: String, required: true },
    about: { type: String, required: true },
    deadline: { type: String, required: true },
    links: { type: Array },
    files: { type: Array },
    status: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
