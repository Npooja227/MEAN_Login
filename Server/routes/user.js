const express = require('express');
const router = require('express-promise-router')();
//const router = express.Router;
const passport = require('passport');

//const { validateBody, schemas } = require('../helpers/route');
const UsersController = require('../controllers/user');
const passportConfig = require('../passport');

const passportLocal = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });
const passportGoogle = passport.authenticate('google', { session: false });

//router.route('/signup').post(validateBody(schemas.authSchema), UsersController.signup);

//router.route('/signin').post(validateBody(schemas.authSchema), passportLocal, UsersController.signin);

router.route('/signup').post(UsersController.signup);

router.route('/signin').post(passportLocal, UsersController.signin);

router.route('/oauth/google').post(UsersController.googleOAuth);

router.route('/users').get( passportJWT, UsersController.secret);

module.exports = router;