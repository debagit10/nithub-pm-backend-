const router = require("express").Router();

const {
  sendMail,
  deleteMail,
  upDateMail,
} = require("../controllers/mailControllers");

router.post("/add", sendMail);
router.delete("/delete", deleteMail);
router.put("/update", upDateMail);

module.exports = router;
