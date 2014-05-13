module.exports = function (config) {
    config.set({

        basePath: '../',

        files: [
            {pattern: 'public/components/**/*.js', watched: false, included: false},
            {pattern: 'public/js/**/*.js', watched: true, included: false},
            {pattern: 'public/components/requirejs/require.js', watched: false, included: true},
            {pattern: 'test/front/main-test.js', watched: true, included: true},
            {pattern: 'test/front/**/test*.js', watched: true, included: false}
        ],

        autoWatch: true,

        frameworks: ['jasmine', 'requirejs'],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-requirejs'
        ],

        singleRun: false
    });
};