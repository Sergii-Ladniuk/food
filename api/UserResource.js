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

//exports.login = function (request, response) {
//    // todo : save password hash instead
//    var user = request.body;
//    UserModel.findOne({name : user.name}, function(err, res) {
//        if (!err && res) {
//            if (res.password === user.password) {
//                response.send({
//                    status: 'ok',
//                    answer: 'accept'
//                });
//            } else {
//                response.send({
//                    status: 'ok',
//                    answer: 'reject'
//                })
//            }
//        } else {
//            console.log(err);
//            response.send({
//                status: 'fail'
//            });
//        }
//    });
//};
//
exports.getCurrentUser = function(request, response) {
    response.send(request.isAuthenticated() ? request.user : '0');
};
