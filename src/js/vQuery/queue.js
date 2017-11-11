define(function (require, exports, module) {
  var $ = require('./core');
/**
 * 
 * 这些东西必须是函数
 */
  $.extend($, {
    queue: function () {
      var queue = [];
      return {
        deQueue: function (data) {
          if(!$.isFunction(data)){
            console.error('data is not a function')
          }
          queue.push(data);
          return this;
        },
        enQueue: function () {
          return queue.shift();
        },
        count: function () {
          return queue.length;
        },
        isEmpty: function () {
          return $.count() === 0;
        }
      }
    }
  })

  module.exports = $;
})