const router = require("express").Router();
const { getInvolvedSubmission, getInvolvedList, getInvolvedOne } = require("../controllers/getInvolvedCont");

router.post("/", getInvolvedSubmission);

router.get("/", getInvolvedList);

router.get("/:id", getInvolvedOne);

module.exports = router;