define(function (require, exports, module) {
  var $ = require('./core');
  $.fn.extend({
      _argType: function (arg, oneFn, objectFn, twoArgFn) {
        if (arg.length === 1) {
          if ($.isString(arg[0])) {
            return oneFn && oneFn(arg[0]);
          }
          if ($.isObject(arg[0])) {
            objectFn && objectFn(arg[0]);
            return this;
          }
        }
        if (arg.length === 2) {
          twoArgFn && twoArgFn(arg[0], arg[1]);
          return this;
        }
      }
  })
  module.exports=$;
})