define(function (require, exports, module) {
  var $ = require('./core');
  require('./queue');
  require('./ele');
  require('./arg');
  require('./css');
  require('./class');


  module.exports = $;
})