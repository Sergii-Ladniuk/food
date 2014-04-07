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
            }, "home": {
                "en": "Home",
                "ru": "Главная"
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
            }, "yes": {
                "en": "Yes",
                "ru": "Да"
            }, "no": {
                "en": "No",
                "ru": "Нет"
            }
        }
    });
    return module;
})