define(['angular', './translationModule'], function (ng, module) {
    'use strict';
    module.factory('generalTranslations', function () {
        return {
            "welcome": {
                "en": "Welcome to Hiking Food!",
                "ru": "Добро пожаловать!"
            }, "products": {
                "en": "Products",
                "ru": "Продукты"
            }, "recipes": {
                "en": "Recipes",
                "ru": "Рецепты"
            }, "edit": {
                "en": "Edit",
                "ru": "Править"
            }, "remove": {
                "en": "Remove",
                "ru": "Удалить"
            }, "save": {
                "en": "Save",
                "ru": "Сохранить"
            }, "cancel": {
                "en": "Cancel",
                "ru": "Отменить"
            }, "title": {
                "en": "Title",
                "ru": "Название"
            }, "description": {
                "en": "Description",
                "ru": "Описание"
            }, "unit": {
                "en": "Unit",
                "ru": "Единица измерения"
            }
        }
    });
    return module;
})