const express = require('express');
const router = express.Router();
const { deleteUser, updateUser } = require('../controllers/userCont');
// Missy added auth 
const { authenticate, isAdmin } = require("../middleware/authMdw");

console.log("Testing Server")


//delete
// Missy added auth
router.delete('/:id', authenticate, isAdmin, deleteUser);


// update 
// Missy added auth
router.put('/:id', authenticate, isAdmin, updateUser);




// router.delete('/:id', (req, res) =>{
//     console.log("potato");
//     res.send("User is deleted");
// });

module.exports = router; 
