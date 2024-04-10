const router = require("express").Router();
const {
  addTeam,
  addMeeting,
  addMember,
  addProject,
} = require("../controllers/teamControllers");

router.post("/add", addTeam);
router.post("/project/add", addProject);
router.post("/meeting/add", addMeeting);
router.post("/member/add", addMember);

module.exports = router;
