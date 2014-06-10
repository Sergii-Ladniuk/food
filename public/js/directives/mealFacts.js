'use strict';
define(['./directives'], function (directives) {
    directives
        .directive('mealFacts', function (RecipeService) {
            return {
                restrict: 'E',
                templateUrl: '/views/templates/mealFacts.html',
                scope: {
                    entity: "=",
                    ngShow: "@",
                    caption: "@"
                }
            }
        })
})
