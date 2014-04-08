var ProductCollection = require('../data/schema/ProductModel.js');
var ProductModel = ProductCollection.ProductModel;
var dao = require('../data/dao/GenericDao.js').Dao.create(ProductModel);
var Callbacks = require('./generic/ResourceCallback.js').Callbacks.create('Product');
var nativeMongoDB = require('../data/schema/DB.js').mangoose.connection.db;

exports.save = function (request, response) {
    dao.save(request.body, Callbacks.saveCallback(response));
};

exports.list = function (request, response) {
    ProductModel.find({}).sort('title').exec(Callbacks.loadCallback(response));
};

exports.get = function (request, response) {
    ProductModel.findOne({_id: request.params.id}, Callbacks.loadCallback(response));
};

exports.remove = function (request, response) {
    ProductModel.findOne({_id: request.params.id}, function (err, result) {
        if (!err) {
            result.remove();
            response.send({ status: 'ok' });
        } else {
            response.status = 404;
            response.send('Product not found.');
        }
    });
};

exports.import = function (request, response) {
    var parsedJSON = require(request.files.uploadedFile.path);

    // skip description; replace in all number properties comma with point;
    // number properties are all but title and description
    var preprocessF = function (product) {
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
    }

    dao.insertAll(parsedJSON.products, preprocessF, Callbacks.saveCallback(response));
}

exports.deleteAllProducts = function (request, response) {
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
}