var settings = require('../../settings.js');
var mongoose = require('mongoose');
mongoose.connect(settings.constants.databaseUrl);


exports.mangoose = mongoose;