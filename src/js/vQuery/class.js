define(function(require,exports,module){
  var $=require('./core');
  $.fn.extend({
    addClass:function(clsName){
      this.each(function(index,element){
        // console.log($(element));
      });
      return this;
    },
    hasClass:function(clsName){
      var reg = new RegExp('^' + clsName + '\\b|\\b' + clsName + '\\b|\\b' + clsName + '$');
      return reg.test(this.elements[0].className);
    },
    removeClass:function(clsName){
      this.each(function (index, element) {
        if ($(element).hasClass(clsName)) {
          var classList = $(element).classNameList();
          
        }
      })

    return this;
    },
  });
  module.exports=$;
})