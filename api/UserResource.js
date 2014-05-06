var UserModel = require('../data/schema/UserModel.js').UserModel;
var Callbacks = require('./generic/ResourceCallback.js').Callbacks.create('Product');
var dao = require('../data/dao/GenericDao.js').Dao.create(UserModel);
var GenericResource = require('./generic/GenericResource');

var genericResource = GenericResource.build(UserModel, {
    id: 'username',
    defaultSortColumn: 'username'
});

var UserResource = Object.create(genericResource);

UserResource.save = function (request, response) {
    var user = request.body;
    if (!user.group) {
        user.group = 'user';
    }
    genericResource.save(request, response);
};

exports.UserResource = UserResource;

