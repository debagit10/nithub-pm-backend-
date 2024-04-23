const Task = require("../models/taskModel");

const assignTask = async (req, res) => {
  const {
    itemID,
    item_name,
    userID,
    username,
    deadline,
    links,
    files,
    status,
    about,
  } = req.body;
  const { project_id } = req.query;
  //check if user is already working on a task
  const taskExists = await Task.findOne({
    assignee_id: itemID,
    project_id: project_id,
    deadline: deadline,
    status: false,
  });

  if (taskExists) {
    res.json({
      message:
        "Cannot assign task at that deadline, as assignee already has a task at hand",
    });
    return;
  }

  //assign a task if the user has no task at hand for that deadline
  try {
    const task = await Task.create({
      project_id: project_id,
      assignee_id: itemID,
      assignee_name: item_name,
      assigner_id: userID,
      assigner_name: username,
      deadline: deadline,
      links: links,
      files: files,
      about: about,
    });
    if (task) {
      res.json({ success: "Task assigned successfully" });
    } else {
      res.json({ error: "Failed to assign task" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getTask = async (req, res) => {
  const { project_id } = req.query;

  try {
    const task = await Task.find({ project_id: project_id });
    if (task) {
      res.json(task);
    } else {
      res.json({
        message: "There are currently no outstanding task for this project",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { assignTask, getTask };
