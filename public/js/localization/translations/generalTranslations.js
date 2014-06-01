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
                "ru": "Изменить"
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
            }, "required": {
                "en": "Required",
                "ru": "Обязательное поле"
            }, "max length warn": {
                "en": "Maximum length for this field is",
                "ru": "Максимальная допустимая длина для этого поля:"
            }, "amount": {
                "en": "Amount",
                "ru": "Количество"
            }, "add": {
                "en": "Add",
                "ru": "Добавить"
            }, "close": {
                "en": "Close",
                "ru": "Закрыть"
            }, "ccal": {
                "en": "ccal",
                "ru": "ккал"
            }, "gram": {
                "en": "gram",
                "ru": "грам"
            }, "bad-float": {
                "en": "Invalid number",
                "ru": "Введите число"
            }, "weight": {
                "en": "Weight",
                "ru": "Вес"
            }, "min-bound-0": {
                "ru": "Минимальное допустимое значение 0",
                "en": "Minimum value is 0"
            }, "max-bound-10000": {
                "en": "Maximum value is 10000",
                "ru": "Максимальное допустимое значение 10000"
            }, "Action": {
                "en": "Action",
                "ru": "Действие"
            }
        }
    });
    return module;
})