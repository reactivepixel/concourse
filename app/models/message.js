var mongoose = require('mongoose');
var  uMesg   = require('../models/Msg');



exports.saveMessage = function(user,content,channelID){

	// creates a new message with the shema in Msg models
	var newMessage = new uMesg();

	// Grabs message info from socket formats data
	newMessage.user = user;
	newMessage.content = content;
	newMessage.channel_id = channelID;


	console.log('Hello models');
	console.log(newMessage);

	// Saves message
    newMessage.save(function(err) {
    	console.log(err);

    });

};
exports.findMessage = function(username){


};
