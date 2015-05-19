var React = require('react');
var DefaultLayout = require('./layouts/default');

var HelloMessage = React.createClass({
  render: function() {
    return (
      <DefaultLayout page_title={this.props.page_title}>
        <div>Hello {this.props.user.local.email}</div>
      </DefaultLayout>
    );
  }
});

module.exports = HelloMessage;