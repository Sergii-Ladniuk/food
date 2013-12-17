define(['./module', '../app'], function (services) {
    'use strict';
    services.factory(
        'Recipe',
        [
            '$resource',
            function ($resource) {
                return $resource('/recipes/:id', {id: '@id'}, {save: {method:'POST'}});
            }
        ]
    );
    services.factory(
        'RecipeListLoader', [
            'Recipe',
            '$q',
            function (Recipe, $q) {
                return function () {
                    var delay = $q.defer();
                    Recipe.query(function (recipes) {
                        delay.resolve(recipes);
                    }, function () {
                        delay.reject('Unable to fetch recipes');
                    });
                    return delay.promise;
                };
            }]);
    services.factory(
        'RecipeLoader', [
            'Recipe',
            '$route',
            '$q',
            function (Recipe, $route, $q) {
                return function () {
                    var delay = $q.defer();
                    Recipe.get({id: $route.current.params.recipeId}, function (recipe) {
                        delay.resolve(recipe);
                    }, function () {
                        delay.reject('Unable to get recipe');
                    });
                    return delay.promise;
                };
            }]);
});