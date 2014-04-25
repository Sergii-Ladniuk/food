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

