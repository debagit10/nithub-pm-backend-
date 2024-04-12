const Project = require("../models/projectModel");
const Task = require("../models/taskModel");
const Collaborator = require("../models/collaboratorModel");

const addProject = async (req, res) => {
  try {
    const project = await Project.create({
      team_id: "6616c21c3c45ac56fbf4fa50",
      title: "a project",
      about: "a test project",
      deadline: "21/04/24",
      links: "a link",
      files: "no file",
      status: false,
    });
    if (project) {
      res.json({ success: "Project added to team" });
    } else {
      res.json({ error: "Failed to add project" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addProject };
