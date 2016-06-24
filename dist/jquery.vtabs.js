/*
 * Project: vTabs
 * Description: Simplistic and unstyled tabs
 * Author: https://github.com/Wancieho
 * License: MIT
 * Version: 0.3.0
 * Dependancies: jquery-1.*
 * Date: 21/06/2016
 */
;
(function ($) {
	'use strict';

	var pluginName = 'vTabs';
	var defaults = {
		activeTab: 0,
		active: true
	};
	var instance = null;

	function vTabs(element, options) {
		instance = this;
		instance.element = element;
		instance.settings = $.extend({}, defaults, options);

		events();
		instance.activateTab(this.settings.activeTab);
	}

	$.extend(vTabs.prototype, {
		activateTab: function (id) {
			if (instance.settings.active) {
				$.each($(instance.element).find('li'), function () {
					$($(this).find('a').attr('href')).invisible();

					if ($(this).hasClass('active')) {
						$(this).removeClass('active');
					}
				});

				var li = id !== parseInt(id) ? $(instance.element).find('a[href="' + id + '"]').parent() : $(instance.element).find('li').eq(id);

				if (li.length === 0) {
					li = $(instance.element).find('li').eq(0);
				}

				$(li.addClass('active').find('a').attr('href')).visible().hide().fadeIn();
			} else {
				instance.reset(true);
			}
		},
		reset: function (hideFirst) {
			$(instance.element).find('li').removeClass('active');

			$.each($(instance.element).find('li'), function () {
				$($(this).find('a').attr('href')).invisible();
			});

			if (!hideFirst) {
				$($(instance.element).find('li').eq(0).addClass('active').find('a').attr('href')).visible();
			}
		}
	});

	function events() {
		$(instance.element).find('a').on('click', function (e) {
			e.preventDefault();

			if ($($(this).attr('href')).css('visibility') === 'hidden') {
				$.each($(instance.element).find('li'), function () {
					$(this).removeClass('active');
					$($(this).find('a').attr('href')).invisible();
				});

				$(this).parent().addClass('active');
				$($(this).attr('href')).visible().hide().fadeIn();
			}
		});
	}

	$.fn.visible = function () {
		return this.each(function () {
			$(this).css('visibility', 'visible').height('auto');
		});
	};

	$.fn.invisible = function () {
		return this.each(function () {
			$(this).css('visibility', 'hidden').height(0);
		});
	};

	$.fn[pluginName] = function (options) {
		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new vTabs(this, options));
			}
		});
	};
})(jQuery);