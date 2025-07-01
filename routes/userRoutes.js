const express = require('express');
const router = express.Router();
const { deleteUser, updateUser } = require('../controllers/userCont');

console.log("Testing Server")


//delete

router.delete('/:id', deleteUser);


// update 

router.put('/:id', updateUser);




// router.delete('/:id', (req, res) =>{
//     console.log("potato");
//     res.send("User is deleted");
// });

module.exports = router; 
