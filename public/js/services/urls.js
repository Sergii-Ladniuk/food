define(['./module', '../app'], function (services) {
    'use strict';
    services.factory('Urls', function() {
        return {
            home: '/',
            products: '/products',
            recipes: '/recipes'
        }
    })
})
