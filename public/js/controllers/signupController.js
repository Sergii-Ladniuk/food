define(['./module', '../app'], function (controllers) {
	'use strict';
	controllers.controller(
		'SignupController',
			function ($scope, $location, UserService) {
				$scope.submitted = false;
				$scope.user = {};
				$scope.passwordChanged = function() {
					var passwordEl = angular.element('#password');
					var confirmPasswordEl = angular.element('#confirmPassword');
					confirmPasswordEl.$setValidity('match', passwordEl.getText() === confirmPasswordEl.getText());
				};
				$scope.verifyUser = function(){
					if (UserService.isUserExists())
				}
				$scope.cancel = function () {
					$location.path('/');
				};
				$scope.submit = function () {
					$scope.submitted = true;
					if ($scope.signupForm.$invalid) {
						return;
					}
				};
			}
	);
});