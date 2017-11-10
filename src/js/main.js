require(['./mvcTodo/index'],function(mvcTodo){
  mvcTodo({
    text            : document.querySelector('.todo-text'),
    btn             : document.querySelector('.todo-btn'),
    defaultTodoList : [
                        {name:'学习github',done:true},
                        {name:'学习requirejs',done:false},
                        {name:'学习jquery',done:false},
                      ],
    todoListDom     : document.querySelector('.todo-list'), 
  })
  .init();
})