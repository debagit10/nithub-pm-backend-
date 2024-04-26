const router = require("express").Router();

const {
  assignTask,
  getTask,
  updateTask,
} = require("../controllers/taskControllers");

router.post("/assign", assignTask);
router.get("/get", getTask);
router.put("/updateStatus", updateTask);

module.exports = router;
