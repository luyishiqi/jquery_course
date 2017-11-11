define(function (require, exports, module) {
  var tag = /<(\w+)>/,
  op = Object.prototype,
  toString = op.toString;



  // 核心代码
  function $(cssSelector) {
    return $
      .fn
      .init(cssSelector);
  }

  $.type = function (data) {
    var t = toString
      .call(data)
      .match(/\[object\s(.+)\]/)[1]
      .toLowerCase()
    return t;
  }
  $.each = function (arg, callback) {
    if ($.type(arg) === 'array') {

      for (var i = 0; i < arg.length; i++) {
        var item = arg[i];
        callback.call(arg, i, item);
      }
    }
    if ($.type(arg) === 'object') {

      for (var key in arg) {
        var val = arg[key];

        callback.call(arg, key, val);
      }
    }
  }
  $.arrIsEmpty = function (arr) {
    return arr.length === 0;
  }
  $.toArr = function (data) {
    return []
      .slice
      .call(data);
  }

  $.unitHandle = function (attr) {
    var a = [
      'width',
        'height',
        'top',
        'left',
        'right',
        'bottom'
      ]
      .concat($.toDir('margin'))
      .concat($.toDir('padding'));
    var pxReg = new RegExp(a.join('|'));
    if (pxReg.test(attr)) {
      return 'px';
    } else {
      return '';
    }
  }
  $.toDir = function (attr) {
    return ['Left', 'Bottom', 'Right', 'Top'].map(function (item) {
      return attr + item;
    });
  }
  $.extend = function (target) {
    var objs = []
      .slice
      .call(arguments, 1);
    for (var i = 0; i < objs.length; i++) {
      var object = objs[i];
      for (var key in object) {
        var val = object[key];
        if ($.type(val) === 'array') {
          target[key] = $.extend([], val);
        } else if ($.type(val) === 'object') {
          target[key] = $.extend({}, val);
        } else {
          target[key] = object[key];
        }
      }
    }
    return target;
  };

  $.ready = function (callback) {
    console.log('jfklsdajfklj')
    // document.addEventListener("DOMContentLoaded", function (event) {
    //   console.log("DOM fully loaded and parsed");
    // });
    window.onload = callback;
  };

  [
    'Function',
      'Object',
      'Null',
      'Number',
      'Undefined',
      'Array',
      'Boolean',
      'String'
    ].forEach(function (item, index) {
    $['is' + item] = function (data) {
      return $.type(data) === item.toLowerCase();
    }
  })

  $.fn = $.prototype = {
    constructor: $,
    init: function (cssSelector) {
      if (typeof cssSelector === 'string') {
        //
        if (tag.test(cssSelector)) {
          //创建元素
          var _match = dom.match(tag),
            _tagName = _match[1];
          //
          this
            .elements
            .push(document.createElement(_tagName));
        } else {
          //通过css选择器来获取元素
          this.elements = $.toArr(document.querySelectorAll(cssSelector));
        }
      }
      if (cssSelector.nodeType) {
        //是一个元素
        this
          .elements
          .push(cssSelector);
      }
      if ($.isFunction(cssSelector)) {
        console.log(cssSelector, '是一个函数');
        $.ready(function () {
          cssSelector();
        })
      }
      return this;
    },
    each:function(callback){
      $.each(this.elements,callback);
    },
    extend: function () {
      var _arg = []
        .slice
        .call(arguments);
      var result;
      _arg.unshift($.fn);
      $
        .extend
        .apply(this, _arg);
    }
  }

  module.exports = $;
})