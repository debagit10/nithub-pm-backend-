const router = require("express").Router();

const {
  sendMail,
  deleteMail,
  upDateMail,
  mailDetail,
} = require("../controllers/mailControllers");

router.post("/add", sendMail);
router.delete("/delete", deleteMail);
router.put("/update", upDateMail);
router.get("/detail", mailDetail);

module.exports = router;
