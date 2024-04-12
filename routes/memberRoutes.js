const router = require("express").Router();

const { addMember, getMembers } = require("../controllers/memberControllers");

router.post("/add", addMember);

router.get("/get", getMembers);

module.exports = router;
