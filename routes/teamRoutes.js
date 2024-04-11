const router = require("express").Router();
const {
  addTeam,
  addMeeting,
  addMember,
  addProject,
  getProject,
  getMembers,
  getMeeting,
} = require("../controllers/teamControllers");

router.post("/add", addTeam);
router.post("/project/add", addProject);
router.post("/meeting/add", addMeeting);
router.post("/member/add", addMember);

router.get("/project/get", getProject);
router.get("/member/get", getMembers);
router.get("/meeting/get", getMeeting);

module.exports = router;
