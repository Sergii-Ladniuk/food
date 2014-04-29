define(['./module', '../app'], function (controllers) {
    'use strict';
    controllers.controller('MainController', function($scope, User) {
        $scope.user = User;
    });
});