var React = require('react');
var DefaultLayout = require('./layouts/default');

var HelloMessage = React.createClass({
  render: function() {
    return (
      <DefaultLayout page_title={this.props.page_title}>
         <p>Login or Register with:</p>
        <ul>
        	<li><a href="/login" class="btn btn-default"><span class="fa fa-user"></span> Local Login</a></li>
        	<li><a href="/signup" class="btn btn-default"><span class="fa fa-user"></span> Local Signup</a></li>
        </ul>
      </DefaultLayout>
    );
  }
});

module.exports = HelloMessage;