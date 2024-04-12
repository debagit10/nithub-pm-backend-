const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  about: { type: String, required: true },
  deadline: { type: String, required: true },
  links: { type: Array },
  files: { type: Array },
  project_id: { type: String, required: true },
  assignee_id: { type: String, required: true },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
