define(
    [
        './app'
    ], function (app) {
        'use strict';
        return app.config([
            '$routeProvider',
            function ($routeProvider) {
                $routeProvider.
                    when('/', {
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
                            product: ['ProductLoader', function(ProductLoader) {
                                return new ProductLoader();
                            }]
                        },
                        templateUrl: '/views/editProductForm.html'
                    }).when('/removeProduct/:productId', {
                        controller: 'RemoveProductController',
                        resolve: {
                            product: ['ProductLoader', function(ProductLoader) {
                                return new ProductLoader();
                            }]
                        },
                        templateUrl: '/views/removeProductForm.html'
                    }).when('/newRecipe', {
                        controller: 'NewRecipeController',
                        templateUrl: '/views/editRecipeForm.html'
                    }).otherwise({ redirectTo: '/'})
            }
        ]);
    }
);