const router = require("express").Router();
const { addProject, getProject } = require("../controllers/projectControllers");

router.post("/add", addProject);
router.get("/get", getProject);

module.exports = router;
