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
        jquery_asBgPicker: {
          files: [{
            expand: true,
            flatten: true,
            cwd: 'bower_components/jquery-asBgPicker/src',
            src: 'jquery-asBgPicker.js',
            dest: 'test/js'
          }]
        },
        jquery_asCheck: {
          files: [{
            expand: true,
            flatten: true,
            cwd: 'bower_components/jquery-asCheck/dist',
            src: 'jquery-asCheck.min.js',
            dest: 'test/js'
          }]
        },
        jquery_asColor: {
          files: [{
            expand: true,
            flatten: true,
            cwd: 'bower_components/jquery-asColor/dist',
            src: 'jquery-asColor.min.js',
            dest: 'test/js'
          }]
        },
        jquery_asColorInput: {
          files: [{
            expand: true,
            flatten: true,
            cwd: 'bower_components/jquery-asColorInput/dist/',
            src: 'jquery-asColorInput.js',
            dest: 'test/js'
          }]
        },
        jquery_asDatepicker: {
          files: [{
            expand: true,
            flatten: true,
            cwd: 'bower_components/jquery-asDatepicker/dist',
            src: 'jquery-asDatepicker.min.js',
            dest: 'test/js'
          }]
        },
        jquery_asDropdown: {
          files: [{
            expand: true,
            flatten: true,
            cwd: 'bower_components/jquery-asDropdown/src',
            src: 'jquery-asDropdown.js',
            dest: 'test/js'
          }]
        },
        jquery_asFontEditor: {
          files: [{
            expand: true,
            flatten: true,
            cwd: 'bower_components/jquery-asFontEditor/src',
            src: 'jquery-asFontEditor.js',
            dest: 'test/js'
          }]
        },
        jquery_asImagePicker: {
          files: [{
            expand: true,
            flatten: true,
            cwd: 'bower_components/jquery-asImagePicker/src',
            src: 'jquery-asImagePicker.js',
            dest: 'test/js'
          }]
        },
        jquery_asRange: {
          files: [{
            expand: true,
            flatten: true,
            cwd: 'bower_components/jquery-asRange/dist',
            src: 'jquery-asRange.min.js',
            dest: 'test/js'
          }]
        },
        jquery_asSelect: {
          files: [{
            expand: true,
            flatten: true,
            cwd: 'bower_components/jquery-asSelect/dist',
            src: 'jquery-asSelect.min.js',
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
        jquery_asSpinner: {
          files: [{
            expand: true,
            flatten: true,
            cwd: 'bower_components/jquery-asSpinner/dist',
            src: 'jquery-asSpinner.js',
            dest: 'test/js'
          }]
        },
        jquery_asSwitcher: {
          files: [{
            expand: true,
            flatten: true,
            cwd: 'bower_components/jquery-asSwitcher/dist',
            src: 'jquery-asSwitcher.min.js',
            dest: 'test/js'
          }]
        },
        jquery_asTabs: {
          files: [{
            expand: true,
            flatten: true,
            cwd: 'bower_components/jquery-asTabs/dist',
            src: 'jquery-asTabs.js',
            dest: 'test/js'
          },
          {
            expand: true,
            flatten: true,
            cwd: 'bower_components/jquery-asTabs/css',
            src: 'effects.css',
            dest: 'test/css'
          }]
        },
        jquery_asTooltip: {
          files: [{
            expand: true,
            flatten: true,
            cwd: 'bower_components/jquery-asTooltip/dist',
            src: 'jquery-asTooltip.min.js',
            dest: 'test/js'
          }]
        },
        jquery_asPaginator: {
          files: [{
            expand: true,
            flatten: true,
            cwd: 'bower_components/jquery-asPaginator/dist',
            src: 'jquery-asPaginator.min.js',
            dest: 'test/js'
          }]
        },
        jquery_asUnitInput: {
          files: [{
            expand: true,
            flatten: true,
            cwd: 'bower_components/jquery-asUnitInput/dist',
            src: 'jquery-asUnitInput.min.js',
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
