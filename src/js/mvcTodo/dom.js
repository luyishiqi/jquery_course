define(function (require, exports, module) {
  var tag = /<(\w+)>/,
    op = Object.prototype,
    toString = op.toString;
  function $(cssSelector) {
    return new $
      .prototype
      .init(cssSelector);
  }
  // 静态方法
  $.type=function (data) {
    var t = toString
      .call(data)
      .match(/\[object\s(.+)\]/)[1]
      .toLowerCase()
    return t;
  }
  $.each = function (arg,callback) {
    if ($.type(arg) === 'array') {

      for (var i = 0; i < arg.length; i++) {
        var item = arg[i];
        callback.call(arg, i, item);
      }
    }
    if ($.type(arg) === 'object') {

      for (var key in arg) {
        var val = arg[key];

        callback.call(arg, key, val);
      }
    }
  }
  $.arrIsEmpty=function(arr){
    return arr.length === 0;
  }
  $.toArr=function(data){
    return [].slice.call(data);
  }

  $.unitHandle=function (attr) {
    var a = [
      'width',
        'height',
        'top',
        'left',
        'right',
        'bottom'
      ]
      .concat($.toDir('margin'))
      .concat($.toDir('padding'));
    var pxReg = new RegExp(a.join('|'));
    if (pxReg.test(attr)) {
      return 'px';
    }else{
      return '';
    }
  }
  $.toDir=function(attr) {
    return ['Left', 'Bottom', 'Right', 'Top'].map(function (item) {
      return attr + item;
    });
  }

  //实例方法
  $.fn = $.prototype = {
    constructro: $,
    elements: [],
    //处理参数，更新元素
    init: function (dom) {
      if (typeof dom === 'string') {
        //
        if (tag.test(dom)) {
          //创建元素
          var _match = dom.match(tag),
            _tagName = _match[1];
          //
          this.elements.push(document.createElement(_tagName));
        } else {
          //通过css选择器来获取元素
          this.elements=$.toArr(document.querySelectorAll(dom)); 
        }
      }
      if (dom.nodeType) {
        //是一个元素
        this.elements.push(dom) ;
      }
      return this;
    },
    eq:function(index){
      var ele= this.elements[index];
      console.log(ele);
      this.elements.length=0;
      this.elements.push(ele);
      return this;
    },
    first:function(){
      return this.eq(0);
    },
    last:function(){
      return this.eq(this.elements.length-1);
    },
    each: function (callback) {
      console.log(this)
      $.each(this.elements,callback);
    },
    parent: function () {
      this.element = this.element.parentNode;
      return this;
    },
    html: function () {
      var _arg = this._toArr(arguments);
      if (this._arrayIsEmpty(_arg)) {
        return this.element.innerHTML;
      } else {
        if (this._type(_arg[0]) === 'string') {
          this.element.innerHTML = _arg[0];
        }
      }
      return this;
    },
    attr: function () {
      var _arg = this._toArr(arguments),
        _self = this;
      return this._argType(_arg, function (one) {
        return _self
          .element
          .getAttribute(one);
      }, function (obj) {
        _self
          ._each(obj, function (key, val) {
            //
            _self
              .element
              .setAttribute(key, val);
          });
      }, function (key, val) {
        _self
          .element
          .setAttribute(key, val);
      })
    },
    css: function () {
      var _arg = $.toArr(arguments),
        _self = this;
      return this._argType(_arg, function (propety) {
        return getComputedStyle(this.element)[propety];
      }, function (obj) {
        _self.each(function(index,element){
          $.each(obj, function (key, val) {
            element.style[key] = val+ $.unitHandle(key);
          });
        })
      }, function (key, val) {
       _self.each(function(index,element){
            element.style[key] = val;
       })
      })
    },
    _argType: function (arg, oneFn, objectFn, twoArgFn) {
      if (arg.length === 1) {
        if ($.type(arg[0]) === 'string') {
          return oneFn && oneFn(arg[0]);
        }
        if ($.type(arg[0]) === 'object') {
          objectFn && objectFn(arg[0]);
          return this;
        }
      }
      if (arg.length === 2) {
        twoArgFn && twoArgFn(arg[0], arg[1]);
        return this;
      }
    },
    append: function (element) {
      this
        .element
        .appendChild(element);
      return this;
    },
    end: function () {
      console.log('12321');
      return this.element;
    }
  }
  $.fn.init.prototype = $.fn;
  module.exports = $

})
/**
 *
 * 使用方式
 */
// dom.init('<li>')//创建元素 dom.init(li)    //选择元素 dom.init(选择器) //通过css选择器选择元素
// dom操作 dom.init('.todo-list').parent().html();