const express = require("express");
const router = express.Router();
const { userDashboardData, adminDashboardData } = require("../controllers/dashboardCont");
const { authenticate, isAdmin } = require("../middleware/authMdw");

router.get("/user", authenticate, userDashboardData);

router.get("/admin", authenticate, isAdmin, adminDashboardData);

module.exports = router;