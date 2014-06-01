define(['./module', '../app'], function (services) {
    'use strict';
    services
        .factory('CrudService', function ($q) {
            return function (Resource) {

                function query(p) {
                    var delay = $q.defer();
                    Resource.query(p, function (res) {
                        delay.resolve(res);
                    });
                    return delay.promise;
                }

                return {
                    search: function (column, q, size, pageNumber) {
                        var delay = $q.defer();
                        Resource.query({
                            "column": column,
                            "pageNumber": pageNumber || 1,
                            "pageSize": size,
                            "desired": size,
                            "q": q
                        }, function (res) {
                            delay.resolve(res);
                        });
                        return delay.promise;
                    },
                    list: function () {
                        var delay = $q.defer();
                        Resource.query(function (products) {
                            delay.resolve(products);
                        });
                        return delay.promise;
                    },
                    totalCount: function () {
                        var delay = $q.defer();
                        Resource.get({
                            "count": true
                        }, function (res) {
                            delay.resolve(res);
                        });
                        return delay.promise;
                    },
                    getPage: function (pageNumber, pageSize) {
                        var deferred = $q.defer();
                        Resource.query(
                            {
                                "pageNumber": pageNumber,
                                "pageSize": pageSize
                            }, function (res) {
                                deferred.resolve(res);
                            }
                        );
                        return deferred.promise;
                    }, create: function () {
                        return new Resource();
                    }, load: function (id) {
                        return Resource.get({id: id}).$promise;
                    }, save: function (instance) {
                        var q = $q.defer();
                        instance.$save(function (data) {
                            q.resolve(data);
                        });
                        return q.promise;
                    }, delete: function (instance) {
                        var q = $q.defer();
                        instance.$remove({id: instance._id}, function (data) {
                            q.resolve(data);
                        })
                        return q.promise;
                    }
                }
            }

        })
})