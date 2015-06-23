// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        email        : String,
        password     : String,
        theme        : String
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    preferences      : {
        theme        : String
    }
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// add theme
var userModel = mongoose.model('User', userSchema);

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);

// get user's session info ======================
var sessionVar;

module.exports.saveSession = function(user){

    console.log('saving');
    sessionVar = user;

};
module.exports.getSession = function(){

    return sessionVar;

};

module.exports.saveTheme = function(user,theme){
  /*
	// // creates a new message with the shema in Msg models
	var saveTheme = new userModel({
		preferences: {
      theme: theme
    }
	});



	// Saves theme
  saveTheme.save(function(err) {
  	console.log(err);
  });
  */
  userModel.update(
    {
      'local.email':user
    },{
      $set:{
        'preferences.theme':theme
      }
    }, function(err,kittens){
      if(err) return console.error(err);
        console.log(kittens);
    }
  );

  console.log('DB email:',user);
	console.log('DB theme:',theme);
};
