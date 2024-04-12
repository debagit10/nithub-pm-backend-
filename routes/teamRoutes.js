const router = require("express").Router();
const { addTeam } = require("../controllers/teamControllers");

router.post("/add", addTeam);

module.exports = router;
