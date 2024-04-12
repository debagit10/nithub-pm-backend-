const router = require("express").Router();

const { assignTask, getTask } = require("../controllers/taskControllers");

router.post("/assign", assignTask);
router.get("/get", getTask);

module.exports = router;
