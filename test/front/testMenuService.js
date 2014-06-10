'use strict';

define([
    'angular',
    'angular-resource',
    'angular-route',
    'angular-mocks',
    'ui.bootstrap',
    'app'
], function (angular, mocks, app) {

    describe('meal statistics service: ', function () {

        var service;

        beforeEach(module("hiking_food"))
        beforeEach(inject(function (MealStatisticsService) {
            service = MealStatisticsService;
        }))

        it('should be defined', function() {
            expect(service).toBeDefined()
        })

        it('should properly calculate stuff', function() {
            expect(service.aggregateMealFacts([
                {
                    calories: 123.4,
                    fats: 0,
                    proteins: 10,
                    carbs: 20,
                    weight: 50
                },
                {
                    calories: 123.4,
                    fats: 20,
                    proteins: 40,
                    carbs: 50,
                    weight: 100
                }
            ], 2)).toEqual({
                calories: 246.8,
                fats: 20,
                carbs: 70,
                proteins: 50,
                weight: 300
            })
        })

    })
})
