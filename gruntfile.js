'use strict';

module.exports = function (grunt) {

  // Show elapsed time after tasks run to visualize performance
  require('time-grunt')(grunt);
  // Load all Grunt tasks that are listed in package.json automagically
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // shell commands for use in Grunt tasks
    shell: {
      jekyllBuild: {
          command: 'jekyll build'
      },
      jekyllServe: {
          command: 'jekyll serve'
      }
    },

    // watch for files to change and run tasks when they do
    watch: {
      sass: {
        files: ['_assets/css/**/*.{scss,sass}'],
        tasks: ['sass', 'postcss']
      },
      javascript: {
        files: ['_assets/js/script.js'],
        tasks: ['uglify']
      }
    },

    // sass (libsass) config
    sass: {
      options: {
        sourceMap: true,
        relativeAssets: false,
        outputStyle: 'expanded',
        sassDir: '_assets/css',
        cssDir: '_site/css'
      },
      build: {
        files: [{
          expand: true,
          cwd: '_assets/css',
          src: ['**/*.{scss,sass}'],
          dest: '_site/css',
          ext: '.css'
        }]
      }
    },

    postcss: {
      options: {
        processors: [
          require('autoprefixer')({
            browsers: ['last 2 versions']
          })
        ]
      },
      dist: {
        src: '_site/css/main.css',
        dest: '_site/css/main.css'
      }
    },

    // run tasks in parallel
    concurrent: {
      serve: [
        'sass',
        'postcss',
        'uglify',
        'watch',
        'shell:jekyllServe'
      ],
      options: {
        logConcurrentOutput: true
      }
    },

    // contrib-uglify config
    uglify: {
      my_target: {
        files: {
          '_site/js/script.js': ['_assets/js/script.js']
        }
      }
    }

  });

  // Register the grunt serve task
  grunt.registerTask('serve', [
    'concurrent:serve'
  ]);

  // Register the grunt build task
  grunt.registerTask('build', [
    'shell:jekyllBuild',
    'sass',
    'postcss',
    'uglify'
  ]);

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Register build as the default task fallback
  grunt.registerTask('default', 'build');

};
