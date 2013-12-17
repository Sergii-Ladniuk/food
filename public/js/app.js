define(
    [
        'angular',
        './services/index',
        './controllers/index',
        './localization/localization'
    ], function (ng) {
        return ng.module('hiking_food', ['hiking_food.services', 'hiking_food.controllers', 'localization']);
    }
);
