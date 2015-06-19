var mongoose     = require('mongoose');
var  uMesg        = require('../models/Msg');




// set the user's local credentials
// newUser.local.email    = email;
// newUser.local.password = newUser.generateHash(password

    // msg.save(function(err) {
    //     if (err) {
    //         res.send(err);
    //     }
        
    //     res.json({
    //         message: 'msg created!'
    //     });

    // });
	// 

exports.saveMessage = function(user,content,channelID){

var newMessage            = new uMesg();

newMessage.user = user;
newMessage.content = content;
newMessage.channel_id = channelID;


console.log('Hello models');
console.log(newMessage);

    newMessage.save(function(err) {
    	console.log(err);

    });

};