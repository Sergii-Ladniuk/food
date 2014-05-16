'use strict';

define([
    'angular',
    'angular-resource',
    'angular-route',
    'angular-mocks',
    'ui.bootstrap',
    'app'
], function (angular, mocks, app) {
    'use strict';

    var Urls = {
        products: '/products'
    }

    describe('product list controller: ', function () {

        var ProductListController;
        var User;
        var ProductService = {
            totalCount: function () {
                return {
                    then: function (callback) {
                        callback({count: 10});
                    }
                }
            },
            getPage: function (pageNumber, pageSize) {
                var result = [];
                for (var i = 0; i < pageSize; i++) {
                    result[i] = {
                        title: 'p' + pageNumber + "-" + i,
                        owner: 'user'
                    };
                }
                return {
                    then: function (callback) {
                        callback(result);
                    }
                }
            }
        };

        var scope;

        beforeEach(function () {
            User = {};

            module("hiking_food")

            module(function ($provide) {
                $provide.value('User', User);
            })

            inject(function ($rootScope, $controller) {
                scope = $rootScope.$new();

                ProductListController = $controller('ProductListController', {
                    $scope: scope,
                    ProductService: ProductService,
                    Urls: Urls,
                    $location: location
                })
            })
        })

        it('should exists', function () {
            expect(ProductListController).toBeDefined();
        })
        it('paging params should be set up', function () {
            expect(scope.pageSize).toBe(9);
            expect(scope.maxPageCount).toBe(5);
            expect(scope.totalCount).toBe(10);
        })
        it('first page should be selected by default', function () {
            expect(scope.currentPage).toBe(1);
            expect(scope.products.length).toBe(9);
            expect(scope.products[0].title).toBe('p1-0');
            expect(scope.products[8].title).toBe('p1-8');
        })
        it('user can select page 2', function () {
            scope.pageSelected(2);
            expect(scope.currentPage).toBe(2);
            expect(scope.products.length).toBe(9);
            expect(scope.products[0].title).toBe('p2-0');
            expect(scope.products[8].title).toBe('p2-8');
        })
        it('moderator can edit/delete any product', function () {
            User.isModerator = function () {
                return true;
            }
            User.getUserName = function () {
                return 'vas';
            }
            expect(scope.canEdit({owner: 'not vas'})).toBe(true)
            expect(scope.canDelete({owner: 'not vas'})).toBe(true)
        })
        it('user can edit/delete his product', function () {
            User.isModerator = function () {
                return false;
            }
            User.getUserName = function () {
                return 'vas';
            }
            expect(scope.canDelete({owner: 'vas'})).toBe(true)
        })
        it('user cannot edit/delete not his product', function () {
            User.isModerator = function () {
                return false;
            }
            User.getUserName = function () {
                return 'vas';
            }
            expect(scope.canDelete({owner: 'not vas'})).toBe(false)
        })
    })

    describe('new product controller: ', function () {
        var scope;
        var NewProductController
        var User;
        var redirect;

        beforeEach(module("hiking_food"))

        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            User = {};
            redirect = null;
            NewProductController = $controller('NewProductController', {
                $scope: scope,
                Product: function () {
                    return this;
                },
                User: User,
                $location: {
                    path: function (where) {
                        redirect = where;
                    }
                },
                Urls: Urls
            })
        }))

        it('controller and product should be defined', function () {
            expect(NewProductController).toBeDefined();
            expect(scope.product).toBeDefined();
            expect(scope.remove).toBeUndefined();
        })
        it('on save product.owner should be set to current user name, resource $save should be called, ' +
            'redirect to home page occurs', function () {
            User.getUserName = function () {
                return 'vas';
            }
            var saveCalled;
            scope.product.$save = function (callback) {
                saveCalled = true;
                callback();
            }
            expect(scope.product.owner).toBeUndefined();
            scope.save();
            expect(saveCalled).toBeTruthy();
            expect(redirect).toBe('/products');
        })


    })
})