var APIv1       = require('express').Router(); // get an instance of the express Router
var bodyParser  = require('body-parser');


// Models
//var Msgs = require('../../models/msg');

// configure app to use bodyParser()
// this will let us get the data from a POST
APIv1.use(bodyParser.urlencoded({ extended: true }));
APIv1.use(bodyParser.json());


// middleware to use for all requests
APIv1.use(function(req, res, next) {
    // do logging
    console.log('Detected Incoming Request. Logging Event.');
    next(); // make sure we go to the next routes and don't stop here
});


// Basic Test Route
APIv1.get('/', function(req, res) {
    res.json({
        message: 'The testing is strong with this one... Good. Very Good. This really should be a route.'
    });
});


// save a msg
APIv1.post('/user/:user/msgs/save', function(req, res) {
    //Models
    
    var msg = new Msgs({
        content:      req.body.content,
        user:         req.params.user,
        channel_id:   req.body.channel_id
    })

    // save the bear and check for errors
    msg.save(function(err) {
        if (err) {
            res.send(err);
        }
        
        res.json({
            message: 'msg created!'
        });

    });

});



// return all user msgs
APIv1.get('/user/:user/msgs', function(req, res) {
  console.log('hit');
    Msgs.find({ user: req.params.user }, function(err, docs){
      res.json(docs);
    });
});

module.exports = APIv1;