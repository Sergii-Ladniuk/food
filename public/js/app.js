define(
    [
        'angular',
        'angular-route',
        './services/index',
        './controllers/index',
        './localization/localization',
        'ui.bootstrap'
    ], function (ng) {
        return ng.module('hiking_food', ['hiking_food.services', 'hiking_food.controllers', 'localization', 'ui.bootstrap', 'ngRoute']);
    }
);
