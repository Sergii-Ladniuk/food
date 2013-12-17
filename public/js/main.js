require.config({
    paths: {
        'domReady': '../components/requirejs-domready/domReady',
        'angular': '../components/angular/angular',
        'angular-resource' : '/components/angular-resource/angular-resource'
    },
    shim: {
        'angular': {
            exports: 'angular'
        }
    },
    deps: ['./bootstrap']
});