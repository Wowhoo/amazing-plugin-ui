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
        fontAwesome: {
          files: [{
              expand: true,
              cwd: 'bower_components/fontAwesome/fonts/',
              src:  '**',
              dest: 'test/fonts/'
            },
            {
              flatten: true,
              src: 'bower_components/fontAwesome/css/font-awesome.css', 
              dest: 'test/css/font-awesome.css'
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
        sortable: {
          files: [{
            expand: true,
            flatten: true,
            cwd: 'bower_components/Sortable/',
            src: 'Sortable.min.js',
            dest: 'test/js'
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
        jquery_asGalleryPicker: {
          files: [{
            expand: true,
            flatten: true,
            cwd: 'bower_components/jquery-asGalleryPicker/dist',
            src: 'jquery-asGalleryPicker.min.js',
            dest: 'test/js'
          }]
        },
        jquery_asIconPicker: {
          files: [{
            expand: true,
            flatten: true,
            cwd: 'bower_components/jquery-asIconPicker/dist',
            src: 'jquery-asIconPicker.min.js',
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
        jquery_asItemList: {
          files: [{
            expand: true,
            flatten: true,
            cwd: 'bower_components/jquery-asItemList/dist',
            src: 'jquery-asItemList.min.js',
            dest: 'test/js'
          }]
        },
        jquery_asRange: {
          files: [{
            expand: true,
            flatten: true,
            cwd: 'bower_components/jquery-asRange/dist',
            src: 'jquery-asRange.js',
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
            src: 'jquery-asSpinner.min.js',
            dest: 'test/js'
          }]
        },
        jquery_asScrollbar: {
          files: [{
            expand: true,
            flatten: true,
            cwd: 'bower_components/jquery-asScrollbar/dist',
            src: 'jquery-asScrollbar.min.js',
            dest: 'test/js'
          }]
        },
        jquery_mousewheel: {
          files: [{
            expand: true,
            flatten: true,
            cwd: 'bower_components/jquery-mousewheel',
            src: 'jquery.mousewheel.min.js',
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

    // -- Concat Config -------------------------------------------------------
    concat: {
      dist: {
        files: {
          'dist/bgPicker.less': ['less/components/bgPicker/default.less', 'less/components/bgPicker/bgPicker.less'],
          'dist/buttons.less': ['less/components/buttons/default.less', 'less/components/buttons/buttons.less'],
          'dist/checkbox.less': ['less/components/checkbox/default.less', 'less/components/checkbox/checkbox.less'],
          'dist/colorInput.less': ['less/components/colorInput/default.less', 'less/components/colorInput/colorInput.less'],
          'dist/datepicker.less': ['less/components/datepicker/default.less', 'less/components/datepicker/datepicker.less'],
          'dist/dropdown.less': ['less/components/dropdown/default.less', 'less/components/dropdown/dropdown.less'],
          'dist/fontEditor.less': ['less/components/fontEditor/default.less', 'less/components/fontEditor/fontEditor.less'],
          'dist/galleryPicker.less': ['less/components/galleryPicker/default.less', 'less/components/galleryPicker/galleryPicker.less'],
          'dist/imagePicker.less': ['less/components/imagePicker/default.less', 'less/components/imagePicker/imagePicker.less'],
          'dist/paginator.less': ['less/components/paginator/default.less', 'less/components/paginator/paginator.less'],
          'dist/progress.less': ['less/components/progress/default.less', 'less/components/progress/progress.less'],
          'dist/radio.less': ['less/components/radio/default.less', 'less/components/radio/radio.less'],
          'dist/range.less': ['less/components/range/default.less', 'less/components/range/range.less'],
          'dist/search.less': ['less/components/search/default.less', 'less/components/search/search.less'],
          'dist/select.less': ['less/components/select/default.less', 'less/components/select/select.less'],
          'dist/select2.less': ['less/components/select2/default.less', 'less/components/select2/select2.less'],
          'dist/spinner.less': ['less/components/spinner/default.less', 'less/components/spinner/spinner.less'],
          'dist/switcher.less': ['less/components/switcher/default.less', 'less/components/switcher/switcher.less'],
          'dist/tab.less': ['less/components/tab/default.less', 'less/components/tab/tab.less'],
          'dist/tooltip.less': ['less/components/tooltip/default.less', 'less/components/tooltip/tooltip.less'],
          'dist/unitInput.less': ['less/components/unitInput/default.less', 'less/components/unitInput/unitInput.less'],
          'dist/iconPicker.less': ['less/components/iconPicker/default.less', 'less/components/iconPicker/iconPicker.less'],
          'dist/itemList.less': ['less/components/itemList/default.less', 'less/components/itemList/itemList.less']
        },
      },
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
  require('load-grunt-tasks')(grunt, {
      pattern: ['grunt-*']
  });

  // Default task.
  grunt.registerTask('default', ['clean', 'css', 'concat']);
  grunt.registerTask('css', ['less','csscomb','cssmin']);
};
