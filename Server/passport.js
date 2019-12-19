const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
//const GooglePlusTokenStrategy1 = require('passport-google-oauth20');
//const { ExtractJWT } = require('passport-jwt');
const ExtractJWT = require('passport-jwt').ExtractJwt;

const JWT_SECRET = 'DA693C13E7C5528473D915EB827EC';
const User = require('./models/user');

//JSON Web Tokens Strategy
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
    try {
        //find the user specified in token
        const user = await User.findById(payload.user_id);

        //If user doesn't exist, handle it
        if (!user) {
            return done(null, false);
        }

        //otherwise, return the user
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));


//LOCAL Strategy
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        //Find the user by given email
        const user = await User.findOne({ email });

        //If user doesn't exists, handle it
        if (!user) return done(null, false);

        //Check If the password is correct
        const isMatch = await user.isValidPassword(password);

        //If not, Handle it
        if (!isMatch) return done(null, false);

        //Otherwise, return the user
        done(null, user);
    } catch (error) {
        done(error, false);
    }
}));

//GOOGLE OAUTH Strategy
passport.use('google', new GooglePlusTokenStrategy({
    clientID: '271005471692-ilt1jmbtn15fblbec855pbmva7t2i8tp.apps.googleusercontent.com',
    clientSecret: 'L4Gw1gFcFkWbzGNe1Bd_F_Az'
}, async (accessToken, refreshToken, profile, done) => {
        console.log("accessToken", accessToken);
        console.log("refreshToken", refreshToken);
        console.log("profile", profile);
    try {
        //Check whether current user exists in our DB
        const existingUser = await User.findOne({ 'google_id': profile.id });
        if (existingUser) return done(null, existingUser);

        //If new account
        const newUser = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            google_id: profile.id
        });

        console.log(newUser);
        await newUser.save();
        done(null, newUser);
    } catch (error) {
        done(error, false, error.message);
    }
}));