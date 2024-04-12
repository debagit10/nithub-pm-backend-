const router = require("express").Router();
const {
  addTeam,
  addMeeting,
  addMember,
  getMembers,
  getMeeting,
} = require("../controllers/teamControllers");

router.post("/add", addTeam);

router.post("/meeting/add", addMeeting);
router.post("/member/add", addMember);

router.get("/member/get", getMembers);
router.get("/meeting/get", getMeeting);

module.exports = router;
