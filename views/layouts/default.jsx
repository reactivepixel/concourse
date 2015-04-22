var React = require('react');

var DefaultLayout = React.createClass({
  render: function() {
    return (
			<html>
			<head>
			  <meta charSet="utf-8" />
			  <meta name="viewport" content="width=device-width, maximum-scale=1" />

			  <title>Portfolio</title>
			</head>
			<body>
			  <div id="main_content" className="container">
			    
			    <a href="#top" className="col-xs-12 hidden-sm hidden-md hidden-lg text-center">Back to Top</a>
			  </div>
			</body>
			</html>
    );
  }
});

module.exports = DefaultLayout;