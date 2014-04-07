require.config({
    paths: {
        'domReady': '../components/requirejs-domready/domReady',
        'angular': '../components/angular/angular',
        'angular-resource' : '/components/angular-resource/angular-resource',
        'ui.bootstrap' : '../components/angular-bootstrap/ui-bootstrap-tpls.min'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'ui.bootstrap': { deps: ['angular'] }
    },
    deps: ['./bootstrap']
});