var mongoose = require('./DB.js').mangoose;

var productSchema = mongoose.Schema({
    title: {type: String, required: true, validate: /^.{1,50}$/},
    description: {type: String, required: false, validate: /^.{0,500}$/},
    calories: {type: Number, required: true, min: 0, max: 10000},
    proteins: {type: Number, required: true, min: 0, max: 10000},
    fats: {type: Number, required: true, min: 0, max: 10000},
    carbs: {type: Number, required: true, min: 0, max: 10000}
})

var PRODUCT_COLLECTION = 'Product';

exports.collectionName = function () {
    return PRODUCT_COLLECTION + 's';
}
exports.ProductModel = mongoose.model(PRODUCT_COLLECTION, productSchema);
