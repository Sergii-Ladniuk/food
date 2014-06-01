define(['./module', '../app'], function (controllers) {
    'use strict';

    var fields = ['calories', 'proteins', 'carbs', 'fats', 'weight'];

    controllers
        .controller('EditRecipeController', function ($scope, isNew, RecipeService, ProductService, $route, $location, Urls, User) {

            function itemsChanged() {
                if ($scope.recipe.autocalc) {
                    $scope.calculate();
                }
            }

            function copyObj(obj, props) {
                var answer = {};
                props.forEach(function (p) {
                    if (typeof obj[p] === 'undefined') {
                        throw 'copyObj () invalid argument ' + p;
                    }
                    answer [p] = obj[p];
                })
                return answer;
            }

            function array2map(p, arr) {
                var result = {};
                arr.forEach(function (item) {
                    result[item[p]] = item;
                })
                return result
            }

            $scope.maxValue = 10000;
            $scope.minValue = 0;

            $scope.fields = fields;

            $scope.showError = function (field, error) {
                return (field.$dirty || $scope.submitted)
                    && field.$error[error];
            }

            if (isNew) {
                $scope.recipe = RecipeService.create();
                $scope.recipe.items = [];
                $scope.recipe.autocalc = true;
            } else {
                RecipeService.load($route.current.params.recipeId).then(function (data) {
                    $scope.recipe = data;
                });
            }
            $scope.beforeSubmit = function () {
                $scope.submitted = true;
                $scope.editItemVisible = false;
            }
            $scope.save = function () {
                if (!$scope.recipeForm.$invalid) {
                    if (isNew) {
                        $scope.recipe.owner = User.getUserName();
                    }
                    RecipeService.save($scope.recipe).then(
                        function() {
                            $location.path(Urls.recipes);
                        }
                    )
                }
            }
            $scope.delete = function () {
                $location.path(Urls.recipes);
                if (!isNew) {
                    RecipeService.delete($scope.recipe._id);
                }
            }
            $scope.cancel = function () {
                $location.path(Urls.recipes);
            }
            $scope.searchProduct = function (q) {
                var promise = ProductService.search('title', q, 10);
                promise.then(function (result) {
                    $scope.products = array2map('title', result);
                });
                return promise;
            }
            $scope.submitNewItem = function () {
                if ($scope.newItemForm.itemAmount.$valid) {

                    // hack to fix auto-fill issue
                    // https://github.com/angular/angular.js/issues/1460
                    var title = $('#new-item-title').val();

                    var source = $scope.products[title];

                    if (source) {
                        var item = copyObj(source, ['title', 'proteins', 'calories', 'carbs', 'fats']);
                        item.amount = $scope.newItem.amount;
                        $scope.addItem(item);
                        $scope.newItem = {};
                    }
                }
            }
            $scope.addItem = function (item) {
                $scope.recipe.items.push(item);
                itemsChanged();
            }
            $scope.removeItem = function (item) {
                $scope.recipe.items.splice($scope.recipe.items.indexOf(item), 1);
                itemsChanged();
            }
            $scope.calculate = function () {
                var props = ['proteins', 'calories', 'carbs', 'fats'];

                props.forEach(function (p) {
                    $scope.recipe[p] = 0;
                })
                $scope.recipe.weight = 0;

                $scope.recipe.items.forEach(function (item) {
                    props.forEach(function (p) {
                        $scope.recipe[p] += item[p] / 100 * item.amount;
                    })
                    $scope.recipe.weight += item.amount;
                })
            }
            $scope.onItemAmountChanged = itemsChanged;
            $scope.showEditItemPanel = function () {
                $scope.editItemVisible = true;
                $scope.newItem = {};
            }
            $scope.hideEditItemPanel = function () {
                $scope.editItemVisible = false;
                $scope.newItem = null;
            }
        })
        .controller('RecipeListController', function ($scope, RecipeService, PagingHandler, $modal, User) {
            $scope.user = User;4
            $scope.pageSize = 20;
            $scope.maxPageCount = 5;

            PagingHandler($scope, RecipeService, 'recipes');

            $scope.showDeleteDialog = function (recipe) {
                $modal.open({
                    templateUrl: '/views/removeForm.html',
                    controller: 'RemoveRecipeController',
                    resolve: {
                        entity: function () {
                            return recipe;
                        }
                    }
                }).result.then(function (result) {
                        if (result === "refresh") {
                            $scope.pageSelected($scope.currentPage);
                        }
                    });
            }

            $scope.showViewDialog = function(recipe) {
                $modal.open({
                    templateUrl: '/views/viewRecipeForm.html',
                    controller: 'ViewRecipeController',
                    resolve: {
                        entity: function () {
                            return recipe;
                        }
                    }
                })
            }

        })
        .controller('ViewRecipeController', function($scope, entity) {
            $scope.entity = entity;
            $scope.fields = fields;
            $scope.itemFields = ['title', 'amount'];
        })
        .controller('RemoveRecipeController', function ($scope, RecipeService, Urls, $location, entity) {
            $scope.entity = entity;
            $scope.question = "Delete Recipe Warning";
            $scope.header = "Recipe removal";
            $scope.cancel = function () {
                $scope.$close();
            };
            $scope.remove = function () {
                RecipeService.delete($scope.entity).then(function () {
                    $scope.$close("refresh");
                })
            }
        })
});