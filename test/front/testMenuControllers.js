'use strict';

define([
    'angular',
    'angular-resource',
    'angular-route',
    'angular-mocks',
    'ui.bootstrap',
    'app'
], function (angular, mocks, app) {

    describe('new menu general step controller: ', function () {

        var scope,
            MenuGeneralStepController,
            service,
            store,
            user,
            form;

        beforeEach(module("hiking_food"))

        beforeEach(inject(function ($rootScope, $controller, MenuService, MenuStore) {
            scope = $rootScope.$new();
            form = jasmine.createSpyObj('menuForm', ['$invalid']);
            scope.menuForm = form;
            store = MenuStore,
                service = MenuService;
            user = jasmine.createSpyObj('User', ['getUserName']);
            user.getUserName.andReturn('menu owner user');
            spyOn(service, 'create').andCallThrough();
            MenuGeneralStepController = $controller('MenuGeneralStepController', {
                $scope: scope,
                isNew: true,
                User: user
            })
        }))

        it('should be defined', function () {
            expect(MenuGeneralStepController).toBeDefined()
        })

        it('should create a resource', function () {
            expect(service.create).toHaveBeenCalled();
            expect(scope.menu).toBeDefined();
        })

        it('should set user', function () {
            expect(scope.user).toBe(user);
        })

        it('should print meals', function () {
            scope.menu.mealNames = ['dinner', 'supper'];
            expect(scope.printMeals()).toBe('dinner, supper');
            scope.menu.mealNames = ['dinner'];
            expect(scope.printMeals()).toBe('dinner');
            scope.menu.mealNames = [];
            expect(scope.printMeals()).toBe('');
        })

        it('should set default meals', function () {
            expect(scope.menu.mealNames).toBeDefined();
            expect(scope.menu.mealNames.length).toBeGreaterThan(0);
        })

        it('should set owner for a new menu', function () {
            expect(scope.menu.owner).toBe('menu owner user');
        })

        it('#next() should not set menu in store when invalid', function () {
            form.$invalid = true;
            scope.next();
            expect(typeof store.getMenu()).toBe('undefined');
        })
        it('#next() should set menu in store when valid', function () {
            form.$invalid = false;
            scope.next();
            expect(store.getMenu()).toBeDefined();
        })
    })

    describe('edit menu general step controller: ', function () {

        var scope,
            MenuGeneralStepController,
            service,
            user;

        beforeEach(module("hiking_food"))

        beforeEach(inject(function ($rootScope, $controller, MenuService, User) {
            scope = $rootScope.$new();
            service = MenuService;
            user = User;
            spyOn(service, 'create').andCallThrough();
            MenuGeneralStepController = $controller('MenuGeneralStepController', {
                $scope: scope,
                isNew: false
            })
        }))

        it('should not create a resource', function () {
            expect(service.create).wasNotCalled();
        })

        it('should set nameMaxLength to 30', function () {
            expect(scope.nameMaxLength).toBe(30)
        })
    })

    describe('menu list controller', function () {
        var scope,
            MenuListController,
            service;

        beforeEach(module("hiking_food"))

        beforeEach(inject(function ($rootScope, $controller, MenuService) {
            scope = $rootScope.$new();
            service = MenuService;
            MenuListController = $controller('MenuListController', {
                $scope: scope
            })
        }))

        it('should be defined', function () {
            expect(MenuListController).toBeDefined();
        })

    })

    describe('menu day controller', function () {

        var scope,
            MenuDayController,
            service,
            day,
            store,
            menu = {
                mealNames: [ 'Завтрак', 'Перекус 1', 'Обед', 'Перекус 2', 'Ужин' ]
            };


        beforeEach(module("hiking_food"))

        beforeEach(inject(function ($rootScope, $controller, MenuService, MenuStore) {
            scope = $rootScope.$new();
            scope.testing = true;
            store = MenuStore;
            MenuStore.setMenu(menu);
            spyOn(store, 'getMenu').andCallThrough();
            service = MenuService;
            day = 4;
            MenuDayController = $controller('MenuDayController', {
                $scope: scope,
                day: day
            })
        }))

        it('should get menu from the service', function () {
            expect(store.getMenu).toHaveBeenCalled();
            expect(scope.menu).toBe(menu);
        })

        it('should set day because it is displayed in UI', function () {
            expect(scope.day).toBe(4);
        })

        it('should create days array', function () {
            expect(scope.menu.days).toBeDefined();
            expect(scope.menu.days.length).toBe(5);
        })

        it('addDish should create empty dishes array if not exists, and add an empty dish', function () {
            var meal = {};
            scope.addDish(meal);
            expect(meal.dishes.length).toBe(1);
            expect(meal.dishes[0].title).toBe('');
            scope.addDish(meal);
            expect(meal.dishes.length).toBe(2);
            expect(meal.dishes[0].title).toBe('');
            expect(meal.dishes[1].title).toBe('');
        })

        it('should create a default meals array with empty objects', function() {
            expect(scope.meals.length).toBe(5);
            expect(scope.meals[0].name).toBe('Завтрак');
            expect(scope.meals[1].name).toBe('Перекус 1');
        })

        it('should recalculate meal statistics about single meal', function () {
            scope.meals = [
                {
                    dishes: [
                        {
                            calories: 123.4,
                            fats: 0,
                            proteins: 10,
                            carbs: 20,
                            weight: 100
                        },
                        {
                            calories: 123.4,
                            fats: 20,
                            proteins: 40,
                            carbs: 50,
                            weight: 100
                        }
                    ]
                }
            ];
            scope.menu.memberNumber = 3;
            scope.recalculate(scope.meals[0]);
            expect(scope.mealStatistics[0]).toEqual({
                calories: 246.8,
                fats: 20,
                carbs: 70,
                proteins: 50,
                weigth: 600
            });
        })
    })
})