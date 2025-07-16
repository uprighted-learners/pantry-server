const User = require("../models/User");
const GetInvolved = require("../models/GetInvolved");
const Pantry = require("../models/Pantry");

const userDashboardData = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User dashboard data fetched successfully",
            userProfile: user,
        });

    } catch (err) {
        console.log("Error fetching user dashboard data:", err);
        res.status(500).json({
            message: "Server error", error: err
        });
    }
};

const adminDashboardData = async (req, res) => {
    try {
        const allUsers = await User.find({}).select("-password");
        const allGetInvolvedSubmissions = await GetInvolved.find({});
        const allPantries = await Pantry.find({});

        res.status(200).json({
            message: "Admin dashboard data fetched successfully",
            totalUsers: allUsers.length,
            allUsers: allUsers,
            totalEmails: allGetInvolvedSubmissions.length,
            allSubmissions: allGetInvolvedSubmissions,
            totalPantries: allPantries.length,
            allPantries: allPantries
        });

    } catch (err) {
        console.log("Error fetching admin dashboard data:", err);
        res.status(500).json({
            message: "Server error", error: err
        });
    }
};


module.exports = { userDashboardData, adminDashboardData };