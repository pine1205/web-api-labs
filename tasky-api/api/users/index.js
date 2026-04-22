import express from 'express';
import User from './userModel';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';


const router = express.Router(); 

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});




// register(Create)/Authenticate User
router.post('/', asyncHandler(async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ success: false, msg: 'Username and password are required.' });
        }
        if (req.query.action === 'register') {
            await registerUser(req, res);
        } else {
            await authenticateUser(req, res);
        }
    } catch (error) {
        // Log the error and return a generic error message
        console.error(error);
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
}));

//Without catch (error):
// your server could crash when an error happens
// users would see nothing or a broken request

// With catch:
// you control the error response
// your API stays stable





async function registerUser(req, res) {

let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
let result = pattern.test(req.body.password);

        if (!result) {
            return res.status(400).json({ success: false, msg: 'Password must be 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character.' });
        }
    await User.create(req.body);
    res.status(201).json({ success: true, msg: 'User successfully created.' });
}
//The registerUser() function attempts to create a new user in the database (using the mongoose User model).

async function authenticateUser(req, res) {
    const user = await User.findByUserName(req.body.username);
    if (!user) {
        return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
        const token = jwt.sign({ username: user.username }, process.env.SECRET);
        res.status(200).json({ success: true, token: 'BEARER ' + token });
    } else {
        res.status(401).json({ success: false, msg: 'Wrong password.' });
    }
}



//  The authenticateUser() function, creates the JWT token using the SECRET and signed with the username (essentially,
//  we encode the user name in the token). The token is then returned to the client for use in future requests.
// secret is used to sign and verify token
// CREATING TOKEN - server uses the secret
//It creates a token + adds a signature
//That signature proves the token came from your server
//VERIFYING TOKEN - Server uses the same secret
// Checks if the token was really signed by your server
// If anything was changed → verification fails

export default router;
