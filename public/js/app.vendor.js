var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Toggle loading state for button
 * Example: <button class="btn btn-primary">Button</button>
 */
function button_loading(btn, dark) {
  dark = typeof dark !== 'undefined' ? dark : true;

  var darkClass = dark === true ? ' btn-loading-dark' : '';

  //must be a button
  if (btn.is('button') === false) {
    return false;
  }

  if (btn.hasClass('btn-loading')) {
    btn.html(btn.data('label')).data('label', '');
    btn.removeClass('btn-loading' + darkClass);
    btn.prop('disabled', false);
  } else {
    btn.data('label', btn.html()).html('&nbsp;');
    btn.addClass('btn-loading' + darkClass);
    btn.prop('disabled', true);
  }
}

function formValidate(elm) {
  if (!$().parsley) {
    return;
  }

  if ($(elm).length === 0) return;

  //validate
  $(elm).parsley({

    successClass: "is-valid",
    errorClass: "is-invalid",
    classHandler: function classHandler(el) {
      return el.$element.closest(".form-group");
    },
    errorsContainer: function errorsContainer(el) {
      return el.$element.closest(".form-group > div");
    },
    errorsWrapper: "<span class='invalid-feedback text-small'></span>",
    errorTemplate: "<span></span>"

  });

  window.Parsley.on('field:error', function () {
    this.$element.addClass('is-invalid');
  });

  window.Parsley.on('field:success', function () {
    this.$element.addClass('is-valid');
  });
}

/*
    READY UP
 */
$(function () {

  //form-validation
  formValidate('form.validate');

  //flash
  $('.content-wrapper .alert-flash').delay(1000).fadeOut(150);

  //delete links
  $('[data-toggle="delete"]').click(function (e) {
    var ask = confirm('Are you sure?');

    if (ask) {
      $(this).closest('td').find('form.delete').submit();
    }
    e.preventDefault();
  });

  //select
  $('.select').selectpicker({
    style: 'btn-outline-secondary',
    size: 4,
    showTick: true,
    iconBase: 'icon',
    tickIcon: 'ion-checkmark-round'
  });

  /*$('.select').each(function(i, e){
      if (!($(e).data('convert') == 'no')) {
          $(e).hide().removeClass('select');
          var current = $(e).find('option:selected').text() || 'Select';
          var val   =   $(e).find('option:selected').attr('value');
          var name  =   $(e).attr('name') || '';
           $(e).parent().append('<div class="btn-group" id="select-group-' + i + '" />');
          var select = $('#select-group-' + i);
          select.html('<a class="btn btn-outline-secondary dropdown-toggle' + $(e).attr('class') + '" data-toggle="dropdown">' + current + '</a></a><div class="dropdown-menu"></div><input type="hidden" value="' + val + '" name="' + name + '" id="' + $(e).attr('id') + '" class="' + $(e).attr('class') + '" />');
          $(e).find('option').each(function(o,q) {
              select.find('.dropdown-menu').append('<a class="dropdown-item" href="#" data-value="' + $(q).attr('value') + '">' + $(q).html() + '</a>');
          });
          select.find('.dropdown-menu a').click(function(e) {
              select.find('input[type=hidden]').val($(this).data('value')).change();
              select.find('.btn:eq(0)').html($(this).html());
              e.preventDefault();
          });
          $(e).remove();
      }
  });*/
});
/*!
 * Bootstrap-select v1.12.4 (http://silviomoreto.github.io/bootstrap-select)
 *
 * Copyright 2013-2017 bootstrap-select
 * Licensed under MIT (https://github.com/silviomoreto/bootstrap-select/blob/master/LICENSE)
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define(["jquery"], function (a0) {
      return factory(a0);
    });
  } else if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"));
  } else {
    factory(root["jQuery"]);
  }
})(this, function (jQuery) {

  (function ($) {
    'use strict';

    //<editor-fold desc="Shims">

    if (!String.prototype.includes) {
      (function () {
        'use strict'; // needed to support `apply`/`call` with `undefined`/`null`

        var toString = {}.toString;
        var defineProperty = function () {
          // IE 8 only supports `Object.defineProperty` on DOM elements
          try {
            var object = {};
            var $defineProperty = Object.defineProperty;
            var result = $defineProperty(object, object, object) && $defineProperty;
          } catch (error) {}
          return result;
        }();
        var indexOf = ''.indexOf;
        var includes = function includes(search) {
          if (this == null) {
            throw new TypeError();
          }
          var string = String(this);
          if (search && toString.call(search) == '[object RegExp]') {
            throw new TypeError();
          }
          var stringLength = string.length;
          var searchString = String(search);
          var searchLength = searchString.length;
          var position = arguments.length > 1 ? arguments[1] : undefined;
          // `ToInteger`
          var pos = position ? Number(position) : 0;
          if (pos != pos) {
            // better `isNaN`
            pos = 0;
          }
          var start = Math.min(Math.max(pos, 0), stringLength);
          // Avoid the `indexOf` call if no match is possible
          if (searchLength + start > stringLength) {
            return false;
          }
          return indexOf.call(string, searchString, pos) != -1;
        };
        if (defineProperty) {
          defineProperty(String.prototype, 'includes', {
            'value': includes,
            'configurable': true,
            'writable': true
          });
        } else {
          String.prototype.includes = includes;
        }
      })();
    }

    if (!String.prototype.startsWith) {
      (function () {
        'use strict'; // needed to support `apply`/`call` with `undefined`/`null`

        var defineProperty = function () {
          // IE 8 only supports `Object.defineProperty` on DOM elements
          try {
            var object = {};
            var $defineProperty = Object.defineProperty;
            var result = $defineProperty(object, object, object) && $defineProperty;
          } catch (error) {}
          return result;
        }();
        var toString = {}.toString;
        var startsWith = function startsWith(search) {
          if (this == null) {
            throw new TypeError();
          }
          var string = String(this);
          if (search && toString.call(search) == '[object RegExp]') {
            throw new TypeError();
          }
          var stringLength = string.length;
          var searchString = String(search);
          var searchLength = searchString.length;
          var position = arguments.length > 1 ? arguments[1] : undefined;
          // `ToInteger`
          var pos = position ? Number(position) : 0;
          if (pos != pos) {
            // better `isNaN`
            pos = 0;
          }
          var start = Math.min(Math.max(pos, 0), stringLength);
          // Avoid the `indexOf` call if no match is possible
          if (searchLength + start > stringLength) {
            return false;
          }
          var index = -1;
          while (++index < searchLength) {
            if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
              return false;
            }
          }
          return true;
        };
        if (defineProperty) {
          defineProperty(String.prototype, 'startsWith', {
            'value': startsWith,
            'configurable': true,
            'writable': true
          });
        } else {
          String.prototype.startsWith = startsWith;
        }
      })();
    }

    if (!Object.keys) {
      Object.keys = function (o, // object
      k, // key
      r // result array
      ) {
        // initialize object and result
        r = [];
        // iterate over object keys
        for (k in o) {
          // fill result array with non-prototypical keys
          r.hasOwnProperty.call(o, k) && r.push(k);
        } // return result
        return r;
      };
    }

    // set data-selected on select element if the value has been programmatically selected
    // prior to initialization of bootstrap-select
    // * consider removing or replacing an alternative method *
    var valHooks = {
      useDefault: false,
      _set: $.valHooks.select.set
    };

    $.valHooks.select.set = function (elem, value) {
      if (value && !valHooks.useDefault) $(elem).data('selected', true);

      return valHooks._set.apply(this, arguments);
    };

    var changed_arguments = null;

    var EventIsSupported = function () {
      try {
        new Event('change');
        return true;
      } catch (e) {
        return false;
      }
    }();

    $.fn.triggerNative = function (eventName) {
      var el = this[0],
          event;

      if (el.dispatchEvent) {
        // for modern browsers & IE9+
        if (EventIsSupported) {
          // For modern browsers
          event = new Event(eventName, {
            bubbles: true
          });
        } else {
          // For IE since it doesn't support Event constructor
          event = document.createEvent('Event');
          event.initEvent(eventName, true, false);
        }

        el.dispatchEvent(event);
      } else if (el.fireEvent) {
        // for IE8
        event = document.createEventObject();
        event.eventType = eventName;
        el.fireEvent('on' + eventName, event);
      } else {
        // fall back to jQuery.trigger
        this.trigger(eventName);
      }
    };
    //</editor-fold>

    // Case insensitive contains search
    $.expr.pseudos.icontains = function (obj, index, meta) {
      var $obj = $(obj).find('a');
      var haystack = ($obj.data('tokens') || $obj.text()).toString().toUpperCase();
      return haystack.includes(meta[3].toUpperCase());
    };

    // Case insensitive begins search
    $.expr.pseudos.ibegins = function (obj, index, meta) {
      var $obj = $(obj).find('a');
      var haystack = ($obj.data('tokens') || $obj.text()).toString().toUpperCase();
      return haystack.startsWith(meta[3].toUpperCase());
    };

    // Case and accent insensitive contains search
    $.expr.pseudos.aicontains = function (obj, index, meta) {
      var $obj = $(obj).find('a');
      var haystack = ($obj.data('tokens') || $obj.data('normalizedText') || $obj.text()).toString().toUpperCase();
      return haystack.includes(meta[3].toUpperCase());
    };

    // Case and accent insensitive begins search
    $.expr.pseudos.aibegins = function (obj, index, meta) {
      var $obj = $(obj).find('a');
      var haystack = ($obj.data('tokens') || $obj.data('normalizedText') || $obj.text()).toString().toUpperCase();
      return haystack.startsWith(meta[3].toUpperCase());
    };

    /**
     * Remove all diatrics from the given text.
     * @access private
     * @param {String} text
     * @returns {String}
     */
    function normalizeToBase(text) {
      var rExps = [{ re: /[\xC0-\xC6]/g, ch: "A" }, { re: /[\xE0-\xE6]/g, ch: "a" }, { re: /[\xC8-\xCB]/g, ch: "E" }, { re: /[\xE8-\xEB]/g, ch: "e" }, { re: /[\xCC-\xCF]/g, ch: "I" }, { re: /[\xEC-\xEF]/g, ch: "i" }, { re: /[\xD2-\xD6]/g, ch: "O" }, { re: /[\xF2-\xF6]/g, ch: "o" }, { re: /[\xD9-\xDC]/g, ch: "U" }, { re: /[\xF9-\xFC]/g, ch: "u" }, { re: /[\xC7-\xE7]/g, ch: "c" }, { re: /[\xD1]/g, ch: "N" }, { re: /[\xF1]/g, ch: "n" }];
      $.each(rExps, function () {
        text = text ? text.replace(this.re, this.ch) : '';
      });
      return text;
    }

    // List of HTML entities for escaping.
    var escapeMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '`': '&#x60;'
    };

    var unescapeMap = {
      '&amp;': '&',
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#x27;': "'",
      '&#x60;': '`'
    };

    // Functions for escaping and unescaping strings to/from HTML interpolation.
    var createEscaper = function createEscaper(map) {
      var escaper = function escaper(match) {
        return map[match];
      };
      // Regexes for identifying a key that needs to be escaped.
      var source = '(?:' + Object.keys(map).join('|') + ')';
      var testRegexp = RegExp(source);
      var replaceRegexp = RegExp(source, 'g');
      return function (string) {
        string = string == null ? '' : '' + string;
        return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
      };
    };

    var htmlEscape = createEscaper(escapeMap);
    var htmlUnescape = createEscaper(unescapeMap);

    var Selectpicker = function Selectpicker(element, options) {
      // bootstrap-select has been initialized - revert valHooks.select.set back to its original function
      if (!valHooks.useDefault) {
        $.valHooks.select.set = valHooks._set;
        valHooks.useDefault = true;
      }

      this.$element = $(element);
      this.$newElement = null;
      this.$button = null;
      this.$menu = null;
      this.$lis = null;
      this.options = options;

      // If we have no title yet, try to pull it from the html title attribute (jQuery doesnt' pick it up as it's not a
      // data-attribute)
      if (this.options.title === null) {
        this.options.title = this.$element.attr('title');
      }

      // Format window padding
      var winPad = this.options.windowPadding;
      if (typeof winPad === 'number') {
        this.options.windowPadding = [winPad, winPad, winPad, winPad];
      }

      //Expose public methods
      this.val = Selectpicker.prototype.val;
      this.render = Selectpicker.prototype.render;
      this.refresh = Selectpicker.prototype.refresh;
      this.setStyle = Selectpicker.prototype.setStyle;
      this.selectAll = Selectpicker.prototype.selectAll;
      this.deselectAll = Selectpicker.prototype.deselectAll;
      this.destroy = Selectpicker.prototype.destroy;
      this.remove = Selectpicker.prototype.remove;
      this.show = Selectpicker.prototype.show;
      this.hide = Selectpicker.prototype.hide;

      this.init();
    };

    Selectpicker.VERSION = '1.12.4';

    // part of this is duplicated in i18n/defaults-en_US.js. Make sure to update both.
    Selectpicker.DEFAULTS = {
      noneSelectedText: 'Nothing selected',
      noneResultsText: 'No results matched {0}',
      countSelectedText: function countSelectedText(numSelected, numTotal) {
        return numSelected == 1 ? "{0} item selected" : "{0} items selected";
      },
      maxOptionsText: function maxOptionsText(numAll, numGroup) {
        return [numAll == 1 ? 'Limit reached ({n} item max)' : 'Limit reached ({n} items max)', numGroup == 1 ? 'Group limit reached ({n} item max)' : 'Group limit reached ({n} items max)'];
      },
      selectAllText: 'Select All',
      deselectAllText: 'Deselect All',
      doneButton: false,
      doneButtonText: 'Close',
      multipleSeparator: ', ',
      styleBase: 'btn',
      style: 'btn-secondary',
      size: 'auto',
      title: null,
      selectedTextFormat: 'values',
      width: false,
      container: false,
      hideDisabled: false,
      showSubtext: false,
      showIcon: true,
      showContent: true,
      dropupAuto: true,
      header: false,
      liveSearch: false,
      liveSearchPlaceholder: null,
      liveSearchNormalize: false,
      liveSearchStyle: 'contains',
      actionsBox: false,
      iconBase: 'glyphicon',
      tickIcon: 'glyphicon-ok',
      showTick: false,
      template: {
        caret: '<span class="caret"></span>'
      },
      maxOptions: false,
      mobile: false,
      selectOnTab: false,
      dropdownAlignRight: false,
      windowPadding: 0
    };

    Selectpicker.prototype = {

      constructor: Selectpicker,

      init: function init() {
        var that = this,
            id = this.$element.attr('id');

        this.$element.addClass('bs-select-hidden');

        // store originalIndex (key) and newIndex (value) in this.liObj for fast accessibility
        // allows us to do this.$lis.eq(that.liObj[index]) instead of this.$lis.filter('[data-original-index="' + index + '"]')
        this.liObj = {};
        this.multiple = this.$element.prop('multiple');
        this.autofocus = this.$element.prop('autofocus');
        this.$newElement = this.createView();
        this.$element.after(this.$newElement).appendTo(this.$newElement);
        this.$button = this.$newElement.children('button');
        this.$menu = this.$newElement.children('.dropdown-menu');
        this.$menuInner = this.$menu.children('.inner');
        this.$searchbox = this.$menu.find('input');

        this.$element.removeClass('bs-select-hidden');

        if (this.options.dropdownAlignRight === true) this.$menu.addClass('dropdown-menu-right');

        if (typeof id !== 'undefined') {
          this.$button.attr('data-id', id);
          $('label[for="' + id + '"]').click(function (e) {
            e.preventDefault();
            that.$button.focus();
          });
        }

        this.checkDisabled();
        this.clickListener();
        if (this.options.liveSearch) this.liveSearchListener();
        this.render();
        this.setStyle();
        this.setWidth();
        if (this.options.container) this.selectPosition();
        this.$menu.data('this', this);
        this.$newElement.data('this', this);
        if (this.options.mobile) this.mobile();

        this.$newElement.on({
          'hide.bs.dropdown': function hideBsDropdown(e) {
            that.$menuInner.attr('aria-expanded', false);
            that.$element.trigger('hide.bs.select', e);
          },
          'hidden.bs.dropdown': function hiddenBsDropdown(e) {
            that.$element.trigger('hidden.bs.select', e);
          },
          'show.bs.dropdown': function showBsDropdown(e) {
            that.$menuInner.attr('aria-expanded', true);
            that.$element.trigger('show.bs.select', e);
          },
          'shown.bs.dropdown': function shownBsDropdown(e) {
            that.$element.trigger('shown.bs.select', e);
          }
        });

        if (that.$element[0].hasAttribute('required')) {
          this.$element.on('invalid', function () {
            that.$button.addClass('bs-invalid');

            that.$element.on({
              'focus.bs.select': function focusBsSelect() {
                that.$button.focus();
                that.$element.off('focus.bs.select');
              },
              'shown.bs.select': function shownBsSelect() {
                that.$element.val(that.$element.val()) // set the value to hide the validation message in Chrome when menu is opened
                .off('shown.bs.select');
              },
              'rendered.bs.select': function renderedBsSelect() {
                // if select is no longer invalid, remove the bs-invalid class
                if (this.validity.valid) that.$button.removeClass('bs-invalid');
                that.$element.off('rendered.bs.select');
              }
            });

            that.$button.on('blur.bs.select', function () {
              that.$element.focus().blur();
              that.$button.off('blur.bs.select');
            });
          });
        }

        setTimeout(function () {
          that.$element.trigger('loaded.bs.select');
        });
      },

      createDropdown: function createDropdown() {
        // Options
        // If we are multiple or showTick option is set, then add the show-tick class
        var showTick = this.multiple || this.options.showTick ? ' show-tick' : '',
            inputGroup = this.$element.parent().hasClass('input-group') ? ' input-group-btn' : '',
            autofocus = this.autofocus ? ' autofocus' : '';
        // Elements
        var header = this.options.header ? '<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>' + this.options.header + '</div>' : '';
        var searchbox = this.options.liveSearch ? '<div class="bs-searchbox">' + '<input type="text" class="form-control" autocomplete="off"' + (null === this.options.liveSearchPlaceholder ? '' : ' placeholder="' + htmlEscape(this.options.liveSearchPlaceholder) + '"') + ' role="textbox" aria-label="Search">' + '</div>' : '';
        var actionsbox = this.multiple && this.options.actionsBox ? '<div class="bs-actionsbox">' + '<div class="btn-group btn-group-sm btn-block">' + '<button type="button" class="actions-btn bs-select-all btn btn-default">' + this.options.selectAllText + '</button>' + '<button type="button" class="actions-btn bs-deselect-all btn btn-default">' + this.options.deselectAllText + '</button>' + '</div>' + '</div>' : '';
        var donebutton = this.multiple && this.options.doneButton ? '<div class="bs-donebutton">' + '<div class="btn-group btn-block">' + '<button type="button" class="btn btn-sm btn-default">' + this.options.doneButtonText + '</button>' + '</div>' + '</div>' : '';
        var drop = '<div class="btn-group bootstrap-select' + showTick + inputGroup + '">' + '<button type="button" class="' + this.options.styleBase + ' dropdown-toggle" data-toggle="dropdown"' + autofocus + ' role="button">' + '<span class="filter-option pull-left"></span>&nbsp;' + '<span class="bs-caret">' + this.options.template.caret + '</span>' + '</button>' + '<div class="dropdown-menu open" role="combobox">' + header + searchbox + actionsbox + '<ul class="dropdown-menu inner" role="listbox" aria-expanded="false">' + '</ul>' + donebutton + '</div>' + '</div>';

        return $(drop);
      },

      createView: function createView() {
        var $drop = this.createDropdown(),
            li = this.createLi();

        $drop.find('ul')[0].innerHTML = li;
        return $drop;
      },

      reloadLi: function reloadLi() {
        // rebuild
        var li = this.createLi();
        this.$menuInner[0].innerHTML = li;
      },

      createLi: function createLi() {
        var that = this,
            _li = [],
            optID = 0,
            titleOption = document.createElement('option'),
            liIndex = -1; // increment liIndex whenever a new <li> element is created to ensure liObj is correct

        // Helper functions
        /**
         * @param content
         * @param [index]
         * @param [classes]
         * @param [optgroup]
         * @returns {string}
         */
        var generateLI = function generateLI(content, index, classes, optgroup) {
          return '<li' + (typeof classes !== 'undefined' && '' !== classes ? ' class="' + classes + '"' : '') + (typeof index !== 'undefined' && null !== index ? ' data-original-index="' + index + '"' : '') + (typeof optgroup !== 'undefined' && null !== optgroup ? 'data-optgroup="' + optgroup + '"' : '') + '>' + content + '</li>';
        };

        /**
         * @param text
         * @param [classes]
         * @param [inline]
         * @param [tokens]
         * @returns {string}
         */
        var generateA = function generateA(text, classes, inline, tokens) {
          return '<a tabindex="0"' + (typeof classes !== 'undefined' ? ' class="dropdown-item ' + classes + '"' : '') + (inline ? ' style="' + inline + '"' : '') + (that.options.liveSearchNormalize ? ' data-normalized-text="' + normalizeToBase(htmlEscape($(text).html())) + '"' : '') + (typeof tokens !== 'undefined' || tokens !== null ? ' data-tokens="' + tokens + '"' : '') + ' role="option">' + text + '<span class="' + that.options.iconBase + ' ' + that.options.tickIcon + ' check-mark"></span>' + '</a>';
        };

        if (this.options.title && !this.multiple) {
          // this option doesn't create a new <li> element, but does add a new option, so liIndex is decreased
          // since liObj is recalculated on every refresh, liIndex needs to be decreased even if the titleOption is already appended
          liIndex--;

          if (!this.$element.find('.bs-title-option').length) {
            // Use native JS to prepend option (faster)
            var element = this.$element[0];
            titleOption.className = 'bs-title-option';
            titleOption.innerHTML = this.options.title;
            titleOption.value = '';
            element.insertBefore(titleOption, element.firstChild);
            // Check if selected or data-selected attribute is already set on an option. If not, select the titleOption option.
            // the selected item may have been changed by user or programmatically before the bootstrap select plugin runs,
            // if so, the select will have the data-selected attribute
            var $opt = $(element.options[element.selectedIndex]);
            if ($opt.attr('selected') === undefined && this.$element.data('selected') === undefined) {
              titleOption.selected = true;
            }
          }
        }

        var $selectOptions = this.$element.find('option');

        $selectOptions.each(function (index) {
          var $this = $(this);

          liIndex++;

          if ($this.hasClass('bs-title-option')) return;

          // Get the class and text for the option
          var optionClass = this.className || '',
              inline = htmlEscape(this.style.cssText),
              text = $this.data('content') ? $this.data('content') : $this.html(),
              tokens = $this.data('tokens') ? $this.data('tokens') : null,
              subtext = typeof $this.data('subtext') !== 'undefined' ? '<small class="text-muted">' + $this.data('subtext') + '</small>' : '',
              icon = typeof $this.data('icon') !== 'undefined' ? '<span class="' + that.options.iconBase + ' ' + $this.data('icon') + '"></span> ' : '',
              $parent = $this.parent(),
              isOptgroup = $parent[0].tagName === 'OPTGROUP',
              isOptgroupDisabled = isOptgroup && $parent[0].disabled,
              isDisabled = this.disabled || isOptgroupDisabled,
              prevHiddenIndex;

          if (icon !== '' && isDisabled) {
            icon = '<span>' + icon + '</span>';
          }

          if (that.options.hideDisabled && (isDisabled && !isOptgroup || isOptgroupDisabled)) {
            // set prevHiddenIndex - the index of the first hidden option in a group of hidden options
            // used to determine whether or not a divider should be placed after an optgroup if there are
            // hidden options between the optgroup and the first visible option
            prevHiddenIndex = $this.data('prevHiddenIndex');
            $this.next().data('prevHiddenIndex', prevHiddenIndex !== undefined ? prevHiddenIndex : index);

            liIndex--;
            return;
          }

          if (!$this.data('content')) {
            // Prepend any icon and append any subtext to the main text.
            text = icon + '<span class="text">' + text + subtext + '</span>';
          }

          if (isOptgroup && $this.data('divider') !== true) {
            if (that.options.hideDisabled && isDisabled) {
              if ($parent.data('allOptionsDisabled') === undefined) {
                var $options = $parent.children();
                $parent.data('allOptionsDisabled', $options.filter(':disabled').length === $options.length);
              }

              if ($parent.data('allOptionsDisabled')) {
                liIndex--;
                return;
              }
            }

            var optGroupClass = ' ' + $parent[0].className || '';

            if ($this.index() === 0) {
              // Is it the first option of the optgroup?
              optID += 1;

              // Get the opt group label
              var label = $parent[0].label,
                  labelSubtext = typeof $parent.data('subtext') !== 'undefined' ? '<small class="text-muted">' + $parent.data('subtext') + '</small>' : '',
                  labelIcon = $parent.data('icon') ? '<span class="' + that.options.iconBase + ' ' + $parent.data('icon') + '"></span> ' : '';

              label = labelIcon + '<span class="text">' + htmlEscape(label) + labelSubtext + '</span>';

              if (index !== 0 && _li.length > 0) {
                // Is it NOT the first option of the select && are there elements in the dropdown?
                liIndex++;
                _li.push(generateLI('', null, 'divider', optID + 'div'));
              }
              liIndex++;
              _li.push(generateLI(label, null, 'dropdown-header' + optGroupClass, optID));
            }

            if (that.options.hideDisabled && isDisabled) {
              liIndex--;
              return;
            }

            _li.push(generateLI(generateA(text, 'opt ' + optionClass + optGroupClass, inline, tokens), index, '', optID));
          } else if ($this.data('divider') === true) {
            _li.push(generateLI('', index, 'divider'));
          } else if ($this.data('hidden') === true) {
            // set prevHiddenIndex - the index of the first hidden option in a group of hidden options
            // used to determine whether or not a divider should be placed after an optgroup if there are
            // hidden options between the optgroup and the first visible option
            prevHiddenIndex = $this.data('prevHiddenIndex');
            $this.next().data('prevHiddenIndex', prevHiddenIndex !== undefined ? prevHiddenIndex : index);

            _li.push(generateLI(generateA(text, optionClass, inline, tokens), index, 'hidden is-hidden'));
          } else {
            var showDivider = this.previousElementSibling && this.previousElementSibling.tagName === 'OPTGROUP';

            // if previous element is not an optgroup and hideDisabled is true
            if (!showDivider && that.options.hideDisabled) {
              prevHiddenIndex = $this.data('prevHiddenIndex');

              if (prevHiddenIndex !== undefined) {
                // select the element **before** the first hidden element in the group
                var prevHidden = $selectOptions.eq(prevHiddenIndex)[0].previousElementSibling;

                if (prevHidden && prevHidden.tagName === 'OPTGROUP' && !prevHidden.disabled) {
                  showDivider = true;
                }
              }
            }

            if (showDivider) {
              liIndex++;
              _li.push(generateLI('', null, 'divider', optID + 'div'));
            }
            _li.push(generateLI(generateA(text, optionClass, inline, tokens), index));
          }

          that.liObj[index] = liIndex;
        });

        //If we are not multiple, we don't have a selected item, and we don't have a title, select the first element so something is set in the button
        if (!this.multiple && this.$element.find('option:selected').length === 0 && !this.options.title) {
          this.$element.find('option').eq(0).prop('selected', true).attr('selected', 'selected');
        }

        return _li.join('');
      },

      findLis: function findLis() {
        if (this.$lis == null) this.$lis = this.$menu.find('li');
        return this.$lis;
      },

      /**
       * @param [updateLi] defaults to true
       */
      render: function render(updateLi) {
        var that = this,
            notDisabled,
            $selectOptions = this.$element.find('option');

        //Update the LI to match the SELECT
        if (updateLi !== false) {
          $selectOptions.each(function (index) {
            var $lis = that.findLis().eq(that.liObj[index]);

            that.setDisabled(index, this.disabled || this.parentNode.tagName === 'OPTGROUP' && this.parentNode.disabled, $lis);
            that.setSelected(index, this.selected, $lis);
          });
        }

        this.togglePlaceholder();

        this.tabIndex();

        var selectedItems = $selectOptions.map(function () {
          if (this.selected) {
            if (that.options.hideDisabled && (this.disabled || this.parentNode.tagName === 'OPTGROUP' && this.parentNode.disabled)) return;

            var $this = $(this),
                icon = $this.data('icon') && that.options.showIcon ? '<i class="' + that.options.iconBase + ' ' + $this.data('icon') + '"></i> ' : '',
                subtext;

            if (that.options.showSubtext && $this.data('subtext') && !that.multiple) {
              subtext = ' <small class="text-muted">' + $this.data('subtext') + '</small>';
            } else {
              subtext = '';
            }
            if (typeof $this.attr('title') !== 'undefined') {
              return $this.attr('title');
            } else if ($this.data('content') && that.options.showContent) {
              return $this.data('content').toString();
            } else {
              return icon + $this.html() + subtext;
            }
          }
        }).toArray();

        //Fixes issue in IE10 occurring when no default option is selected and at least one option is disabled
        //Convert all the values into a comma delimited string
        var title = !this.multiple ? selectedItems[0] : selectedItems.join(this.options.multipleSeparator);

        //If this is multi select, and the selectText type is count, the show 1 of 2 selected etc..
        if (this.multiple && this.options.selectedTextFormat.indexOf('count') > -1) {
          var max = this.options.selectedTextFormat.split('>');
          if (max.length > 1 && selectedItems.length > max[1] || max.length == 1 && selectedItems.length >= 2) {
            notDisabled = this.options.hideDisabled ? ', [disabled]' : '';
            var totalCount = $selectOptions.not('[data-divider="true"], [data-hidden="true"]' + notDisabled).length,
                tr8nText = typeof this.options.countSelectedText === 'function' ? this.options.countSelectedText(selectedItems.length, totalCount) : this.options.countSelectedText;
            title = tr8nText.replace('{0}', selectedItems.length.toString()).replace('{1}', totalCount.toString());
          }
        }

        if (this.options.title == undefined) {
          this.options.title = this.$element.attr('title');
        }

        if (this.options.selectedTextFormat == 'static') {
          title = this.options.title;
        }

        //If we dont have a title, then use the default, or if nothing is set at all, use the not selected text
        if (!title) {
          title = typeof this.options.title !== 'undefined' ? this.options.title : this.options.noneSelectedText;
        }

        //strip all HTML tags and trim the result, then unescape any escaped tags
        this.$button.attr('title', htmlUnescape($.trim(title.replace(/<[^>]*>?/g, ''))));
        this.$button.children('.filter-option').html(title);

        this.$element.trigger('rendered.bs.select');
      },

      /**
       * @param [style]
       * @param [status]
       */
      setStyle: function setStyle(style, status) {
        if (this.$element.attr('class')) {
          this.$newElement.addClass(this.$element.attr('class').replace(/selectpicker|mobile-device|bs-select-hidden|validate\[.*\]/gi, ''));
        }

        var buttonClass = style ? style : this.options.style;

        if (status == 'add') {
          this.$button.addClass(buttonClass);
        } else if (status == 'remove') {
          this.$button.removeClass(buttonClass);
        } else {
          this.$button.removeClass(this.options.style);
          this.$button.addClass(buttonClass);
        }
      },

      liHeight: function liHeight(refresh) {
        if (!refresh && (this.options.size === false || this.sizeInfo)) return;

        var newElement = document.createElement('div'),
            menu = document.createElement('div'),
            menuInner = document.createElement('ul'),
            divider = document.createElement('li'),
            li = document.createElement('li'),
            a = document.createElement('a'),
            text = document.createElement('span'),
            header = this.options.header && this.$menu.find('.popover-title').length > 0 ? this.$menu.find('.popover-title')[0].cloneNode(true) : null,
            search = this.options.liveSearch ? document.createElement('div') : null,
            actions = this.options.actionsBox && this.multiple && this.$menu.find('.bs-actionsbox').length > 0 ? this.$menu.find('.bs-actionsbox')[0].cloneNode(true) : null,
            doneButton = this.options.doneButton && this.multiple && this.$menu.find('.bs-donebutton').length > 0 ? this.$menu.find('.bs-donebutton')[0].cloneNode(true) : null;

        text.className = 'text';
        newElement.className = this.$menu[0].parentNode.className + ' open';
        menu.className = 'dropdown-menu open';
        menuInner.className = 'dropdown-menu inner';
        divider.className = 'divider';
        a.className = 'dropdown-item';

        text.appendChild(document.createTextNode('Inner text'));
        a.appendChild(text);
        li.appendChild(a);
        menuInner.appendChild(li);
        menuInner.appendChild(divider);
        if (header) menu.appendChild(header);
        if (search) {
          var input = document.createElement('input');
          search.className = 'bs-searchbox';
          input.className = 'form-control';
          search.appendChild(input);
          menu.appendChild(search);
        }
        if (actions) menu.appendChild(actions);
        menu.appendChild(menuInner);
        if (doneButton) menu.appendChild(doneButton);
        newElement.appendChild(menu);

        document.body.appendChild(newElement);

        var liHeight = a.offsetHeight,
            headerHeight = header ? header.offsetHeight : 0,
            searchHeight = search ? search.offsetHeight : 0,
            actionsHeight = actions ? actions.offsetHeight : 0,
            doneButtonHeight = doneButton ? doneButton.offsetHeight : 0,
            dividerHeight = $(divider).outerHeight(true),

        // fall back to jQuery if getComputedStyle is not supported
        menuStyle = typeof getComputedStyle === 'function' ? getComputedStyle(menu) : false,
            $menu = menuStyle ? null : $(menu),
            menuPadding = {
          vert: parseInt(menuStyle ? menuStyle.paddingTop : $menu.css('paddingTop')) + parseInt(menuStyle ? menuStyle.paddingBottom : $menu.css('paddingBottom')) + parseInt(menuStyle ? menuStyle.borderTopWidth : $menu.css('borderTopWidth')) + parseInt(menuStyle ? menuStyle.borderBottomWidth : $menu.css('borderBottomWidth')),
          horiz: parseInt(menuStyle ? menuStyle.paddingLeft : $menu.css('paddingLeft')) + parseInt(menuStyle ? menuStyle.paddingRight : $menu.css('paddingRight')) + parseInt(menuStyle ? menuStyle.borderLeftWidth : $menu.css('borderLeftWidth')) + parseInt(menuStyle ? menuStyle.borderRightWidth : $menu.css('borderRightWidth'))
        },
            menuExtras = {
          vert: menuPadding.vert + parseInt(menuStyle ? menuStyle.marginTop : $menu.css('marginTop')) + parseInt(menuStyle ? menuStyle.marginBottom : $menu.css('marginBottom')) + 2,
          horiz: menuPadding.horiz + parseInt(menuStyle ? menuStyle.marginLeft : $menu.css('marginLeft')) + parseInt(menuStyle ? menuStyle.marginRight : $menu.css('marginRight')) + 2
        };

        document.body.removeChild(newElement);

        this.sizeInfo = {
          liHeight: liHeight,
          headerHeight: headerHeight,
          searchHeight: searchHeight,
          actionsHeight: actionsHeight,
          doneButtonHeight: doneButtonHeight,
          dividerHeight: dividerHeight,
          menuPadding: menuPadding,
          menuExtras: menuExtras
        };
      },

      setSize: function setSize() {
        this.findLis();
        this.liHeight();

        if (this.options.header) this.$menu.css('padding-top', 0);
        if (this.options.size === false) return;

        var that = this,
            $menu = this.$menu,
            $menuInner = this.$menuInner,
            $window = $(window),
            selectHeight = this.$newElement[0].offsetHeight,
            selectWidth = this.$newElement[0].offsetWidth,
            liHeight = this.sizeInfo['liHeight'],
            headerHeight = this.sizeInfo['headerHeight'],
            searchHeight = this.sizeInfo['searchHeight'],
            actionsHeight = this.sizeInfo['actionsHeight'],
            doneButtonHeight = this.sizeInfo['doneButtonHeight'],
            divHeight = this.sizeInfo['dividerHeight'],
            menuPadding = this.sizeInfo['menuPadding'],
            menuExtras = this.sizeInfo['menuExtras'],
            notDisabled = this.options.hideDisabled ? '.disabled' : '',
            menuHeight,
            menuWidth,
            getHeight,
            getWidth,
            selectOffsetTop,
            selectOffsetBot,
            selectOffsetLeft,
            selectOffsetRight,
            getPos = function getPos() {
          var pos = that.$newElement.offset(),
              $container = $(that.options.container),
              containerPos;

          if (that.options.container && !$container.is('body')) {
            containerPos = $container.offset();
            containerPos.top += parseInt($container.css('borderTopWidth'));
            containerPos.left += parseInt($container.css('borderLeftWidth'));
          } else {
            containerPos = { top: 0, left: 0 };
          }

          var winPad = that.options.windowPadding;
          selectOffsetTop = pos.top - containerPos.top - $window.scrollTop();
          selectOffsetBot = $window.height() - selectOffsetTop - selectHeight - containerPos.top - winPad[2];
          selectOffsetLeft = pos.left - containerPos.left - $window.scrollLeft();
          selectOffsetRight = $window.width() - selectOffsetLeft - selectWidth - containerPos.left - winPad[1];
          selectOffsetTop -= winPad[0];
          selectOffsetLeft -= winPad[3];
        };

        getPos();

        if (this.options.size === 'auto') {
          var getSize = function getSize() {
            var minHeight,
                hasClass = function hasClass(className, include) {
              return function (element) {
                if (include) {
                  return element.classList ? element.classList.contains(className) : $(element).hasClass(className);
                } else {
                  return !(element.classList ? element.classList.contains(className) : $(element).hasClass(className));
                }
              };
            },
                lis = that.$menuInner[0].getElementsByTagName('li'),
                lisVisible = Array.prototype.filter ? Array.prototype.filter.call(lis, hasClass('hidden', false)) : that.$lis.not('.hidden'),
                optGroup = Array.prototype.filter ? Array.prototype.filter.call(lisVisible, hasClass('dropdown-header', true)) : lisVisible.filter('.dropdown-header');

            getPos();
            menuHeight = selectOffsetBot - menuExtras.vert;
            menuWidth = selectOffsetRight - menuExtras.horiz;

            if (that.options.container) {
              if (!$menu.data('height')) $menu.data('height', $menu.height());
              getHeight = $menu.data('height');

              if (!$menu.data('width')) $menu.data('width', $menu.width());
              getWidth = $menu.data('width');
            } else {
              getHeight = $menu.height();
              getWidth = $menu.width();
            }

            if (that.options.dropupAuto) {
              that.$newElement.toggleClass('dropup', selectOffsetTop > selectOffsetBot && menuHeight - menuExtras.vert < getHeight);
            }

            if (that.$newElement.hasClass('dropup')) {
              menuHeight = selectOffsetTop - menuExtras.vert;
            }

            if (that.options.dropdownAlignRight === 'auto') {
              $menu.toggleClass('dropdown-menu-right', selectOffsetLeft > selectOffsetRight && menuWidth - menuExtras.horiz < getWidth - selectWidth);
            }

            if (lisVisible.length + optGroup.length > 3) {
              minHeight = liHeight * 3 + menuExtras.vert - 2;
            } else {
              minHeight = 0;
            }

            $menu.css({
              'max-height': menuHeight + 'px',
              'overflow': 'hidden',
              'min-height': minHeight + headerHeight + searchHeight + actionsHeight + doneButtonHeight + 'px'
            });
            $menuInner.css({
              'max-height': menuHeight - headerHeight - searchHeight - actionsHeight - doneButtonHeight - menuPadding.vert + 'px',
              'overflow-y': 'auto',
              'min-height': Math.max(minHeight - menuPadding.vert, 0) + 'px'
            });
          };
          getSize();
          this.$searchbox.off('input.getSize propertychange.getSize').on('input.getSize propertychange.getSize', getSize);
          $window.off('resize.getSize scroll.getSize').on('resize.getSize scroll.getSize', getSize);
        } else if (this.options.size && this.options.size != 'auto' && this.$lis.not(notDisabled).length > this.options.size) {
          var optIndex = this.$lis.not('.divider').not(notDisabled).children().slice(0, this.options.size).last().parent().index(),
              divLength = this.$lis.slice(0, optIndex + 1).filter('.divider').length;
          menuHeight = liHeight * this.options.size + divLength * divHeight + menuPadding.vert;

          if (that.options.container) {
            if (!$menu.data('height')) $menu.data('height', $menu.height());
            getHeight = $menu.data('height');
          } else {
            getHeight = $menu.height();
          }

          if (that.options.dropupAuto) {
            //noinspection JSUnusedAssignment
            this.$newElement.toggleClass('dropup', selectOffsetTop > selectOffsetBot && menuHeight - menuExtras.vert < getHeight);
          }
          $menu.css({
            'max-height': menuHeight + headerHeight + searchHeight + actionsHeight + doneButtonHeight + 'px',
            'overflow': 'hidden',
            'min-height': ''
          });
          $menuInner.css({
            'max-height': menuHeight - menuPadding.vert + 'px',
            'overflow-y': 'auto',
            'min-height': ''
          });
        }
      },

      setWidth: function setWidth() {
        if (this.options.width === 'auto') {
          this.$menu.css('min-width', '0');

          // Get correct width if element is hidden
          var $selectClone = this.$menu.parent().clone().appendTo('body'),
              $selectClone2 = this.options.container ? this.$newElement.clone().appendTo('body') : $selectClone,
              ulWidth = $selectClone.children('.dropdown-menu').outerWidth(),
              btnWidth = $selectClone2.css('width', 'auto').children('button').outerWidth();

          $selectClone.remove();
          $selectClone2.remove();

          // Set width to whatever's larger, button title or longest option
          this.$newElement.css('width', Math.max(ulWidth, btnWidth) + 'px');
        } else if (this.options.width === 'fit') {
          // Remove inline min-width so width can be changed from 'auto'
          this.$menu.css('min-width', '');
          this.$newElement.css('width', '').addClass('fit-width');
        } else if (this.options.width) {
          // Remove inline min-width so width can be changed from 'auto'
          this.$menu.css('min-width', '');
          this.$newElement.css('width', this.options.width);
        } else {
          // Remove inline min-width/width so width can be changed
          this.$menu.css('min-width', '');
          this.$newElement.css('width', '');
        }
        // Remove fit-width class if width is changed programmatically
        if (this.$newElement.hasClass('fit-width') && this.options.width !== 'fit') {
          this.$newElement.removeClass('fit-width');
        }
      },

      selectPosition: function selectPosition() {
        this.$bsContainer = $('<div class="bs-container" />');

        var that = this,
            $container = $(this.options.container),
            pos,
            containerPos,
            actualHeight,
            getPlacement = function getPlacement($element) {
          that.$bsContainer.addClass($element.attr('class').replace(/form-control|fit-width/gi, '')).toggleClass('dropup', $element.hasClass('dropup'));
          pos = $element.offset();

          if (!$container.is('body')) {
            containerPos = $container.offset();
            containerPos.top += parseInt($container.css('borderTopWidth')) - $container.scrollTop();
            containerPos.left += parseInt($container.css('borderLeftWidth')) - $container.scrollLeft();
          } else {
            containerPos = { top: 0, left: 0 };
          }

          actualHeight = $element.hasClass('dropup') ? 0 : $element[0].offsetHeight;

          that.$bsContainer.css({
            'top': pos.top - containerPos.top + actualHeight,
            'left': pos.left - containerPos.left,
            'width': $element[0].offsetWidth
          });
        };

        this.$button.on('click', function () {
          var $this = $(this);

          if (that.isDisabled()) {
            return;
          }

          getPlacement(that.$newElement);

          that.$bsContainer.appendTo(that.options.container).toggleClass('open', !$this.hasClass('open')).append(that.$menu);
        });

        $(window).on('resize scroll', function () {
          getPlacement(that.$newElement);
        });

        this.$element.on('hide.bs.select', function () {
          that.$menu.data('height', that.$menu.height());
          that.$bsContainer.detach();
        });
      },

      /**
       * @param {number} index - the index of the option that is being changed
       * @param {boolean} selected - true if the option is being selected, false if being deselected
       * @param {JQuery} $lis - the 'li' element that is being modified
       */
      setSelected: function setSelected(index, selected, $lis) {
        if (!$lis) {
          this.togglePlaceholder(); // check if setSelected is being called by changing the value of the select
          $lis = this.findLis().eq(this.liObj[index]);
        }

        $lis.toggleClass('selected', selected).find('a').attr('aria-selected', selected);
      },

      /**
       * @param {number} index - the index of the option that is being disabled
       * @param {boolean} disabled - true if the option is being disabled, false if being enabled
       * @param {JQuery} $lis - the 'li' element that is being modified
       */
      setDisabled: function setDisabled(index, disabled, $lis) {
        if (!$lis) {
          $lis = this.findLis().eq(this.liObj[index]);
        }

        if (disabled) {
          $lis.addClass('disabled').children('a').attr('href', '#').attr('tabindex', -1).attr('aria-disabled', true);
        } else {
          $lis.removeClass('disabled').children('a').removeAttr('href').attr('tabindex', 0).attr('aria-disabled', false);
        }
      },

      isDisabled: function isDisabled() {
        return this.$element[0].disabled;
      },

      checkDisabled: function checkDisabled() {
        var that = this;

        if (this.isDisabled()) {
          this.$newElement.addClass('disabled');
          this.$button.addClass('disabled').attr('tabindex', -1).attr('aria-disabled', true);
        } else {
          if (this.$button.hasClass('disabled')) {
            this.$newElement.removeClass('disabled');
            this.$button.removeClass('disabled').attr('aria-disabled', false);
          }

          if (this.$button.attr('tabindex') == -1 && !this.$element.data('tabindex')) {
            this.$button.removeAttr('tabindex');
          }
        }

        this.$button.click(function () {
          return !that.isDisabled();
        });
      },

      togglePlaceholder: function togglePlaceholder() {
        var value = this.$element.val();
        this.$button.toggleClass('bs-placeholder', value === null || value === '' || value.constructor === Array && value.length === 0);
      },

      tabIndex: function tabIndex() {
        if (this.$element.data('tabindex') !== this.$element.attr('tabindex') && this.$element.attr('tabindex') !== -98 && this.$element.attr('tabindex') !== '-98') {
          this.$element.data('tabindex', this.$element.attr('tabindex'));
          this.$button.attr('tabindex', this.$element.data('tabindex'));
        }

        this.$element.attr('tabindex', -98);
      },

      clickListener: function clickListener() {
        var that = this,
            $document = $(document);

        $document.data('spaceSelect', false);

        this.$button.on('keyup', function (e) {
          if (/(32)/.test(e.keyCode.toString(10)) && $document.data('spaceSelect')) {
            e.preventDefault();
            $document.data('spaceSelect', false);
          }
        });

        this.$button.on('click', function () {
          that.setSize();
        });

        this.$element.on('shown.bs.select', function () {
          if (!that.options.liveSearch && !that.multiple) {
            that.$menuInner.find('.selected a').focus();
          } else if (!that.multiple) {
            var selectedIndex = that.liObj[that.$element[0].selectedIndex];

            if (typeof selectedIndex !== 'number' || that.options.size === false) return;

            // scroll to selected option
            var offset = that.$lis.eq(selectedIndex)[0].offsetTop - that.$menuInner[0].offsetTop;
            offset = offset - that.$menuInner[0].offsetHeight / 2 + that.sizeInfo.liHeight / 2;
            that.$menuInner[0].scrollTop = offset;
          }
        });

        this.$menuInner.on('click', 'li a', function (e) {
          var $this = $(this),
              clickedIndex = $this.parent().data('originalIndex'),
              prevValue = that.$element.val(),
              prevIndex = that.$element.prop('selectedIndex'),
              triggerChange = true;

          // Don't close on multi choice menu
          if (that.multiple && that.options.maxOptions !== 1) {
            e.stopPropagation();
          }

          e.preventDefault();

          //Don't run if we have been disabled
          if (!that.isDisabled() && !$this.parent().hasClass('disabled')) {
            var $options = that.$element.find('option'),
                $option = $options.eq(clickedIndex),
                state = $option.prop('selected'),
                $optgroup = $option.parent('optgroup'),
                maxOptions = that.options.maxOptions,
                maxOptionsGrp = $optgroup.data('maxOptions') || false;

            if (!that.multiple) {
              // Deselect all others if not multi select box
              $options.prop('selected', false);
              $option.prop('selected', true);
              that.$menuInner.find('.selected').removeClass('selected').find('a').attr('aria-selected', false);
              that.setSelected(clickedIndex, true);
            } else {
              // Toggle the one we have chosen if we are multi select.
              $option.prop('selected', !state);
              that.setSelected(clickedIndex, !state);
              $this.blur();

              if (maxOptions !== false || maxOptionsGrp !== false) {
                var maxReached = maxOptions < $options.filter(':selected').length,
                    maxReachedGrp = maxOptionsGrp < $optgroup.find('option:selected').length;

                if (maxOptions && maxReached || maxOptionsGrp && maxReachedGrp) {
                  if (maxOptions && maxOptions == 1) {
                    $options.prop('selected', false);
                    $option.prop('selected', true);
                    that.$menuInner.find('.selected').removeClass('selected');
                    that.setSelected(clickedIndex, true);
                  } else if (maxOptionsGrp && maxOptionsGrp == 1) {
                    $optgroup.find('option:selected').prop('selected', false);
                    $option.prop('selected', true);
                    var optgroupID = $this.parent().data('optgroup');
                    that.$menuInner.find('[data-optgroup="' + optgroupID + '"]').removeClass('selected');
                    that.setSelected(clickedIndex, true);
                  } else {
                    var maxOptionsText = typeof that.options.maxOptionsText === 'string' ? [that.options.maxOptionsText, that.options.maxOptionsText] : that.options.maxOptionsText,
                        maxOptionsArr = typeof maxOptionsText === 'function' ? maxOptionsText(maxOptions, maxOptionsGrp) : maxOptionsText,
                        maxTxt = maxOptionsArr[0].replace('{n}', maxOptions),
                        maxTxtGrp = maxOptionsArr[1].replace('{n}', maxOptionsGrp),
                        $notify = $('<div class="notify"></div>');
                    // If {var} is set in array, replace it
                    /** @deprecated */
                    if (maxOptionsArr[2]) {
                      maxTxt = maxTxt.replace('{var}', maxOptionsArr[2][maxOptions > 1 ? 0 : 1]);
                      maxTxtGrp = maxTxtGrp.replace('{var}', maxOptionsArr[2][maxOptionsGrp > 1 ? 0 : 1]);
                    }

                    $option.prop('selected', false);

                    that.$menu.append($notify);

                    if (maxOptions && maxReached) {
                      $notify.append($('<div>' + maxTxt + '</div>'));
                      triggerChange = false;
                      that.$element.trigger('maxReached.bs.select');
                    }

                    if (maxOptionsGrp && maxReachedGrp) {
                      $notify.append($('<div>' + maxTxtGrp + '</div>'));
                      triggerChange = false;
                      that.$element.trigger('maxReachedGrp.bs.select');
                    }

                    setTimeout(function () {
                      that.setSelected(clickedIndex, false);
                    }, 10);

                    $notify.delay(750).fadeOut(300, function () {
                      $(this).remove();
                    });
                  }
                }
              }
            }

            if (!that.multiple || that.multiple && that.options.maxOptions === 1) {
              that.$button.focus();
            } else if (that.options.liveSearch) {
              that.$searchbox.focus();
            }

            // Trigger select 'change'
            if (triggerChange) {
              if (prevValue != that.$element.val() && that.multiple || prevIndex != that.$element.prop('selectedIndex') && !that.multiple) {
                // $option.prop('selected') is current option state (selected/unselected). state is previous option state.
                changed_arguments = [clickedIndex, $option.prop('selected'), state];
                that.$element.triggerNative('change');
              }
            }
          }
        });

        this.$menu.on('click', 'li.disabled a, .popover-title, .popover-title :not(.close)', function (e) {
          if (e.currentTarget == this) {
            e.preventDefault();
            e.stopPropagation();
            if (that.options.liveSearch && !$(e.target).hasClass('close')) {
              that.$searchbox.focus();
            } else {
              that.$button.focus();
            }
          }
        });

        this.$menuInner.on('click', '.divider, .dropdown-header', function (e) {
          e.preventDefault();
          e.stopPropagation();
          if (that.options.liveSearch) {
            that.$searchbox.focus();
          } else {
            that.$button.focus();
          }
        });

        this.$menu.on('click', '.popover-title .close', function () {
          that.$button.click();
        });

        this.$searchbox.on('click', function (e) {
          e.stopPropagation();
        });

        this.$menu.on('click', '.actions-btn', function (e) {
          if (that.options.liveSearch) {
            that.$searchbox.focus();
          } else {
            that.$button.focus();
          }

          e.preventDefault();
          e.stopPropagation();

          if ($(this).hasClass('bs-select-all')) {
            that.selectAll();
          } else {
            that.deselectAll();
          }
        });

        this.$element.change(function () {
          that.render(false);
          that.$element.trigger('changed.bs.select', changed_arguments);
          changed_arguments = null;
        });
      },

      liveSearchListener: function liveSearchListener() {
        var that = this,
            $no_results = $('<li class="no-results"></li>');

        this.$button.on('click.dropdown.data-api', function () {
          that.$menuInner.find('.active').removeClass('active');
          if (!!that.$searchbox.val()) {
            that.$searchbox.val('');
            that.$lis.not('.is-hidden').removeClass('hidden');
            if (!!$no_results.parent().length) $no_results.remove();
          }
          if (!that.multiple) that.$menuInner.find('.selected').addClass('active');
          setTimeout(function () {
            that.$searchbox.focus();
          }, 10);
        });

        this.$searchbox.on('click.dropdown.data-api focus.dropdown.data-api touchend.dropdown.data-api', function (e) {
          e.stopPropagation();
        });

        this.$searchbox.on('input propertychange', function () {
          that.$lis.not('.is-hidden').removeClass('hidden');
          that.$lis.filter('.active').removeClass('active');
          $no_results.remove();

          if (that.$searchbox.val()) {
            var $searchBase = that.$lis.not('.is-hidden, .divider, .dropdown-header'),
                $hideItems;
            if (that.options.liveSearchNormalize) {
              $hideItems = $searchBase.not(':a' + that._searchStyle() + '("' + normalizeToBase(that.$searchbox.val()) + '")');
            } else {
              $hideItems = $searchBase.not(':' + that._searchStyle() + '("' + that.$searchbox.val() + '")');
            }

            if ($hideItems.length === $searchBase.length) {
              $no_results.html(that.options.noneResultsText.replace('{0}', '"' + htmlEscape(that.$searchbox.val()) + '"'));
              that.$menuInner.append($no_results);
              that.$lis.addClass('hidden');
            } else {
              $hideItems.addClass('hidden');

              var $lisVisible = that.$lis.not('.hidden'),
                  $foundDiv;

              // hide divider if first or last visible, or if followed by another divider
              $lisVisible.each(function (index) {
                var $this = $(this);

                if ($this.hasClass('divider')) {
                  if ($foundDiv === undefined) {
                    $this.addClass('hidden');
                  } else {
                    if ($foundDiv) $foundDiv.addClass('hidden');
                    $foundDiv = $this;
                  }
                } else if ($this.hasClass('dropdown-header') && $lisVisible.eq(index + 1).data('optgroup') !== $this.data('optgroup')) {
                  $this.addClass('hidden');
                } else {
                  $foundDiv = null;
                }
              });
              if ($foundDiv) $foundDiv.addClass('hidden');

              $searchBase.not('.hidden').first().addClass('active');
              that.$menuInner.scrollTop(0);
            }
          }
        });
      },

      _searchStyle: function _searchStyle() {
        var styles = {
          begins: 'ibegins',
          startsWith: 'ibegins'
        };

        return styles[this.options.liveSearchStyle] || 'icontains';
      },

      val: function val(value) {
        if (typeof value !== 'undefined') {
          this.$element.val(value);
          this.render();

          return this.$element;
        } else {
          return this.$element.val();
        }
      },

      changeAll: function changeAll(status) {
        if (!this.multiple) return;
        if (typeof status === 'undefined') status = true;

        this.findLis();

        var $options = this.$element.find('option'),
            $lisVisible = this.$lis.not('.divider, .dropdown-header, .disabled, .hidden'),
            lisVisLen = $lisVisible.length,
            selectedOptions = [];

        if (status) {
          if ($lisVisible.filter('.selected').length === $lisVisible.length) return;
        } else {
          if ($lisVisible.filter('.selected').length === 0) return;
        }

        $lisVisible.toggleClass('selected', status);

        for (var i = 0; i < lisVisLen; i++) {
          var origIndex = $lisVisible[i].getAttribute('data-original-index');
          selectedOptions[selectedOptions.length] = $options.eq(origIndex)[0];
        }

        $(selectedOptions).prop('selected', status);

        this.render(false);

        this.togglePlaceholder();

        this.$element.triggerNative('change');
      },

      selectAll: function selectAll() {
        return this.changeAll(true);
      },

      deselectAll: function deselectAll() {
        return this.changeAll(false);
      },

      toggle: function toggle(e) {
        e = e || window.event;

        if (e) e.stopPropagation();

        this.$button.trigger('click');
      },

      keydown: function keydown(e) {
        var $this = $(this),
            $parent = $this.is('input') ? $this.parent().parent() : $this.parent(),
            $items,
            that = $parent.data('this'),
            index,
            prevIndex,
            isActive,
            selector = ':not(.disabled, .hidden, .dropdown-header, .divider)',
            keyCodeMap = {
          32: ' ',
          48: '0',
          49: '1',
          50: '2',
          51: '3',
          52: '4',
          53: '5',
          54: '6',
          55: '7',
          56: '8',
          57: '9',
          59: ';',
          65: 'a',
          66: 'b',
          67: 'c',
          68: 'd',
          69: 'e',
          70: 'f',
          71: 'g',
          72: 'h',
          73: 'i',
          74: 'j',
          75: 'k',
          76: 'l',
          77: 'm',
          78: 'n',
          79: 'o',
          80: 'p',
          81: 'q',
          82: 'r',
          83: 's',
          84: 't',
          85: 'u',
          86: 'v',
          87: 'w',
          88: 'x',
          89: 'y',
          90: 'z',
          96: '0',
          97: '1',
          98: '2',
          99: '3',
          100: '4',
          101: '5',
          102: '6',
          103: '7',
          104: '8',
          105: '9'
        };

        isActive = that.$newElement.hasClass('open');

        if (!isActive && (e.keyCode >= 48 && e.keyCode <= 57 || e.keyCode >= 96 && e.keyCode <= 105 || e.keyCode >= 65 && e.keyCode <= 90)) {
          if (!that.options.container) {
            that.setSize();
            that.$menu.parent().addClass('open');
            isActive = true;
          } else {
            that.$button.trigger('click');
          }
          that.$searchbox.focus();
          return;
        }

        if (that.options.liveSearch) {
          if (/(^9$|27)/.test(e.keyCode.toString(10)) && isActive) {
            e.preventDefault();
            e.stopPropagation();
            that.$menuInner.click();
            that.$button.focus();
          }
        }

        if (/(38|40)/.test(e.keyCode.toString(10))) {
          $items = that.$lis.filter(selector);
          if (!$items.length) return;

          if (!that.options.liveSearch) {
            index = $items.index($items.find('a').filter(':focus').parent());
          } else {
            index = $items.index($items.filter('.active'));
          }

          prevIndex = that.$menuInner.data('prevIndex');

          if (e.keyCode == 38) {
            if ((that.options.liveSearch || index == prevIndex) && index != -1) index--;
            if (index < 0) index += $items.length;
          } else if (e.keyCode == 40) {
            if (that.options.liveSearch || index == prevIndex) index++;
            index = index % $items.length;
          }

          that.$menuInner.data('prevIndex', index);

          if (!that.options.liveSearch) {
            $items.eq(index).children('a').focus();
          } else {
            e.preventDefault();
            if (!$this.hasClass('dropdown-toggle')) {
              $items.removeClass('active').eq(index).addClass('active').children('a').focus();
              $this.focus();
            }
          }
        } else if (!$this.is('input')) {
          var keyIndex = [],
              count,
              prevKey;

          $items = that.$lis.filter(selector);
          $items.each(function (i) {
            if ($.trim($(this).children('a').text().toLowerCase()).substring(0, 1) == keyCodeMap[e.keyCode]) {
              keyIndex.push(i);
            }
          });

          count = $(document).data('keycount');
          count++;
          $(document).data('keycount', count);

          prevKey = $.trim($(':focus').text().toLowerCase()).substring(0, 1);

          if (prevKey != keyCodeMap[e.keyCode]) {
            count = 1;
            $(document).data('keycount', count);
          } else if (count >= keyIndex.length) {
            $(document).data('keycount', 0);
            if (count > keyIndex.length) count = 1;
          }

          $items.eq(keyIndex[count - 1]).children('a').focus();
        }

        // Select focused option if "Enter", "Spacebar" or "Tab" (when selectOnTab is true) are pressed inside the menu.
        if ((/(13|32)/.test(e.keyCode.toString(10)) || /(^9$)/.test(e.keyCode.toString(10)) && that.options.selectOnTab) && isActive) {
          if (!/(32)/.test(e.keyCode.toString(10))) e.preventDefault();
          if (!that.options.liveSearch) {
            var elem = $(':focus');
            elem.click();
            // Bring back focus for multiselects
            elem.focus();
            // Prevent screen from scrolling if the user hit the spacebar
            e.preventDefault();
            // Fixes spacebar selection of dropdown items in FF & IE
            $(document).data('spaceSelect', true);
          } else if (!/(32)/.test(e.keyCode.toString(10))) {
            that.$menuInner.find('.active a').click();
            $this.focus();
          }
          $(document).data('keycount', 0);
        }

        if (/(^9$|27)/.test(e.keyCode.toString(10)) && isActive && (that.multiple || that.options.liveSearch) || /(27)/.test(e.keyCode.toString(10)) && !isActive) {
          that.$menu.parent().removeClass('open');
          if (that.options.container) that.$newElement.removeClass('open');
          that.$button.focus();
        }
      },

      mobile: function mobile() {
        this.$element.addClass('mobile-device');
      },

      refresh: function refresh() {
        this.$lis = null;
        this.liObj = {};
        this.reloadLi();
        this.render();
        this.checkDisabled();
        this.liHeight(true);
        this.setStyle();
        this.setWidth();
        if (this.$lis) this.$searchbox.trigger('propertychange');

        this.$element.trigger('refreshed.bs.select');
      },

      hide: function hide() {
        this.$newElement.hide();
      },

      show: function show() {
        this.$newElement.show();
      },

      remove: function remove() {
        this.$newElement.remove();
        this.$element.remove();
      },

      destroy: function destroy() {
        this.$newElement.before(this.$element).remove();

        if (this.$bsContainer) {
          this.$bsContainer.remove();
        } else {
          this.$menu.remove();
        }

        this.$element.off('.bs.select').removeData('selectpicker').removeClass('bs-select-hidden selectpicker');
      }
    };

    // SELECTPICKER PLUGIN DEFINITION
    // ==============================
    function Plugin(option) {
      // get the args of the outer function..
      var args = arguments;
      // The arguments of the function are explicitly re-defined from the argument list, because the shift causes them
      // to get lost/corrupted in android 2.3 and IE9 #715 #775
      var _option = option;

      [].shift.apply(args);

      var value;
      var chain = this.each(function () {
        var $this = $(this);
        if ($this.is('select')) {
          var data = $this.data('selectpicker'),
              options = (typeof _option === 'undefined' ? 'undefined' : _typeof(_option)) == 'object' && _option;

          if (!data) {
            var config = $.extend({}, Selectpicker.DEFAULTS, $.fn.selectpicker.defaults || {}, $this.data(), options);
            config.template = $.extend({}, Selectpicker.DEFAULTS.template, $.fn.selectpicker.defaults ? $.fn.selectpicker.defaults.template : {}, $this.data().template, options.template);
            $this.data('selectpicker', data = new Selectpicker(this, config));
          } else if (options) {
            for (var i in options) {
              if (options.hasOwnProperty(i)) {
                data.options[i] = options[i];
              }
            }
          }

          if (typeof _option == 'string') {
            if (data[_option] instanceof Function) {
              value = data[_option].apply(data, args);
            } else {
              value = data.options[_option];
            }
          }
        }
      });

      if (typeof value !== 'undefined') {
        //noinspection JSUnusedAssignment
        return value;
      } else {
        return chain;
      }
    }

    var old = $.fn.selectpicker;
    $.fn.selectpicker = Plugin;
    $.fn.selectpicker.Constructor = Selectpicker;

    // SELECTPICKER NO CONFLICT
    // ========================
    $.fn.selectpicker.noConflict = function () {
      $.fn.selectpicker = old;
      return this;
    };

    $(document).data('keycount', 0).on('keydown.bs.select', '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="listbox"], .bs-searchbox input', Selectpicker.prototype.keydown).on('focusin.modal', '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="listbox"], .bs-searchbox input', function (e) {
      e.stopPropagation();
    });

    // SELECTPICKER DATA-API
    // =====================
    $(window).on('load.bs.select.data-api', function () {
      $('.selectpicker').each(function () {
        var $selectpicker = $(this);
        Plugin.call($selectpicker, $selectpicker.data());
      });
    });
  })(jQuery);
});

/*!
* Parsley.js
* Version 2.8.0 - built Wed, Sep 13th 2017, 11:04 pm
* http://parsleyjs.org
* Guillaume Potier - <guillaume@wisembly.com>
* Marc-Andre Lafortune - <petroselinum@marc-andre.ca>
* MIT Licensed
*/
function _toConsumableArray(e) {
  if (Array.isArray(e)) {
    for (var t = 0, i = Array(e.length); t < e.length; t++) {
      i[t] = e[t];
    }return i;
  }return Array.from(e);
}var _slice = Array.prototype.slice,
    _slicedToArray = function () {
  function e(e, t) {
    var i = [],
        n = !0,
        r = !1,
        s = void 0;try {
      for (var a, o = e[Symbol.iterator](); !(n = (a = o.next()).done) && (i.push(a.value), !t || i.length !== t); n = !0) {}
    } catch (l) {
      r = !0, s = l;
    } finally {
      try {
        !n && o["return"] && o["return"]();
      } finally {
        if (r) throw s;
      }
    }return i;
  }return function (t, i) {
    if (Array.isArray(t)) return t;if (Symbol.iterator in Object(t)) return e(t, i);throw new TypeError("Invalid attempt to destructure non-iterable instance");
  };
}(),
    _extends = Object.assign || function (e) {
  for (var t = 1; t < arguments.length; t++) {
    var i = arguments[t];for (var n in i) {
      Object.prototype.hasOwnProperty.call(i, n) && (e[n] = i[n]);
    }
  }return e;
};!function (e, t) {
  "object" == (typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) && "undefined" != typeof module ? module.exports = t(require("jquery")) : "function" == typeof define && define.amd ? define(["jquery"], t) : e.parsley = t(e.jQuery);
}(this, function (e) {
  "use strict";
  function t(e, t) {
    return e.parsleyAdaptedCallback || (e.parsleyAdaptedCallback = function () {
      var i = Array.prototype.slice.call(arguments, 0);i.unshift(this), e.apply(t || M, i);
    }), e.parsleyAdaptedCallback;
  }function i(e) {
    return 0 === e.lastIndexOf(D, 0) ? e.substr(D.length) : e;
  } /**
    * inputevent - Alleviate browser bugs for input events
    * https://github.com/marcandre/inputevent
    * @version v0.0.3 - (built Thu, Apr 14th 2016, 5:58 pm)
    * @author Marc-Andre Lafortune <github@marc-andre.ca>
    * @license MIT
    */
  function n() {
    var t = this,
        i = window || global;_extends(this, { isNativeEvent: function isNativeEvent(e) {
        return e.originalEvent && e.originalEvent.isTrusted !== !1;
      }, fakeInputEvent: function fakeInputEvent(i) {
        t.isNativeEvent(i) && e(i.target).trigger("input");
      }, misbehaves: function misbehaves(i) {
        t.isNativeEvent(i) && (t.behavesOk(i), e(document).on("change.inputevent", i.data.selector, t.fakeInputEvent), t.fakeInputEvent(i));
      }, behavesOk: function behavesOk(i) {
        t.isNativeEvent(i) && e(document).off("input.inputevent", i.data.selector, t.behavesOk).off("change.inputevent", i.data.selector, t.misbehaves);
      }, install: function install() {
        if (!i.inputEventPatched) {
          i.inputEventPatched = "0.0.3";for (var n = ["select", 'input[type="checkbox"]', 'input[type="radio"]', 'input[type="file"]'], r = 0; r < n.length; r++) {
            var s = n[r];e(document).on("input.inputevent", s, { selector: s }, t.behavesOk).on("change.inputevent", s, { selector: s }, t.misbehaves);
          }
        }
      }, uninstall: function uninstall() {
        delete i.inputEventPatched, e(document).off(".inputevent");
      } });
  }var r = 1,
      s = {},
      a = { attr: function attr(e, t, i) {
      var n,
          r,
          s,
          a = new RegExp("^" + t, "i");if ("undefined" == typeof i) i = {};else for (n in i) {
        i.hasOwnProperty(n) && delete i[n];
      }if (!e) return i;for (s = e.attributes, n = s.length; n--;) {
        r = s[n], r && r.specified && a.test(r.name) && (i[this.camelize(r.name.slice(t.length))] = this.deserializeValue(r.value));
      }return i;
    }, checkAttr: function checkAttr(e, t, i) {
      return e.hasAttribute(t + i);
    }, setAttr: function setAttr(e, t, i, n) {
      e.setAttribute(this.dasherize(t + i), String(n));
    }, getType: function getType(e) {
      return e.getAttribute("type") || "text";
    }, generateID: function generateID() {
      return "" + r++;
    }, deserializeValue: function deserializeValue(e) {
      var t;try {
        return e ? "true" == e || "false" != e && ("null" == e ? null : isNaN(t = Number(e)) ? /^[\[\{]/.test(e) ? JSON.parse(e) : e : t) : e;
      } catch (i) {
        return e;
      }
    }, camelize: function camelize(e) {
      return e.replace(/-+(.)?/g, function (e, t) {
        return t ? t.toUpperCase() : "";
      });
    }, dasherize: function dasherize(e) {
      return e.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase();
    }, warn: function warn() {
      var e;window.console && "function" == typeof window.console.warn && (e = window.console).warn.apply(e, arguments);
    }, warnOnce: function warnOnce(e) {
      s[e] || (s[e] = !0, this.warn.apply(this, arguments));
    }, _resetWarnings: function _resetWarnings() {
      s = {};
    }, trimString: function trimString(e) {
      return e.replace(/^\s+|\s+$/g, "");
    }, parse: { date: function S(e) {
        var t = e.match(/^(\d{4,})-(\d\d)-(\d\d)$/);if (!t) return null;var i = t.map(function (e) {
          return parseInt(e, 10);
        }),
            n = _slicedToArray(i, 4),
            r = (n[0], n[1]),
            s = n[2],
            a = n[3],
            S = new Date(r, s - 1, a);return S.getFullYear() !== r || S.getMonth() + 1 !== s || S.getDate() !== a ? null : S;
      }, string: function string(e) {
        return e;
      }, integer: function integer(e) {
        return isNaN(e) ? null : parseInt(e, 10);
      }, number: function number(e) {
        if (isNaN(e)) throw null;return parseFloat(e);
      }, "boolean": function boolean(e) {
        return !/^\s*false\s*$/i.test(e);
      }, object: function object(e) {
        return a.deserializeValue(e);
      }, regexp: function regexp(e) {
        var t = "";return (/^\/.*\/(?:[gimy]*)$/.test(e) ? (t = e.replace(/.*\/([gimy]*)$/, "$1"), e = e.replace(new RegExp("^/(.*?)/" + t + "$"), "$1")) : e = "^" + e + "$", new RegExp(e, t)
        );
      } }, parseRequirement: function parseRequirement(e, t) {
      var i = this.parse[e || "string"];if (!i) throw 'Unknown requirement specification: "' + e + '"';var n = i(t);if (null === n) throw "Requirement is not a " + e + ': "' + t + '"';return n;
    }, namespaceEvents: function namespaceEvents(t, i) {
      return t = this.trimString(t || "").split(/\s+/), t[0] ? e.map(t, function (e) {
        return e + "." + i;
      }).join(" ") : "";
    }, difference: function difference(t, i) {
      var n = [];return e.each(t, function (e, t) {
        i.indexOf(t) == -1 && n.push(t);
      }), n;
    }, all: function all(t) {
      return e.when.apply(e, _toConsumableArray(t).concat([42, 42]));
    }, objectCreate: Object.create || function () {
      var e = function e() {};return function (t) {
        if (arguments.length > 1) throw Error("Second argument not supported");if ("object" != (typeof t === 'undefined' ? 'undefined' : _typeof(t))) throw TypeError("Argument must be an object");e.prototype = t;var i = new e();return e.prototype = null, i;
      };
    }(), _SubmitSelector: 'input[type="submit"], button:submit' },
      o = { namespace: "data-parsley-", inputs: "input, textarea, select", excluded: "input[type=button], input[type=submit], input[type=reset], input[type=hidden]", priorityEnabled: !0, multiple: null, group: null, uiEnabled: !0, validationThreshold: 3, focus: "first", trigger: !1, triggerAfterFailure: "input", errorClass: "parsley-error", successClass: "parsley-success", classHandler: function classHandler(e) {}, errorsContainer: function errorsContainer(e) {}, errorsWrapper: '<ul class="parsley-errors-list"></ul>', errorTemplate: "<li></li>" },
      l = function l() {
    this.__id__ = a.generateID();
  };l.prototype = { asyncSupport: !0, _pipeAccordingToValidationResult: function _pipeAccordingToValidationResult() {
      var t = this,
          i = function i() {
        var i = e.Deferred();return !0 !== t.validationResult && i.reject(), i.resolve().promise();
      };return [i, i];
    }, actualizeOptions: function actualizeOptions() {
      return a.attr(this.element, this.options.namespace, this.domOptions), this.parent && this.parent.actualizeOptions && this.parent.actualizeOptions(), this;
    }, _resetOptions: function _resetOptions(e) {
      this.domOptions = a.objectCreate(this.parent.options), this.options = a.objectCreate(this.domOptions);for (var t in e) {
        e.hasOwnProperty(t) && (this.options[t] = e[t]);
      }this.actualizeOptions();
    }, _listeners: null, on: function on(e, t) {
      this._listeners = this._listeners || {};var i = this._listeners[e] = this._listeners[e] || [];return i.push(t), this;
    }, subscribe: function subscribe(t, i) {
      e.listenTo(this, t.toLowerCase(), i);
    }, off: function off(e, t) {
      var i = this._listeners && this._listeners[e];if (i) if (t) for (var n = i.length; n--;) {
        i[n] === t && i.splice(n, 1);
      } else delete this._listeners[e];return this;
    }, unsubscribe: function unsubscribe(t, i) {
      e.unsubscribeTo(this, t.toLowerCase());
    }, trigger: function trigger(e, t, i) {
      t = t || this;var n,
          r = this._listeners && this._listeners[e];if (r) for (var s = r.length; s--;) {
        if (n = r[s].call(t, t, i), n === !1) return n;
      }return !this.parent || this.parent.trigger(e, t, i);
    }, asyncIsValid: function asyncIsValid(e, t) {
      return a.warnOnce("asyncIsValid is deprecated; please use whenValid instead"), this.whenValid({ group: e, force: t });
    }, _findRelated: function _findRelated() {
      return this.options.multiple ? e(this.parent.element.querySelectorAll("[" + this.options.namespace + 'multiple="' + this.options.multiple + '"]')) : this.$element;
    } };var u = function u(e, t) {
    var i = e.match(/^\s*\[(.*)\]\s*$/);if (!i) throw 'Requirement is not an array: "' + e + '"';var n = i[1].split(",").map(a.trimString);if (n.length !== t) throw "Requirement has " + n.length + " values when " + t + " are needed";return n;
  },
      d = function d(e, t, i) {
    var n = null,
        r = {};for (var s in e) {
      if (s) {
        var o = i(s);"string" == typeof o && (o = a.parseRequirement(e[s], o)), r[s] = o;
      } else n = a.parseRequirement(e[s], t);
    }return [n, r];
  },
      h = function h(t) {
    e.extend(!0, this, t);
  };h.prototype = { validate: function validate(e, t) {
      if (this.fn) return arguments.length > 3 && (t = [].slice.call(arguments, 1, -1)), this.fn(e, t);if (Array.isArray(e)) {
        if (!this.validateMultiple) throw "Validator `" + this.name + "` does not handle multiple values";return this.validateMultiple.apply(this, arguments);
      }var i = arguments[arguments.length - 1];if (this.validateDate && i._isDateInput()) return arguments[0] = a.parse.date(arguments[0]), null !== arguments[0] && this.validateDate.apply(this, arguments);if (this.validateNumber) return !isNaN(e) && (arguments[0] = parseFloat(arguments[0]), this.validateNumber.apply(this, arguments));if (this.validateString) return this.validateString.apply(this, arguments);throw "Validator `" + this.name + "` only handles multiple values";
    }, parseRequirements: function parseRequirements(t, i) {
      if ("string" != typeof t) return Array.isArray(t) ? t : [t];var n = this.requirementType;if (Array.isArray(n)) {
        for (var r = u(t, n.length), s = 0; s < r.length; s++) {
          r[s] = a.parseRequirement(n[s], r[s]);
        }return r;
      }return e.isPlainObject(n) ? d(n, t, i) : [a.parseRequirement(n, t)];
    }, requirementType: "string", priority: 2 };var p = function p(e, t) {
    this.__class__ = "ValidatorRegistry", this.locale = "en", this.init(e || {}, t || {});
  },
      c = { email: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i, number: /^-?(\d*\.)?\d+(e[-+]?\d+)?$/i, integer: /^-?\d+$/, digits: /^\d+$/, alphanum: /^\w+$/i, date: { test: function test(e) {
        return null !== a.parse.date(e);
      } }, url: new RegExp('^(?:(?:https?|ftp)://)?(?:\\S+(?::\\S*)?@)?(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))(?::\\d{2,5})?(?:/\\S*)?$', "i") };c.range = c.number;var f = function f(e) {
    var t = ("" + e).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);return t ? Math.max(0, (t[1] ? t[1].length : 0) - (t[2] ? +t[2] : 0)) : 0;
  },
      m = function m(e, t) {
    return t.map(a.parse[e]);
  },
      g = function g(e, t) {
    return function (i) {
      for (var n = arguments.length, r = Array(n > 1 ? n - 1 : 0), s = 1; s < n; s++) {
        r[s - 1] = arguments[s];
      }return r.pop(), t.apply(void 0, [i].concat(_toConsumableArray(m(e, r))));
    };
  },
      v = function v(e) {
    return { validateDate: g("date", e), validateNumber: g("number", e), requirementType: e.length <= 2 ? "string" : ["string", "string"], priority: 30 };
  };p.prototype = { init: function init(e, t) {
      this.catalog = t, this.validators = _extends({}, this.validators);for (var i in e) {
        this.addValidator(i, e[i].fn, e[i].priority);
      }window.Parsley.trigger("parsley:validator:init");
    }, setLocale: function setLocale(e) {
      if ("undefined" == typeof this.catalog[e]) throw new Error(e + " is not available in the catalog");return this.locale = e, this;
    }, addCatalog: function addCatalog(e, t, i) {
      return "object" == (typeof t === 'undefined' ? 'undefined' : _typeof(t)) && (this.catalog[e] = t), !0 === i ? this.setLocale(e) : this;
    }, addMessage: function addMessage(e, t, i) {
      return "undefined" == typeof this.catalog[e] && (this.catalog[e] = {}), this.catalog[e][t] = i, this;
    }, addMessages: function addMessages(e, t) {
      for (var i in t) {
        this.addMessage(e, i, t[i]);
      }return this;
    }, addValidator: function addValidator(e, t, i) {
      if (this.validators[e]) a.warn('Validator "' + e + '" is already defined.');else if (o.hasOwnProperty(e)) return void a.warn('"' + e + '" is a restricted keyword and is not a valid validator name.');return this._setValidator.apply(this, arguments);
    }, hasValidator: function hasValidator(e) {
      return !!this.validators[e];
    }, updateValidator: function updateValidator(e, t, i) {
      return this.validators[e] ? this._setValidator.apply(this, arguments) : (a.warn('Validator "' + e + '" is not already defined.'), this.addValidator.apply(this, arguments));
    }, removeValidator: function removeValidator(e) {
      return this.validators[e] || a.warn('Validator "' + e + '" is not defined.'), delete this.validators[e], this;
    }, _setValidator: function _setValidator(e, t, i) {
      "object" != (typeof t === 'undefined' ? 'undefined' : _typeof(t)) && (t = { fn: t, priority: i }), t.validate || (t = new h(t)), this.validators[e] = t;for (var n in t.messages || {}) {
        this.addMessage(n, e, t.messages[n]);
      }return this;
    }, getErrorMessage: function getErrorMessage(e) {
      var t;if ("type" === e.name) {
        var i = this.catalog[this.locale][e.name] || {};t = i[e.requirements];
      } else t = this.formatMessage(this.catalog[this.locale][e.name], e.requirements);return t || this.catalog[this.locale].defaultMessage || this.catalog.en.defaultMessage;
    }, formatMessage: function formatMessage(e, t) {
      if ("object" == (typeof t === 'undefined' ? 'undefined' : _typeof(t))) {
        for (var i in t) {
          e = this.formatMessage(e, t[i]);
        }return e;
      }return "string" == typeof e ? e.replace(/%s/i, t) : "";
    }, validators: { notblank: { validateString: function validateString(e) {
          return (/\S/.test(e)
          );
        }, priority: 2 }, required: { validateMultiple: function validateMultiple(e) {
          return e.length > 0;
        }, validateString: function validateString(e) {
          return (/\S/.test(e)
          );
        }, priority: 512 }, type: { validateString: function validateString(e, t) {
          var i = arguments.length <= 2 || void 0 === arguments[2] ? {} : arguments[2],
              n = i.step,
              r = void 0 === n ? "any" : n,
              s = i.base,
              a = void 0 === s ? 0 : s,
              o = c[t];if (!o) throw new Error("validator type `" + t + "` is not supported");if (!o.test(e)) return !1;if ("number" === t && !/^any$/i.test(r || "")) {
            var l = Number(e),
                u = Math.max(f(r), f(a));if (f(l) > u) return !1;var d = function d(e) {
              return Math.round(e * Math.pow(10, u));
            };if ((d(l) - d(a)) % d(r) != 0) return !1;
          }return !0;
        }, requirementType: { "": "string", step: "string", base: "number" }, priority: 256 }, pattern: { validateString: function validateString(e, t) {
          return t.test(e);
        }, requirementType: "regexp", priority: 64 }, minlength: { validateString: function validateString(e, t) {
          return e.length >= t;
        }, requirementType: "integer", priority: 30 }, maxlength: { validateString: function validateString(e, t) {
          return e.length <= t;
        }, requirementType: "integer", priority: 30 }, length: { validateString: function validateString(e, t, i) {
          return e.length >= t && e.length <= i;
        }, requirementType: ["integer", "integer"], priority: 30 }, mincheck: { validateMultiple: function validateMultiple(e, t) {
          return e.length >= t;
        }, requirementType: "integer", priority: 30 }, maxcheck: { validateMultiple: function validateMultiple(e, t) {
          return e.length <= t;
        }, requirementType: "integer", priority: 30 }, check: { validateMultiple: function validateMultiple(e, t, i) {
          return e.length >= t && e.length <= i;
        }, requirementType: ["integer", "integer"], priority: 30 }, min: v(function (e, t) {
        return e >= t;
      }), max: v(function (e, t) {
        return e <= t;
      }), range: v(function (e, t, i) {
        return e >= t && e <= i;
      }), equalto: { validateString: function validateString(t, i) {
          var n = e(i);return n.length ? t === n.val() : t === i;
        }, priority: 256 } } };var y = {},
      _ = function k(e, t, i) {
    for (var n = [], r = [], s = 0; s < e.length; s++) {
      for (var a = !1, o = 0; o < t.length; o++) {
        if (e[s].assert.name === t[o].assert.name) {
          a = !0;break;
        }
      }a ? r.push(e[s]) : n.push(e[s]);
    }return { kept: r, added: n, removed: i ? [] : k(t, e, !0).added };
  };y.Form = { _actualizeTriggers: function _actualizeTriggers() {
      var e = this;this.$element.on("submit.Parsley", function (t) {
        e.onSubmitValidate(t);
      }), this.$element.on("click.Parsley", a._SubmitSelector, function (t) {
        e.onSubmitButton(t);
      }), !1 !== this.options.uiEnabled && this.element.setAttribute("novalidate", "");
    }, focus: function focus() {
      if (this._focusedField = null, !0 === this.validationResult || "none" === this.options.focus) return null;for (var e = 0; e < this.fields.length; e++) {
        var t = this.fields[e];if (!0 !== t.validationResult && t.validationResult.length > 0 && "undefined" == typeof t.options.noFocus && (this._focusedField = t.$element, "first" === this.options.focus)) break;
      }return null === this._focusedField ? null : this._focusedField.focus();
    }, _destroyUI: function _destroyUI() {
      this.$element.off(".Parsley");
    } }, y.Field = { _reflowUI: function _reflowUI() {
      if (this._buildUI(), this._ui) {
        var e = _(this.validationResult, this._ui.lastValidationResult);this._ui.lastValidationResult = this.validationResult, this._manageStatusClass(), this._manageErrorsMessages(e), this._actualizeTriggers(), !e.kept.length && !e.added.length || this._failedOnce || (this._failedOnce = !0, this._actualizeTriggers());
      }
    }, getErrorsMessages: function getErrorsMessages() {
      if (!0 === this.validationResult) return [];for (var e = [], t = 0; t < this.validationResult.length; t++) {
        e.push(this.validationResult[t].errorMessage || this._getErrorMessage(this.validationResult[t].assert));
      }return e;
    }, addError: function addError(e) {
      var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
          i = t.message,
          n = t.assert,
          r = t.updateClass,
          s = void 0 === r || r;this._buildUI(), this._addError(e, { message: i, assert: n }), s && this._errorClass();
    }, updateError: function updateError(e) {
      var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
          i = t.message,
          n = t.assert,
          r = t.updateClass,
          s = void 0 === r || r;this._buildUI(), this._updateError(e, { message: i, assert: n }), s && this._errorClass();
    }, removeError: function removeError(e) {
      var t = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1],
          i = t.updateClass,
          n = void 0 === i || i;this._buildUI(), this._removeError(e), n && this._manageStatusClass();
    }, _manageStatusClass: function _manageStatusClass() {
      this.hasConstraints() && this.needsValidation() && !0 === this.validationResult ? this._successClass() : this.validationResult.length > 0 ? this._errorClass() : this._resetClass();
    }, _manageErrorsMessages: function _manageErrorsMessages(t) {
      if ("undefined" == typeof this.options.errorsMessagesDisabled) {
        if ("undefined" != typeof this.options.errorMessage) return t.added.length || t.kept.length ? (this._insertErrorWrapper(), 0 === this._ui.$errorsWrapper.find(".parsley-custom-error-message").length && this._ui.$errorsWrapper.append(e(this.options.errorTemplate).addClass("parsley-custom-error-message")), this._ui.$errorsWrapper.addClass("filled").find(".parsley-custom-error-message").html(this.options.errorMessage)) : this._ui.$errorsWrapper.removeClass("filled").find(".parsley-custom-error-message").remove();for (var i = 0; i < t.removed.length; i++) {
          this._removeError(t.removed[i].assert.name);
        }for (i = 0; i < t.added.length; i++) {
          this._addError(t.added[i].assert.name, { message: t.added[i].errorMessage, assert: t.added[i].assert });
        }for (i = 0; i < t.kept.length; i++) {
          this._updateError(t.kept[i].assert.name, { message: t.kept[i].errorMessage, assert: t.kept[i].assert });
        }
      }
    }, _addError: function _addError(t, i) {
      var n = i.message,
          r = i.assert;this._insertErrorWrapper(), this._ui.$errorsWrapper.addClass("filled").append(e(this.options.errorTemplate).addClass("parsley-" + t).html(n || this._getErrorMessage(r)));
    }, _updateError: function _updateError(e, t) {
      var i = t.message,
          n = t.assert;this._ui.$errorsWrapper.addClass("filled").find(".parsley-" + e).html(i || this._getErrorMessage(n));
    }, _removeError: function _removeError(e) {
      this._ui.$errorsWrapper.removeClass("filled").find(".parsley-" + e).remove();
    }, _getErrorMessage: function _getErrorMessage(e) {
      var t = e.name + "Message";return "undefined" != typeof this.options[t] ? window.Parsley.formatMessage(this.options[t], e.requirements) : window.Parsley.getErrorMessage(e);
    }, _buildUI: function _buildUI() {
      if (!this._ui && !1 !== this.options.uiEnabled) {
        var t = {};this.element.setAttribute(this.options.namespace + "id", this.__id__), t.$errorClassHandler = this._manageClassHandler(), t.errorsWrapperId = "parsley-id-" + (this.options.multiple ? "multiple-" + this.options.multiple : this.__id__), t.$errorsWrapper = e(this.options.errorsWrapper).attr("id", t.errorsWrapperId), t.lastValidationResult = [], t.validationInformationVisible = !1, this._ui = t;
      }
    }, _manageClassHandler: function _manageClassHandler() {
      if ("string" == typeof this.options.classHandler && e(this.options.classHandler).length) return e(this.options.classHandler);var t = this.options.classHandler;if ("string" == typeof this.options.classHandler && "function" == typeof window[this.options.classHandler] && (t = window[this.options.classHandler]), "function" == typeof t) {
        var i = t.call(this, this);if ("undefined" != typeof i && i.length) return i;
      } else {
        if ("object" == (typeof t === 'undefined' ? 'undefined' : _typeof(t)) && t instanceof jQuery && t.length) return t;t && a.warn("The class handler `" + t + "` does not exist in DOM nor as a global JS function");
      }return this._inputHolder();
    }, _inputHolder: function _inputHolder() {
      return this.options.multiple && "SELECT" !== this.element.nodeName ? this.$element.parent() : this.$element;
    }, _insertErrorWrapper: function _insertErrorWrapper() {
      var t = this.options.errorsContainer;if (0 !== this._ui.$errorsWrapper.parent().length) return this._ui.$errorsWrapper.parent();if ("string" == typeof t) {
        if (e(t).length) return e(t).append(this._ui.$errorsWrapper);"function" == typeof window[t] ? t = window[t] : a.warn("The errors container `" + t + "` does not exist in DOM nor as a global JS function");
      }return "function" == typeof t && (t = t.call(this, this)), "object" == (typeof t === 'undefined' ? 'undefined' : _typeof(t)) && t.length ? t.append(this._ui.$errorsWrapper) : this._inputHolder().after(this._ui.$errorsWrapper);
    }, _actualizeTriggers: function _actualizeTriggers() {
      var e,
          t = this,
          i = this._findRelated();i.off(".Parsley"), this._failedOnce ? i.on(a.namespaceEvents(this.options.triggerAfterFailure, "Parsley"), function () {
        t._validateIfNeeded();
      }) : (e = a.namespaceEvents(this.options.trigger, "Parsley")) && i.on(e, function (e) {
        t._validateIfNeeded(e);
      });
    }, _validateIfNeeded: function _validateIfNeeded(e) {
      var t = this;e && /key|input/.test(e.type) && (!this._ui || !this._ui.validationInformationVisible) && this.getValue().length <= this.options.validationThreshold || (this.options.debounce ? (window.clearTimeout(this._debounced), this._debounced = window.setTimeout(function () {
        return t.validate();
      }, this.options.debounce)) : this.validate());
    }, _resetUI: function _resetUI() {
      this._failedOnce = !1, this._actualizeTriggers(), "undefined" != typeof this._ui && (this._ui.$errorsWrapper.removeClass("filled").children().remove(), this._resetClass(), this._ui.lastValidationResult = [], this._ui.validationInformationVisible = !1);
    }, _destroyUI: function _destroyUI() {
      this._resetUI(), "undefined" != typeof this._ui && this._ui.$errorsWrapper.remove(), delete this._ui;
    }, _successClass: function _successClass() {
      this._ui.validationInformationVisible = !0, this._ui.$errorClassHandler.removeClass(this.options.errorClass).addClass(this.options.successClass);
    }, _errorClass: function _errorClass() {
      this._ui.validationInformationVisible = !0, this._ui.$errorClassHandler.removeClass(this.options.successClass).addClass(this.options.errorClass);
    }, _resetClass: function _resetClass() {
      this._ui.$errorClassHandler.removeClass(this.options.successClass).removeClass(this.options.errorClass);
    } };var w = function w(t, i, n) {
    this.__class__ = "Form", this.element = t, this.$element = e(t), this.domOptions = i, this.options = n, this.parent = window.Parsley, this.fields = [], this.validationResult = null;
  },
      b = { pending: null, resolved: !0, rejected: !1 };w.prototype = { onSubmitValidate: function onSubmitValidate(e) {
      var t = this;if (!0 !== e.parsley) {
        var i = this._submitSource || this.$element.find(a._SubmitSelector)[0];if (this._submitSource = null, this.$element.find(".parsley-synthetic-submit-button").prop("disabled", !0), !i || null === i.getAttribute("formnovalidate")) {
          window.Parsley._remoteCache = {};var n = this.whenValidate({ event: e });"resolved" === n.state() && !1 !== this._trigger("submit") || (e.stopImmediatePropagation(), e.preventDefault(), "pending" === n.state() && n.done(function () {
            t._submit(i);
          }));
        }
      }
    }, onSubmitButton: function onSubmitButton(e) {
      this._submitSource = e.currentTarget;
    }, _submit: function _submit(t) {
      if (!1 !== this._trigger("submit")) {
        if (t) {
          var i = this.$element.find(".parsley-synthetic-submit-button").prop("disabled", !1);0 === i.length && (i = e('<input class="parsley-synthetic-submit-button" type="hidden">').appendTo(this.$element)), i.attr({ name: t.getAttribute("name"), value: t.getAttribute("value") });
        }this.$element.trigger(_extends(e.Event("submit"), { parsley: !0 }));
      }
    }, validate: function validate(t) {
      if (arguments.length >= 1 && !e.isPlainObject(t)) {
        a.warnOnce("Calling validate on a parsley form without passing arguments as an object is deprecated.");var i = _slice.call(arguments),
            n = i[0],
            r = i[1],
            s = i[2];t = { group: n, force: r, event: s };
      }return b[this.whenValidate(t).state()];
    }, whenValidate: function whenValidate() {
      var t,
          i = this,
          n = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
          r = n.group,
          s = n.force,
          o = n.event;this.submitEvent = o, o && (this.submitEvent = _extends({}, o, { preventDefault: function preventDefault() {
          a.warnOnce("Using `this.submitEvent.preventDefault()` is deprecated; instead, call `this.validationResult = false`"), i.validationResult = !1;
        } })), this.validationResult = !0, this._trigger("validate"), this._refreshFields();var l = this._withoutReactualizingFormOptions(function () {
        return e.map(i.fields, function (e) {
          return e.whenValidate({ force: s, group: r });
        });
      });return (t = a.all(l).done(function () {
        i._trigger("success");
      }).fail(function () {
        i.validationResult = !1, i.focus(), i._trigger("error");
      }).always(function () {
        i._trigger("validated");
      })).pipe.apply(t, _toConsumableArray(this._pipeAccordingToValidationResult()));
    }, isValid: function isValid(t) {
      if (arguments.length >= 1 && !e.isPlainObject(t)) {
        a.warnOnce("Calling isValid on a parsley form without passing arguments as an object is deprecated.");var i = _slice.call(arguments),
            n = i[0],
            r = i[1];t = { group: n, force: r };
      }return b[this.whenValid(t).state()];
    }, whenValid: function whenValid() {
      var t = this,
          i = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
          n = i.group,
          r = i.force;this._refreshFields();var s = this._withoutReactualizingFormOptions(function () {
        return e.map(t.fields, function (e) {
          return e.whenValid({ group: n, force: r });
        });
      });return a.all(s);
    }, refresh: function refresh() {
      return this._refreshFields(), this;
    }, reset: function reset() {
      for (var e = 0; e < this.fields.length; e++) {
        this.fields[e].reset();
      }this._trigger("reset");
    }, destroy: function destroy() {
      this._destroyUI();for (var e = 0; e < this.fields.length; e++) {
        this.fields[e].destroy();
      }this.$element.removeData("Parsley"), this._trigger("destroy");
    }, _refreshFields: function _refreshFields() {
      return this.actualizeOptions()._bindFields();
    }, _bindFields: function _bindFields() {
      var t = this,
          i = this.fields;return this.fields = [], this.fieldsMappedById = {}, this._withoutReactualizingFormOptions(function () {
        t.$element.find(t.options.inputs).not(t.options.excluded).each(function (e, i) {
          var n = new window.Parsley.Factory(i, {}, t);if (("Field" === n.__class__ || "FieldMultiple" === n.__class__) && !0 !== n.options.excluded) {
            var r = n.__class__ + "-" + n.__id__;"undefined" == typeof t.fieldsMappedById[r] && (t.fieldsMappedById[r] = n, t.fields.push(n));
          }
        }), e.each(a.difference(i, t.fields), function (e, t) {
          t.reset();
        });
      }), this;
    }, _withoutReactualizingFormOptions: function _withoutReactualizingFormOptions(e) {
      var t = this.actualizeOptions;this.actualizeOptions = function () {
        return this;
      };var i = e();return this.actualizeOptions = t, i;
    }, _trigger: function _trigger(e) {
      return this.trigger("form:" + e);
    } };var F = function F(e, t, i, n, r) {
    var s = window.Parsley._validatorRegistry.validators[t],
        a = new h(s);n = n || e.options[t + "Priority"] || a.priority, r = !0 === r, _extends(this, { validator: a, name: t, requirements: i, priority: n, isDomConstraint: r }), this._parseRequirements(e.options);
  },
      C = function C(e) {
    var t = e[0].toUpperCase();return t + e.slice(1);
  };F.prototype = { validate: function validate(e, t) {
      var i;return (i = this.validator).validate.apply(i, [e].concat(_toConsumableArray(this.requirementList), [t]));
    }, _parseRequirements: function _parseRequirements(e) {
      var t = this;this.requirementList = this.validator.parseRequirements(this.requirements, function (i) {
        return e[t.name + C(i)];
      });
    } };var E = function E(t, i, n, r) {
    this.__class__ = "Field", this.element = t, this.$element = e(t), "undefined" != typeof r && (this.parent = r), this.options = n, this.domOptions = i, this.constraints = [], this.constraintsByName = {}, this.validationResult = !0, this._bindConstraints();
  },
      A = { pending: null, resolved: !0, rejected: !1 };E.prototype = { validate: function validate(t) {
      arguments.length >= 1 && !e.isPlainObject(t) && (a.warnOnce("Calling validate on a parsley field without passing arguments as an object is deprecated."), t = { options: t });var i = this.whenValidate(t);if (!i) return !0;switch (i.state()) {case "pending":
          return null;case "resolved":
          return !0;case "rejected":
          return this.validationResult;}
    }, whenValidate: function whenValidate() {
      var e,
          t = this,
          i = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
          n = i.force,
          r = i.group;if (this.refresh(), !r || this._isInGroup(r)) return this.value = this.getValue(), this._trigger("validate"), (e = this.whenValid({ force: n, value: this.value, _refreshed: !0 }).always(function () {
        t._reflowUI();
      }).done(function () {
        t._trigger("success");
      }).fail(function () {
        t._trigger("error");
      }).always(function () {
        t._trigger("validated");
      })).pipe.apply(e, _toConsumableArray(this._pipeAccordingToValidationResult()));
    }, hasConstraints: function hasConstraints() {
      return 0 !== this.constraints.length;
    }, needsValidation: function needsValidation(e) {
      return "undefined" == typeof e && (e = this.getValue()), !(!e.length && !this._isRequired() && "undefined" == typeof this.options.validateIfEmpty);
    }, _isInGroup: function _isInGroup(t) {
      return Array.isArray(this.options.group) ? -1 !== e.inArray(t, this.options.group) : this.options.group === t;
    }, isValid: function isValid(t) {
      if (arguments.length >= 1 && !e.isPlainObject(t)) {
        a.warnOnce("Calling isValid on a parsley field without passing arguments as an object is deprecated.");var i = _slice.call(arguments),
            n = i[0],
            r = i[1];t = { force: n, value: r };
      }var s = this.whenValid(t);return !s || A[s.state()];
    }, whenValid: function whenValid() {
      var t = this,
          i = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
          n = i.force,
          r = void 0 !== n && n,
          s = i.value,
          o = i.group,
          l = i._refreshed;if (l || this.refresh(), !o || this._isInGroup(o)) {
        if (this.validationResult = !0, !this.hasConstraints()) return e.when();if ("undefined" != typeof s && null !== s || (s = this.getValue()), !this.needsValidation(s) && !0 !== r) return e.when();var u = this._getGroupedConstraints(),
            d = [];return e.each(u, function (i, n) {
          var r = a.all(e.map(n, function (e) {
            return t._validateConstraint(s, e);
          }));if (d.push(r), "rejected" === r.state()) return !1;
        }), a.all(d);
      }
    }, _validateConstraint: function _validateConstraint(t, i) {
      var n = this,
          r = i.validate(t, this);return !1 === r && (r = e.Deferred().reject()), a.all([r]).fail(function (e) {
        n.validationResult instanceof Array || (n.validationResult = []), n.validationResult.push({ assert: i, errorMessage: "string" == typeof e && e });
      });
    }, getValue: function getValue() {
      var e;return e = "function" == typeof this.options.value ? this.options.value(this) : "undefined" != typeof this.options.value ? this.options.value : this.$element.val(), "undefined" == typeof e || null === e ? "" : this._handleWhitespace(e);
    }, reset: function reset() {
      return this._resetUI(), this._trigger("reset");
    }, destroy: function destroy() {
      this._destroyUI(), this.$element.removeData("Parsley"), this.$element.removeData("FieldMultiple"), this._trigger("destroy");
    }, refresh: function refresh() {
      return this._refreshConstraints(), this;
    }, _refreshConstraints: function _refreshConstraints() {
      return this.actualizeOptions()._bindConstraints();
    }, refreshConstraints: function refreshConstraints() {
      return a.warnOnce("Parsley's refreshConstraints is deprecated. Please use refresh"), this.refresh();
    }, addConstraint: function addConstraint(e, t, i, n) {
      if (window.Parsley._validatorRegistry.validators[e]) {
        var r = new F(this, e, t, i, n);"undefined" !== this.constraintsByName[r.name] && this.removeConstraint(r.name), this.constraints.push(r), this.constraintsByName[r.name] = r;
      }return this;
    }, removeConstraint: function removeConstraint(e) {
      for (var t = 0; t < this.constraints.length; t++) {
        if (e === this.constraints[t].name) {
          this.constraints.splice(t, 1);break;
        }
      }return delete this.constraintsByName[e], this;
    }, updateConstraint: function updateConstraint(e, t, i) {
      return this.removeConstraint(e).addConstraint(e, t, i);
    }, _bindConstraints: function _bindConstraints() {
      for (var e = [], t = {}, i = 0; i < this.constraints.length; i++) {
        !1 === this.constraints[i].isDomConstraint && (e.push(this.constraints[i]), t[this.constraints[i].name] = this.constraints[i]);
      }this.constraints = e, this.constraintsByName = t;for (var n in this.options) {
        this.addConstraint(n, this.options[n], void 0, !0);
      }return this._bindHtml5Constraints();
    }, _bindHtml5Constraints: function _bindHtml5Constraints() {
      null !== this.element.getAttribute("required") && this.addConstraint("required", !0, void 0, !0), null !== this.element.getAttribute("pattern") && this.addConstraint("pattern", this.element.getAttribute("pattern"), void 0, !0);var e = this.element.getAttribute("min"),
          t = this.element.getAttribute("max");null !== e && null !== t ? this.addConstraint("range", [e, t], void 0, !0) : null !== e ? this.addConstraint("min", e, void 0, !0) : null !== t && this.addConstraint("max", t, void 0, !0), null !== this.element.getAttribute("minlength") && null !== this.element.getAttribute("maxlength") ? this.addConstraint("length", [this.element.getAttribute("minlength"), this.element.getAttribute("maxlength")], void 0, !0) : null !== this.element.getAttribute("minlength") ? this.addConstraint("minlength", this.element.getAttribute("minlength"), void 0, !0) : null !== this.element.getAttribute("maxlength") && this.addConstraint("maxlength", this.element.getAttribute("maxlength"), void 0, !0);var i = a.getType(this.element);return "number" === i ? this.addConstraint("type", ["number", { step: this.element.getAttribute("step") || "1", base: e || this.element.getAttribute("value") }], void 0, !0) : /^(email|url|range|date)$/i.test(i) ? this.addConstraint("type", i, void 0, !0) : this;
    }, _isRequired: function _isRequired() {
      return "undefined" != typeof this.constraintsByName.required && !1 !== this.constraintsByName.required.requirements;
    }, _trigger: function _trigger(e) {
      return this.trigger("field:" + e);
    }, _handleWhitespace: function _handleWhitespace(e) {
      return !0 === this.options.trimValue && a.warnOnce('data-parsley-trim-value="true" is deprecated, please use data-parsley-whitespace="trim"'), "squish" === this.options.whitespace && (e = e.replace(/\s{2,}/g, " ")), "trim" !== this.options.whitespace && "squish" !== this.options.whitespace && !0 !== this.options.trimValue || (e = a.trimString(e)), e;
    }, _isDateInput: function _isDateInput() {
      var e = this.constraintsByName.type;return e && "date" === e.requirements;
    }, _getGroupedConstraints: function _getGroupedConstraints() {
      if (!1 === this.options.priorityEnabled) return [this.constraints];for (var e = [], t = {}, i = 0; i < this.constraints.length; i++) {
        var n = this.constraints[i].priority;t[n] || e.push(t[n] = []), t[n].push(this.constraints[i]);
      }return e.sort(function (e, t) {
        return t[0].priority - e[0].priority;
      }), e;
    } };var x = E,
      $ = function $() {
    this.__class__ = "FieldMultiple";
  };$.prototype = { addElement: function addElement(e) {
      return this.$elements.push(e), this;
    }, _refreshConstraints: function _refreshConstraints() {
      var t;if (this.constraints = [], "SELECT" === this.element.nodeName) return this.actualizeOptions()._bindConstraints(), this;for (var i = 0; i < this.$elements.length; i++) {
        if (e("html").has(this.$elements[i]).length) {
          t = this.$elements[i].data("FieldMultiple")._refreshConstraints().constraints;for (var n = 0; n < t.length; n++) {
            this.addConstraint(t[n].name, t[n].requirements, t[n].priority, t[n].isDomConstraint);
          }
        } else this.$elements.splice(i, 1);
      }return this;
    }, getValue: function getValue() {
      if ("function" == typeof this.options.value) return this.options.value(this);if ("undefined" != typeof this.options.value) return this.options.value;if ("INPUT" === this.element.nodeName) {
        var t = a.getType(this.element);if ("radio" === t) return this._findRelated().filter(":checked").val() || "";if ("checkbox" === t) {
          var i = [];return this._findRelated().filter(":checked").each(function () {
            i.push(e(this).val());
          }), i;
        }
      }return "SELECT" === this.element.nodeName && null === this.$element.val() ? [] : this.$element.val();
    }, _init: function _init() {
      return this.$elements = [this.$element], this;
    } };var P = function P(t, i, n) {
    this.element = t, this.$element = e(t);var r = this.$element.data("Parsley");if (r) return "undefined" != typeof n && r.parent === window.Parsley && (r.parent = n, r._resetOptions(r.options)), "object" == (typeof i === 'undefined' ? 'undefined' : _typeof(i)) && _extends(r.options, i), r;if (!this.$element.length) throw new Error("You must bind Parsley on an existing element.");if ("undefined" != typeof n && "Form" !== n.__class__) throw new Error("Parent instance must be a Form instance");return this.parent = n || window.Parsley, this.init(i);
  };P.prototype = { init: function init(e) {
      return this.__class__ = "Parsley", this.__version__ = "2.8.0", this.__id__ = a.generateID(), this._resetOptions(e), "FORM" === this.element.nodeName || a.checkAttr(this.element, this.options.namespace, "validate") && !this.$element.is(this.options.inputs) ? this.bind("parsleyForm") : this.isMultiple() ? this.handleMultiple() : this.bind("parsleyField");
    }, isMultiple: function isMultiple() {
      var e = a.getType(this.element);return "radio" === e || "checkbox" === e || "SELECT" === this.element.nodeName && null !== this.element.getAttribute("multiple");
    }, handleMultiple: function handleMultiple() {
      var t,
          i,
          n = this;if (this.options.multiple = this.options.multiple || (t = this.element.getAttribute("name")) || this.element.getAttribute("id"), "SELECT" === this.element.nodeName && null !== this.element.getAttribute("multiple")) return this.options.multiple = this.options.multiple || this.__id__, this.bind("parsleyFieldMultiple");if (!this.options.multiple) return a.warn("To be bound by Parsley, a radio, a checkbox and a multiple select input must have either a name or a multiple option.", this.$element), this;this.options.multiple = this.options.multiple.replace(/(:|\.|\[|\]|\{|\}|\$)/g, ""), t && e('input[name="' + t + '"]').each(function (e, t) {
        var i = a.getType(t);"radio" !== i && "checkbox" !== i || t.setAttribute(n.options.namespace + "multiple", n.options.multiple);
      });for (var r = this._findRelated(), s = 0; s < r.length; s++) {
        if (i = e(r.get(s)).data("Parsley"), "undefined" != typeof i) {
          this.$element.data("FieldMultiple") || i.addElement(this.$element);break;
        }
      }return this.bind("parsleyField", !0), i || this.bind("parsleyFieldMultiple");
    }, bind: function bind(t, i) {
      var n;switch (t) {case "parsleyForm":
          n = e.extend(new w(this.element, this.domOptions, this.options), new l(), window.ParsleyExtend)._bindFields();break;case "parsleyField":
          n = e.extend(new x(this.element, this.domOptions, this.options, this.parent), new l(), window.ParsleyExtend);break;case "parsleyFieldMultiple":
          n = e.extend(new x(this.element, this.domOptions, this.options, this.parent), new $(), new l(), window.ParsleyExtend)._init();break;default:
          throw new Error(t + "is not a supported Parsley type");}return this.options.multiple && a.setAttr(this.element, this.options.namespace, "multiple", this.options.multiple), "undefined" != typeof i ? (this.$element.data("FieldMultiple", n), n) : (this.$element.data("Parsley", n), n._actualizeTriggers(), n._trigger("init"), n);
    } };var V = e.fn.jquery.split(".");if (parseInt(V[0]) <= 1 && parseInt(V[1]) < 8) throw "The loaded version of jQuery is too old. Please upgrade to 1.8.x or better.";V.forEach || a.warn("Parsley requires ES5 to run properly. Please include https://github.com/es-shims/es5-shim");var T = _extends(new l(), { element: document, $element: e(document), actualizeOptions: null, _resetOptions: null, Factory: P, version: "2.8.0" });_extends(x.prototype, y.Field, l.prototype), _extends(w.prototype, y.Form, l.prototype), _extends(P.prototype, l.prototype), e.fn.parsley = e.fn.psly = function (t) {
    if (this.length > 1) {
      var i = [];return this.each(function () {
        i.push(e(this).parsley(t));
      }), i;
    }if (0 != this.length) return new P(this[0], t);
  }, "undefined" == typeof window.ParsleyExtend && (window.ParsleyExtend = {}), T.options = _extends(a.objectCreate(o), window.ParsleyConfig), window.ParsleyConfig = T.options, window.Parsley = window.psly = T, T.Utils = a, window.ParsleyUtils = {}, e.each(a, function (e, t) {
    "function" == typeof t && (window.ParsleyUtils[e] = function () {
      return a.warnOnce("Accessing `window.ParsleyUtils` is deprecated. Use `window.Parsley.Utils` instead."), a[e].apply(a, arguments);
    });
  });var O = window.Parsley._validatorRegistry = new p(window.ParsleyConfig.validators, window.ParsleyConfig.i18n);window.ParsleyValidator = {}, e.each("setLocale addCatalog addMessage addMessages getErrorMessage formatMessage addValidator updateValidator removeValidator hasValidator".split(" "), function (e, t) {
    window.Parsley[t] = function () {
      return O[t].apply(O, arguments);
    }, window.ParsleyValidator[t] = function () {
      var e;return a.warnOnce("Accessing the method '" + t + "' through Validator is deprecated. Simply call 'window.Parsley." + t + "(...)'"), (e = window.Parsley)[t].apply(e, arguments);
    };
  }), window.Parsley.UI = y, window.ParsleyUI = { removeError: function removeError(e, t, i) {
      var n = !0 !== i;return a.warnOnce("Accessing UI is deprecated. Call 'removeError' on the instance directly. Please comment in issue 1073 as to your need to call this method."), e.removeError(t, { updateClass: n });
    }, getErrorsMessages: function getErrorsMessages(e) {
      return a.warnOnce("Accessing UI is deprecated. Call 'getErrorsMessages' on the instance directly."), e.getErrorsMessages();
    } }, e.each("addError updateError".split(" "), function (e, t) {
    window.ParsleyUI[t] = function (e, i, n, r, s) {
      var o = !0 !== s;return a.warnOnce("Accessing UI is deprecated. Call '" + t + "' on the instance directly. Please comment in issue 1073 as to your need to call this method."), e[t](i, { message: n, assert: r, updateClass: o });
    };
  }), !1 !== window.ParsleyConfig.autoBind && e(function () {
    e("[data-parsley-validate]").length && e("[data-parsley-validate]").parsley();
  });var M = e({}),
      R = function R() {
    a.warnOnce("Parsley's pubsub module is deprecated; use the 'on' and 'off' methods on parsley instances or window.Parsley");
  },
      D = "parsley:";e.listen = function (e, n) {
    var r;if (R(), "object" == _typeof(arguments[1]) && "function" == typeof arguments[2] && (r = arguments[1], n = arguments[2]), "function" != typeof n) throw new Error("Wrong parameters");window.Parsley.on(i(e), t(n, r));
  }, e.listenTo = function (e, n, r) {
    if (R(), !(e instanceof x || e instanceof w)) throw new Error("Must give Parsley instance");if ("string" != typeof n || "function" != typeof r) throw new Error("Wrong parameters");e.on(i(n), t(r));
  }, e.unsubscribe = function (e, t) {
    if (R(), "string" != typeof e || "function" != typeof t) throw new Error("Wrong arguments");window.Parsley.off(i(e), t.parsleyAdaptedCallback);
  }, e.unsubscribeTo = function (e, t) {
    if (R(), !(e instanceof x || e instanceof w)) throw new Error("Must give Parsley instance");e.off(i(t));
  }, e.unsubscribeAll = function (t) {
    R(), window.Parsley.off(i(t)), e("form,input,textarea,select").each(function () {
      var n = e(this).data("Parsley");n && n.off(i(t));
    });
  }, e.emit = function (e, t) {
    var n;R();var r = t instanceof x || t instanceof w,
        s = Array.prototype.slice.call(arguments, r ? 2 : 1);s.unshift(i(e)), r || (t = window.Parsley), (n = t).trigger.apply(n, _toConsumableArray(s));
  };e.extend(!0, T, { asyncValidators: { "default": { fn: function fn(e) {
          return e.status >= 200 && e.status < 300;
        }, url: !1 }, reverse: { fn: function fn(e) {
          return e.status < 200 || e.status >= 300;
        }, url: !1 } }, addAsyncValidator: function addAsyncValidator(e, t, i, n) {
      return T.asyncValidators[e] = { fn: t, url: i || !1, options: n || {} }, this;
    } }), T.addValidator("remote", { requirementType: { "": "string", validator: "string", reverse: "boolean", options: "object" }, validateString: function validateString(t, i, n, r) {
      var s,
          a,
          o = {},
          l = n.validator || (!0 === n.reverse ? "reverse" : "default");if ("undefined" == typeof T.asyncValidators[l]) throw new Error("Calling an undefined async validator: `" + l + "`");i = T.asyncValidators[l].url || i, i.indexOf("{value}") > -1 ? i = i.replace("{value}", encodeURIComponent(t)) : o[r.element.getAttribute("name") || r.element.getAttribute("id")] = t;var u = e.extend(!0, n.options || {}, T.asyncValidators[l].options);s = e.extend(!0, {}, { url: i, data: o, type: "GET" }, u), r.trigger("field:ajaxoptions", r, s), a = e.param(s), "undefined" == typeof T._remoteCache && (T._remoteCache = {});var d = T._remoteCache[a] = T._remoteCache[a] || e.ajax(s),
          h = function h() {
        var t = T.asyncValidators[l].fn.call(r, d, i, n);return t || (t = e.Deferred().reject()), e.when(t);
      };return d.then(h, h);
    }, priority: -1 }), T.on("form:submit", function () {
    T._remoteCache = {};
  }), l.prototype.addAsyncValidator = function () {
    return a.warnOnce("Accessing the method `addAsyncValidator` through an instance is deprecated. Simply call `Parsley.addAsyncValidator(...)`"), T.addAsyncValidator.apply(T, arguments);
  }, T.addMessages("en", { defaultMessage: "This value seems to be invalid.", type: { email: "This value should be a valid email.", url: "This value should be a valid url.", number: "This value should be a valid number.", integer: "This value should be a valid integer.", digits: "This value should be digits.", alphanum: "This value should be alphanumeric." }, notblank: "This value should not be blank.", required: "This value is required.", pattern: "This value seems to be invalid.", min: "This value should be greater than or equal to %s.", max: "This value should be lower than or equal to %s.", range: "This value should be between %s and %s.", minlength: "This value is too short. It should have %s characters or more.", maxlength: "This value is too long. It should have %s characters or fewer.", length: "This value length is invalid. It should be between %s and %s characters long.", mincheck: "You must select at least %s choices.", maxcheck: "You must select %s choices or fewer.", check: "You must select between %s and %s choices.", equalto: "This value should be the same." }), T.setLocale("en");var I = new n();I.install();var q = T;return q;
});
//# sourceMappingURL=parsley.min.js.map