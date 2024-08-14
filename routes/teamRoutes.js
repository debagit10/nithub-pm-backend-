const router = require("express").Router();
const { addTeam, getTeam } = require("../controllers/teamControllers");
const { authUser } = require("../config/authUser");

router.post("/add", authUser, addTeam);
router.get("/getDetail", authUser, getTeam);

module.exports = router;
