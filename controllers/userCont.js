const User = require('../models/User');

//Samantha Added get all users and single user
// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        const formatted = users.map(user => ({
            ...user.toObject(),
            id: user._id, // Required for react-admin
        }));

        //Content-Range required to properly read response headers
        res.set('Content-Range', `users 0-${formatted.length - 1}/${formatted.length}`);
        res.set('Access-Control-Expose-Headers', 'Content-Range'); // required for CORS

        res.status(200).json(formatted);
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch users', error: err.message });
    }
};

// Get single user
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            ...user.toObject(),
            id: user._id,
        });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch user', error: err.message });
    }
};

// delete by ID

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error:  err.message });
    }
};

// UPDate by ID

const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

module.exports = { deleteUser, updateUser, getAllUsers, getUserById};

