var UserModel = require('../data/schema/UserModel.js').UserModel;
var Callbacks = require('./generic/ResourceCallback.js').Callbacks.create('Product');
var dao = require('../data/dao/GenericDao.js').Dao.create(UserModel);

exports.get = function (request, response) {
    UserModel.findOne({name : request.params.id}, Callbacks.loadCallback(response));
};

exports.save = function (request, response) {
    var user = request.body;
    if (!user.group) {
        user.group = 'user';
    }
    dao.save(user, Callbacks.saveCallback(response));
};

exports.getCurrentUser = function(request, response) {
    response.send(request.isAuthenticated() ? request.user : '0');
};

exports.list = function (request, response) {
    var query = UserModel.find({}).sort('username');
    if (request.query.pageNumber) {
        var pageNumber = request.query.pageNumber - 1;
        var pageSize = request.query.pageSize || 20;
        query = query.skip(pageSize * pageNumber).limit(pageSize);
    }
    query.exec(Callbacks.loadCallback(response));
};

exports.count = function(request, response) {
    UserModel.count({}, function(err, count) {
        var result = {};
        if (err) {
            response.statusCode = 500;
            console.log(err);
            result.status = 'fail';
        } else {
            result.status = 'ok';
            result.count = count;
        }
        response.send(result);
    })
};

exports.remove = function (request, response) {
    UserModel.findOne({username: request.params.id}, function (err, result) {
        if (!err) {
            result.remove();
            response.send({ status: 'ok' });
        } else {
            response.status = 404;
            response.send('Product not found.');
        }
    });
};

