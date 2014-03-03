// Karma configuration
// Generated on Wed Dec 18 2013 22:14:31 GMT+0200 (EET)

module.exports = function (config) {
    config.set({

            // base path, that will be used to resolve files and exclude
            basePath: '..',


            // frameworks to use
//            frameworks: ['jasmine', 'requirejs', 'ng-scenario'],
            frameworks: ['ng-scenario'],


            // list of files / patterns to load in the browser
            files: [
//                './public/components/angular/*.js',
//                './public/components/angular-resource/*.js',
                './public/js/util/*.js',
//                './public/js/**/*.js',
                './test/e2e/**/*.js'
            ],


            // list of files to exclude
            exclude: [

            ],


            // test results reporter to use
            // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
            reporters: ['progress'],


            // web server port
            port: 9876,


            // enable / disable colors in the output (reporters and logs)
            colors: true,


            // level of logging
            // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
            logLevel: config.LOG_INFO,


            // enable / disable watching file and executing tests whenever any file changes
            autoWatch: false,


            // Start these browsers, currently available:
            // - Chrome
            // - ChromeCanary
            // - Firefox
            // - Opera (has to be installed with `npm install karma-opera-launcher`)
            // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
            // - PhantomJS
            // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
            browsers: ['Chrome'],

            proxies: {
                '/': 'http://localhost:3000/'
            },
            urlRoot: '/e2e/',


            // If browser does not capture in given timeout [ms], kill it
            captureTimeout: 60000,

            plugins: [
//                'karma-requirejs',
//                'karma-ng-html2js-preprocessor',
//                'karma-junit-reporter',
                'karma-chrome-launcher',
                'karma-firefox-launcher',
                'karma-phantomjs-launcher',
//                'karma-jasmine',
                'karma-ng-scenario'
            ],


            // Continuous Integration mode
            // if true, it capture browsers, run tests and exit
            singleRun: false
        }
    )
    ;
}
;

console.log("karma configured");
