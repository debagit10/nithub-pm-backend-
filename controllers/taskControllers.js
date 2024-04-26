const Task = require("../models/taskModel");
const Mail = require("../models/mailModel");
const Project = require("../models/projectModel");

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

  const project = await Project.findById(project_id);

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
      const mail = await Mail.create({
        userID: itemID,
        title: "New task",
        message: `You have been assigned a new task on project: ${project.title}. Check task here: "http://localhost:5173/task/${task._id}"`,
      });
      if (mail) {
        mail.save();
      }
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
        message: "There are currently no outstanding tasks for this project",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const updateTask = async (req, res) => {
  const { task_id, status } = req.body;

  try {
    const update = await Task.findByIdAndUpdate(
      task_id,
      { status: status },
      { new: true }
    );
    if (update) {
      res.json({ success: "Task status has been updated" });
    } else {
      res.json({ error: "Task status not updated" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { assignTask, getTask, updateTask };
