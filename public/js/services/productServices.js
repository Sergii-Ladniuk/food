define(['./module', '../app'], function (services) {
    'use strict';
    services
        .factory('Product', function ($resource) {
            return $resource('/products/:id', {id: '@id'}, {save: {method: 'POST'}});
        })
        .factory('ProductListLoader', function (Product, $q, $http) {
            return {
                list: function () {
                    var delay = $q.defer();
                    Product.query(function (products) {
                        delay.resolve(products);
                    }, function () {
                        delay.reject('Unable to fetch products');
                    });
                    return delay.promise;
                },
                totalCount: function (success, fail) {
                    $http.get('/count/products').then(function (res) {
                        if (res.data.status === 'ok') {
                            success(res.data);
                        } else {
                            fail(res);
                        }
                    }, fail);
                },
                getPage: function (pageNumber, pageSize) {
                    var deferred = $q.defer();
                    Product.query(
                        {
                            "pageNumber": pageNumber,
                            "pageSize": pageSize
                        }, function (res) {
                            deferred.resolve(res);
                        }, function () {
                            deferred.reject('Unable to fetch a product page');
                        }
                    );
                    return deferred.promise;
                }
            };
        })
        .factory('ProductLoader', function (Product, $route, $q) {
            return function () {
                var delay = $q.defer();
                Product.get({id: $route.current.params.productId}, function (product) {
                    delay.resolve(product);
                }, function () {
                    delay.reject('Unable to get product');
                });
                return delay.promise;
            };
        })
        .factory('ProductService', function (Product) {
            return {
                search: function (column, q, size, callback) {
                    Product.query({
                        "column": column,
                        "pageNumber": 1,
                        "pageSize": size,
                        "q": q
                    }, callback);
                }
            }

        })
});
