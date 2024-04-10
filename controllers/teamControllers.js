const Team = require("../models/teamModels");
const Meeting = require("../models/meetingModel");
const Project = require("../models/projectModel");
const Member = require("../models/memberModel");

const addTeam = async (req, res) => {
  const { name, admin_id } = req.body;
  try {
    const team = await Team.create({
      name: "a team",
      admin_id: "1234",
      code: "fdzbhd",
    });
    if (team) {
      res.json({
        success: "team created successfully",
      });
    } else {
      res.json({ error: "team creation failed" });
    }
  } catch (error) {
    console.log(error);
  }
};

const addProject = async (req, res) => {
  const { title, about, deadline, file, link, status } = req.body;
  try {
    const project = await Project.create({
      team_id: "6616c21c3c45ac56fbf4fa50",
      title: "a project",
      about: "just a project",
      deadline: "21/04/24",
      file: "a file",
      link: "a link",
      status: false,
    });

    if (project) {
      project.save();
      res.json({
        success: "project successfully added",
      });
    } else {
      res.json({ error: "failed to add project" });
    }
  } catch (error) {
    console.log(error);
  }
};

const addMeeting = async (req, res) => {
  const { title, day, time, status } = req.body;
  try {
    const meeting = await Meeting.create({
      team_id: "6616c21c3c45ac56fbf4fa50",
      title: "a meeting",
      day: "21/04/24",
      time: "9:00am",
      status: false,
    });

    if (meeting) {
      meeting.save();
      res.json({
        success: "meeting schedlued successfully",
      });
    } else {
      res.json({ error: "failed to schedule meeting" });
    }
  } catch (error) {
    console.log(error);
  }
};

const addMember = async (req, res) => {
  const { member_id, role } = req.body;

  try {
    const member = await Member.create({
      team_id: "6616c21c3c45ac56fbf4fa50",
      member_id: "6614900e5f88bf4d71a29130",
      role: "head",
    });

    if (member) {
      member.save();

      res.json({
        success: "member added successfully",
      });
    } else {
      res.json({ error: "failed" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addTeam, addMeeting, addProject, addMember };
