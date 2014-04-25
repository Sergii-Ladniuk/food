var mongoose = require('./DB.js').mangoose;

var userSchema = mongoose.Schema({
    name: {type: String, required: true, validate: /^.{1,30}$/},
    email: {type: String, required: true, validate: /^.{1,50}$/},
    password: {type: String, required: true, validate: /^.{1,30}$/},
    group: {type: String, required: true, validate: /^.{1,10}$/}
});

exports.UserModel = mongoose.model('User', userSchema);
