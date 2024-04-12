const router = require("express").Router();

const { addMeeting, getMeeting } = require("../controllers/meetingControllers");

router.post("/add", addMeeting);
router.get("/get", getMeeting);

module.exports = router;
