var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/ecomm_database');

var model = function () {
    var createProduct = function () {
        return new Schema({
            title: {type: String, required: true},
            description: {type: String, required: true}
        })
    }
    var product = createProduct();
    return mongoose.model('Product', product);
} ();

exports.model = function () {
    return model;
}
