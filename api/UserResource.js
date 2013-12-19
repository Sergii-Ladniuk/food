var UserModel = require('./UserModel.js').UserModel;

exports.get = function (req, resp) {
    UserModel.findOne({_id: req.param.id}, function (err, result) {
        if (!err) {
            resp.send(result);
        } else {

        }
    });
}

