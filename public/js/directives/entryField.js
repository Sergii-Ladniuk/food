'use strict';
define(['./directives', '../utils/utils'], function (directives) {
    directives
        .directive('entryField', function (RecipeService, $parse) {
            return {
                restrict: 'E',
                scope: {
                    focus: "@",
                    field: "@",
                    index: "@",
                    entity: "=",
                    entities: "=",
                    onEntitySelect: "&"
                },
                template: "<ng-include src='template' onload='onload()'></ng-include>",
                link: function($scope, elm, attrs) {
                    if (typeof attrs.required === 'undefined') {
                        $scope.required = true;
                    } else {
                        $scope.required = attrs.required;
                    }
                    switch (attrs.type) {
                        case 'name':
                            $scope.template = '/views/templates/entryFieldText.html';
                            $scope.maxlength = attrs.maxlength || 30;
                            break;
                        case 'article':
                            $scope.template = '/views/templates/entryFieldText.html';
                            $scope.maxlength = attrs.maxlength || 500;
                            break;
                        case 'recipe':
                            $scope.template = '/views/templates/recipeEntryField.html';
                            $scope.maxlength = attrs.maxlength || 30;
                            $scope.search = function(q) {
                                return RecipeService.search('title', q, 10);
                            }
                            $scope.onSelect = function ($item, $model, $label) {
                                copyProps($item, $scope.entity);
                                $scope.onEntitySelect();
                            }
                            break;
                        case 'number':
                            $scope.template = '/views/templates/entryFieldNumber.html';
                            $scope.min = attrs.min || 0;
                            $scope.max = attrs.max || 10000;
                            break;
                    }
                }
            }
        })
})
