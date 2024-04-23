const router = require("express").Router();
const {
  addProject,
  getProject,
  projectDetail,
} = require("../controllers/projectControllers");

router.post("/add", addProject);
router.get("/get", getProject);
router.get("/getDetail", projectDetail);

module.exports = router;
