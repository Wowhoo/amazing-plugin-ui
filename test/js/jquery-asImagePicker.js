/*
 * asImagePicker
 * https://github.com/amazingSurge/jquery-asImagePicker
 *
 * Copyright (c) 2014 amazingSurge
 * Licensed under the MIT license.
 */


(function($, document, window, undefined) {
	"use strict";

	var pluginName = 'asImagePicker';

	// main constructor
	var Plugin = $[pluginName] = function(element, options) {
		this.element = element;
		this.$element = $(element);

		this.options = $.extend({}, Plugin.defaults, options, this.$element.data());

		this._plugin = pluginName;
		this.namespace = this.options.namespace;

		this.classes = {
			// status
			skin: this.namespace + '_' + this.options.skin,
			empty: this.namespace + '_empty',
			present: this.namespace + '_present',
			hover: this.namespace + '_hover',
			disabled: this.namespace + '_disabled'
		};

		// flag
		this.disabled = false;
		this.initialed = false;

		this._trigger('init');
		this.init();
	};

	Plugin.prototype = {
		constructor: Plugin,

		init: function() {
			// build dom
			this._createHtml();

			if (this.options.skin) {
				this.$wrap.addClass(this.classes.skin);
			}

			// bind events
			this._bindEvent();

			// set initialed value
			this.value = this.options.parse(this.$element.val());

			this.val(this.value, false);

			if (this.options.disabled) {
				this.disable();
			}

			this.initialed = true;
			this._trigger('ready');
		},

		_createHtml: function() {
			this.$wrap = $(this.options.tpl());
			this.$element.after(this.$wrap);

			this.$initial = this.$wrap.find('.' + this.namespace + '-initial');
			this.$actions = this.$wrap.find('.' + this.namespace + '-actions');
			this.$image = this.$wrap.find('.' + this.namespace + '-image');
			this.$remove = this.$wrap.find('.' + this.namespace + '-remove');
		},

		_bindEvent: function() {
			var self = this;

			self.$initial.on('click', function() {
				if (self.disabled) {
					return;
				}

				self.options.onSelect.call(self);
				return false;
			});

			self.$actions.on('click', function() {
				if (self.disabled) {
					return;
				}

				self.options.onSelect.call(self);
				return false;
			});

			self.$wrap.on('mouseenter', function() {
				if (self.disabled) {
					return;
				}

				self.$wrap.addClass(self.classes.hover);
			}).on('mouseleave', function() {
				if (self.disabled) {
					return;
				}

				self.$wrap.removeClass(self.classes.hover);
			});

			self.$remove.on("click", function() {
				if (self.disabled) {
					return;
				}

				self.clear();
				return false;
			});
		},

		_setState: function(state) {
			switch (state) {
				case 'present':
					this.$wrap.removeClass(this.classes.empty).addClass(this.classes.present);
					break;
				case 'empty':
					this.$wrap.removeClass(this.classes.present).addClass(this.classes.empty);
					break;
			}
		},

		_trigger: function(eventType) {
			// event
			this.$element.trigger(pluginName + '::' + eventType, this);

			// callback
			eventType = eventType.replace(/\b\w+\b/g, function(word) {
				return word.substring(0, 1).toUpperCase() + word.substring(1);
			});
			var onFunction = 'on' + eventType;
			var method_arguments = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : undefined;
			if (typeof this.options[onFunction] === 'function') {
				this.options[onFunction].apply(this, method_arguments);
			}
		},

		/*
            Public Method
         */
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

		set: function(value, update) {
			this.value = value;

			this.image = this.options.getImage.call(this, value);
			this.$image.attr("src", this.image);

			this._setState('present');

			if (update !== false) {
				this.options.onChange.call(this, value);
				this.$element.val(this.options.process.call(this, value));
			}
		},

		clear: function(update) {
			this.value = null;

			this.image = null;
			this.$image.attr("src", null);

			this._setState('empty');

			if (update !== false) {
				this.options.onChange.call(this, this.value);
				this.$element.val(this.options.process.call(this, this.value));
			}
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
		disabled: false,
		tpl: function() {
			return '<div class="' + this.namespace + '">' +
				'<div class="' + this.namespace + '-initial"><i></i>Drag a image or click here to upload</div>' +
				'<img class="' + this.namespace + '-image" src="">' +
				'<div class="' + this.namespace + '-actions">Change</div>' +
				'<a class="' + this.namespace + '-remove" href=""></a>' +
				'</div>';
		},
		process: function(value) {
			if (value) {
				return JSON.stringify(value);
			} else {
				return '';
			}
		},
		parse: function(value) {
			if (value) {
				return $.parseJSON(value);
			} else {
				return null;
			}
		},
		getImage: function(value) {
			return value.image;
		},
		onChange: function() {},
		onSelect: function() {}
	};

	$.fn[pluginName] = function(options) {
		if (typeof options === 'string') {
			var method = options;
			var method_arguments = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : undefined;

			if (/^\_/.test(method)) {
				return false;
			} else if ((method === 'val' && method_arguments === undefined)) {
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
}(jQuery));
