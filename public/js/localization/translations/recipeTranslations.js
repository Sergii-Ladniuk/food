define(['angular', './translationModule'], function (ng, module) {
    'use strict';
    module.factory('recipeTranslations', function () {
        return {
            "Edit Recipe": {
                "en": "Edit Recipe",
                "ru": "Редактирование рецепта"
            },
            "New Item": {
                "en": "New Item",
                "ru": "Новый ингридиент"
            },
            "Add Item": {
                "en": "Add Item",
                "ru": "Добавить ингридиент"
            },
            "items": {
                "en": "Items",
                "ru": "Ингридиенты"
            },
            "Delete Recipe Warning": {
                "en": "Do you really want to remove the recipe",
                "ru": "Вы действительно хотите удалить рецепт"
            },
            "Recipe removal": {
                "en": "Removing recipe",
                "ru": "Удаление рецепта"
            },
            "login-warn-recipes" : {
                "en": "Please login to access create your own recipes!",
                "ru": "Пожалуйста, войдите в систему, чтобы создавать свои собственные рецепты"
            }
        }
    });
    return module;
})