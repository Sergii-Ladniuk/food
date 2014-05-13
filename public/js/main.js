require.config({
    paths: {
        'domReady': '../components/requirejs-domready/domReady',
        'jQuery': '../components/jquery/dist/jquery.min',
        'angular': '../components/angular/angular',
        'angular-resource' : '../components/angular-resource/angular-resource',
        'angular-route' : '../components/angular-route/angular-route',
        'ui.bootstrap' : '../components/angular-bootstrap/ui-bootstrap-tpls.min'
    },
    shim: {
        'angular': {
            exports: 'angular',
            deps : ['jQuery']
        },
        'angular-resource': {
            deps: ['angular']
        },
        'angular-route': ['angular'],
        'jQuery': {
            'exports': 'jQuery'
        },
        'ui.bootstrap': { deps: ['angular'] }
    },
    deps: ['./bootstrap']
});