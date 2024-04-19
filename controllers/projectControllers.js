const Project = require("../models/projectModel");

const addProject = async (req, res) => {
  const { title, about, deadline, file, link, status } = req.body;
  const { team_id } = req.query;
  try {
    const project = await Project.create({
      team_id: team_id,
      title: title,
      about: about,
      deadline: deadline,
      links: link,
      files: file,
      status: status,
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
      team_id: team_id,
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
