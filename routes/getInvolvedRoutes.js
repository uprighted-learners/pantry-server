const router = require("express").Router();
const { getInvolvedSubmission } = require("../controllers/getInvolved");

router.post("/", getInvolvedSubmission);

module.exports = router;