var settings = require('../../settings.js');
var mongoose = require('mongoose');
//var app = require('../../app').app;

if (process.env.env === 'test') {
    console.log('using test schema\n');
    mongoose.connect(settings.constants.testDatabaseUrl);
} else {
    console.log('using dev schema\n');
    mongoose.connect(settings.constants.databaseUrl);
}
//mongoose.connect(settings.constants.databaseUrl);


exports.mangoose = mongoose;