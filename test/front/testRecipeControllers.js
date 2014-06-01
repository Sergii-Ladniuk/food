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
                return {
                    then: function(callback) {
                        callback();
                    }
                }
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
        it('should be not marked submitted after init', function () {
            scope.recipeForm = {
                $invalid: false
            };
            expect(scope.submitted).toBeUndefined();
        })
        it('should be marked submitted after beforeSubmit()', function () {
            scope.recipeForm = {
                $invalid: false
            };
            scope.beforeSubmit();
            scope.save();
            expect(scope.submitted).toBeTruthy();
            expect(scope.editItemVisible).toBeFalsy();
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
        it('search should call service, return a promise, store results in scope.products in map (title, product)', function () {
            var f;
            ProductService.search = function (title, q, size, clb) {
                f = clb;
                clb([
                    {title: 'q'}
                ])
            }
            var data = [
                {
                    title: 'qwe',
                    calories: 100
                },
                {
                    title: 'asd',
                    calories: 12345
                }
            ];
            var promise = jasmine.createSpyObj('Promise', ['then']);
            promise.then.andCallFake(function (callback) {
                callback(data);
            })
            spyOn(ProductService, 'search').andReturn(promise);
            var result = scope.searchProduct('asd');
            expect(result).toBe(promise);
            expect(scope.products['qwe'].calories).toBe(100);
            expect(scope.products['asd'].calories).toBe(12345);
        })
        it('should enable enter new item', function () {
            expect(scope.editItemVisible).toBeUndefined();
            scope.showEditItemPanel();
            expect(scope.editItemVisible).toBeTruthy();
            expect(scope.newItem).toBeDefined();
            expect(scope.newItem).toNotBe(null);
        })
        it('should enable enter new item', function () {
            scope.editItemVisible = false;
            scope.hideEditItemPanel();
            expect(scope.editItemVisible).toBeFalsy();
            expect(scope.newItem).toBe(null);
        })
        describe('#submitNewItem', function () {
            beforeEach(function () {
                $('body').append($('<input id="new-item-title" value="qwe"/>'));

                scope.newItemForm = {};
                scope.newItemForm.itemTitle = {};
                scope.newItemForm.itemAmount = {};
                scope.newItemForm.itemTitle.$valid = true;
                scope.newItemForm.itemAmount.$valid = true;
                scope.recipe.items = [];
                scope.products = {
                    'qwe': {
                        title: 'qwe',
                        calories: 12,
                        fats: 10,
                        proteins: 123,
                        carbs: 1
                    }
                }
                var newItem = {
                    title: 'qwe-modified',
                    product: 'qwe-modified',
                    amount: 1500,
                    calories: 12
                };
                scope.newItem = newItem;
            })
            afterEach(function () {
                $('#new-item-title').remove();
            })
            it('should reset newItem when submit new item', function () {
                scope.submitNewItem();
                expect(scope.newItem.title).toBeUndefined();
            })
            it('should take title from DOM by jquery', function () {
                scope.submitNewItem();
                expect(scope.recipe.items[0].title).toBe('qwe');
            })
            it('should copy amount', function () {
                scope.submitNewItem();
                expect(scope.recipe.items[0].amount).toBe(1500);
            })
            it('should copy nutrition facts', function () {
                scope.submitNewItem();
                expect(scope.recipe.items[0].proteins).toBe(123);
                expect(scope.recipe.items[0].fats).toBe(10);
                expect(scope.recipe.items[0].carbs).toBe(1);
                expect(scope.recipe.items[0].calories).toBe(12);
            })
            it('should not copy _id', function () {
                scope.submitNewItem();
                expect(scope.recipe.items[0]._id).toBeUndefined();
            })
            it('should call #addItem', function () {
                spyOn(scope, 'addItem').andCallThrough();
                scope.submitNewItem();
                expect(scope.addItem).toHaveBeenCalled();
            })
            it('should validate title when submit new item', function () {
                scope.products = {};
                var newItem = {};
                scope.newItem = newItem;
                spyOn(scope, 'addItem').andCallThrough();
                scope.submitNewItem();
                expect(scope.addItem).wasNotCalled();
            })
            it('should validate amount when submit new item', function () {
                scope.newItemForm.itemAmount.$valid = false;
                scope.recipe.items = [];
                var newItem = {};
                scope.newItem = newItem;
                spyOn(scope, 'addItem').andCallThrough();
                scope.submitNewItem();
                expect(scope.addItem).wasNotCalled();
            })
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
                spyOn(RecipeService, 'save').andCallThrough();
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
            carbs: 30,
            amount: 100
        }
        var items3 = function () {
            return[
                firstItem,
                {
                    calories: 123.4,
                    fats: 0,
                    proteins: 10,
                    carbs: 20,
                    amount: 100
                },
                {
                    calories: 123.4,
                    fats: 20,
                    proteins: 40,
                    carbs: 50,
                    amount: 100
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
                    carbs: 30,
                    amount: 100
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
            expect(scope.recipe.weight).toBe(0);
        })
        it('should properly calculate according to amount for one item', function () {
            scope.recipe.items = [
                {
                    calories: 100,
                    fats: 1000,
                    proteins: 20,
                    carbs: 50,
                    amount: 20
                }
            ];
            scope.calculate();
            expect(scope.recipe.calories).toBe(20);
            expect(scope.recipe.fats).toBe(200);
            expect(scope.recipe.proteins).toBe(4);
            expect(scope.recipe.carbs).toBe(10);
        })
        it('should properly calculate according to amount for several items', function () {
            scope.recipe.items = [
                {
                    calories: 100,
                    fats: 1000,
                    proteins: 20,
                    carbs: 50,
                    amount: 20
                },
                {
                    calories: 1,
                    fats: 20,
                    proteins: 5,
                    carbs: 2,
                    amount: 50
                }
            ];
            scope.calculate();
            expect(scope.recipe.calories).toBe(20.5);
            expect(scope.recipe.fats).toBe(210);
            expect(scope.recipe.proteins).toBe(6.5);
            expect(scope.recipe.carbs).toBe(11);
        })
        it('should properly calculate total weight', function () {
            scope.recipe.items = [
                {
                    calories: 100,
                    fats: 1000,
                    proteins: 20,
                    carbs: 50,
                    amount: 20
                },
                {
                    calories: 1,
                    fats: 20,
                    proteins: 5,
                    carbs: 2,
                    amount: 50
                }
            ];
            scope.calculate();
            expect(scope.recipe.weight).toBe(70);
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
                    carbs: 1,
                    amount: 100
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
                    carbs: 1,
                    amount: 100
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

    describe('recipe list controller', function () {
        var me = this;
        beforeEach(function () {
            me.User = jasmine.createSpyObj('User', ['getUserName', 'isModerator']);
            module("hiking_food")
            module(function ($provide) {
                $provide.value('User', me.User)
            })
            inject(function ($rootScope, $controller, $q, _$timeout_) {
                me.scope = $rootScope.$new();
                me.RecipeService = jasmine.createSpyObj('RecipeService', ['getPage', 'totalCount']);
                me.RecipeService.getPage.andReturn($q.when({page: "dummy"}));
                me.RecipeService.totalCount.andReturn($q.when({count: 18}));
                me.timeout = _$timeout_;

                me.RecipeListController = $controller('RecipeListController', {
                    $scope: me.scope,
                    RecipeService: me.RecipeService
                })
            })
        })
        it('should have default page size', function () {
            expect(me.scope.pageSize).toBe(20);
        })
        it('should have default max page count', function () {
            expect(me.scope.maxPageCount).toBe(5);
        })
        it('should call service total count', function () {
            expect(me.RecipeService.totalCount).toHaveBeenCalled();
            me.timeout.flush();
            expect(me.scope.totalCount).toBe(18);
        })
        it('should call service.getPage on init', function () {
            expect(me.RecipeService.getPage).toHaveBeenCalledWith(1, 20);
            me.timeout.flush();
            expect(me.scope.recipes.page).toBe('dummy');
        })
        it('should call service.getPage on page selected', function () {
            me.scope.pageSelected(3);
            expect(me.RecipeService.getPage).toHaveBeenCalledWith(3, 20);
        })
        it('should call isModerator and getUserName on can edit', function () {
            me.scope.canEdit({owner: 'u'});
            expect(me.User.isModerator).toHaveBeenCalled();
            expect(me.User.getUserName).toHaveBeenCalled();
        })
        it('should call isModerator and getUserName on can delete', function () {
            me.scope.canDelete({owner: 'u'});
            expect(me.User.isModerator).toHaveBeenCalled();
            expect(me.User.getUserName).toHaveBeenCalled();
        })
        it('should define user, user.getUserName as it is used in UI', function() {
            expect(me.scope.user).toBeDefined();
            expect(typeof me.scope.user.getUserName).toBe('function');
        })
    })
})
