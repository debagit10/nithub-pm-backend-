const Team = require("../models/teamModels");
const Meeting = require("../models/meetingModel");
const Project = require("../models/projectModel");
const Member = require("../models/memberModel");

const generateRandomCode = (length) => {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }
  return code;
};

const addTeam = async (req, res) => {
  const { name, user_id } = req.body;
  const randomCode = generateRandomCode(6);
  try {
    const team = await Team.create({
      name: name,
      admin_id: user_id,
      code: randomCode,
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
  const { team_id, title, about, deadline, file, link, status } = req.body;
  try {
    const project = await Project.create({
      team_id: team_id,
      title: title,
      about: about,
      deadline: deadline,
      file: file,
      link: link,
      status: status,
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
  const { team_id, title, day, time, status } = req.body;
  const meetingExists = await Meeting.findOne({
    team_id: team_id,
    day: day,
    time: time,
  });

  if (meetingExists) {
    res.json({ error: "A meeting has been schduled for this time" });
    return;
  }
  try {
    const meeting = await Meeting.create({
      team_id: team_id,
      title: title,
      day: day,
      time: time,
      status: status,
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
  const { user_id, role, username, team_id } = req.body;

  const memberExists = await Member.findOne({
    member_id: user_id,
    team_id: team_id,
  });

  if (memberExists) {
    res.json({ error: "User already in team" });
  } else {
    try {
      const member = await Member.create({
        team_id: team_id,
        member_id: user_id,
        member_name: username,
        role: role,
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

const getMembers = async (req, res) => {
  const { team_id } = req.query;

  try {
    const members = await Member.find({ team_id: team_id });
    if (members) {
      res.json(members);
    } else {
      res.json({ error: "There are currently no members in this team" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getMeeting = async (req, res) => {
  const { team_id } = req.query;

  try {
    const meeting = await Meeting.find({ team_id: team_id });
    if (meeting) {
      res.json(meeting);
    } else {
      res.json({ error: "There are currently no scheduled meeting" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addTeam,
  addMeeting,
  addProject,
  addMember,
  getProject,
  getMembers,
  getMeeting,
};
