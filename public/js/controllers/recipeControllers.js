define(['./module', '../app'], function (controllers) {
    'use strict';
    controllers.controller(
        'RecipeListController', [
            function ($scope, recipes) {
                $scope.recipes = recipes;
                $scope.removeRecipe = function ($event, id) {
                    $event.preventDefault();
                    $scope.recipes.$remove({id: id}, function (recipe) {
                        $location.path('/');
                    });
                };
            }
        ]
    );

    controllers.controller(
        'NewRecipeController', [
            '$scope',
            '$location',
            'Recipe',
            function ($scope, $location, Recipe) {
                $scope.recipe = new Recipe();
                $scope.save = function () {
                    $scope.recipe.$save(function (recipe) {
                        $location.path('/');
                    });
                };
                $scope.cancel = function () { $location.path('/'); };
            }
        ]
    );
    controllers.controller(
        'EditRecipeController', [
            '$scope',
            '$location',
            'recipe',
            function ($scope, $location, recipe) {
                $scope.recipe = recipe;
                $scope.save = function () {
                    $scope.recipe.$save(function (recipe) {
                        $location.path('/');
                    });
                };
                $scope.cancel = function () { $location.path('/'); };
                $scope.remove = function () {
                    $location.path('/removeRecipe/' + $scope.recipe._id);
                };
            }
        ]
    );
    controllers.controller(
        'RemoveRecipeController', [
            '$scope',
            '$location',
            'recipe',
            function ($scope, $location, recipe) {
                $scope.recipe = recipe;
                $scope.cancel = function () { $location.path('/'); };
                $scope.remove = function () {
                    $scope.recipe.$remove({id: $scope.recipe._id}, function (recipe) {
                        $location.path('/');
                    });
                };
            }
        ]
    );
});

