module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-karma');

    grunt.initConfig({
        shell: {
            options: {
                stdout: true
            },
            npm_install: {
                command: 'npm install'
            },
            bower_install: {
                command: './node_modules/.bin/bower install'
            }
        },

        server: {
            port: 3000,
            base: '.',
            background: true
        },

        open: {
            devserver: {
                path: 'http://localhost:3000'
            }
        },

        karma: {
            e2e: {
                configFile: './test/karma.e2e.config.js',
                autoWatch: true,
                singleRun: true
            },
            e2e_auto: {
                configFile: './test/karma.e2e.config.js'
            }
        },

        watch: {
            tasks: ['server']
        }
    });

    grunt.registerTask('server', function () {
        grunt.log.writeln('Started web server on port 3000');
        require('./app.js');//.listen(3000);
    });

    grunt.registerTask('test', ['connect:testserver',
//        'karma:unit','karma:midway',
        'karma:e2e']);
//    grunt.registerTask('test:unit', ['karma:unit']);
//    grunt.registerTask('test:midway', ['connect:testserver','karma:midway']);
    grunt.registerTask('test:e2e', ['server', 'karma:e2e']);

    //keeping these around for legacy use
//    grunt.registerTask('autotest', ['autotest:unit']);
//    grunt.registerTask('autotest:unit', ['connect:testserver','karma:unit_auto']);
//    grunt.registerTask('autotest:midway', ['connect:testserver','karma:midway_auto']);
    grunt.registerTask('autotest:e2e', ['connect:testserver', 'karma:e2e_auto']);

    //installation-related
    grunt.registerTask('install', ['shell:npm_install', 'shell:bower_install']);

    //defaults
    grunt.registerTask('default', ['dev']);

    //development
    grunt.registerTask('dev', ['install',
//        'concat',
        'connect:devserver', 'open:devserver', 'watch:assets']);

    //server daemon
    grunt.registerTask('serve', ['connect:webserver']);

};