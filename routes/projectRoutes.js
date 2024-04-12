const router = require("express").Router();
const { addProject } = require("../controllers/projectControllers");

router.post("/add", addProject);

module.exports = router;
