// npm modules
var express 				= require('express'),
	app 					= express(),
	port 					= process.env.PORT || 3000,
  	exphbs 					= require('express-handlebars'),
	mongoose 				= require('mongoose'),
	passport				= require('passport'),
	flash					= require('connect-flash'),
	morgan 					= require('morgan'),
	cookieParser	 		= require('cookie-parser'),
	bodyParser 				= require('body-parser'),
	session 				= require('express-session'),
	db     					= require('./app/config/db'),
    Msg                    = require('./app/models/msg.js'),
	socketIO 				= require('socket.io');

require('./app/config/passport')(passport); // pass passport for configuration

// express config
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// View Rendering with Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'default'}));
app.set('view engine', 'handlebars');

// Disable etag headers on responses
app.disable('etag');


// required for passport
app.use(session({
	secret: 'WhatsMyAgeAgain', // session secret
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// ROUTES
// =============================================================================
var APIv1 = require('./app/routes/api/v1');
var master_routes = require('./app/routes/master')(app, passport);

// REGISTRATION OF ROUTES ======================================================
require('./app/routes/master.js')(app, passport);

// API v1 routing
app.use('/api/v1', APIv1); // all of our api routes will be prefixed with /api/v1

// static file handling
app.use(express.static(__dirname+'/public'));

// START THE SERVER
// =============================================================================
var server = app.listen(port);
console.log('Starting Node Server on Port ' + port);

// Initialize socket.io
var io = socketIO.listen(server);

io.on('connection', function (socket){
	console.log('Connection detected');
	socket.on('sendMessage', function (payload){
		
	// saves messages to the database with the messages model
	Msg.saveMessage(payload.author,payload.content,payload.id);

	io.emit('receiveMessage', payload);
	console.log('Sending payload to clients\' stores');
	});
});
