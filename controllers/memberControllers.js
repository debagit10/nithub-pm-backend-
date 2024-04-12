const Member = require("../models/memberModel");

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
