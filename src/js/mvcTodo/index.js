define(function (reqire, exports, module) {

  /**
   *  option选项配置
   *
   *  text       :文本框的dom
   *  btn        ：按钮dom
   *  defaultTodoList： 初始化一个todoList
   *  todoListDom: 任务列表的dom
   */

  function Todo(option) {
    this.todoList    = option.defaultTodoList || [];
    this.btn         = option.btn;
    this.text        = option.text;
    this.todoListDom = option.todoListDom;
  }
  Todo.prototype = {
    constructro: Todo,
    /**
     * 初识化任务系统
     */
    init:function(){
      this._render();
      this._bindEvent();
    },

    /**
     * 绑定事件
     */
    _bindEvent:function(){
      //点击添加任务的事件
      var _self = this;
      this.btn.addEventListener('click',function(){
        _self._addTodo();
      })
      this.text.addEventListener('keydown',function(e){
        if(e.keyCode===13){
          _self._addTodo();
        }
      });


      //绑定删除事件，使用事件委托
      this.todoListDom.addEventListener('click',function(e){
        var target = e.target,
           tagName = target.tagName.toLowerCase();
        if(!tagName==='input'){
          return;
        }
        var todoIndex = target.parentNode.getAttribute('todoIndex');
              control = target.getAttribute('control');
        console.log(todoIndex);
        if(control==='del'){
          _self._delTodo(todoIndex);
        }
        if(control==='toggleDone'){
          _self._toggleTodo(todoIndex);
        }

        _self._render();
      })
    },

    /**
     * 切换任务状态
     */
    _toggleTodo:function(index){
      this.todoList[index].done=true
    },

    /**
     * 删除任务
     */
    _delTodo:function(index){
      this.todoList.splice(index,1);
    },

    /**
     * 添加任务
     */
    _addTodo:function(){
      var _val=this.text.value;
      if(_val===''||_val.length===0){
        alert('任务名不能为空');
        return;
      }

      //给任务列表添加任务
      this.todoList.push({
        name:_val,
        done:false,
      });
      //清空文本框
      this.text.value='';

      this._render();//刷新view层
    },


    /**
     * 创建按钮
     */
    _createBtn:function(value,control){
      //创建按钮
      var input   = document.createElement('input');
      input.type  = 'button';
      input.value = value;
      input.setAttribute('control',control);
      return input;
    },

    /**
     * 将todolist渲染到 界面（view）上
     */
    _render:function(){
      // 将todoList渲染到dom结构上
      var frame = document.createDocumentFragment(),
          _self = this;
      this.todoList.forEach(function(todo,index){
        var  todoDom = document.createElement('li'),
            delInput = _self._createBtn('删除','del'),
           doneInput = _self._createBtn('完成','toggleDone');

        if(todo.done){
          todoDom.className='todo done'
        }else{
          todoDom.className='todo';
        }
        todoDom.innerHTML=todo.name;
        todoDom.setAttribute('todoIndex',index);
        todoDom.appendChild(delInput);
        todoDom.appendChild(doneInput);
        frame.appendChild(todoDom);
      });
      console.log(this.todoListDom)
      this.todoListDom.innerHTML='';
      this.todoListDom.appendChild(frame);
    },
  }

  module.exports = function (option) {
    return new Todo(option);
  };

})