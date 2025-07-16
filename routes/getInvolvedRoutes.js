const router = require("express").Router();
const { getInvolvedSubmission } = require("../controllers/getInvolvedCont");

router.post("/", getInvolvedSubmission);

module.exports = router;