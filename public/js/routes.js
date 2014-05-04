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
                            product: ['ProductLoader', function (ProductLoader) {
                                return new ProductLoader();
                            }]
                        },
                        templateUrl: '/views/removeProductForm.html'
                    }).when('/newRecipe', {
                        controller: 'NewRecipeController',
                        templateUrl: '/views/editRecipeForm.html'
                    }).when('/signup', {
                        controller: 'SignupController',
                        templateUrl: '/views/signup.html'
                    }).when('/login', {
                        controller: 'LoginController',
                        templateUrl: '/views/login.html'
                    }).when('/error', {
                        controller: 'ErrorController',
                        templateUrl: '/views/error.html'
                    })
                    .otherwise({ redirectTo: '/'});

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