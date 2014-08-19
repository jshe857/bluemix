
var bcrypt = require('bcrypt-nodejs'),
jwt = require('express-jwt'),
mongoose = require('mongoose');	

var UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    name: {type: String, required: true},
    searchTags: [String],
    state: {type: String},
    profileTags: [String]
});

var EventSchema = new mongoose.Schema({
	 title: {type: String, required: true},
     username: {type: String, required: true},
     name: {type: String, required: true},
     end: {type: String},
     start: {type: String},
     location: {type: String},
     state: {type: String},
     tags: [String],
     description: {type: String}
});

// Bcrypt middleware on UserSchema
UserSchema.pre('save', function(next) {
  var user = this;
  if (user.password == null) return next();
  console.log('hashing password');
  bcrypt.genSalt(7, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt,null, function(err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
  });
});
 
//Password verification
UserSchema.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(isMatch);
    });
};

module.exports = {
	//Compile model
		user : mongoose.model("Users",UserSchema),
		event : mongoose.model("Events",EventSchema)
};

	
