const Member = require("../models/memberModel");
const Team = require("../models/teamModels");
const User = require("../models/userModel");

const addMember = async (req, res) => {
  const { userEmail } = req.body;
  const { team_id } = req.query;

  const userExists = await User.findOne({ email: userEmail });
  if (!userExists) {
    res.json({ error: "User does not exist" });
    return;
  }

  const memberExists = await Member.findOne({
    member_email: userEmail,
    team_id: team_id,
  });

  if (memberExists) {
    res.json({ error: "User already in team" });
    return;
  }

  try {
    //get the user details from the database using email
    const user = await User.findOne({ email: userEmail });
    const userID = user._id;
    const userName = user.name;
    const userPic = user.pic;

    const member = await Member.create({
      team_id: team_id,
      member_id: userID,
      member_name: userName,
      member_email: userEmail,
      member_pic: userPic,
    });

    if (member) {
      member.save();

      res.json({
        success: "member added successfully",
      });
      const team = await Team.findOne({ _id: team_id });
      if (team) {
        team.members.push(userID);
        team.save();
      }
    } else {
      res.json({ error: "failed" });
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

module.exports = { addMember, getMembers };
