var express = require('express');
var app = express();

app.set('view engine', 'jsx'); // Set the View Engine
app.engine('jsx', require('express-react-views').createEngine({beautify:true}));

app.get('/', require('./routes').index);

var server = app.listen(3000, function(){
	console.log('Oh, im there.')
});