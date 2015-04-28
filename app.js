// npm modules
var express = require('express');
var app = express();
var mongoose = require('mongoose');

// config vars
var routes = require('./routes');

// View Rendering with React
app.set('view engine', 'jsx'); // Set the View Engine
app.engine('jsx', require('express-react-views').createEngine({beautify:true}));

// Routes
app.route('/').get(routes.index);
app.route('/list').get(routes.list);


// Disable etag headers on responses
app.disable('etag');

mongoose.connect('mongodb://localhost/react-tweets');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
  console.log('opened db conn');

  var kittySchema = mongoose.Schema({
    name: String
	});

	kittySchema.methods.speak = function () {
	  var greeting = this.name
	    ? "Meow name is " + this.name
	    : "I don't have a name"
	  console.log(greeting);
	}

	var Kitten = mongoose.model('Kitten', kittySchema)
	
	var silence = new Kitten({ name: 'Killer' })
	silence.save(function (err, silence) {
	  if (err) return console.error(err);
	  silence.speak();
	});

	Kitten.find({ name: /^Killer/ }, function (err, kittens) {
	  if (err) return console.error(err);
	  console.log(kittens) // all kittens
	})

	
});


// Start the Server
var server = app.listen(process.env.PORT || 3000, function(){
	console.log('Server Loaded');
});

// Initialize socket.io
// var io = require('socket.io').listen(server);

// Create a new ntwitter instance
// var twit = new twitter(config.twitter);