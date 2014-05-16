define(['../module', '../../app'], function (controllers) {
    'use strict';
    controllers
        .factory('PagingHandler', function (User) {
            return function ($scope, Service) {
                $scope.pageSelected = function (page) {
                    $scope.currentPage = page;
                    Service.getPage($scope.currentPage, $scope.pageSize).then(function (res) {
                        $scope.products = res;
                    });
                };
                $scope.pageSelected(1);
                Service.totalCount(function (answer) {
                    $scope.totalCount = answer.count;
                });
                $scope.canEdit = function(product) {
                    return User.isModerator() || User.getUserName() === product.owner;
                };
                $scope.canDelete = $scope.canEdit;

            }
        })
})
