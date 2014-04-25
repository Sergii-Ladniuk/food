define(['./module', '../app'], function (controllers) {
    'use strict';
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
                UserService.isUserExists($scope.user.name).then(
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