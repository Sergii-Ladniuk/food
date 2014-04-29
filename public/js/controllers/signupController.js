define(['./module', '../app', 'jQuery'], function (controllers) {
    'use strict';

    // Fix input element click problem in drop-down forms
    $(function() {
        $('.dropdown input, .dropdown label, .dropdown *').click(function(e) {
            e.stopPropagation();
        });
    });


    controllers.controller(
        'SignupController',
        function ($scope, $location, UserService) {
            $scope.submitted = false;
            $scope.user = UserService.createUser();
            $scope.passwordChanged = function () {
                $scope.signupForm.confirmPassword.$setValidity('match',
                    $scope.user.password === $scope.user.confirmPassword);
            };
            $scope.verifyUserNotExists = function () {
                UserService.isUserExists($scope.user.username).then(
                    function ok(userExists) {
                        $scope.signupForm.userName.$setValidity('exists', !userExists);
                    }, function error(err) {
                        // todo handle err
                    }
                );

            };
            $scope.cancel = function () {
                $location.path('/');
            };
            $scope.submit = function () {
                $scope.submitted = true;
                if (!$scope.signupForm.$invalid) {
                    UserService.saveUser($scope.user, function success() {
                        $location.path('/');
                    });
                }
            };
        }
    );
});