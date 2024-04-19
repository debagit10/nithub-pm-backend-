const Collaborator = require("../models/collaboratorModel");
const Project = require("../models/projectModel");
const User = require("../models/userModel");

const addCollaborator = async (req, res) => {
  const { role, collaborator_email } = req.body;
  const { project_id } = req.query;

  try {
    //get the user details from the database using the email
    const user = await User.findOne({ email: collaborator_email });
    const collaborator_id = user._id;
    const collaborator_name = user.name;
    //check if the collaborator already belongs to the project
    const collaboratorExists = await Collaborator.findOne({
      project_id: project_id,
      collaborator_id: collaborator_id,
    });

    if (collaboratorExists) {
      res.json({ message: "Already a collaborator" });
      return;
    }
    //add the collaborator if not a collaborator to the project
    const collaborator = await Collaborator.create({
      collaborator_id: collaborator_id,
      collaborator_name: collaborator_name,
      project_id: project_id,
      role: role,
    });

    if (collaborator) {
      collaborator.save();
      res.json({ success: "Collaborator added successfully" });
      const project = await Project.findById(project_id);
      if (project) {
        project.collaborator.push(collaborator_id);
        project.save();
      }
    } else {
      res.json({ error: "Collaborator failed to add" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getCollaborator = async (req, res) => {
  const { project_id } = req.query;

  try {
    const collaborator = await Collaborator.find({ project_id: project_id });
    if (collaborator) {
      res.json(collaborator);
    } else {
      res.json({ message: "There are no collaborators for this project" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addCollaborator, getCollaborator };
