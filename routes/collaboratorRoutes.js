const router = require("express").Router();

const {
  addCollaborator,
  getCollaborator,
} = require("../controllers/collaboratorControllers");

router.post("/add", addCollaborator);
router.get("/get", getCollaborator);

module.exports = router;
