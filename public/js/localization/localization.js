define(['angular', './translations/productTranslations', './translations/generalTranslations', './translations/recipeTranslations'], function (ng) {
    'use strict';
    var localization = ng.module('localization', ['translations']);

    var language = 'ru';

    localization.directive('lang', function () {
        return {
            scope: true,
            template: "<img src='images/localization/usa.jpeg' ng-click='switchLang($event)' class='switch-lang'>",
            link: function ($scope) {
                $scope.switchLang = function(e) {
                    if (language === 'ru') {
                        language = 'en';
                        e.srcElement.src = 'images/localization/rus.jpeg'
                    } else {
                        language = 'ru';
                        e.srcElement.src = 'images/localization/usa.jpeg'
                    }
                }
            }
        }
    });

    localization.filter("localize", function (productTranslations, generalTranslations, recipeTranslations) {
        var t = {};
        ng.forEach([productTranslations, recipeTranslations, generalTranslations], function (item) {
            for (var prop in item) {
                t[prop] = item[prop];
            }
        });
        return function (text) {
            var translation = t[text] || {
                'ru': "no translation for " + text,
                'en': "no translation for " + text
            };
            return translation[language];
        }
    });
    //        var translations = {};
//        ng.each([productTranslationFactory], function(item) {
//            for (var prop in item) {
//                translations[prop] = item[prop];
//            }
//        });
//        $scope.language = 'ru';
//        return function(text) {
//            return translations.new_product[$scope.language];
//        }

    return  localization;
})

