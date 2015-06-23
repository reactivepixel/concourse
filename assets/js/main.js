var socket = io();
var Flux = require('delorean').Flux;


var userN = document.getElementById("userEmail").innerHTML;


var fakeMsgID = 0;
//Creates the array where the message will be stored to be grab and handle later.
var Messages = Flux.createStore({
  messages: [{author: "sysop", content: "Initialized", id:fakeMsgID}],
  receiveMessage: function (message) {
    this.messages.push(message);
    this.emit('change');
  },
  actions: {
    'RECEIVE_MESSAGE': 'receiveMessage'
  },
  getState: function() {
    return {
      messages: this.messages
    }
  }
});

var messages = Messages;
var MessagesDispatcher = Flux.createDispatcher({
  receiveMessage: function (message) {
    this.dispatch('RECEIVE_MESSAGE', message);
  },
  getStores: function () {
    return {
      messageStore: messages
    };
  }
});

// receives the message and sends the new info to the react create class to be displayed when a message is sent.
var MessageActions = {
  receiveMessage: function (author, content) {
    MessagesDispatcher.receiveMessage({author: author, content: content, id: fakeMsgID++ });
  },
  sendMessage: function (author, content) {
    socket.emit('sendMessage', {author: author, content: content, id: fakeMsgID++ });
  }
};

socket.on('receiveMessage', function (payload) {
  MessageActions.receiveMessage(payload.author, payload.content, fakeMsgID++ );
});

var MessagesView = React.createClass({displayName: 'MessagesView',
  mixins: [Flux.mixins.storeListener],

  render: function () {
    var messages = this.stores.messageStore.messages.map(function (message) {
      return (
        <div key={message.id}>
          <span><strong>{message.author}: </strong></span>
          <span>{message.content}</span>
        </div>
      );
    });

    return (
        <div>
          {messages}
        </div>
      );
  }
});

var MessagesSender = React.createClass({displayName: 'MessagesSender',
  getInitialState: function () {
    return {message: ''};
  },
  handleChange: function () {
    var value = this.refs.message.getDOMNode().value;
    this.setState({message: value});
  },
  handleKeyUp: function (e) {
    if (e.keyCode == 13) {
      var message = this.state.message;
      MessageActions.sendMessage(userN, message);
      this.setState({message: ''});
    }
  },
  render: function () {
    return (
      <input 
          type          = 'text' 
          ref           = 'message'
          onChange      = {this.handleChange}
          onKeyUp       = {this.handleKeyUp} 
          value         = {this.state.message}
          className     = 'form-control'
          id            = 'message'
          placeholder   = 'write your message here' />
    );
  }
});

React.render(
    <MessagesView dispatcher={MessagesDispatcher} />,
    document.getElementById('messages')
);
React.render(
    <MessagesSender dispatcher={MessagesDispatcher} />,
    document.getElementById('sender')
);