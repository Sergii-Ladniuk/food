define(['./module', '../app'], function (controllers) {
    'use strict';
    controllers
        .controller('ProductListController', function ($scope, ProductListLoader, User) {
            $scope.pageSize = 9;
            $scope.maxPageCount = 5;
            $scope.pageSelected = function(page) {
                $scope.currentPage = page;
                $scope.products = ProductListLoader.getPage($scope.currentPage, $scope.pageSize);
            };
            $scope.pageSelected(1);
            ProductListLoader.totalCount(
                function success(res) {
                    $scope.totalCount = res.count;
                }, function fail() {
                    // todo
                }
            );
            $scope.removeProduct = function ($event, id) {
                $event.preventDefault();
                $scope.products.$remove({id: id}, function (product) {
                    $location.path('/');
                });
            };
            $scope.canEdit = function(product) {
                return User.isModerator() || User.getUserName() === product.owner;
            };
            $scope.canDelete = $scope.canEdit;
        })
        .controller('NewProductController', function ($scope, $location, Product, User) {
            $scope.alerts = [];
            $scope.addAlert = function(msg) {
                $scope.alerts.push({msg: msg, type: 'danger'});
            };
            $scope.closeAlert = function(index) {
                $scope.alerts.splice(index, 1);
            };

            $scope.product = new Product();
            $scope.save = function () {
                $scope.product.owner = User.getUserName();
                $scope.product.$save(function (response) {
                    if (response.status !== 'ok') {
                        $scope.addAlert('Internal server error.');
                    } else {
                        $location.path('/');
                    }
                }, function(error) {
                    alert('Internal server error. ' + error);
                });
            };
            $scope.cancel = function () {
                $location.path('/');
            };
        })
        .controller('EditProductController', function ($scope, $location, product) {
            $scope.product = product;
            $scope.save = function () {
                $scope.product.$save(function (response) {
                    $location.path('/');
                }, function(error) {
                    alert('Internal server error. ' + error);
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

