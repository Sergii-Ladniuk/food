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

    describe('validation-warn directive: ', function () {

        var submitService,
            directive;


        beforeEach(module("hiking_food"))

        beforeEach(
            inject(function ($rootScope, $controller, Urls, SubmitService) {
                submitService = SubmitService;
            })
        );

        it('should define SubmitService', function() {
            expect(submitService).toBeDefined();
        });

        it('should show maxlength error', function() {
//            $('body').append($('<input class="input-sm form-control" id="name" ng-maxlength="5"/>'));
//            $('body').append($('<validation-warn target="text" ctrl="name"></validation-warn>'));
//
//            $('#name').val('abcdef');
//            $('validation-warn ');
        })
    })
})