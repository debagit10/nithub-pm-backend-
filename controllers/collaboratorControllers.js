const Collaborator = require("../models/collaboratorModel");

const addCollaborator = async (req, res) => {
  const { collaborator_id, project_id, role, collaborator_name } = req.body;
  try {
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
