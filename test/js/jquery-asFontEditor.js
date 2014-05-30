 /*
  * asFontEditor
  * https://github.com/amazingSurge/jquery-asFontEditor
  *
  * Copyright (c) 2014 amazingSurge
  * Licensed under the GPL license.
  */


 (function($, document, window, undefined) {

     "use strict";

     var pluginName = 'asFontEditor';
     // main constructor
     var Plugin = $[pluginName] = function(element, options) {
         var metas = {};

         this.element = element;
         this.$element = $(element);

         if (this.$element.attr('name')) {
             this.name = this.$element.attr('name');
         } else {
             this.name = options.name;
         }

         this.options = $.extend({}, Plugin.defaults, options, this.$element.data(), metas);
         this.namespace = this.options.namespace;
         this.components = $.extend(true, {}, this.components);

         // public properties

         this.classes = {
             // status
             skin: this.namespace + '_' + this.options.skin,
             disabled: this.namespace + '_disabled',
             active: this.namespace + '_active',
             hide: this.namespace + '_hide',
             show: this.namespace + '_show',
             hasFont: this.namespace + '_hasFont'
         };

         // flag
         this.disabled = false;
         this.initialed = false;

         var self = this;
         $.extend(self, {
             init: function() {
                 self._createHtml();

                 if (self.options.skin) {
                     self.$wrap.addClass(self.classes.skin);
                 }

                 self._getValue();

                 if (self.options.disabled) {
                     self.disable();
                 }
                 //init 
                 self.textAlign.init();
                 self.fontStyle.init();
                 self.textTransform.init();
                 self.textDecoration.init();
                 self.fontWeight.init();
                 self.lineHeight.init();
                 self.fontSize.init();
                 self.fontFamily.init();

                 if (self.value.font_family === "inherit") {
                     self.$typo_trigger.removeClass(self.classes.hasFont);
                     $(self.$typo_font)[0].lastChild.nodeValue = "Add typography";
                 } else {
                     self.$typo_trigger.addClass(self.classes.hasFont);
                     $(self.$typo_font)[0].lastChild.nodeValue = self.value.font_family;
                 }

                 self._bindEvent();

                 // init
                 // self.val(self.value, true);

                 self.initialed = true;
                 // after init end trigger 'ready'
                 self._trigger('ready');
             },

             _bindEvent: function() {
                 self.$typo_trigger.on('mouseenter', function() {
                     if (self.disabled) {
                         return;
                     }

                     self.$actions.addClass(self.classes.show);
                     if (self.$typo_trigger.hasClass(self.classes.hasFont)) {
                         self.$remove.addClass(self.classes.show);
                     }
                     return false;
                 }).on('mouseleave', function() {
                     if (self.disabled) {
                         return;
                     }

                     self.$actions.removeClass(self.classes.show);
                     self.$remove.removeClass(self.classes.show);
                     return false;
                 });

                 self.$actions.on("click", function() {
                     if (self.disabled) {
                         return;
                     }

                     self.$typo_trigger.addClass(self.classes.hide);
                     self.$wrap.append(self.$extend);
                     self.$extend.removeClass(self.classes.hide).addClass(self.classes.show);
                     return false;
                 });

                 self.$remove.on("click", function() {
                     self.clear(true);
                     return false;
                 });

                 self.$close.on("click", function() {
                     // event.preventDefault();
                     self.$extend.removeClass(self.classes.show).addClass(self.classes.hide);
                     self.$typo_trigger.removeClass(self.classes.hide);
                     return false;
                 });
             },
             _createHtml: function() {
                 this.$wrap = $(this.options.tpl());
                 this.$extend = $(this.options.tpl_extend());
                 this.$element.after(this.$wrap);

                 this.$typo_trigger = this.$wrap.find('.' + this.namespace + '-trigger');
                 this.$typo_font = this.$typo_trigger.find('.' + this.namespace + '-font');
                 this.$remove = this.$typo_trigger.find('.' + this.namespace + '-remove');
                 this.$typo_font_show = this.$typo_font.find('span');
                 this.$actions = this.$wrap.find('.' + this.namespace + '-actions');

                 this.$close = this.$extend.find('.' + this.namespace + '-close');
             },

             _trigger: function(eventType) {
                 // event
                 this.$element.trigger('asFontEditor::' + eventType, this);
                 this.$element.trigger(eventType + '.asFontEditor', this);

                 // callback
                 eventType = eventType.replace(/\b\w+\b/g, function(word) {
                     return word.substring(0, 1).toUpperCase() + word.substring(1);
                 });
                 var onFunction = 'on' + eventType;
                 var method_arguments = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : undefined;
                 if (typeof self.options[onFunction] === 'function') {
                     self.options[onFunction].apply(self, method_arguments);
                 }
             },
             _getValue: function() {
                 var value = this.$element.val();
                 if (value) {
                     this.value = this.options.parse(value);
                 } else {
                     this.value = {};
                 }
             },
             _process: function() {
                 // if (self.value === null) {
                 //     self.value = {};
                 // }
                 self.options.onChange.call(self, self.value);
                 self.$element.val(self.options.process(self.value));
             },

             fontFamily: {
                 init: function() {
                     var oneself = this;
                     if (!self.value.font_family) {
                         self.value.font_family = self.options.font_family.default_value;
                     }

                     var tpl_content = self.options.font_family.tpl().replace(/fontFamilyNamespace/g, self.options.font_family.namespace).replace(/namespace/g, self.namespace);
                     this.$tpl_font_family = $(tpl_content);
                     self.$close.after(this.$tpl_font_family);

                     this.$content = self.$extend.find('.' + self.namespace + '-fontFamily-content');
                     this.$font_family = self.$extend.find('.' + self.namespace + '-fontFamily-dropdown');
                     this.$items = this.$content.find('li');
                     this.values = self.options.font_family.values;

                     $.each(this.values, function(key, value) {
                         oneself.$items.eq(key).data('font_family', value);
                     });

                     this.$font_family.asDropdown({
                         namespace: self.options.font_family.namespace,
                         imitateSelect: true,
                         data: "font_family",
                         select: self.value.font_family,
                         onChange: function(value) {
                             if (self.disabled) {
                                 return;
                             }

                             self.value.font_family = value;
                             if (value === "inherit") {
                                 self.$typo_trigger.removeClass(self.classes.hasFont);
                                 $(self.$typo_font)[0].lastChild.nodeValue = "Add typography";
                             } else {
                                 self.$typo_trigger.addClass(self.classes.hasFont);
                                 $(self.$typo_font)[0].lastChild.nodeValue = value;
                             }
                             self._process();
                             self.$typo_font_show.css({
                                 "font-family": value
                             });
                         }
                     });

                     // this.set(self.value.font_family);
                 },

                 set: function(value) {
                     if (!value) {
                         this.$font_family.data('asDropdown').set("inherit");
                     } else {
                         this.$font_family.data('asDropdown').set(value);
                     }
                 }
             },

             fontWeight: {
                 init: function() {
                     var oneself = this;
                     if (!self.value.font_weight) {
                         self.value.font_weight = self.options.font_weight.default_value;
                     }

                     var tpl_content = self.options.font_weight.tpl().replace(/fontWeightNamespace/g, self.options.font_weight.namespace).replace(/namespace/g, self.namespace);
                     this.$tpl_font_weight = $(tpl_content);
                     self.$close.after(this.$tpl_font_weight);

                     this.$content = self.$extend.find('.' + self.namespace + '-fontWeight-content');
                     this.$font_weight = self.$extend.find('.' + self.namespace + '-fontWeight-dropdown');
                     this.$items = this.$content.find('li');
                     this.values = self.options.font_weight.values;

                     $.each(this.values, function(key, value) {
                         oneself.$items.eq(key).data('font_weight', value);
                     });

                     this.$font_weight.asDropdown({
                         namespace: self.options.font_weight.namespace,
                         imitateSelect: true,
                         data: "font_weight",
                         select: self.value.font_weight,
                         onChange: function(value) {
                             if (self.disabled) {
                                 return;
                             }

                             self.value.font_weight = value;
                             self._process();
                         }
                     });

                     // this.set(self.value.font_weight);
                 },

                 set: function(value) {
                     if (!value) {
                         this.$font_weight.data('asDropdown').set("inherit");
                     } else {
                         this.$font_weight.data('asDropdown').set(value);
                     }
                 }
             },

             fontSize: {
                 init: function() {
                     var oneself = this;
                     if (!self.value.font_size) {
                         this.font_size_value = self.options.font_size.value;
                         this.font_size_unit = self.options.font_size.unit;
                     } else if (self.value.font_size === "inherit") {
                         this.font_size_value = self.options.font_size.min;
                         this.font_size_unit = self.options.font_size.unit;
                     } else {
                         this.font_size_value = self.getUnitNumber(self.value.font_size).number;
                         this.font_size_unit = self.getUnitNumber(self.value.font_size).unit;
                     }

                     var tpl_content = self.options.font_size.tpl().replace(/fontSizeNamespace/g, self.options.font_size.namespace).replace(/namespace/g, self.namespace);
                     this.$tpl_font_size = $(tpl_content);
                     self.$close.after(this.$tpl_font_size);

                     // this.$content = self.$extend.find('.' + self.namespace + '-fontSize-content');
                     this.$font_size = self.$extend.find('.' + self.namespace + '-fontSize-range');
                     this.$font_size_value = self.$extend.find('.' + self.namespace + '-fontSize-value');
                     this.$font_size_unit = this.$font_size_value.find('span');

                     if (this.font_size_value === self.options.font_size.min) {
                         $(this.$font_size_value)[0].firstChild.nodeValue = "inherit";
                         $(this.$font_size_unit).text("");
                     } else {
                         $(this.$font_size_value)[0].firstChild.nodeValue = this.font_size_value;
                         $(this.$font_size_unit).text(this.font_size_unit);
                     }

                     this.$font_size.asRange({
                         namespace: self.options.font_size.namespace,
                         min: parseInt(self.options.font_size.min),
                         max: parseInt(self.options.font_size.max),
                         step: parseFloat(self.options.font_size.step),
                         pointer: 1,
                         value: [oneself.font_size_value],
                         onChange: function(newValue) {
                             oneself.font_size_value = newValue;
                             if (newValue == self.options.font_size.min || isNaN(newValue)) {
                                 $(oneself.$font_size_value)[0].firstChild.nodeValue = "inherit";
                                 $(oneself.$font_size_unit).text("");
                                 self.value.font_size = "inherit";
                             } else {
                                 $(oneself.$font_size_value)[0].firstChild.nodeValue = oneself.font_size_value;
                                 $(oneself.$font_size_unit).text(oneself.font_size_unit);
                                 self.value.font_size = oneself.font_size_value + oneself.font_size_unit;
                             }
                             self._process();
                         }
                     });
                 },

                 set: function(value) {
                     if (!value) {
                         this.$font_size.data('asRange').set(0);
                     } else {
                         this.$font_size.data('asRange').set(value);
                     }
                 }
             },

             lineHeight: {
                 init: function() {
                     var oneself = this;
                     if (!self.value.line_height) {
                         this.line_height_value = self.options.line_height.value;
                         this.line_height_unit = self.options.line_height.unit;
                     } else if (self.value.line_height === "inherit") {
                         this.line_height_value = self.options.line_height.min;
                         if (self.options.line_height.unit === "inherit") {
                             this.line_height_unit = "";
                         } else {
                             this.line_height_unit = self.options.line_height.unit;
                         }
                     } else {
                         this.line_height_value = self.getUnitNumber(self.value.line_height).number;
                         this.line_height_unit = self.getUnitNumber(self.value.line_height).unit;
                     }

                     var tpl_content = self.options.line_height.tpl().replace(/lineHeightNamespace/g, self.options.line_height.namespace).replace(/namespace/g, self.namespace);
                     this.$tpl_line_height = $(tpl_content);
                     self.$close.after(this.$tpl_line_height);

                     this.$line_height = self.$extend.find('.' + self.namespace + '-lineHeight-range');
                     this.$line_height_value = self.$extend.find('.' + self.namespace + '-lineHeight-value');
                     this.$line_height_unit = this.$line_height_value.find('span');

                     if (this.line_height_value == self.options.line_height.min) {
                         $(this.$line_height_value)[0].firstChild.nodeValue = "inherit";
                         $(this.$line_height_unit).text("");
                     } else {
                         $(this.$line_height_value)[0].firstChild.nodeValue = this.line_height_value;
                         $(this.$line_height_unit).text(this.line_height_unit);
                     }

                     this.$line_height.asRange({
                         namespace: self.options.line_height.namespace,
                         min: parseInt(self.options.line_height.min),
                         max: parseInt(self.options.line_height.max),
                         step: parseFloat(self.options.line_height.step),
                         pointer: 1,
                         value: [oneself.line_height_value],
                         onChange: function(newValue) {
                             oneself.line_height_value = newValue;
                             if (newValue === self.options.line_height.min || isNaN(newValue)) {
                                 $(oneself.$line_height_value)[0].firstChild.nodeValue = "inherit";
                                 $(oneself.$line_height_unit).text("");
                                 self.value.line_height = "inherit";
                             } else {
                                 if (oneself.line_height_unit === "inherit") {
                                     oneself.line_height_value = self.options.line_height.min;
                                     oneself.line_height_unit = "";
                                 }
                                 $(oneself.$line_height_value)[0].firstChild.nodeValue = oneself.line_height_value;
                                 $(oneself.$line_height_unit).text(oneself.line_height_unit);
                                 self.value.line_height = oneself.line_height_value + oneself.line_height_unit;
                             }
                             self._process();
                         }
                     });
                 },

                 set: function(value) {
                     if (!value) {
                         this.$line_height.data('asRange').set("inherit");
                     } else {
                         this.$line_height.data('asRange').set(value);
                     }
                 }
             },

             textAlign: {
                 init: function() {
                     var oneself = this;
                     if (!self.value.text_align) {
                         self.value.text_align = self.options.text_align.default_value;
                     }

                     var tpl_content = self.options.text_align.tpl().replace(/namespace/g, self.namespace);
                     this.$tpl_text_align = $(tpl_content);
                     self.$close.after(this.$tpl_text_align);

                     self.$typo_decorations = self.$extend.find('.' + self.namespace + '-decorations');
                     this.$items = self.$typo_decorations.find('.' + self.namespace + '-textAlign');
                     this.values = self.options.text_align.values;

                     $.each(this.values, function(key, value) {
                         oneself.$items.eq(key).data('text_align', value);
                     });

                     this.set(self.value.text_align);
                     this.bindEvent();
                 },

                 set: function(newValue) {
                     this.$items.removeClass(self.classes.active);
                     for (var i = 0; i < this.values.length; i++) {
                         if (newValue === this.values[i]) {
                             self.value.text_align = newValue;
                             this.$items.eq(i).addClass(self.classes.active);

                             return;
                         }
                     }
                     self.value.text_align = '';
                 },

                 bindEvent: function() {
                     var oneself = this;
                     this.$items.on("click", function() {
                         if (self.disabled) {
                             return;
                         }

                         var align = $(this).data("text_align");
                         if ($(this).hasClass(self.classes.active)) {
                             $(this).removeClass(self.classes.active);
                             self.value.text_align = self.options.text_align.default_value;
                         } else {
                             oneself.set(align);
                         }
                         self._process();
                         return false;
                     });
                 }
             },

             fontStyle: {
                 init: function() {
                     if (!self.value.font_style) {
                         self.value.font_style = self.options.font_style.default_value;
                     }

                     var tpl_content = self.options.font_style.tpl().replace(/namespace/g, self.namespace);
                     this.$tpl_font_style = $(tpl_content);
                     self.$typo_decorations.append(this.$tpl_font_style);
                     this.value = self.options.font_style.value;

                     this.$tpl_font_style.data('font_style', this.value);

                     this.set(self.value.font_style);
                     this.bindEvent();
                 },

                 set: function(newValue) {
                     this.$tpl_font_style.removeClass(self.classes.active);
                     if (newValue === this.value) {
                         self.value.font_style = newValue;
                         this.$tpl_font_style.addClass(self.classes.active);

                         return;
                     }
                     self.value.font_style = '';
                 },

                 bindEvent: function() {
                     var oneself = this;
                     this.$tpl_font_style.on("click", function() {
                         if (self.disabled) {
                             return;
                         }
                         if ($(this).hasClass(self.classes.active)) {
                             $(this).removeClass(self.classes.active);
                             self.value.font_style = self.options.font_style.default_value;
                         } else {
                             $(this).addClass(self.classes.active);
                             self.value.font_style = oneself.value;
                         }
                         self._process();
                         return false;
                     });
                 }
             },

             textTransform: {
                 init: function() {
                     var oneself = this;
                     if (!self.value.text_transform) {
                         self.value.text_transform = self.options.text_transform.default_value;
                     }

                     var tpl_content = self.options.text_transform.tpl().replace(/namespace/g, self.namespace);
                     this.$tpl_text_transform = $(tpl_content);
                     self.$typo_decorations.append(this.$tpl_text_transform);

                     this.$items = self.$extend.find('.' + self.namespace + '-textTransform');
                     this.values = self.options.text_transform.values;

                     $.each(this.values, function(key, value) {
                         oneself.$items.eq(key).data('text_transform', value);
                     });

                     this.set(self.value.text_transform);
                     this.bindEvent();
                 },

                 set: function(newValue) {
                     this.$items.removeClass(self.classes.active);
                     for (var i = 0; i < this.values.length; i++) {
                         if (newValue === this.values[i]) {
                             self.value.text_transform = newValue;
                             this.$items.eq(i).addClass(self.classes.active);

                             return;
                         }
                     }
                     self.value.text_transform = "";
                 },

                 bindEvent: function() {
                     var oneself = this;
                     this.$items.on("click", function() {
                         if (self.disabled) {
                             return;
                         }

                         var transform = $(this).data("text_transform");
                         if ($(this).hasClass(self.classes.active)) {
                             $(this).removeClass(self.classes.active);
                             self.value.text_transform = self.options.text_transform.default_value;
                         } else {
                             oneself.set(transform);
                         }
                         self._process();
                         return false;
                     });
                 }
             },

             textDecoration: {
                 init: function() {
                     var oneself = this;
                     if (self.value.text_decoration === null) {
                         self.value.text_decoration = self.options.text_decoration.default_value;
                     }

                     var tpl_content = self.options.text_decoration.tpl().replace(/namespace/g, self.namespace);
                     this.$tpl_text_decoration = $(tpl_content);
                     self.$typo_decorations.append(this.$tpl_text_decoration);

                     this.$items = $('.' + self.namespace + '-textDecoration', self.$extend);
                     this.values = self.options.text_decoration.values;

                     $.each(this.values, function(key, value) {
                         oneself.$items.eq(key).data('text_decoration', value);
                     });

                     this.set(self.value.text_decoration);
                     this.bindEvent();
                 },

                 set: function(newValue) {
                     this.$items.removeClass(self.classes.active);
                     for (var i = 0; i < this.values.length; i++) {
                         if (newValue === this.values[i]) {
                             self.value.text_decoration = newValue;
                             this.$items.eq(i).addClass(self.classes.active);

                             return;
                         }
                     }
                     self.value.text_decoration = "";
                 },

                 bindEvent: function() {
                     var oneself = this;
                     this.$items.on("click", function() {
                         if (self.disabled) {
                             return;
                         }

                         var decoration = $(this).data("text_decoration");
                         if ($(this).hasClass(self.classes.active)) {
                             $(this).removeClass(self.classes.active);
                             self.value.text_decoration = self.options.text_decoration.default_value;
                         } else {
                             oneself.set(decoration);
                         }
                         self._process();
                         return false;
                     });
                 }
             }

         });

         this._trigger('init');
         this.init();
     };

     Plugin.prototype = {
         constructor: Plugin,
         components: {},

         val: function(value, update) {
             if (typeof value === 'undefined') {
                 return this.value;
             }

             if (value) {
                 this.set(value, update);
             } else {
                 this.clear(update);
             }
         },

         set: function(value) {
             var self = this;

             self.value = value;

             self.textAlign.set(value.text_align);
             self.fontStyle.set(value.font_style);
             self.textTransform.set(value.text_transform);
             self.textDecoration.set(value.text_decoration);
             self.fontWeight.set(value.font_weight);
             self.lineHeight.set(value.line_height);
             self.fontSize.set(value.font_size);
             self.fontFamily.set(value.font_family);

             self._process();
         },

         clear: function() {
             var self = this;

             self.textAlign.set('');
             self.fontStyle.set('');
             self.textTransform.set('');
             self.textDecoration.set('');
             self.fontWeight.set('');
             self.lineHeight.set('');
             self.fontSize.set('');
             self.fontFamily.set('');
             self.value = {};
             self._process();
         },

         getUnitNumber: function(value) {
             var reg1, reg2, arry1, arry2, number_value, unit_value;
             reg1 = /(\d+)\.(\d+)|\d+/g;
             reg2 = /[^0-9|.]/g;

             arry1 = value.match(reg1);
             arry2 = value.match(reg2);

             if (arry2) {
                 unit_value = arry2.join("");
             } else {
                 unit_value = "";
             }

             number_value = parseFloat(arry1.join(""));

             return {
                 number: number_value,
                 unit: unit_value
             };
         },

         setFontFamily: function(value) {
             this.value.font_family = value;
             this.fontFamily.set(value);
             this._process();
         },

         setFontWeight: function(value) {
             this.value.font_family = value;
             this.fontFamily.set(value);
             this._process();
         },

         // setFontSize: function(value) {
         //     this.value.font_size = value;
         //     if (this.getUnitNumber(value).unit !== this.fontSize.font_size_unit) {
         //         this.fontSize.font_size_unit = this.getUnitNumber(value).unit;
         //     }
         //     this.fontStyle.set(this.getUnitNumber(value).number);
         //     this._process();
         // },

         // setLineHeight: function(value) {
         //     this.value.line_height = value;
         //     this.lineHeight.set(value);
         //     this._process();
         // },

         setFontStyle: function(value) {
             this.value.font_style = value;
             this.fontStyle.set(value);
             this._process();
         },

         setTextAlign: function(value) {
             this.value.text_align = value;
             this.textAlign.set(value);
             this._process();
         },

         setTextTranform: function(value) {
             this.value.text_transform = value;
             this.textTransform.set(value);
             this._process();
         },

         setTextDecoration: function(value) {
             this.value.text_decoration = value;
             this.textDecoration.set(value);
             this._process();
         },


         enable: function() {
             this.disabled = false;
             this.$wrap.removeClass(this.classes.disabled);
         },
         disable: function() {
             this.disabled = true;
             this.$wrap.addClass(this.classes.disabled);
         },
         destory: function() {
             this.$element.data(pluginName, null);
             this.$wrap.remove();
             this._trigger('destory');
         }
     };

     Plugin.defaults = {
         namespace: pluginName,
         skin: null,
         name: null,

         font_family: {
             namespace: 'asDropdown',
             default_value: 'inherit',
             values: ["inherit", "Arial", "Bpreplay", "Cambira", "Gabriola"],
             tpl: function() {
                 return '<div class="namespace-fontFamily">' +
                     '<span class="namespace-fontFamily-title">Typeface</span>' +
                     '<div class="namespace-fontFamily-content">' +
                     '<div class="fontFamilyNamespace namespace-fontFamily-dropdown"><i class="asIcon-caret-down"></i></div>' +
                     '<ul>' +
                     '<li>inherit</li>' +
                     '<li>Arial</li>' +
                     '<li>Bpreplay</li>' +
                     '<li>Cambira</li>' +
                     '<li>Gabriola</li>' +
                     '</ul>' +
                     '</div>' +
                     '</div>';
             }

         },

         font_weight: {
             namespace: 'asDropdown',
             default_value: 'inherit',
             values: ["inherit", "bold", "400", "500", "600", "700"],
             tpl: function() {
                 return '<div class="namespace-fontWeight">' +
                     '<span class="namespace-fontWeight-title">Weight</span>' +
                     '<div class="namespace-fontWeight-content">' +
                     '<div class="fontWeightNamespace namespace-fontWeight-dropdown"><i class="asIcon-caret-down"></i></div>' +
                     '<ul>' +
                     '<li>inherit</li>' +
                     '<li>bold</li>' +
                     '<li>400</li>' +
                     '<li>500</li>' +
                     '<li>600</li>' +
                     '<li>700</li>' +
                     '</ul>' +
                     '</div>' +
                     '</div>';
             }
         },


         font_size: {
             namespace: 'asRange',
             value: 16,
             unit: "px", //not set "inherit"
             min: 0,
             max: 100,
             step: 2,
             tpl: function() {
                 return '<div class="namespace-fontSize">' +
                     '<span class="namespace-fontSize-title">Font Size</span>' +
                     '<div class="namespace-fontSize-content">' +
                     '<div class="fontSizeNamespace namespace-fontSize-range"></div>' +
                     '<div class="namespace-fontSize-value">0<span>px</span></div>' +
                     '</div>' +
                     '</div>';
             }
         },
         line_height: {
             namespace: 'asRange',
             value: 1,
             unit: "inherit",
             min: 1,
             max: 10,
             step: 0.5,
             tpl: function() {
                 return '<div class="namespace-lineHeight">' +
                     '<span class="namespace-lineHeight-title">Line Height</span>' +
                     '<div class="namespace-lineHeight-content">' +
                     '<div class="lineHeightNamespace namespace-lineHeight-range"></div>' +
                     '<div class="namespace-lineHeight-value">0<span>em</span></div>' +
                     '</div>' +
                     '</div>';
             }
         },

         text_align: {
             default_value: '',
             values: ["left", "center", "right"],
             tpl: function() {
                 return '<ul class="namespace-decorations">' +
                     '<li class="namespace-textAlign text-left"></li>' +
                     '<li class="namespace-textAlign text-center"></li>' +
                     '<li class="namespace-textAlign text-right"></li>' +
                     '</ul>';
             }
         },

         font_style: {
             default_value: '',
             value: 'italy',
             tpl: function() {
                 return '<li class="namespace-fontStyle text-italy"></li>';
             }
         },
         text_transform: {
             default_value: '',
             values: ["uppercase", "lowercase", "capitalize"],
             tpl: function() {
                 return '<li class="namespace-textTransform text-uppercase"></li>' +
                     '<li class="namespace-textTransform text-lowercase"></li>' +
                     '<li class="namespace-textTransform text-capitalize"></li>';
             }
         },
         text_decoration: {
             default_value: '',
             values: ["underline", "line-through"],
             tpl: function() {
                 return '<li class="namespace-textDecoration text-underline"></li>' +
                     '<li class="namespace-textDecoration text-linethrough"></li>';
             }
         },

         tpl: function() {
             return '<div class="' + this.namespace + '">' +
                 '<div class="' + this.namespace + '-trigger">' +
                 '<div class="' + this.namespace + '-font"><span>Aa</span>Add typography</div>' +
                 '<div class="' + this.namespace + '-actions">Extend</div>' +
                 '<a class="' + this.namespace + '-remove" href="#">x</a>' +
                 '</div>' +
                 '</div>';
         },

         tpl_extend: function() {
             return '<div class="' + this.namespace + '-extend">' +
                 '<a class="' + this.namespace + '-close" href="#">-</a>' +
                 '</div>';
         },

         process: function(value) {
             if (value) {
                 for (var prop in value) {
                     if (value[prop] === "") {
                         delete value[prop];
                     }
                 }
                 var json = JSON.stringify(value);
                 if (json !== '{}') {
                     return json;
                 }
             }
             return '';
         },

         parse: function(value) {
             if (value) {
                 return $.parseJSON(value);
             } else {
                 return null;
             }
         },

         onChange: function() {},
         onClick: function() {}
     };

     Plugin.registerComponent = function(component, methods) {
         Plugin.prototype.components[component] = methods;
     };

     $.fn[pluginName] = function(options) {
         if (typeof options === 'string') {
             var method = options;
             var method_arguments = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : undefined;

             if (/^\_/.test(method)) {
                 return false;
             } else if ((/^(getTabs)$/.test(method)) || (method === 'val' && method_arguments === undefined)) {
                 var api = this.first().data(pluginName);
                 if (api && typeof api[method] === 'function') {
                     return api[method].apply(api, method_arguments);
                 }
             } else {
                 return this.each(function() {
                     var api = $.data(this, pluginName);
                     if (api && typeof api[method] === 'function') {
                         api[method].apply(api, method_arguments);
                     }
                 });
             }
         } else {
             return this.each(function() {
                 if (!$.data(this, pluginName)) {
                     $.data(this, pluginName, new Plugin(this, options));
                 }
             });
         }
     };
 })(jQuery, document, window);
