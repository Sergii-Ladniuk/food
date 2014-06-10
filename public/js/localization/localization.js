'use strict';
define(
    [
        'angular',
        './translations/productTranslations',
        './translations/generalTranslations',
        './translations/menuTranslations',
        './translations/recipeTranslations'
    ], function (ng) {

        var localization = ng.module('localization', ['translations']);

        var language = 'ru';

        localization.factory('LocalizationService', function(productTranslations, generalTranslations, recipeTranslations, menuTranslations) {
            var allTranslationsMap = {};
            ng.forEach([productTranslations, recipeTranslations, generalTranslations, menuTranslations], function (item) {
                for (var prop in item) {
                    allTranslationsMap[prop] = item[prop];
                }
            });
            return {
                getCurrentLanguage: function() {
                    return language;
                },
                getTranslation: function (text) {
                    var translation = allTranslationsMap[text] || {
                        'ru': "нет перевода для " + text,
                        'en': "no translation for " + text
                    };
                    return translation[language];
                }
            }
        })

        localization.directive('lang', function () {
            return {
                scope: true,
                template: "<img src='images/localization/usa.jpeg' ng-click='switchLang($event)' class='switch-lang'>",
                link: function ($scope) {
                    $scope.switchLang = function (e) {
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

        localization.filter("localize", function (LocalizationService) {
            return LocalizationService.getTranslation;
        });

        return  localization;
    })

