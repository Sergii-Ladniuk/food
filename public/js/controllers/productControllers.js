define(['./module', '../app'], function (controllers) {
    'use strict';
    controllers
        .controller('ProductListController', function ($scope, ProductService, Urls, PagingHandler) {
            $scope.pageSize = 9;
            $scope.maxPageCount = 5;

            PagingHandler($scope, ProductService, 'products');
        })
        .controller('NewProductController', function ($scope, $location, Product, User, Urls) {
//            $scope.alerts = [];
//            $scope.addAlert = function(msg) {
//                $scope.alerts.push({msg: msg, type: 'danger'});
//            };
//            $scope.closeAlert = function(index) {
//                $scope.alerts.splice(index, 1);
//            };
            $scope.product = new Product();
            $scope.save = function () {
                $scope.product.owner = User.getUserName();
                $scope.product.$save(function (response) {
                    $location.path(Urls.products);
                });
            };
            $scope.cancel = function () {
                $location.path(Urls.products);
            };
        })
        .controller('EditProductController', function ($scope, $location, product, Urls) {
            $scope.product = product;
            $scope.save = function () {
                $scope.product.$save(function (response) {
                    $location.path(Urls.products);
                });
            };
            $scope.cancel = function () {
                $location.path(Urls.products);
            };
            $scope.remove = function () {
                $location.path('/removeProduct/' + $scope.product._id);
            };
        })
        .controller('RemoveProductController', function ($scope, $location, entity, Urls) {
            $scope.entity = entity;
            $scope.cancel = function () {
                $location.path(Urls.products);
            };
            $scope.question = "Delete Product Warning";
            $scope.remove = function () {
                $scope.entity.$remove({id: $scope.entity._id}, function (product) {
                    $location.path(Urls.products);
                });
            };
        }
    );
});

