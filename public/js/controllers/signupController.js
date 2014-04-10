define(['./module', '../app'], function (controllers) {
	'use strict';
	controllers.controller(
		'SignupController',
			function ($scope, $location) {
				$scope.user = {};
				$scope.cancel = function () {
					$location.path('/');
				};
				$scope.submit = function () {

				}
			}
	);
});