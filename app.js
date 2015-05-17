// npm modules
var express 				= require('express'),
	app 					= express(),
	mongoose 				= require('mongoose'),
	db     					= require('./db');


// View Rendering with React
app.set('view engine', 'jsx'); // Set the View Engine
app.engine('jsx', require('express-react-views').createEngine({beautify:true}));


var port = process.env.PORT || 3000; 

// ROUTES
// =============================================================================
var APIv1 = require('./routes/api/v1');
var master_routes = require('./routes/master');

// REGISTRATION OF ROUTES ======================================================
app.use('/', master_routes);
app.use('/api/v1', APIv1); // all of our api routes will be prefixed with /api/v1
// static file handling
app.use(express.static('/public/inc/css/default.css'));

// START THE SERVER
// =============================================================================
var server = app.listen(port);
console.log('Starting Node Server on Port ' + port);