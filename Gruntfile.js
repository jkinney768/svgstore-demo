module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    //-------------------------------------------
    // Setup for template tags for directories
    //-------------------------------------------
    env: {
        DIR_SRC: 'src',
        DIR_WEB: 'web'
    },

    //--------------------------------------
    // Sass Task
    //--------------------------------------
    sass: {
        dist: {
          options: {
            style: 'compressed'
          },
          files: {
            '<%= env.DIR_WEB %>/assets/styles/modern.css': '<%= env.DIR_SRC %>/assets/scss/modern.scss' 
          }
        }
    },

    //--------------------------------------
    // Clean Task
    //--------------------------------------
    clean: {
        dist: {
            src: ["<%= env.DIR_WEB %>/assets/**",
                  '<%= env.DIR_WEB %>/*.html']
        }
    },

    //--------------------------------------
    // Copy Assets Task
    //--------------------------------------
    copy: {
        dist: {
            files: [{
                expand: true,
                cwd: '<%= env.DIR_SRC %>',
                src: ['assets/media/**',
                      'assets/scripts/**/*.js'],
                dest: '<%= env.DIR_WEB %>'
            }]
        }
    },

    //--------------------------------------
    // HTML Includes Task
    //--------------------------------------
    includes: {
        build: {
            cwd: '<%= env.DIR_SRC %>',
            src: [ '*.html'],
            dest: '<%= env.DIR_WEB %>'
        }
    },

    //--------------------------------------
    // SVG Store Task
    //--------------------------------------
    svgstore: {
        options: {
            prefix : 'icon-',
            formatting: {
                indent_size : 4
            },
            svg: {
                viewBox : '0 0 100 100',
                xmlns: 'http://www.w3.org/2000/svg',
                style: "display: none;"
            }
        },
        default : {
          files: {
            '<%= env.DIR_SRC %>/includes/_generatedSvgSprite.html': ['<%= env.DIR_SRC %>/icon-src/*.svg']
          },
        },
    },


    //--------------------------------------
    // Watch Tasks
    //--------------------------------------
    watch: {
        options: {
            event: 'all',
            livereload: true
        },
        grunt: {
            files: ['Gruntfile.js'],
            tasks: ['default']
        },
        media: {
            files: ['<%= env.DIR_SRC %>/assets/media/**'],
            tasks: ['default']
        },
        markup: {
            files: ['<%= env.DIR_SRC %>/**/*.{html,svg}'],
            tasks: ['includes']
        },
        styles: {
            files: ['<%= env.DIR_SRC %>/assets/scss/**/*.scss'],
            tasks: ['sass']
        },
        scripts: {
            files: ['<%= env.DIR_SRC %>/assets/{scripts,vendor}/**/*.js'],
            tasks: ['default']
        },
    }

  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-includes');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-svgstore');


  // Default task(s).
  grunt.registerTask('default', ['clean', 'copy', 'sass', 'svgstore', 'includes']);

};