define([
    'angular',
    'angular-resource',
    'angular-route',
    'angular-mocks',
    'ui.bootstrap',
    'app'
], function (angular, mocks, app) {
    'use strict';
    describe('product service', function () {
        var me = this;
        beforeEach(module("hiking_food"))
        beforeEach(inject(function ($httpBackend, ProductService) {
            me.ProductService = ProductService;
            me.httpBackend = $httpBackend;
        }))

        afterEach(function () {
            me.httpBackend.verifyNoOutstandingExpectation();
            me.httpBackend.verifyNoOutstandingRequest();
        })

        it('should call correct url on search', function () {
            var answer = [
                {title: 'qwertyuiop'}
            ];
            me.httpBackend.expectGET('/products?column=title&desired=10&pageNumber=1&pageSize=10&q=qwerty').respond(answer);
            me.ProductService.search('title', 'qwerty', 10).then(function (data) {
                expect(data[0].title).toBe(answer[0].title);
            })
            me.httpBackend.flush();
        })
        it('should call correct url on search with page number', function () {
            var answer = [
                {title: 'qwertyuiop'}
            ];
            me.httpBackend.expectGET('/products?column=title&desired=10&pageNumber=5&pageSize=10&q=qwerty').respond(answer);
            me.ProductService.search('title', 'qwerty', 10, 5).then(function (data) {
                expect(data[0].title).toBe(answer[0].title);
            })
            me.httpBackend.flush();
        })
        it('should call correct url on getPage', function () {
            var answer = [
                {title: 'qwertyuiop'}
            ];
            me.httpBackend.expectGET('/products?pageNumber=3&pageSize=10').respond(answer);
            me.ProductService.getPage(3, 10).then(function (data) {
                expect(data[0].title).toBe(answer[0].title);
            })
            me.httpBackend.flush();
        })
        it('should call correct url on list', function () {
            var answer = [
                {title: 'qwertyuiop'}
            ];
            me.httpBackend.expectGET('/products').respond(answer);
            me.ProductService.list().then(function (data) {
                expect(data[0].title).toBe(answer[0].title);
            })
            me.httpBackend.flush();
        })
    })
})