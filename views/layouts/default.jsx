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
			    {this.props.children}
			  </div>
			</body>
			</html>
    );
  }
});

module.exports = DefaultLayout;