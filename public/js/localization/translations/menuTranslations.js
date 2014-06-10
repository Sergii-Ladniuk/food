define(['angular', './translationModule'], function (ng, module) {
    'use strict';
    module.factory('menuTranslations', function () {
        return {
            "menus": {
                "en": "Menu",
                "ru": "Походное меню"
            },
            "Edit Menu": {
                "en": "Edit Menu",
                "ru": "Редактирование меню"
            },
            "New Menu": {
                "en": "New Menu",
                "ru": "Создать меню"
            },
            "Delete Menu Warning": {
                "en": "Do you really want to remove the menu",
                "ru": "Вы действительно хотите удалить меню"
            },
            "Menu removal": {
                "en": "Removing Menu",
                "ru": "Удаление меню"
            },
            "login-warn-menus" : {
                "en": "Please login to access create your own recipes!",
                "ru": "Пожалуйста, войдите в систему, чтобы создавать свои собственные меню"
            }, 'memberNumber': {
                "en": "Members Number",
                "ru": "Количество участников"
            }, 'defaultMeals': {
                "en": ["Breakfast", "Snack 1", "Lunch", "Snack 2", "Supper"],
                "ru": ["Завтрак", "Перекус 1", "Обед", "Перекус 2", "Ужин"]
            }, "meals": {
                "en": "Meals",
                "ru": "Приемы пищи"
            }, "dayNumber": {
                "en": "Number of Days",
                "ru": "Количество дней"
            }, "day": {
                "en": "Day",
                "ru": "День"
            }, "of": {
                "en": "of",
                "ru": "из"
            }, "total": {
                "en": "total",
                "ru": "всего"
            }, "addMeal": {
                "en": "Add Meal",
                "ru": "Добавить блюдо"
            }, "totalForMeal": {
                "en": "Statistics for a Meal",
                "ru": "Статистика на прием пищи"
            }, "totalForDay": {
                "en": "Statistics for a Day",
                "ru": "Статистика за день"
            }
        }
    });
    return module;
})