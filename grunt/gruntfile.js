module.exports = function(grunt) {
    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                seperator: ';'
            },
            dist : {
                src: ['../src/**/*.js'],
                dest: '../dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/* <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                mangle: false
            },
            dist: {
                files: {
                    '../dist/<%= pkg.name %>.min.js' : ['<%= concat.dist.dest %>']
                }
            }
        },
        jshint: {
            files: ['../src/**/*.js', '../test/**/*.spec.js']
        },
        karma : {
            unit: {
                configFile: '../test/karma.conf.js',
                singleRun: true
            }
        }
    });

    //Load NPM tasks 
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');
    //grunt.loadNpmTasks('grunt-concurrent');

    grunt.loadNpmTasks('grunt-contrib-concat');

    //Making grunt default to force in order not to break the project.
    grunt.option('force', true);

    //Default task(s).
    grunt.registerTask('default', ['jshint','concat','uglify']);

};