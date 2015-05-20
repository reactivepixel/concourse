var React = require('react');
var DefaultLayout = require('./layouts/default');

var HelloMessage = React.createClass({
  render: function() {
    return (
      <DefaultLayout page_title={this.props.page_title}>
      	<h1>Login</h1>
		    <div class="alert alert-danger">{this.props.message}</div>
        <form action="/login" method="post">
	        <div class="form-group">
	            <label>Email</label>
	            <input type="text" class="form-control" name="email" />
	        </div>
	        <div class="form-group">
	            <label>Password</label>
	            <input type="password" class="form-control" name="password" />
	        </div>

	        <button type="submit" class="btn btn-warning btn-lg">Login</button>
	    </form>

	    <hr />

	    <p>Need an account? <a href="/signup">Signup</a></p>
	    <p>Or go <a href="/">home</a>.</p>
      </DefaultLayout>
    );
  }
});

module.exports = HelloMessage;