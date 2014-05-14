var RecipeModel = require('../data/schema/RecipeModel.js').RecipeModel;
var Callbacks = require('./generic/ResourceCallback.js').Callbacks.create('Recipe');
var dao = require('../data/dao/GenericDao.js').Dao.create(RecipeModel);
var GenericResource = require('./generic/GenericResource');

var genericResource = GenericResource.build(RecipeModel, {
    id: '_id',
    defaultSortColumn: 'title'
});

var RecipeResource = Object.create(genericResource);

exports.RecipeResource = RecipeResource;

