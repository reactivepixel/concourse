var APIv1 = require('express').Router(); // get an instance of the express Router


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



APIv1.get('/bears')

// create a bear (accessed at POST http://localhost:3000/api/bears)
.post(function(req, res) {

    var bear = new Bear(); // create a new instance of the Bear model
    bear.name = req.body.name; // set the bears name (comes from the request)

    // save the bear and check for errors
    bear.save(function(err) {
        if (err)
            res.send(err);

        res.json({
            message: 'Bear created!'
        });
    });

});
module.exports = APIv1;