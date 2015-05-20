
module.exports = function(app, passport) {

    // route /
    app.get('/', function(req, res) {
        res.render('index', {
            name: 'World',
            page_title: 'SEO Time'
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
    // process the signup form
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));


    // route /profile
    app.get('/profile', function(req, res) {
        console.log('derrrrrrrrrp', req.user);
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

// route middleware to make sure
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}