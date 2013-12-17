var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/food');

var productSchema = mongoose.Schema({
    title: {type: String, required: true}
    , description: {type: String, required: true}
    , calories: {type: Number, required: true}
    , proteins: {type: Number, required: true}
    , fats: {type: Number, required: true}
    , carbs: {type: Number, required: true}
    , portion: {type: Number, required: false}
    , portion_unit: {type: String, required: false}
})

exports.ProductModel = mongoose.model('Product', productSchema);
