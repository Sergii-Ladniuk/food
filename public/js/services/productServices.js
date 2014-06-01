define(['./module', '../app'], function (services) {
    'use strict';
    services
        .factory('Product', function ($resource) {
            return $resource('/products/:id', {id: '@id'}, {save: {method: 'POST'}});
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
        .factory('ProductService', function (Product, CrudService) {
            return CrudService(Product);
        })
});
