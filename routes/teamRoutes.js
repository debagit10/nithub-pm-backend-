const router = require("express").Router();
const {
  addTeam,
  addMember,
  getMembers,
} = require("../controllers/teamControllers");

router.post("/add", addTeam);

router.post("/member/add", addMember);

router.get("/member/get", getMembers);

module.exports = router;
