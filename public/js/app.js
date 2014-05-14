define(
    [
        'angular',
        'angular-route',
        './services/index',
        './controllers/index',
        './localization/localization',
        './directives/index',
        'ui.bootstrap'
    ], function (ng) {
        return ng.module('hiking_food', [
            'hiking_food.services', 'hiking_food.controllers', 'hiking_food.directives',
            'localization', 'ui.bootstrap', 'ngRoute'
        ]);
    }
);
