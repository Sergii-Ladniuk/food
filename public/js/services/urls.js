define(['./module', '../app'], function (services) {
    'use strict';
    services.factory('Urls', function($location) {
        return {
            home: '/',
            products: '/products',
            recipes: '/recipes',
            menuReview: '/menu/edit/review',
            menuDay: function(day) {
                return '/menu/edit/day/' + day;
            },
            goMenuDay: function(day) {
                $location.path(this.menuDay(day));
            },
            goMenuReview: function( ) {
                $location.path(this.menuReview);
            }
        }
    })
})
