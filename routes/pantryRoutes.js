const express = require("express");
const router = express.Router();
const { getPantries, createPantry } = require("../controllers/pantryCont.js");
// Missy added import auth
const { authenticate, isAdmin } = require("../middleware/authMdw");

router.get("/", getPantries)

// Missy added auth 
router.post("/newPantry", authenticate, isAdmin, createPantry);

module.exports = router