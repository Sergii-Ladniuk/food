var assert = require("assert");
var should = require('should');
var RecipeModel = require('../../data/schema/RecipeModel').RecipeModel;
var tools = require('./tools');
var examples = require('./examples');

// cleanup function
var cleanup = tools.cleanup('recipes');

describe('Recipe Model : ', function () {
    describe('success story: ', function () {
        before(cleanup);
        it('should success while data is ok', function (done) {
            new RecipeModel(examples.goodRecipe())
                .save(function (err, savedRecipe) {
                    should.not.exist(err);
                    RecipeModel.findOne({_id: savedRecipe._id}, function (err, loadedRecipe) {
                        should.not.exist(err);
                        loadedRecipe.title.should.equal(examples.goodRecipe().title);
                        done();
                    });
                })
        })
    })
    describe('validation: ', function () {
        it('should fail on missing required field - self', function (done) {
            var mandatoryFields = ['title', 'carbs', 'proteins', 'fats', 'calories', 'weight', 'owner'];
            (function checkAll(index) {
                    var badRecipe = examples.goodRecipe();
                    var field = mandatoryFields[index];
                    delete badRecipe[field];
                    new RecipeModel(badRecipe)
                        .save(function (err, savedRecipe) {
                            console.log("\n\nfield = " + field);
                            console.log(err);
                            should.exist(err);
                            if (index + 1 < mandatoryFields.length) {
                                checkAll(index + 1);
                            } else {
                                done();
                            }
                        })
            })(0);
        })
        it('should fail on negative numbers - self', function (done) {
            var numberFields = [ 'carbs', 'proteins', 'fats', 'calories', 'weight'];
            (function checkAll(index) {
                    var badRecipe = examples.goodRecipe();
                    var field = numberFields[index];
                    badRecipe[field] = -1;
                    new RecipeModel(badRecipe)
                        .save(function (err, savedRecipe) {
                            console.log("\n\nfield = " + field);
                            console.log(err);
                            should.exist(err);
                            if (index + 1 < numberFields.length) {
                                checkAll(index + 1);
                            } else {
                                done();
                            }
                        })
            })(0);
        })
        it('should fail on missing required field - item', function (done) {
            var mandatoryFields = ['title', 'carbs', 'proteins', 'fats', 'calories', 'amount'];
            (function checkAll(index) {
                var badRecipe = examples.goodRecipe();
                var field = mandatoryFields[index];
                delete badRecipe.items[0][field];
                new RecipeModel(badRecipe)
                    .save(function (err, savedRecipe) {
                        console.log("\n\nfield = " + field);
                        console.log(err);
                        should.exist(err);
                        if (index + 1 < mandatoryFields.length) {
                            checkAll(index + 1);
                        } else {
                            done();
                        }
                    })
            })(0);
        })
        it('should fail on negative number field - item', function (done) {
            var mandatoryFields = ['carbs', 'proteins', 'fats', 'calories', 'amount'];
            (function checkAll(index) {
                var badRecipe = examples.goodRecipe();
                var field = mandatoryFields[index];
                badRecipe.items[0][field] = -1;
                new RecipeModel(badRecipe)
                    .save(function (err, savedRecipe) {
                        console.log("\n\nfield = " + field);
                        console.log(err);
                        should.exist(err);
                        if (index + 1 < mandatoryFields.length) {
                            checkAll(index + 1);
                        } else {
                            done();
                        }
                    })
            })(0);
        })
    })
})
