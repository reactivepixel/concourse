exports.index = function(req, res){
  res.render('index', { name: 'World', page_title: 'SEO Time' });
};

exports.list = function(req, res){
  res.render('list', { name: 'killer', page_title: 'We\'re gonna need a bigger boat' });
};