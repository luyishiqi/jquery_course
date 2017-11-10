define(function (require, exports, module) {
  var todoDoms = require('./todoElements'),
       todoBtn = todoDoms.todoBtn,
      todoText = todoDoms.todoText,
      todoList = todoDoms.todoList;
  function Todo() {
    return new Todo.prototype.init();
  }
  Todo.prototype = {
    constructor: Todo,
    init: function () {
     
      var _self = this;
      todoBtn.addEventListener('click', function (e) {
        _self._addTodo();
      })
      todoText.addEventListener('keydown', function (e) {
        if (e.keyCode === 13) {
          _self._addTodo();
        }
      })
    },
    _addTodo: function () {
      var val = todoText.value;
      if (val === '' || val.length === 0) {
        alert('任务名不能为空');
        return;
      }
      var li = this._createTodo(val);
      todoList.appendChild(li);
      todoText.value = '';
    },
    _createTodo: function (html) {
      var li = document.createElement('li');
      li.innerHTML = html;
      return li;
    }
  }
  Todo.prototype.init.prototype = Todo.prototype;


  module.exports = Todo;
})