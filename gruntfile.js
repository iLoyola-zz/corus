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
      postcss: {
        files: ['_sass/**/*.{scss,sass}'],
        tasks: ['postcss']
      },
      javascript: {
        files: ['_js/main/script.js'],
        tasks: ['uglify']
      }
    },

    // sass (libsass) config
    // sass: {
    //   options: {
    //     sourceMap: true,
    //     relativeAssets: false,
    //     outputStyle: 'expanded',
    //     sassDir: '_sass',
    //     cssDir: '_site/css'
    //   },
    //   build: {
    //     files: [{
    //       expand: true,
    //       cwd: '_sass/',
    //       src: ['**/*.{scss,sass}'],
    //       dest: '_site/css',
    //       ext: '.css'
    //     }]
    //   }
    // },

    // run tasks in parallel
    concurrent: {
      serve: [
        'postcss',
        'uglify',
        'watch',
        'shell:jekyllServe'
      ],
      options: {
        logConcurrentOutput: true
      }
    },

    // postcss config
    postcss: {
      options: {
        syntax: require('postcss-scss'),
        map: {
          inline: false,
          annotation: '_site/css/maps/'
        },
        processors: [
          require('autoprefixer')({browsers: ['last 2 version']})
        ]
      },
      dist: {
        files: [{
          src: ['_sass/**/*.{scss,sass}'],
          dest: '_site/css/main.css'
        }]
      }
 
    },

    // contrib-uglify config
    uglify: {
      my_target: {
        files: {
          '_site/js/corus.min.js': ['_js/main/script.js']
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
    'postcss',
    'uglify'
  ]);

  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Register build as the default task fallback
  grunt.registerTask('default', 'build');

};
