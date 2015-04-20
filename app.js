var express = require('express');
var app = express();

app.set('view engine', 'jsx'); // Set the View Engine
app.engine('jsx', require('express-react-views').createEngine({beautify:true}));


app.route('/').get(require('./routes').index);
app.route('/list').get(require('./routes').list);

var server = app.listen(process.env.PORT || 3000, function(){
	console.log('Oh, im there.')
});
