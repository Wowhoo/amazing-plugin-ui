'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/* <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    // -- copy config ----------------------------------------------------------
    copy: {
        jquery: {
          files: [{
            expand: true,
            flatten: true,
            cwd: 'bower_components/jquery',
            src: [
              'jquery.js',
              'jquery.min.js'
            ],
            dest: 'test/js/'
          }]
        },
        adaptGrid: {
          files: [{
              expand: true,
              cwd: 'bower_components/adaptGrid/css/',
              src:  'adaptGrid.css',
              dest: 'test/css/'
            }
          ]
        },
        normalize: {
          files: [{
            src: 'bower_components/normalize-css/normalize.css', 
            dest: 'test/css/reset.css'
          }]
        },
        rainbow: {
          files: [{
            expand: true,
            flatten: true,
            cwd: 'bower_components/rainbow/js',
            src: 'rainbow.min.js',
            dest: 'test/js/highlighting/'
          },
          {
            expand: true,
            flatten: true,
            cwd: 'bower_components/rainbow/js/language',
            src: ['html.js',
                  'javascript.js'
                  ],
            dest: 'test/js/highlighting/'
          },
          {
            expand: true,
            flatten: true,
            cwd: 'bower_components/rainbow/themes',
            src: 'github.css',
            dest: 'test/css/highlighting/'
          }]
        },
        mixins: {
          files: [{
            expand: true,
            flatten: true,
            cwd: 'bower_components/prelude-mixins/dist',
            src: [
                '*.less'
            ],
            dest: 'less/mixins/'
          }]
        },
        jquery_check: {
          files: [{
            expand: true,
            flatten: true,
            cwd: 'bower_components/jquery-check/dist',
            src: 'jquery-check.min.js',
            dest: 'test/js'
          }]
        },
        jquery_datepicker: {
          files: [{
            expand: true,
            flatten: true,
            cwd: 'bower_components/jquery-datepicker/dist',
            src: 'jquery-datepicker.min.js',
            dest: 'test/js'
          }]
        },
        jquery_dropdown: {
          files: [{
            expand: true,
            flatten: true,
            cwd: 'bower_components/jquery-dropdown/dist',
            src: 'jquery-dropdown.min.js',
            dest: 'test/js'
          }]
        },
        jquery_range: {
          files: [{
            expand: true,
            flatten: true,
            cwd: 'bower_components/jquery-range/dist',
            src: 'jquery-range.min.js',
            dest: 'test/js'
          }]
        },
        jquery_select: {
          files: [{
            expand: true,
            flatten: true,
            cwd: 'bower_components/jquery-select/dist',
            src: 'jquery-select.min.js',
            dest: 'test/js'
          }]
        },
        select2: {
          files: [{
            expand: true,
            flatten: true,
            cwd: 'bower_components/select2',
            src: 'select2.min.js',
            dest: 'test/js'
          }]
        },
        jquery_spiner: {
          files: [{
            expand: true,
            flatten: true,
            cwd: 'bower_components/jquery-spiner/dist',
            src: 'jquery-spiner.min.js',
            dest: 'test/js'
          }]
        },
        jquery_switcher: {
          files: [{
            expand: true,
            flatten: true,
            cwd: 'bower_components/jquery-switcher/dist',
            src: 'jquery-switcher.min.js',
            dest: 'test/js'
          }]
        },
        jquery_tabs: {
          files: [{
            expand: true,
            flatten: true,
            cwd: 'bower_components/jquery-tabs/dist',
            src: 'jquery-tabs.js',
            dest: 'test/js'
          },
          {
            expand: true,
            flatten: true,
            cwd: 'bower_components/jquery-tabs/css',
            src: 'effects.css',
            dest: 'test/css'
          }]
        },
        jquery_tooltip: {
          files: [{
            expand: true,
            flatten: true,
            cwd: 'bower_components/jquery-tooltip/dist',
            src: 'jquery-tooltip.min.js',
            dest: 'test/js'
          }]
        },
        jquery_unitInput: {
          files: [{
            expand: true,
            flatten: true,
            cwd: 'bower_components/jquery-unitInput/dist',
            src: 'jquery-unitInput.min.js',
            dest: 'test/js'
          }]
        }
    },
    
    // -- Clean Config ---------------------------------------------------------

    clean: {
        css    : ['css/'],
        release  : ['release/']
    },

    // -- Less Config ----------------------------------------------------------

    less: {
      dist: {
        files: {
          "css/amazing-plugin-ui.css": "less/amazing-plugin-ui.less"
        }
      }
    },

    // -- CSSLint Config -------------------------------------------------------

    csslint: {
        options: {
            csslintrc: '.csslintrc'
        },

        src: {
            src: [
                'css/**/*.css'
            ]
        }
    },

    // -- CSSMin Config --------------------------------------------------------

    cssmin: {
        options: {
            // report: 'gzip'
        },

        files: {
            expand: true,
            src   : ['css/*.css','!css/*-min.css'],
            ext   : '-min.css'
        }
    },

    // -- CSSMin Config --------------------------------------------------------
    csscomb: {
      sort: {
        options: {
          sortOrder: '.csscomb.json'
        },
        files: {
          'css/amazing-plugin-ui.css': ['css/amazing-plugin-ui.css'],
        }
      }
    },

    // -- Watch/Observe Config -------------------------------------------------
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      }
    },

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-csscomb');

  // Default task.
  grunt.registerTask('default', ['clean', 'css']);
  grunt.registerTask('css', ['less','csscomb','cssmin']);
};
