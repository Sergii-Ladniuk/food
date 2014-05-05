var ProductCollection = require('../data/schema/ProductModel.js');
var ProductModel = ProductCollection.ProductModel;
var Callbacks = require('./generic/ResourceCallback').Callbacks.create('Product');
var GenericResource = require('./generic/GenericResource');
var nativeMongoDB = require('../data/schema/DB.js').mangoose.connection.db;

ProductResource = GenericResource.build(ProductModel, {
    defaultSortColumn: 'title',
    id: '_id'
});

var isOwnerOrModerator = function (request, response, next) {
    if (request.isAuthenticated()) {
        if (request.user.group === 'admin') {
            next();
        } else {
            ProductModel.findOne({_id: request.params.id || request.body._id}, function(err, product) {
                if (!product || product.owner === request.user.username) {
                    next();
                }
            });
        }
    } else {
        response.send(401);
    }
};

ProductResource.canEdit = isOwnerOrModerator;
ProductResource.canDelete = isOwnerOrModerator;

ProductResource.import = function (request, response) {
    console.log('importing from ' + request.files.uploadedFile.path);
    var parsedJSON = require(request.files.uploadedFile.path);

    // skip description; replace in all number properties comma with point;
    // number properties are all but title and description
    var preprocessF = function (product) {
        product.owner = 'system';
        var result = {};
        for (var prop in product) {
            if (prop === 'title') {
                result[prop] = product[prop];
            } else {
                if (prop !== 'description') {
                    result[prop] = product[prop].replace(',', '.');
                }
            }
        }
        return result;
    };

    this.dao.insertAll(parsedJSON.products, preprocessF, Callbacks.saveCallback(response));
};

ProductResource.deleteAllProducts = function (request, response) {
    var collectionName = ProductCollection.collectionName().toLowerCase();
    console.log('trying to drop ' + collectionName);
    nativeMongoDB.dropCollection(collectionName, function (err) {
        if (err) {
            console.log(err);
            response.status = 500;
            response.send({"status": "fail"});
        } else {
            response.send({"status": "ok"});
        }
    });
};

exports.ProductResource = ProductResource;