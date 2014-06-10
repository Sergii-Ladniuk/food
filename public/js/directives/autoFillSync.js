'use strict';
define(['./directives'], function (directives) {
    directives.directive('autoFillSync', function ($timeout) {
        return {
            require: 'ngModel',
            link: function (scope, elem, attrs, ngModel) {
                var origVal = elem.val();
                $timeout(function f() {
                    var newVal = elem.val();
                    if (ngModel.$pristine && origVal !== newVal) {
                        ngModel.$setViewValue(newVal);
                        if (attrs.ngChange) {
                            attrs.ngChange();
                        }
                    }
                    $timeout(f, 500);
                }, 500);
            }
        }
    })
});