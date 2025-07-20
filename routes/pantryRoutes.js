const express = require("express");
const router = express.Router();
const { getPantries, getOnePantry, createPantry, updatePantry, deletePantry } = require("../controllers/pantryCont");
// Missy added import auth
const { authenticate, isAdmin } = require("../middleware/authMdw");



router.get("/", getPantries);

router.get("/:id", getOnePantry);

// Missy added auth 
router.post("/newPantry", authenticate, isAdmin, createPantry);

router.put("/:id", authenticate, isAdmin, updatePantry);

router.delete("/:id", authenticate, isAdmin, deletePantry);



module.exports = router