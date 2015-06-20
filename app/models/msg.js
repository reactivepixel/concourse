var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MsgSchema   = mongoose.Schema({
    content: String,
    // _user_id: Schema.Types.ObjectId,
    user: String,
    channel_id: { type: Number },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

// ========= Methods ============
var messageModel = mongoose.model('concourse', MsgSchema)

exports.saveMessage = function(user,content,channelID){

	// // creates a new message with the shema in Msg models
	var saveMessage   = new messageModel({

		content: content,
		user:user,
		channel_id:channelID
		
	});
	// console.log user and channel ID
	console.log('channel id: ', channelID);

	// Saves message
    saveMessage.save(function(err) {
    	console.log(err);

    });

};
