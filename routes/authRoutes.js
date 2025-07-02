const express = require("express");
const router = require("express").Router();
const { registerUser, loginUser } = require("../controllers/authCont");

console.log("Testing server")

 //*My actual code

router.post("/register", registerUser);

router.post("/login", loginUser);


// *testing routes
// router.post("/register", (req, res) => {
//     console.log("turtle");
//     res.send("Register is hitting");
// });

// router.post("/login", (req, res) => {
//     console.log("rabbit");
//     res.send("Login is hitting");
// });

console.log(registerUser)

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;


>>>>>>> develop
