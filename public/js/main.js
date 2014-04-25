require.config({
    paths: {
        'domReady': '../components/requirejs-domready/domReady',
        'jQuery': '../components/jquery/dist/jquery.min',
        'angular': '../components/angular/angular',
        'angular-resource' : '/components/angular-resource/angular-resource',
        'ui.bootstrap' : '../components/angular-bootstrap/ui-bootstrap-tpls.min'
    },
    shim: {
        'angular': {
            exports: 'angular',
            deps : ['jQuery']
        },
        'jQuery': {
            'exports': 'jQuery'
        },
        'ui.bootstrap': { deps: ['angular'] }
    },
    deps: ['./bootstrap']
});