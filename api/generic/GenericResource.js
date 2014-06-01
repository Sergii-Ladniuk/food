var Callbacks = require('./ResourceCallback.js').Callbacks.create('Product');
var Auth = require('../Auth.js');

exports.build = function (Model, Params) {
    var dao = require('../../data/dao/GenericDao.js').Dao.create(Model);

    function findById(id, callback) {
        var q = {};
        q[Params.id || '_id'] = id;
        Model.findOne(q, callback);
    }

    var Resource = {
        model: Model,
        dao: dao,
        save: function (request, response) {
            dao.save(request.body, Callbacks.saveCallback(response));
        },
        list: function (request, response) {

            if (request.query.count) {
                return Resource.count(request, response);
            }

            function buildQuery(fetchAll) {
                var conditions = {};
                if (request.query.column && request.query.q) {
                    // if fetch all set if will take all matching,
                    // otherwise only ones starting from request.query.q
                    var prefix = fetchAll ? '' : '^';
                    conditions [request.query.column] = new RegExp(prefix + request.query.q, 'i');
                    console.log(conditions);
                }
                var query = Model.find(conditions);
                if (Params.defaultSortColumn) {
                    query.sort(Params.defaultSortColumn);
                }
                if (request.query.pageNumber) {
                    var pageNumber = request.query.pageNumber - 1;
                    var pageSize = request.query.pageSize || 20;
                    query = query.skip(pageSize * pageNumber).limit(pageSize);
                }
                return query;
            }

            var callback = Callbacks.loadCallback(response);

            if (request.query.desired) {
                callback = function (err, result) {
                    if (err || !result) {
                        console.log(err);
                        response.send(500);
                    } else {
                        if (result.length < request.query.desired) {
                            buildQuery(true).exec(function (err, secondResult) {
                                if (err || !secondResult) {
                                    console.log(err);
                                    response.send(result);
                                } else {
                                    for (var i = result.length; i < request.query.desired; i++) {
                                        result.push(secondResult);
                                    }
                                    response.send(secondResult);
                                }
                            })
                        } else {
                            response.send(result);
                        }
                    }
                }
            }
            buildQuery().exec(callback);
        }, get: function (request, response) {
            var q = {};
            q[Params.id || '_id'] = request.params.id;
            if (request.query.checkExists) {
                findById(request.params.id, Callbacks.checkExistsCallback(response));
            } else {
                findById(request.params.id, Callbacks.loadCallback(response));
            }
        }, remove: function (request, response) {
            findById(request.params.id, function (err, result) {
                if (!err && result) {
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
        }, count: function (request, response) {
            Model.count({}, function (err, count) {
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
        },
        canEdit: Auth.IsOwnerOrModerator(Model),
        canDelete: Auth.IsOwnerOrModerator(Model)
    };

    return Resource;
};