const router = require("express").Router();

const { sendMail } = require("../controllers/mailControllers");

router.post("/add", sendMail);

module.exports = router;
