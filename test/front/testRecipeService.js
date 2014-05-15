define([
    'angular',
    'angular-resource',
    'angular-route',
    'angular-mocks',
    'ui.bootstrap',
    'app'
], function (angular, mocks, app) {
    'use strict';
    describe('recipe service', function () {
        var me = this;
        beforeEach(module("hiking_food"))
        beforeEach(inject(function ($httpBackend, RecipeService) {
            me.RecipeService = RecipeService;
            me.httpBackend = $httpBackend;
        }))
        afterEach(function () {
            me.httpBackend.verifyNoOutstandingExpectation();
            me.httpBackend.verifyNoOutstandingRequest();
        })
        it('should create a recipe', function () {
            expect(me.RecipeService.create()).toBeDefined();
        })
        it('should load a recipe by GET /recipes/:id', function () {
            me.httpBackend.expectGET('/recipes/soup_id').respond({title: 'soup'});
            me.RecipeService.load('soup_id').then(function (data) {
                expect(data.title).toBe('soup');
            });
            me.httpBackend.flush();
        })
        it('should save a recipe by POST /recipes/:id', function () {
            var data = me.RecipeService.create();
            me.httpBackend.expectPOST('/recipes', data).respond({status: 'ok'});
            me.RecipeService
                .save(data)
                .then(function (answer) {
                    expect(answer.status).toBe('ok');
                });
            me.httpBackend.flush();
        })
        it('should delete a recipe by DELETE /recipes/:id', function () {
            var data = me.RecipeService.create();
            data._id = "some_id";
            me.httpBackend.expectDELETE('/recipes/some_id').respond({status: 'ok'});
            me.RecipeService
                .delete(data)
                .then(function (answer) {
                    expect(answer.status).toBe('ok');
                });
            me.httpBackend.flush();
        })
    })
})