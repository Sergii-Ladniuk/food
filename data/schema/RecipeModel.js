var mongoose = require('./DB.js').mangoose;

var recipeSchema = mongoose.Schema({
    title: {type: String, required: true, validate: /^.{1,50}$/},
    description: {type: String, required: false, validate: /^.{0,500}$/},
    items: [
        {
            title: {type: String, required: true, validate: /^.{1,50}$/},
            calories: {type: Number, required: true, min: 0, max: 10000},
            proteins: {type: Number, required: true, min: 0, max: 10000},
            fats: {type: Number, required: true, min: 0, max: 10000},
            carbs: {type: Number, required: true, min: 0, max: 10000},
            amount: {type: Number, required: true, min: 0}
        }
    ],
    calories: {type: Number, required: true, min: 0, max: 10000},
    proteins: {type: Number, required: true, min: 0, max: 10000},
    fats: {type: Number, required: true, min: 0, max: 10000},
    carbs: {type: Number, required: true, min: 0, max: 10000},
    weight: {type: Number, required: true, min: 0},
    owner: {type: String, required: true, validate: /^.{1,30}$/}
})

var COLLECTION_NAME = 'Recipe';

exports.collectionName = function () {
    return COLLECTION_NAME + 's';
}

exports.RecipeModel = mongoose.model(COLLECTION_NAME, recipeSchema);
