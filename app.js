// npm modules
var express 				= require('express'),
	app 							= express(),
	mongoose 					= require('mongoose'),
	bodyParser 				= require('body-parser'),
	db     						= require('./db');

//Models
var Bear     = require('./models/bear');

// View Rendering with React
app.set('view engine', 'jsx'); // Set the View Engine
app.engine('jsx', require('express-react-views').createEngine({beautify:true}));

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var port = process.env.PORT || 3000; 

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router


// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Detected Incoming Request. Logging Event.');
    next(); // make sure we go to the next routes and don't stop here
});


// Basic Test Route
router.get('/', function(req, res) {
    res.json({ message: 'The testing is strong with this one... Good. Very Good. This really should be a route.' });   
});



router.route('/bears')

    // create a bear (accessed at POST http://localhost:3000/api/bears)
    .post(function(req, res) {
        
        var bear = new Bear();      // create a new instance of the Bear model
        bear.name = req.body.name;  // set the bears name (comes from the request)

        // save the bear and check for errors
        bear.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Bear created!' });
        });
        
    });



// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


// START THE SERVER
// =============================================================================
var server = app.listen(port);
console.log('Starting Node Server on Port ' + port);

// Create a new ntwitter instance
// var twit = new twitter(config.twitter);