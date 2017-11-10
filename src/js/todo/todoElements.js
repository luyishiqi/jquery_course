// 获取所需要的核心dom
define(function(require,exports,module){

  function getElement(cssSelector){
    return document.querySelector(cssSelector);
  }
  
  exports.todoText = getElement('.todo-text');
  exports.todoBtn  = getElement('.todo-btn');
  exports.todoList = getElement('.todo-list');
  
})