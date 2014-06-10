define(
    [
        './app'
    ], function (app) {
        'use strict';
        return app.config([
            '$routeProvider', '$httpProvider',
            function ($routeProvider, $httpProvider) {
                $routeProvider.
                    when('/', {
                        templateUrl: '/views/homePage.html'
                    }).when('/products', {
                        controller: 'ProductListController',
                        templateUrl: '/views/productList.html'
                    }).when('/admin', {
                        controller: 'AdminController',
                        templateUrl: '/views/admin.html'
                    }).when('/newProduct', {
                        controller: 'NewProductController',
                        templateUrl: '/views/editProductForm.html'
                    }).when('/editProduct/:productId', {
                        controller: 'EditProductController',
                        resolve: {
                            product: ['ProductLoader', function (ProductLoader) {
                                return new ProductLoader();
                            }]
                        },
                        templateUrl: '/views/editProductForm.html'
                    }).when('/removeProduct/:productId', {
                        controller: 'RemoveProductController',
                        resolve: {
                            entity: ['ProductLoader', function (ProductLoader) {
                                return new ProductLoader();
                            }]
                        },
                        templateUrl: '/views/removeForm.html'
                    }).when('/recipes', {
                        controller: 'RecipeListController',
                        templateUrl: '/views/recipeList.html'
                    }).when('/newRecipe', {
                        controller: 'EditRecipeController',
                        resolve: {
                            isNew: function () {
                                return true
                            }
                        },
                        templateUrl: '/views/editRecipeForm.html'
                    }).when('/editRecipe/:recipeId', {
                        controller: 'EditRecipeController',
                        resolve: {
                            isNew: function () {
                                return false
                            }
                        },
                        templateUrl: '/views/editRecipeForm.html'
                    }).when('/menus', {
                        controller: 'MenuListController',
                        templateUrl: '/views/menu/menuList.html'
                    }).when('/menu/new/general', {
                        controller: 'MenuGeneralStepController',
                        templateUrl: '/views/menu/menuGeneral.html',
                        resolve: {
                            isNew: function () {
                                return true
                            }
                        }
                    }).when('/menu/edit/day/:day', {
                        controller: 'MenuDayController',
                        templateUrl: '/views/menu/menuDay.html',
                        resolve: {
                            day: function($route) {
                                return parseInt($route.current.params.day)
                            }
                        }
                    }).when('/signup', {
                        controller: 'SignupController',
                        templateUrl: '/views/signup.html'
                    }).when('/login', {
                        controller: 'LoginController',
                        templateUrl: '/views/login.html'
                    }).when('/error', {
                        controller: 'ErrorController',
                        templateUrl: '/views/error.html'
                    }).when('/menu/edit/review', {
                        controller: 'MenuReviewController',
                        templateUrl: '/views/menu/menuReview.html'
                    }).otherwise({ redirectTo: '/error?status=404'});

                $httpProvider.responseInterceptors.push(function ($q, $location) {
                    return function (promise) {
                        return promise.then(
                            function (response) {
                                return response;
                            }, function (response) {
                                if (response.status === 401)
                                    $location.url('/login?expired&forward');
                                else
                                    $location.url('/error?status=' + response.status);
                                return $q.reject(response);
                            });
                    }
                });
            }
        ]);
    }
);