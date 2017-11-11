define(function (require, exports, module) {
  var $ = require('./core');
  $
    .fn
    .extend({
      size: function () {
        return this.elements.length;
      },
      get: function (index) {
        if (index === -1) {
          return this.elements[this.size() - 1];
        } else {
          return this.elements[index];
        }
      },
      eq: function (index) {
        var ele = this.get(index);
        console.log(ele,'eqwqqewq');
        this.elements.length = 0;
        this
          .elements
          .push(ele);
        return this;
      },
      first: function () {
        return this.eq(0);
      },
      last: function () {
        return this.eq(-1);
      }
    });
  module.exports = $;
})