const router = require("express").Router();
const { contactFormEmail } = require("../controllers/contactCont");

router.post("/", contactFormEmail);

module.exports = router;