define(['./module', '../app'], function (controllers) {
    'use strict';
    controllers.controller('ErrorController', function ($scope, $location, $routeParams) {
        $scope.error404 = $routeParams.status === '404';
        $scope.internalError = $routeParams.status !== '404';
    });
});