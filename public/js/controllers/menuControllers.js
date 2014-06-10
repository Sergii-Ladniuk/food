define(['./module', '../app', '../utils/utils'], function (controllers) {
    'use strict';

    controllers
        .factory('MenuStore', function (LocalObjectStorageService) {
            var key = 'menu';
            return {
                setMenu: function (val) {
                    LocalObjectStorageService.saveObject(key, val);
                }, getMenu: function () {
                    return LocalObjectStorageService.getObject(key);
                }
            }
        })

        .factory('MealStatisticsService', function () {
            var mealFacts = ['proteins', 'calories', 'carbs', 'fats', 'weight'];

            return {
                aggregateMealFacts: function (arr, personCount) {
                    var result = {};
                    mealFacts.forEach(function (p) {
                        result[p] = 0;
                    })
                    arr.forEach(function (item) {
                        mealFacts.forEach(function (p) {
                            if (p === 'weight') {
                                result[p] += item[p] * personCount;
                            } else {
                                result[p] += item[p];
                            }
                        })
                    })
                    return result;
                }
            }
        })

        .controller('MenuGeneralStepController', function ($scope, isNew, MenuService, MenuStore, User, SubmitService, LocalizationService, Urls) {
            SubmitService.setup($scope);
            if (isNew) {
                $scope.menu = MenuService.create();
                $scope.menu.owner = User.getUserName();
                $scope.menu.mealNames = LocalizationService.getTranslation('defaultMeals');
            }
            $scope.printMeals = function () {
                return $scope.menu.mealNames.join(', ');
            }
            $scope.user = User;
            $scope.nameMaxLength = 30;
            $scope.next = function () {
                if (!$scope.menuForm.$invalid) {
                    MenuStore.setMenu($scope.menu);
                    Urls.goMenuDay(0);
                }
            }
        })

        .controller('MenuDayController', function ($scope, SubmitService, MenuStore, day, MealStatisticsService, Urls) {
            SubmitService.setup($scope);
            $scope.day = day;
            // todo : handle menu undefined
            $scope.menu = MenuStore.getMenu();
            // todo : remove this hack
            if (!$scope.menu && !$scope.testing) {
                $scope.menu = {
                    owner: 'admin',
                    mealNames: [ 'Завтрак', 'Перекус 1', 'Обед', 'Перекус 2', 'Ужин' ],
                    title: 'qwe',
                    memberNumber: '1',
                    dayNumber: 3
                }
            }

            $scope.menu.days = $scope.menu.days || [];
            $scope.menu.days[day] = $scope.menu.days[day] || {};

            var currentDay = $scope.menu.days[day];

            currentDay.meals = currentDay.meals || (function convertMealsToObjectArray(meals) {
                if (meals.length > 0) {
                    return cons({ name: meals.head() }, convertMealsToObjectArray(meals.tail()))
                } else {
                    return [];
                }
            })($scope.menu.mealNames);

            $scope.meals = currentDay.meals;

            $scope.mealStatistics = [];

            $scope.recalculate = function (meal) {
                $scope.mealStatistics[$scope.meals.indexOf(meal)] =
                    MealStatisticsService.aggregateMealFacts(meal.dishes, $scope.menu.memberNumber);
                $scope.totalStatistics =
                    MealStatisticsService.aggregateMealFacts($scope.mealStatistics, $scope.menu.memberNumber);
            }

            $scope.review = function () {
                $scope.action = 'review';
                $scope.beforeSubmit();
            }

            $scope.next = function () {
                if ($scope.action === 'review') {
                    Urls.goMenuReview();
                } else {
                    MenuStore.setMenu($scope.menu);
                    Urls.goMenuDay(day + 1);
                }
            }
        })

        .controller('MealDishEntryController', function ($scope) {
            $scope.addDish = function (meal) {
                if (!meal.dishes) {
                    meal.dishes = [];
                }
                meal.dishes.push({title: ''})

            }
        })

        .controller('MenuReviewController', function ($scope, MenuStore, MenuService, MealStatisticsService) {
            $scope.menu = MenuStore.getMenu();

            if (!$scope.menu && !$scope.testing) {
                $scope.menu = {
                    owner: 'admin',
                    mealNames: [ 'Завтрак', 'Перекус 1', 'Обед', 'Перекус 2', 'Ужин' ],
                    days: [
                        {
                            dishes: [
                                {
                                    title: 'one',
                                    calories: 123.4,
                                    fats: 0,
                                    proteins: 10,
                                    carbs: 20,
                                    weight: 100
                                },
                                {
                                    title: 'two',
                                    calories: 123.4,
                                    fats: 20,
                                    proteins: 40,
                                    carbs: 50,
                                    weight: 200
                                }
                            ]
                        }
                    ],
                    title: 'qwe',
                    memberNumber: '1',
                    dayNumber: 3
                }
            }

            $scope.statisticsByDay = [];

            $scope.menu.days.forEach(function (day) {
                day.meals.forEach(function (meal) {
                    day.mealStatistics.push(MealStatisticsService.aggregateMealFacts(meal.dishes, $scope.menu.memberNumber));
                })
                $scope.statisticsByDay.push(MealStatisticsService.aggregateMealFacts(day.mealStatistics, $scope.menu.memberNumber));
            });

            $scope.totalMenuStatistics = MealStatisticsService.aggregateMealFacts($scope.statisticsByDay, $scope.menu.memberNumber);

        })

        .controller('MenuListController', function ($scope, User) {
            $scope.user = User;

        })
})
