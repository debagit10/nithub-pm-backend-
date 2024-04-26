const Team = require("../models/teamModels");

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
  const { name, user_id, username } = req.body;
  const randomCode = generateRandomCode(6);
  try {
    const team = await Team.create({
      name: name,
      admin_id: user_id,
      admin_name: username,
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
