define(['angular', './translationModule'], function (ng, module) {
    'use strict';
    module.factory('productTranslations', function () {
        return {
            "New Product": {
                "en": "New Product",
                "ru": "Новый продукт"
            }, "calories": {
                "en": "Calories",
                "ru": "Калории"
            }, "proteins": {
                "en": "Proteins",
                "ru": "Белки"
            }, "fats": {
                "en": "Fats",
                "ru": "Жиры"
            }, "carbs": {
                "en": "Carbs",
                "ru": "Углеводы"
            }, "portion": {
                "en": "Portion",
                "ru": "Порция"
            }, "kg": {
                "en": "kg",
                "ru": ""
            }, "Edit Product": {
                "en": "Edit Product",
                "ru": "Редактирование продукта"
            }
        }
    });
    return module;
})