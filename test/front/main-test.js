require.config({
    paths: {
        'domReady': '../components/requirejs-domready/domReady',
        'jQuery': '../components/jquery/dist/jquery.min',
        'angular': '../components/angular/angular',
        'angular-resource': '../components/angular-resource/angular-resource',
        'angular-route' : '../components/angular-route/angular-route',
        'angular-mocks': '../components/angular-mocks/angular-mocks',
        'ui.bootstrap': '../components/angular-bootstrap/ui-bootstrap-tpls.min'
    },
    baseUrl: '/base/public/js',
    shim: {
        'angular': {
            exports: 'angular',
            deps: ['jQuery']
        },
        'angular-route': ['angular'],
        'angular-resource': {
            deps: ['angular']
        },
        'angular-mocks': {
            deps:['angular', 'angular-route', 'angular-resource'],
            'exports':'angular.mock'
        },
        'jQuery': {
            'exports': 'jQuery'
        },
        'ui.bootstrap': {
            deps: ['angular']
        }
    },
    deps: [
        'base/public/js/bootstrap.js',
        'base/test/front/testProductControllers.js',
        'base/test/front/testRecipeControllers.js',
        'base/test/front/testProductService.js'
    ],
    callback: window.__karma__.start
});