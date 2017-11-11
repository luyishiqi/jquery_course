define(function (require, exports, module) {
  var $ = require('./core');
  $.fn.extend({
      css: function () {
        var _arg = $.toArr(arguments),
          _self = this;
        console.log(this);
        return this._argType(_arg, function (propety) {
          return getComputedStyle(this.element)[propety];
        }, function (obj) {
          _self
            .each(function (index, element) {
              $
                .each(obj, function (key, val) {
                  element.style[key] = val + $.unitHandle(key);
                });
            })
        }, function (key, val) {
          _self
            .each(function (index, element) {
              element.style[key] = val;
            })
        })
      }
  })
  module.exports=$;
})