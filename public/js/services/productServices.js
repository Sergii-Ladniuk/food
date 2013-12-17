define(['./module', '../app'], function (services) {
    'use strict';
    services
        .factory('Product', function ($resource) {
            return $resource('/products/:id', {id: '@id'}, {save: {method: 'POST'}});
        })
        .factory('ProductListLoader', function (Product, $q) {
            return function () {
                var delay = $q.defer();
                Product.query(function (products) {
                    delay.resolve(products);
                }, function () {
                    delay.reject('Unable to fetch products');
                });
                return delay.promise;
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
        });
});