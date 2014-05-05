var Callbacks = require('./ResourceCallback.js').Callbacks.create('Product');

exports.build = function (Model, Params) {
    var dao = require('../../data/dao/GenericDao.js').Dao.create(Model);
    return {
        model: Model,
        dao: dao,
        save: function (request, response) {
            dao.save(request.body, Callbacks.saveCallback(response));
        },
        list: function (request, response) {
            var query = Model.find({});
            if (Params.defaultSortColumn) {
                query.sort(Params.defaultSortColumn);
            }
            if (request.query.pageNumber) {
                var pageNumber = request.query.pageNumber - 1;
                var pageSize = request.query.pageSize || 20;
                query = query.skip(pageSize * pageNumber).limit(pageSize);
            }
            query.exec(Callbacks.loadCallback(response));
        }, get: function (request, response) {
            var q = {};
            q[Params.id || '_id'] = request.params.id;
            Model.findOne(q, Callbacks.loadCallback(response));
        }, remove: function (request, response) {
            Model.findOne({_id: request.params.id}, function (err, result) {
                if (!err) {
                    result.remove(function (err) {
                        if (!err) {
                            response.send({ status: 'ok' });
                        } else {
                            console.log(err);
                            response.send(500);
                        }
                    });
                } else {
                    response.send(404);
                }
            });
        }, count: function(request, response) {
            Model.count({}, function(err, count) {
                var result = {};
                if (err) {
                    response.status = 500;
                    console.log(err);
                    result.status = 'fail';
                } else {
                    result.status = 'ok';
                    result.count = count;
                }
                response.send(result);
            })
        }
    };
};