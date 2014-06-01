define(['./module', '../app'], function (services) {
    'use strict';
    services
        .factory('RecipeResource', function ($resource) {
            return $resource('/recipes/:id', {id: '@id'}, {save: {method: 'POST'}});
        })
        .factory('RecipeService', function (RecipeResource, CrudService) {
            return CrudService(RecipeResource);
        })
})