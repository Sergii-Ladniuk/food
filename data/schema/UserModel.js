var mongoose = require('./DB.js').mangoose;

var userSchema = mongoose.Schema({
    name: {type: String, required: true}, password: {type: String, required: true}, group: {type: String, required: true}
})

exports.UserModel = mongoose.model('User', userSchema);
