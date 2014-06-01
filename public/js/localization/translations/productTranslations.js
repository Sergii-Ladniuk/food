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
            }, "Delete Product Warning": {
                "en": "Do you really want to remove the product",
                "ru": "Вы действительно хотите удалить продукт"
            }, "Product Name Help Block": {
                "en": "Name of product should be meaningful and unique within the system.",
                "ru": "Имя продукта должно быть понятным и уникальным в рамках данной системы."
            }, "Portion Help Block": {
                "en": "A portion of the product, which contains the specified number of calories, proteins, etc. Units are specified next.",
                "ru": "Размер порции, которая содержит указанное выше количество калорий, протеинов. Единица измерения будет указана далее."
            }, "Portion Unit Help Block": {
                "en": "A unit to measure a portion. E.g. gram, litres, items",
                "ru": "Единица измерения порции. Например, грамм, литр, штука."
            }, "Product Description Placeholder": {
                "en": "Provide some information about the product...",
                "ru": "Предоставьте, пожалуйста, информацию о данном продукте..."
            }, "Per 100g": {
                "en": "Nutrition Facts per 100g",
                "ru": "Пищевая ценность на 100 грамм"
            },
            "login-warn-products" : {
                "en": "Please login to access create your own products!",
                "ru": "Пожалуйста, войдите в систему, чтобы создавать свои собственные продукты"
            }
        }
    });
    return module;
})