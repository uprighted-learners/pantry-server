const router = require("express").Router();
const { getInvolvedEmail } = require("../controllers/getInvolved");

router.post("/", getInvolvedEmail);

module.exports = router;