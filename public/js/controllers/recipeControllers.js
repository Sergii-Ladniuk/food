define(['./module', '../app'], function (controllers) {
    'use strict';
    controllers
        .controller('EditRecipeController', function ($scope, isNew, RecipeService, ProductService, $route, $location, Urls, User) {
            function itemsChanged() {
                if ($scope.recipe.autocalc) {
                    $scope.calculate();
                }
            }

            if (isNew) {
                $scope.recipe = RecipeService.create();
                $scope.recipe.items = [];
                $scope.recipe.autocalc = true;
            } else {
                RecipeService.load($route.current.params.recipeId).then(function(data) {
                    $scope.recipe = data;
                });
            }
            $scope.save = function() {
                $location.path(Urls.recipes);
                if (!$scope.recipeForm.$invalid) {
                    if (isNew) {
                        $scope.recipe.owner = User.getUserName();
                    }
                    RecipeService.save($scope.recipe);
                }
            }
            $scope.delete = function() {
                $location.path(Urls.recipes);
                if (!isNew) {
                    RecipeService.delete($scope.recipe._id);
                }
            }
            $scope.cancel = function() {
                $location.path(Urls.recipes);
            }
            $scope.searchProduct = function(q) {
                ProductService.search('title', q, 10, function(data) {
                    $scope.products = data;
                })
            }
            $scope.addItem = function(item) {
                $scope.recipe.items.push(item);
                itemsChanged();
            }
            $scope.removeItem = function(item) {
                $scope.recipe.items.splice($scope.recipe.items.indexOf(item), 1);
                itemsChanged();
            }
            $scope.calculate = function() {
                $scope.recipe.calories = 0;
                $scope.recipe.proteins = 0;
                $scope.recipe.fats = 0;
                $scope.recipe.carbs = 0;

                $scope.recipe.items.forEach(function(item){
                    $scope.recipe.calories += item.calories;
                    $scope.recipe.proteins += item.proteins;
                    $scope.recipe.fats += item.fats;
                    $scope.recipe.carbs += item.carbs;
                })
            }
        })
        .controller('RecipeListController', function ($scope, RecipeService, User) {
            $scope.pageSize = 20;
            $scope.maxPageCount = 5;

        })
});

