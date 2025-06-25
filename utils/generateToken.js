require('dotenv').config();
const jwt = require('jsonwebtoken');

function generateToken(user) {
    const payload = { userId: user._id };// changed the User to user, as User was referencing the model and we only needed to use the instance of the user object
    const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "24h" });
    console.log("Generated Token:", token);
    return token;
};

module.exports = { generateToken };

/* 

I realized why Nick said there was so much going on inside my generateToken.js based on the example from gitHub (below)... because there is! I moved the jwt var outside the function to the top of the file, and the secret var is not needed since you can pass process.env directly in jwt.sign() just as easily. You also don't technically need to save the jwt.sign() to the token var, and can just return that, but I chose to keep it assigned to the token var to keep it pretty and to make the console log easier to write/read, then returned token. I wanted to explain it since I sent the other code to you. This way y'all can see the difference, and reference it for yourselves when you need to in the future. 

ORIGINAL FROM GITHUB:
require('dotenv').config();
const jwt = require('jsonwebtoken');
const payload = { userId: 123 };
const secret = process.env.JWT_SECRET;
const token = jwt.sign(payload, secret, { expiresIn: '1000h' });
console.log("Generated Token:", token);

Then he said to make it a function, so I did this: 
* indicates the changes I made

require('dotenv').config();

function generateToken() {
*const jwt = require('jsonwebtoken'); <-- moved this out to the top of file
const payload = { userId: user._id };
*const secret = process.env.JWT_KEY; <-- didn't need this
*const token = jwt.sign(payload, secret, { expiresIn: '24h' }); <-- replaced secret with process.env.JWT_KEY
console.log("Generated Token:", token);
                                        *<-- added a return here 
}

*/