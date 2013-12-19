var ProductModel = require('../data/schema/ProductModel.js').ProductModel;
var Dao = require('../data/dao/GenericDao.js').Dao.create(ProductModel);
var Callbacks = require('./generic/ResourceCallback.js').Callbacks.create('Product');

exports.save = function (request, response) {
    Dao.save(request.body, Callbacks.saveCallback(response));
}

exports.list = function (request, response) {
    ProductModel.find(Callbacks.loadCallback(response));
}

exports.get = function (request, response) {
    ProductModel.findOne({_id: request.params.id}, Callbacks.loadCallback(response));
}

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
}