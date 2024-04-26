const router = require("express").Router();
const { addTeam, getTeam } = require("../controllers/teamControllers");

router.post("/add", addTeam);
router.get("/getDetail", getTeam);

module.exports = router;
