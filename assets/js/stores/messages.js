var fakeMsgID = 0;

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

module.exports = Messages;