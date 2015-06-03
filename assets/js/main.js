var socket = io();
var Flux = require('delorean').Flux;
 
var fakeMsgID = 0

var Messages = Flux.createStore({
  messages: [{author: "sysop", content: "Initialized", id:fakeMsgID}],
  newMessage: function (message) {
    this.messages.push(message);
    this.emit('change');
  },
  actions: {
    'NEW_MESSAGE': 'newMessage'
  },
  getState: function() {
    return {
      messages: this.messages
    }
  }
});

var messages = Messages;


var MessagesDispatcher = Flux.createDispatcher({
  newMessage: function (message) {
    this.dispatch('NEW_MESSAGE', message);
  },
  getStores: function () {
    return {
      messageStore: messages
    };
  }
});

var MessageActions = {
  newMessage: function (author, content) {
    MessagesDispatcher.newMessage({author: author, content: content, id: fakeMsgID++ });
  },
  sendMessage: function (author, content) {
    socket.emit('sendMessage', {author: author, content: content, id: fakeMsgID++ });
    console.log('Emitting Msg to Server');
  }
}

socket.on('newMessage', function (payload) {
  MessageActions.newMessage(payload.author, payload.content);
  console.log('Recieved Msg from Server');
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
      MessageActions.sendMessage('someone', message);
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