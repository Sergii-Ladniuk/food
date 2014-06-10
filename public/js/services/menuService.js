define(['./module', '../app'], function (services) {
    'use strict';
    services
        .factory('MenuResource', function ($resource) {
            return $resource('/menus/:id', {id: '@id'}, {save: {method: 'POST'}});
        })
        .factory('MenuService', function (MenuResource, CrudService) {
            return CrudService(MenuResource);
        })
})