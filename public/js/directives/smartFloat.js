define(['./directives'], function (directives) {
    directives
        .directive('smartFloat', function () {
            var FLOAT_REGEXP = /^\-?\d+((\.|\,)\d+)?$/;
            return {
                require: 'ngModel',
                link: function ($scope, elm, attrs, ctrl) {
                    ctrl.$parsers.unshift(function (viewValue) {

                        function verifyBounds(value) {
                            if (value) {
                                if (attrs.min) {
                                    var min = parseFloat(attrs.min);
                                    ctrl.$setValidity('min-bound', value >= min);
                                }
                                if (attrs.max) {
                                    var max = parseFloat(attrs.max);
                                    ctrl.$setValidity('max-bound', value <= max);
                                }
                            }
                            return value;
                        }

                        function verifyFloat() {
                            if (FLOAT_REGEXP.test(viewValue)) {
                                ctrl.$setValidity('float', true);
                                if (typeof viewValue === "number") {
                                    return viewValue;
                                } else {
                                    return parseFloat(viewValue.replace(',', '.'));
                                }
                            } else {
                                ctrl.$setValidity('float', false);
                                return undefined;
                            }
                        }

                        return verifyBounds(verifyFloat());
                    });
                }
            };
        });
});