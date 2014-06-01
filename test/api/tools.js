var should = require('should');
var db = require('../../data/schema/DB.js').mangoose.connection.db;
var UserResource = require('../../api/UserResource').UserResource;
var RecipeResource = require('../../api/RecipeResource').RecipeResource;
var examples = require('./examples');

exports.emptyRequest = function () {
    return {
        query: {},
        params: {},
        body: {},
        withId: function (id) {
            this.params.id = id;
            return this;
        }, withPageNumber: function (page) {
            this.query.pageNumber = page;
            return this;
        }, withPageSize: function (size) {
            this.query.pageSize = size;
            return this;
        }, checkExists: function () {
            this.query.checkExists = true;
            return this;
        }
    };
};


exports.usersRequest = function () {
    var r = exports.emptyRequest();
    r.withUserName = function (userName) {
        r.body.username = userName;
        return r;
    };
    r.withPassword = function (password) {
        r.body.password = password;
        return r;
    };
    r.withGroup = function (group) {
        r.body.group = group;
        return r;
    };
    r.withEmail = function (email) {
        r.body.email = email;
        return r;
    };
    return r;
};

exports.recipeRequest = function () {
    var r = exports.emptyRequest();
    r.withRecipe = function (recipe) {
        r.body = recipe;
        r.items = [];
        return r;
    }
    r.withItem = function (item) {
        r.items.push(item);
        return r;
    }
    return r;
}

exports.response = function (send) {
    (typeof send).should.equal('function');
    return {
        send: function (data) {
            should.exist(data);
            send(data);
        }
    };
};

exports.spammer = function (Resource, dummyRequest) {
    function spam(current, limit, callback) {
        if (current < limit) {
            Resource.save(dummyRequest(current), exports.response(function () {
                spam(current + 1, limit, callback);
            }));
        } else {
            callback();
        }
    };
    return function (limit, callback) {
        spam(0, limit, callback);
    };
};

exports.dummySaveUserRequest = function (index) {
    return exports.usersRequest()
        .withUserName('user' + index).withPassword('qwe')
        .withGroup('gr').withEmail('qwe@asd.com');
};
exports.dummySaveRecipeRequest = function (index) {
    return exports.recipeRequest()
        .withRecipe(examples.goodRecipe());
};

// a function used to produce a lot of items in the database to test #list and #count
// result is a function having params:
// limit - how many items to be produced
// callback to call when operation is done
exports.spamUsers = exports.spammer(UserResource, exports.dummySaveUserRequest);
exports.spamRecipes = exports.spammer(RecipeResource, exports.dummySaveRecipeRequest);

exports.cleanup = function (collection) {
    return function (callback) {
        db.dropCollection(collection, function (err) {
            console.log(err);
            callback();
        });
    }
}

