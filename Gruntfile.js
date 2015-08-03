var path = require('path');

module.exports = function (grunt) {

  grunt.initConfig({

    watch: {
      content: {
        files: [
          'components/**/*.js*',
          'app.js',
          'index.html',
          'main.js'
        ],
        tasks: ['browserify'],
        options: {
          livereload: true
        }
      },
      less: {
        files: 'less/**/*.less',
        tasks: ['less:dev'],
        options: {
          livereload: true
        }
      }
    },

    less: {
      dev: {
        files: {
          "app/app.css": "less/app.less"
        }
      },
      dist: {
        options: {
          compress: true
        },
        files: {
          "app/app.min.css": "less/app.less"
        }
      }
    },

    browserify: {
      options: {
        debug: true,
        transform: ['babelify']
      },
      app: {
        src: 'components/app.jsx',
        dest: 'app/app.js'
      }
    },

    uglify: {
      options: {
        mangle: true,
        sourceMap: true
      },
      app: {
        files: {
          'app/app.min.js': 'app/app.js'
        }
      }
    },

    react: {
      'extra-pages': {
        files: [
          {
          
          }
        ]
      }
    },

    electron: {
      osxBuild: {
        options: {
          name: 'IoT Editor',
          dir: 'app',
          out: 'dist',
          version: '0.30',
          platform: 'darwin',
          arch: 'x64'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-react');

  grunt.registerTask('default', [
    'less:dev',
    'browserify',
    'react'
  ]);

  grunt.registerTask('serve', [
    'less:dev',
    'browserify',
    'react',
    'watch'
  ]);

  grunt.registerTask('dist', [
    'less:dist',
    'browserify',
    'uglify',
    'react'
  ]);

  grunt.registerTask('modules', [
    'react'
  ]);

};
