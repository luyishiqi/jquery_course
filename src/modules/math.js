define(function (require, exports, module) {
  // 模拟块作用域
  /**
   *  作用域里面的所有方法和变量，不能够随便访问和修改
   *
   *
   * 如果要使用内部的变量或者方法，则需要暴露出去
  */

  function add(a, b) {
    return a + b;
  }
  function mutil(a, b) {
    return a * b;
  }
  //暴露api 暴露多个方法或者变量
  exports.add = add;
  exports.mutil = mutil;
})
