const Project = require("../models/projectModel");
const Collaborator = require("../models/collaboratorModel");

const addProject = async (req, res) => {
  const { title, about, deadline, file, link, status, user_id, user_name } =
    req.body;
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
      const collaborator = await Collaborator.create({
        collaborator_id: user_id,
        collaborator_name: user_name,
        project_id: project._id,
        role: "Admin",
      });
      if (collaborator) {
        project.collaborator.push(user_id);
        collaborator.save();
      }
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

const projectDetail = async (req, res) => {
  const { project_id } = req.query;
  try {
    const project = await Project.findById(project_id);
    if (project) {
      res.json(project);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addProject, getProject, projectDetail };
