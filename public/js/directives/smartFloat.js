define(['./directives'], function (directives) {
    directives
        .directive('smartFloat', function () {
            var FLOAT_REGEXP = /^\-?\d+((\.|\,)\d+)?$/;
            return {
                require: 'ngModel',
                link: function ($scope, elm, attrs, ctrl) {
                    ctrl.$parsers.unshift(function (viewValue) {
                        if (FLOAT_REGEXP.test(viewValue)) {
                            ctrl.$setValidity('float', true);
                            if (typeof viewValue === "number")
                                return viewValue;
                            else
                                return parseFloat(viewValue.replace(',', '.'));
                        } else {
                            ctrl.$setValidity('float', false);
                            return undefined;
                        }
                    });
                }
            };
        });
});