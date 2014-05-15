define([
    'angular',
    'angular-resource',
    'angular-route',
    'angular-mocks',
    'ui.bootstrap',
    'app'
], function (angular, mocks, app) {
    'use strict';
    describe('ProductService', function () {
        var me = this;
        beforeEach(module("hiking_food"))
        beforeEach(inject(function ($httpBackend, ProductService) {
            me.ProductService = ProductService;
            me.httpBackend = $httpBackend;
        }))

        afterEach(function() {
            me.httpBackend.verifyNoOutstandingExpectation();
            me.httpBackend.verifyNoOutstandingRequest();
        })

        it('ProductService calls correct url', function() {
            var answer = [
                {title: 'qwertyuiop'}
            ];
            me.httpBackend.expectGET('/products?column=title&pageNumber=1&pageSize=10&q=qwerty').respond(answer);
            me.ProductService.search('title', 'qwerty', 10, function(data) {
                expect(data[0].title).toBe(answer[0].title);
            })
            me.httpBackend.flush();
        })
    })
})