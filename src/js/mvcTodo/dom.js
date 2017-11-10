define(function (require, exports, module) {
  var tag = /<(\w+)>/,
    op = Object.prototype,
    toString = op.toString;
  function dom() {}

  dom.prototype = {
    constructro: dom,
    element: null,
    //处理参数，更新元素
    init: function (dom) {
      if (typeof dom === 'string') {
        //

        if (tag.test(dom)) {
          //创建元素
          var _match = dom.match(tag),
            _tagName = _match[1];
          //
          this.element = document.createElement(_tagName);
        } else {
          //通过css选择器来获取元素
          this.element = document.querySelector(dom);
        }
      }
      if (dom.nodeType) {
        //是一个元素
        this.element = dom;
      }
      return this;
    },
    _type: function (data) {
      var t = toString
        .call(data)
        .match(/\[object\s(.+)\]/)[1]
        .toLowerCase()
      return t;
    },
    _each: function (arg, callback) {
      if (this._type(arg) === 'array') {

        for (var i = 0; i < arg.length; i++) {
          var item = arg[i];
          callback.call(arg, i, item);
        }
      }
      if (this._type(arg) === 'object') {

        for (var key in arg) {
          var val = arg[key];

          callback.call(arg, key, val);
        }
      }
    },
    _arrayIsEmpty: function (arr) {
      return arr.length === 0;
    },
    _toArr: function (data) {
      if ('length' in data) {
        return []
          .slice
          .call(data);
      } else {
        return data;
      }
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
      var _arg = this._toArr(arguments),
        _self = this;
      return this._argType(_arg, function (propety) {
        return getComputedStyle(this.element)[propety];
      }, function (obj) {
        _self
          ._each(obj, function (key, val) {
            //
            _self.element.style[key] = value;
          });
      }, function (key, val) {
        _self.element.style[key] = val;
      })
    },
    _argType: function (arg, oneFn, objectFn, twoArgFn) {
      if (arg.length === 1) {
        if (this._type(arg[0]) === 'string') {
          return oneFn && oneFn(arg[0]);
        }
        if (this._type(arg[0]) === 'object') {
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
    },
    inset: function (element) {}

  }
  module.exports = function () {
    return new dom();
  }

})
/**
 *
 * 使用方式
 */
// dom.init('<li>')//创建元素 dom.init(li)    //选择元素 dom.init(选择器) //通过css选择器选择元素
// dom操作 dom.init('.todo-list').parent().html();