var React = require('react');
var DefaultLayout = require('./layouts/default');

var HelloMessage = React.createClass({
  render: function() {
    return (
      <DefaultLayout page_title={this.props.page_title}>
        


         <h1><span class="fa fa-sign-in"></span> Signup</h1>

		        <div class="alert alert-danger">{this.props.message}</div>
		    
		    <form action="/signup" method="post">
		        <div class="form-group">
		            <label>Email</label>
		            <input type="text" class="form-control" name="email" />
		        </div>
		        <div class="form-group">
		            <label>Password</label>
		            <input type="password" class="form-control" name="password" />
		        </div>

		        <button type="submit" class="btn btn-warning btn-lg">Signup</button>
		    </form>

		    <hr />

		    <p>Already have an account? <a href="/login">Login</a></p>
		    <p>Or go <a href="/">home</a>.</p>

      </DefaultLayout>
    );
  }
});

module.exports = HelloMessage;