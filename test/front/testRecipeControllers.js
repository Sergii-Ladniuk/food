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

    var User;
    var emptyRecipe;
    var loadedRecipe;
    var RecipeService;
    var ProductService;
    var scope;
    var targetId = "12345";

    function location(me) {
        return {
            path: function (url) {
                me.redirect = url;
            }
        }
    }

    function createRoute() {
        return {
            current: {
                params: {
                    recipeId: targetId
                }
            }
        }
    }

    function createRecipeService(me) {
        return {
            create: function () {
                me.createCalled = true;
                return emptyRecipe;
            }, load: function (id) {
                me.loadCalled = true;
                me.loadedId = id;
                return {
                    then: function (callback) {
                        callback(loadedRecipe);
                    }
                }
            }, delete: function (id) {

            }, save: function (recipe) {

            }
        };
    }

    function createUser() {
        return {
            getUserName: function () {
                return "vvv";
            }
        };
    }

    function editRecipeCommon(me) {
        it('should define save', function () {
            expect(typeof scope.save).toBe('function');
        })
        it('should define delete', function () {
            expect(typeof scope.save).toBe('function');
        })
        it('should define cancel', function () {
            expect(typeof scope.cancel).toBe('function');
        })
        it('cancel should redirect to /recipes', function () {
            scope.cancel();
            expect(me.redirect).toBe('/recipes');
        })
        it('search should call service', function () {
            var f;
            ProductService.search = function (title, q, size, clb) {
                f = clb;
                clb([
                    {title: 'q'}
                ])
            }
            spyOn(ProductService, 'search').andCallThrough();
            scope.searchProduct('asd');
            expect(ProductService.search).toHaveBeenCalledWith('title', 'asd', 10, f);
            expect(scope.products[0].title).toBe('q');
        })
        describe('form valid', function () {
            beforeEach(function () {
                scope.recipeForm = {
                    $invalid: false
                };
            })
            it('delete should redirect to /recipes', function () {
                scope.delete();
                expect(me.redirect).toBe('/recipes');
            })
            it('save should redirect to /recipes', function () {
                scope.delete();
                expect(me.redirect).toBe('/recipes');
            })
            it('save should call service', function () {
                scope.recipe = {_id: 'asd'};
                spyOn(RecipeService, 'save');
                scope.save();
                expect(RecipeService.save).toHaveBeenCalledWith(scope.recipe);
            })
        })
        describe('form invalid', function () {
            beforeEach(function () {
                scope.recipeForm = {
                    $invalid: true
                };
            })
            it('save should not call service', function () {
                spyOn(RecipeService, 'save');
                scope.save();
                expect(RecipeService.save).wasNotCalled();
            })
            it('save should not call service', function () {
                scope.save();
                expect(me.redirect).toBeUndefined;
            })
        })
    }

    describe('new recipe controller: ', function () {

        var NewRecipeController;
        var EditRecipeController;
        var me = this;

        beforeEach(module("hiking_food"))

        beforeEach(inject(function ($rootScope, $controller, Urls) {
            scope = $rootScope.$new();
            User = createUser();
            emptyRecipe = {};
            loadedRecipe = {title: 'soup'};
            RecipeService = createRecipeService(me);
            ProductService = {};
            NewRecipeController = $controller('EditRecipeController', {
                $scope: scope,
                RecipeService: RecipeService,
                User: User,
                isNew: true,
                Urls: Urls,
                $location: location(me),
                ProductService: ProductService
            })
        }))

        it('should exists NewRecipeController', function () {
            expect(NewRecipeController).toBeDefined();
        })
        it('should be create an empty recipe', function () {
            expect(scope.recipe).toBe(emptyRecipe);
        })
        it('should call create', function () {
            expect(me.createCalled).toBeTruthy();
        })
        it('delete should not call service', function () {
            spyOn(RecipeService, 'delete');
            scope.recipe._id = 'qwe';
            scope.delete();
            expect(RecipeService.delete).wasNotCalled();
        })
        it('save should set owner', function () {
            var user = "vas";
            var recipe = {title: "asdsadad"};
            scope.recipeForm = {$invalid: false};
            User.getUserName = function () {
                return user;
            };
            scope.recipe = recipe;
            scope.save();
            expect(recipe.owner).toBe(user);
        })
        it('save should call getUserName', function () {
            scope.recipeForm = {$invalid: false};
            spyOn(User, 'getUserName');
            scope.save();
            expect(User.getUserName).toHaveBeenCalled();
        })
        it('should be able to add item', function () {
            scope.addItem('item1');
            scope.addItem('item2');
            expect(scope.recipe.items.length).toBe(2);
            expect(scope.recipe.items[0]).toBe('item1');
            expect(scope.recipe.items[1]).toBe('item2');
        })
        it('should be able to remove item', function () {
            var i1 = 'item1';
            var i2 = 'item2';
            scope.addItem(i1);
            scope.addItem(i2);
            scope.removeItem(i1);
            expect(scope.recipe.items.length).toBe(1);
            expect(scope.recipe.items[0]).toBe(i2);
            scope.removeItem(i2);
            expect(scope.recipe.items.length).toBe(0);
        })

        var firstItem = {
            calories: 123.4,
            fats: 10,
            proteins: 20,
            carbs: 30
        }
        var items3 = function () {
            return[
                firstItem,
                {
                    calories: 123.4,
                    fats: 0,
                    proteins: 10,
                    carbs: 20
                },
                {
                    calories: 123.4,
                    fats: 20,
                    proteins: 40,
                    carbs: 50
                }
            ]
        }

        it('should be able to automatically calculate nutrition facts about recipe', function () {
            scope.recipe.items = items3();
            scope.calculate();
            expect(scope.recipe.calories).toBe(123.4 * 3);
            expect(scope.recipe.fats).toBe(30);
            expect(scope.recipe.proteins).toBe(70);
            expect(scope.recipe.carbs).toBe(100);
        })
        it('should be calculate nutrition facts correctly when called several times', function () {
            scope.recipe.items = items3();
            scope.calculate();
            scope.calculate();
            expect(scope.recipe.calories).toBe(123.4 * 3);
            expect(scope.recipe.fats).toBe(30);
            expect(scope.recipe.proteins).toBe(70);
            expect(scope.recipe.carbs).toBe(100);
        })
        it('should be able to automatically calculate nutrition facts about recipe with one item', function () {
            scope.recipe.items = [
                {
                    calories: 123.4,
                    fats: 10,
                    proteins: 20,
                    carbs: 30
                }
            ];
            scope.calculate();
            expect(scope.recipe.calories).toBe(123.4);
            expect(scope.recipe.fats).toBe(10);
            expect(scope.recipe.proteins).toBe(20);
            expect(scope.recipe.carbs).toBe(30);
        })
        it('should be able to automatically calculate nutrition facts about recipe with no items', function () {
            scope.recipe.items = [];
            scope.calculate();
            expect(scope.recipe.calories).toBe(0);
            expect(scope.recipe.fats).toBe(0);
            expect(scope.recipe.proteins).toBe(0);
            expect(scope.recipe.carbs).toBe(0);
        })
        describe('auto-calculate on', function () {
            beforeEach(function () {
                scope.recipe.autocalc = true;
                scope.recipe.items = items3();
                scope.calculate();
            })
            it('should calculate nutrition facts on adding', function () {
                scope.addItem({
                    calories: 123.4,
                    fats: 1,
                    proteins: 1,
                    carbs: 1
                });
                expect(scope.recipe.calories).toBe(123.4 * 4);
                expect(scope.recipe.fats).toBe(31);
                expect(scope.recipe.proteins).toBe(71);
                expect(scope.recipe.carbs).toBe(101);
            })
            it('should calculate nutrition facts on removal', function () {
                scope.removeItem(firstItem);
                expect(scope.recipe.calories).toBe(123.4 * 2);
                expect(scope.recipe.fats).toBe(20);
                expect(scope.recipe.proteins).toBe(50);
                expect(scope.recipe.carbs).toBe(70);
            })
        })
        describe('auto-calculate off', function () {
            beforeEach(function () {
                scope.recipe.autocalc = false;
                scope.recipe.items = items3();
                scope.calculate();
            })
            it('should calculate nutrition facts on adding', function () {
                scope.addItem({
                    calories: 123.4,
                    fats: 1,
                    proteins: 1,
                    carbs: 1
                });
                expect(scope.recipe.calories).toBe(123.4 * 3);
                expect(scope.recipe.fats).toBe(30);
                expect(scope.recipe.proteins).toBe(70);
                expect(scope.recipe.carbs).toBe(100);
            })
            it('should calculate nutrition facts on removal', function () {
                scope.removeItem(firstItem);
                expect(scope.recipe.calories).toBe(123.4 * 3);
                expect(scope.recipe.fats).toBe(30);
                expect(scope.recipe.proteins).toBe(70);
                expect(scope.recipe.carbs).toBe(100);
            })
        })
        editRecipeCommon(me);
    })

    describe('edit existing recipe controller: ', function () {

        var NewRecipeController;
        var EditRecipeController;
        var me = this;

        beforeEach(module("hiking_food"))

        beforeEach(inject(function ($rootScope, $controller, Urls) {
            scope = $rootScope.$new();
            User = {};
            emptyRecipe = {};
            RecipeService = createRecipeService(me);
            ProductService = {}
            EditRecipeController = $controller('EditRecipeController', {
                $scope: scope,
                RecipeService: RecipeService,
                User: User,
                isNew: false,
                $route: createRoute(),
                Urls: Urls,
                $location: location(me),
                ProductService: ProductService
            })
        }))

        it('should exists EditRecipeController', function () {
            expect(EditRecipeController).toBeDefined();
        })
        it('should be create an loaded recipe', function () {
            expect(scope.recipe).toBe(loadedRecipe);
        })
        it('should call load', function () {
            expect(me.loadCalled).toBeTruthy();
        })
        it('should call load with correct id param', function () {
            expect(me.loadedId).toBe(targetId);
        })
        it('delete should call service', function () {
            spyOn(RecipeService, 'delete');
            scope.recipe._id = 'qwe';
            scope.delete();
            expect(RecipeService.delete).toHaveBeenCalledWith('qwe');
        })
        editRecipeCommon(me);
    })
})
