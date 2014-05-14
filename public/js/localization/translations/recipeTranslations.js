define(['angular', './translationModule'], function (ng, module) {
    'use strict';
    module.factory('recipeTranslations', function () {
        return {
            "Edit Recipe": {
                "en": "Edit Recipe",
                "ru": "Редактирование рецепта"
            }
        }
    });
    return module;
})