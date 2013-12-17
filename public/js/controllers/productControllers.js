define(['./module', '../app'], function (controllers) {
    'use strict';
    controllers
        .controller('ProductListController', function ($scope, products) {
            $scope.products = products;
            $scope.removeProduct = function ($event, id) {
                $event.preventDefault();
                $scope.products.$remove({id: id}, function (product) {
                    $location.path('/');
                });
            };
        })
        .controller('NewProductController', function ($scope, $location, Product) {
            $scope.product = new Product();
            $scope.save = function () {
                $scope.product.$save(function (product) {
                    $location.path('/');
                });
            };
            $scope.cancel = function () {
                $location.path('/');
            };
        })
        .controller('EditProductController', function ($scope, $location, product) {
            $scope.product = product;
            $scope.save = function () {
                $scope.product.$save(function (product) {
                    $location.path('/');
                });
            };
            $scope.cancel = function () {
                $location.path('/');
            };
            $scope.remove = function () {
                $location.path('/removeProduct/' + $scope.product._id);
            };
        })
        .controller('RemoveProductController', function ($scope, $location, product) {
            $scope.product = product;
            $scope.cancel = function () {
                $location.path('/');
            };
            $scope.remove = function () {
                $scope.product.$remove({id: $scope.product._id}, function (product) {
                    $location.path('/');
                });
            };
        }
    );
});

