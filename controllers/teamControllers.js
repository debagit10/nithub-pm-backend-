const Team = require("../models/teamModels");
const Mail = require("../models/mailModel");
const User = require("../models/userModel");
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
  const user = req.user;
  const userID = user.id;

  const { name } = req.body;
  const teamName = name;
  const randomCode = generateRandomCode(6);
  try {
    const user = await User.findById(userID);
    const { _id, name, email, pic, role } = user;

    const team = await Team.create({
      name: teamName,
      admin_id: userID,
      admin_name: user.name,
      code: randomCode,
    });

    if (team) {
      res.json({
        success: "team created successfully",
      });

      const mail = await Mail.create({
        userID: userID,
        title: "New team",
        message: `You have successfully created a new team: ${teamName}. See team: "http://localhost:5173/team/${team._id}"`,
      });
      if (mail) {
        mail.save();
      }

      const member = await Member.create({
        team_id: team._id,
        member_email: email,
        member_name: name,
        member_id: _id,
        member_pic: pic,
        member_role: role,
      });

      if (member) {
        member.save();
        const team = await Team.findOne({ _id: team._id });
        if (team) {
          team.members.push(userID);
          team.save();
        }
      }
    } else {
      res.json({ error: "team creation failed" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getTeam = async (req, res) => {
  const { team_id } = req.query;
  try {
    const team = await Team.findById(team_id);
    if (team) {
      res.json(team);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addTeam,
  getTeam,
};
