const JWT = require('jsonwebtoken');

const User = require('../models/user');
const JWT_SECRET = 'DA693C13E7C5528473D915EB827EC';

JWTToken = user => {

    const options = { };

    return JWT.sign({
        sub: 'JWT',
        user_id: user.id,
        exp: new Date().setDate(new Date().getDate() + 1) //current time + 1 day
    }, JWT_SECRET, options);

}

module.exports = {
    signup: async (req, res, next) => {
        const { name, email, password } = req.body;

        //check if user with the same email
        const foundUser = await User.findOne({ email });
        if (foundUser) res.status(403).json({ message: 'Email already in use' });
        //create a new user
        const newUser = new User({ name, email, password });
        await newUser.save();

        //Generate the token
        const token = JWTToken(newUser);

        //respond with json
        res.status(200).json({ token });
    },

    signin: async (req, res, next) => {
        
        //Generate the token
        const token = JWTToken(req.user);

        //respond with json
        res.status(200).json({ token });
    },
    
    googleOAuth: async (req, res, next) => {

        var newUser;
        const existingUser = await User.findOne({ 'google_id': req.body.id });
        if (!existingUser){

            newUser = new User({
                name: req.body.name,
                email: req.body.email,
                google_id: req.body.id
            });
    
            console.log(newUser);
            await newUser.save();

        } else {

            newUser = existingUser

        }
        
        //return done(null, existingUser);

        
                
        //Generate the token
        const token = JWTToken(newUser);

        //respond with json
        res.status(200).json({ token });
    },

    secret: async (req, res, next) => {
       
        //Get all users
        const users = await User.find();

        //respond with json
        res.json({data: users});
    }
}