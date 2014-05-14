var assert = require("assert");
var should = require('should');
var RecipeResource = require('../../api/RecipeResource').RecipeResource;
var db = require('../../data/schema/DB.js').mangoose.connection.db;
var RecipeModel = require('../../data/schema/RecipeModel').RecipeModel;
var dao = require('../../data/dao/GenericDao.js').Dao.create(RecipeModel);

var tools = require('./tools');
var examples = require('./examples');

var cleanup = tools.cleanup('recipes');

describe('Recipe Resource :', function () {
    describe('#save()', function () {
        before(cleanup);
        var me = this;

        it('when user data is ok should save with no error', function (done) {
            var request = tools.recipeRequest()
                .withRecipe(examples.goodRecipe());
            var response = tools.response(function (data) {
                data.should.have.property('status', 'ok');
                me.id = data.id;
                done();
            });
            RecipeResource.save(request, response);
        });
        it('should exist', function (done) {
            var request = tools.emptyRequest()
                .withId(me.id).checkExists();
            var response = tools.response(function (data) {
                data.should.have.property('answer', 'yes');
                done();
            });
            RecipeResource.get(request, response);
        });
        it('#get should return it with proper data', function (done) {
            var request = tools.emptyRequest().withId(me.id);
            var response = tools.response(function (data) {
                data.should.have.property('title', 'soup');
                data.should.have.property('fats', 100.2);
                data.items[0].should.have.property('title', 'meat');
                done();
            });
            RecipeResource.get(request, response);
        });
    });
});

