'use strict';
define(['./directives'], function (directives) {
    directives
        .factory('SubmitService', function (User) {
            var submitted;
            var entity;
            return {
                setSubmitted: function (value) {
                    submitted = value;
                },
                isSubmitted: function () {
                    return submitted;
                }, setup: function ($scope) {
                    var me = this;
                    me.setSubmitted(false);
                    $scope.user = User;
                    $scope.beforeSubmit = function () {
                        me.setSubmitted(true);
                    }
                }, getEntity: function() {
                    return entity;
                }, setEntity: function(val) {
                    entity = val;
                }
            }
        })
        .directive('validationWarn', function (SubmitService, $timeout) {
            return {
                restrict: 'E',
                scope: true,
                template: "<div class='label label-danger' ng-repeat='error in errors' ng-show='showError(error)'>" +
                    "<span>{{error|localize}}</span> " +
                    "<span>{{bound(error)}}</span>" +
                    "</div>",
                link: function ($scope, elm, attrs) {

                    function init() {
                        var element = angular.element('#' + attrs.ctrl);
                        var ctrl = element.controller('ngModel');

                        if (!ctrl) {
                            $timeout(init);
                            return;
                        }

                        switch (attrs.target) {
                            case "number":
                                $scope.errors = ['required', 'bad-float', 'min-bound', 'max-bound'];
                                $scope.bound = function (error) {
                                    if (error.indexOf('max') != -1) {
                                        return element.attr('max');
                                    } else {
                                        if (error.indexOf('min') != -1) {
                                            return element.attr('min');
                                        } else {
                                            return '';
                                        }
                                    }
                                };
                                break;
                            case "text":
                                $scope.errors = ['required', 'maxlength'];
                                $scope.bound = function (error) {
                                    if (error.indexOf('maxlength') != -1) {
                                        return element.attr('ng-maxlength') || element.attr('maxlength') || '';
                                    } else {
                                        return '';
                                    }
                                };
                                break;
                            default:
                                console.log('validation-warn: invalid target!');
                                throw 'validation-warn: invalid target!';
                        }
                        $scope.showError = function (error) {
                            return (ctrl.$dirty || SubmitService.isSubmitted())
                                && ctrl.$error[error];
                        }
                    }

                    init();
                }
            }
        })
})