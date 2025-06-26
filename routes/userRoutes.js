const express = require('express');
const User = require('./models/User');  
const app = express();

app.post('', async(req, res)=>{
    const{fullName, zipCode, email, password, isAdmin} = req.body;

    try{ 

    const newUser = new User ({
        fullName, 
        zipCode, 
        email, 
        password, 
        isAdmin: isAdmin || false
    });

    await newUser.save()

    res.status(200).json({message: 'User registred successfully!'});
} catch (err) {
    res.status(500).json({message: 'Error registering user'});
}


});
