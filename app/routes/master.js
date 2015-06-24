var JSX         = require('node-jsx').install(),
    React       = require('react'),
    User        = require('../models/user');

module.exports = function(app, passport) {


    // route /
    app.get('/', function(req, res) {
        res.render('index', {
            name: 'World',
            page_title: 'Welcome | Concourse',
            markup: ''
        });
    });

    // GET /login
    app.get('/login', function(req, res) {
        res.render('login', {
            message: req.flash('loginMessage'),
            name: 'killer',
            page_title: 'Login | Concourse'
        });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // route /detail
    app.get('/signup', function(req, res) {
        res.render('signup', {
            name: 'killer',
            message: req.flash('signupMessage'),
            page_title: 'Register | Concourse'
        });
    });
    // process the signup form  socket.on('sendMessage', function (payload){
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    //gets the user theme selection for the radio buttons and saves it to the users collection in the db
    app.post('/saveTheme', userAuthRequired, function(req, res) {
        User.saveTheme(req.user.local.email,req.body.theme);
        res.redirect('/profile');
    });

    //sends user name in json to be entered into the message view
    app.get('/getName', userAuthRequired, function(req, res) {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ name: req.user.local.name}, null, 3));
    });

    //sends user theme in json to be processed by the themeChanger.js file
    app.get('/getUser', function(req, res) {
         res.setHeader('Content-Type', 'application/json');
         res.send(JSON.stringify({theme: req.user.preferences.theme }, null, 3));
    });

    // route /profile
    app.get('/profile', userAuthRequired, function(req, res) {
        res.render('profile', {
            name: 'killer',
            message: req.flash('signupMessage'),
            user : req.user,
            json : JSON.stringify(req.user)

             // get the user out of session and pass to template
        });
    });
    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to ensure the user is authenticated
function userAuthRequired(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()){
        return next();
    }else{
        // if they aren't redirect them to the home page
        res.redirect('/');
    }
}
