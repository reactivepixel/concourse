var master_routes = require('express').Router()

// route /
master_routes.get('/', function(req, res) {
    res.render('index', {
        name: 'World',
        page_title: 'SEO Time'
    });
});

// route /list
master_routes.get('/list', function(req, res) {
    res.render('list', {
        name: 'killer',
        page_title: 'We\'re gonna need a bigger boat'
    });
});


// route /detail
master_routes.get('/detail/:id', function(req, res) {
    res.render('detail', {
        name: 'killer',
        id: 	req.params.id,
        page_title: 'We\'re gonna need a bigger boat'
    });
});

module.exports = master_routes;