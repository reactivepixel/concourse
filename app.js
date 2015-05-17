// npm modules
var express 				= require('express'),
	app 					= express(),
	mongoose 				= require('mongoose'),
	bodyParser 				= require('body-parser'),
	db     					= require('./db');

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
var APIv1 = require('./routes/api/v1');
var master_routes = require('./routes/master');


// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/', master_routes);
app.use('/api', APIv1);


// START THE SERVER
// =============================================================================
var server = app.listen(port);
console.log('Starting Node Server on Port ' + port);

// Create a new ntwitter instance
// var twit = new twitter(config.twitter);