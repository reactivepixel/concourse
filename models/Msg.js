var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MsgSchema   = new Schema({
    content: String,
    // _user_id: Schema.Types.ObjectId,
    user: String,
    channel_id: { type: Number },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Msg', MsgSchema);