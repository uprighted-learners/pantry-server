const router = require("express").Router();
const { getInvolvedEmail } = require("../controllers/getInvolved");

router.post("/", getInvolvedEmail);
console.log("Incoming request body:");
module.exports = router;