define(['./module', '../app'], function (services) {
    'use strict';
    services
        .factory('RecipeResource', function ($resource) {
            return $resource('/recipes/:id', {id: '@id'}, {save: {method: 'POST'}});
        })
        .factory('RecipeService', function (RecipeResource, $q) {
            return {
                create: function() {
                    return new RecipeResource();
                }, load: function(id) {
                    return RecipeResource.get({id: id}).$promise;
                }, save: function(recipe) {
                    var q = $q.defer();
                    recipe.$save(function(data) {
                        q.resolve(data);
                    });
                    return q.promise;
                }, delete: function(recipe) {
                    var q = $q.defer();
                    recipe.$remove({id: recipe._id}, function(data) {
                        q.resolve(data);
                    })
                    return q.promise;
                }
            }
        })
})