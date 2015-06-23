var JSX         = require('node-jsx').install(),
    React       = require('react'),
    User        = require('../models/user');

module.exports = function(app, passport) {

    // route /
    app.get('/', function(req, res) {
        res.render('index', {
            name: 'World',
            page_title: 'SEO Time',
            markup: ''
        });
    });

    // GET /login
    app.get('/login', function(req, res) {
        res.render('login', {
            message: req.flash('loginMessage'),
            name: 'killer',
            page_title: 'We\'re gonna need a bigger boat'
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
            message: req.flash('signupMessage')
        });
    });
    // process the signup form  socket.on('sendMessage', function (payload){

        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

    app.get('/hello', function(req, res) {
        res.render('form', {
            name: 'killer',
            message: req.flash('signupMessage')
        });
    });
    app.post('/saveTheme', function(req, res) {
        console.log(req.body);
        console.log('theme: '+req.body.theme);
        User.saveTheme(req.body.theme);
        res.redirect('/profile');
    });
    // route /profile
    app.get('/profile', userAuthRequired, function(req, res) {
        User.saveSession(req.user.local.email);
        res.render('profile', {
            name: 'killer',
            message: req.flash('signupMessage'),
            user : req.user // get the user out of session and pass to template
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
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
