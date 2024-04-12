const Project = require("../models/projectModel");

const addProject = async (req, res) => {
  const { team_id, title, about, deadline, file, link, status } = req.body;
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
      project.save();
      res.json({ success: "Project added to team" });
    } else {
      res.json({ error: "Failed to add project" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getProject = async (req, res) => {
  const { team_id } = req.query;

  try {
    const projects = await Project.find({
      team_id: "6616c21c3c45ac56fbf4fa50",
    });
    if (projects) {
      res.json(projects);
    } else {
      res.json({ error: "There are currently no projects in this team" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addProject, getProject };
