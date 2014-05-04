define(['./module', '../app'], function (controllers) {
    'use strict';
    controllers.controller('LoginController', function ($scope, $location, $routeParams, UserService, User) {
            User.checkIsLoggedIn();
            $scope.expired = $routeParams.expired;
            $scope.loggedUser = User;
            $scope.user = {};
            $scope.submitted = false;
            $scope.login = function () {
                $scope.submitted = true;
                // hack to fix auto-fill issue
                // https://github.com/angular/angular.js/issues/1460
                $( 'input[ng-model], select[ng-model]' ).each( function() {
                    angular.element( this ).controller( 'ngModel' ).$setViewValue( $( this ).val() );
                });
                if (!$scope.loginForm.$invalid) {
                    UserService.login($scope.user).then(function (response) {
                        User.checkIsLoggedIn();
                        if ($routeParams.forward) {
                            $location.url('/');
                        } else {
                            // a hack to hide login form
                            $('.navbar-header').click();
                        }
                    }, function (response) {
                        if (response.status === 401) {
                            $scope.loginForm.password.$setValidity('credentials', false);
                        }
                    });
                }
            };
            $scope.logout = function() {
                UserService.logout().then(
                    function success() {
                        User.checkIsLoggedIn();
                    }, function fail() {
                        // TODO
                    }
                );
            }
        }
    );
});