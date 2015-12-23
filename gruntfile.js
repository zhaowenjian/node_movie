

module.exports = function(grunt){

    grunt.initConfig({

        watch: {
            jade: {
                files: ['app/views/**'],
                options: {
                    livereload: true
                }
            },
            js: {
                files: ['app/controllers/**/*.js',
                    'app/models/**/*.js',
                    'app/schemas/**/*.js',
                    'public/js/**/*.js'
                ],
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            css: {
                files: ['public/**/*.css'],
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            }
        },
        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    'public/build/index.css': 'public/less/index.less'
                }
            }
        },
        uglify: {
            development: {
                files: {
                    'public/build/admin.min.js': 'public/js/admin.js',
                    'public/build/detail.min.js': ['public/js/detail.js']
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                ignores: ['public/libs/**/*.js'],
            },
            all: ['public/js/*.js', 'app/**/*.js', 'test/**/*.js']
        },
        nodemon: {
            dev: {
                file: 'app.js',
                options: {
                    args: [],
                    watchedExtensions: ['js'],
                    watchedFolders: ['./'],
                    ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
                    debug: true,
                    env: {
                        PORT: 3000
                    },
                    delayTime: 1,
                    cwd: __dirname
                }
            }
        },
        concurrent: {
            tasks: ['nodemon','watch', 'less', 'uglify', 'jshint'],
            options: {
                logConcurrentOutput: true
            }
        }

    })

    grunt.loadNpmTasks("grunt-nodemon")
    grunt.loadNpmTasks("grunt-concurrent")
    grunt.loadNpmTasks("grunt-contrib-watch")
    grunt.loadNpmTasks("grunt-contrib-less")
    grunt.loadNpmTasks("grunt-contrib-uglify")
    grunt.loadNpmTasks("grunt-contrib-jshint")

    grunt.option('force', true)

    grunt.registerTask( 'default', ['concurrent'])

}