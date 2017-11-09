(function (win) {

  function $(cssSelector) {
    return new $
      .prototype
      .init(cssSelector);
  }

  $.type = function (data) {
    var toString = Object.prototype.toString
    var str = toString.call(data);
    var result = str
      .substring(8, str.length - 1)
      .toLowerCase();
    return result;
  }

  $.isFunction = function (data) {
    return $.type(data) === 'function';
  }

  $.isWindow = function (data) {
    return $.type(data) === 'window';
  }
  $.isArray = function (data) {
    return $.type(data) === 'array';
  }
  $.isString = function (data) {
    return $.type(data) === 'string';
  }
  $.isElement = function (data) {
    return $
      .type(data)
      .indexOf('element') > 0;
  }

  $.isLikeArray = function (data) {
    return 'length' in data;
  }
  $.toArray = function (data) {
    if (!$.isLikeArray(data)) {
      return;
    }
    return []
      .slice
      .call(data);
  }
  //判断是不是一个纯粹的对象
  $.isPainObject = function (data) {
    return typeof data === 'object' && $.type(data) === 'object';
  }

  $.getParams = function (sourceUrl) {
    if (sourceUrl === "" || sourceUrl == null || $.type(sourceUrl) !== 'string') {
      return null;
    }
    var result = {};
    var handleStrToArray = sourceUrl
      .split('?')[1]
      .split('&');
    for (var i = 0, len = handleStrToArray.length; i < len; i++) {
      var item = handleStrToArray[i].split('=');
      var key = item[0],
        value = decodeURI(item[1]);
      result[key] = value;
    }
    return result;
  }

  $.toParams = function (option) {
    if (option == null || !$.isPainObject(option)) {
      return "";
    }
    var result = "";
    for (var key in option) {
      result += key + "=" + encodeURI(option[key]) + '&';
    }
    return result.substring(0, result.length - 1);
  }

  $.each = function (value, fn) {
    if ($.isArray(value)) {
      for (var i = 0, len = value.length; i < len; i++) {
        fn.call(value, i, value[i], value);
      }
    }
    if ($.isPainObject(value)) {
      for (var key in value) {
        fn.call(value, key, value[key], value);
      }
    }
  }

  $.Queue = function () {
    var dataStore = [];
    return {
      enqueue: function (data) {
        dataStore.push(data);
        return this;
      },
      //出队
      dequeue: function () {
        return dataStore.shift();
      },
      //队头
      front: function () {
        return dataStore[0];
      },
      //队尾
      back: function () {
        return dataStore[this.dataStore.length - 1];
      },
      //数量
      count: function () {
        return dataStore.length;
      },
      //是否为空
      empty: function () {
        return dataStore.length === 0;
      }
    }
  }

  $.throote = function (fn, time) {
    var _startTime = Date.now();
    return function () {
      var _endTime = Date.now();
      if (_endTime - _startTime < time) {
        return;
      }
      fn.apply(null, arguments);
      _startTime = _endTime;
    }
  };

  $.requestAnimationFrame = function (fn) {
    return requestAnimationFrame(fn) || setInterval(fn, 1000 / 60);
  }
  $.cancelAnimationFrame = function (timeId) {
    cancelAnimationFrame(timeId) || clearInterval(timeId);
  }

  $.Cookie = {
    result: '',
    key: function (name) {
      this.result += encodeURIComponent(name) + "=";
      return this;
    },
    val: function (value) {
      this.result += encodeURIComponent(value) + "; ";
      return this;
    },
    time: function (time, type) {
      var date = new Date();
      var type = type || 'Date';
      date['set' + type](date['get' + type]() + time);
      this.result += 'expires=' + date.toGMTString();
      return this;
    },
    set: function () {
      document.cookie = this.result;
      this.result = '';
    },
    del: function (key) {
      this
        .key(key)
        .val('')
        .time(0)
        .set();
    },
    get: function (name) {
      var cookieText = document.cookie;
      //获取要查找的 cookie的 name所在的下标
      var index = cookieText.indexOf(name + "="); // name=李四; ...
      //如果下标不为-1，证明找到了
      if (index != -1) {
        var endIndex = cookieText.indexOf(";", index); //查找指定的cookie的结束为止
        // 如果等于-1，证明没有找到;号，则把末尾设置为字符串的末尾
        endIndex = (endIndex == -1
          ? cookieText.length
          : endIndex);
        //把想要的cookie的value截取出来
        var value = cookieText.substring(index + (name + "=").length, endIndex);
        //因为存储的时候使用了url编码，所以查到的东西需要url解码
        return decodeURIComponent(value);
      }
    }
  }

  function toDir(attr) {
    return ['Left', 'Bottom', 'Right', 'Top'].map(function (item) {
      return attr + item;
    });
  }
  //处理css属性单位
  function unitHandle(attr) {
    var a = [
      'width',
        'height',
        'top',
        'left',
        'right',
        'bottom'
      ]
      .concat(toDir('margin'))
      .concat(toDir('padding'));
    var pxReg = new RegExp(a.join('|'));
    if (pxReg.test(attr)) {
      return 'px';
    }
  }
  $.fn = $.prototype = {
    // 重新指向构造函数为$
    constructor: $,

    init: function (cssSelector) {
      this.elements = [];
      this.selector = ''; //字符串，传入的css选择器
      if ($.isString(cssSelector)) {
        this.elements = this
          .elements
          .slice
          .call(document.querySelectorAll(cssSelector));

        this.selector = cssSelector;
      } else {
        if ("length" in cssSelector) {
          this.elements = this
            .elements
            .slice
            .call(cssSelector);

        } else {
          this
            .elements
            .push(cssSelector);

        }
      }
      this.length = this.elements.length;
    },

    get: function (index) {
      return this.elements[index];
    },
    first: function () {
      this.eq(0)
      return this;
    },
    last: function () {
      this.eq(this.length - 1);
      return this;
    },
    //nth-of-type（）
    eq: function (index) {
      this.elements = [this.elements[index]];
      return this;
    },
    //获取对应元素索引值
    index: function () {
      var $children = this
        .parent()
        .children();
      console.log($children)
      var index = $children
        .elements
        .indexOf(this.elements[0]);
      console.log($children.elements, this.elements[0]);
    },

    //获取元素的父元素
    parent: function () {
      this.elements = [this.elements[0].parentElement];
      return this;
    },
    children: function () {
      this.elements = $.toArray(this.elements[0].children);
      return this;
    },

    each: function (fn) {
      $.each(this.elements, fn);
    },
    css: function () {
      var arg = arguments,
        len = arg.length;

      if (len === 1) {
        if (typeof arg[0] === "string") {
          return getComputedStyle(this.elements[0])[arg[0]];

        }
        if (arg[0]instanceof Object) {
          this
            .each(function (index, element) {
              for (var key in arg[0]) {
                element.style[key] = arg[0][key];
              }
            })
        }
      }

      if (len === 2) {
        this
          .each(function (index, element) {
            element.style[arg[0]] = arg[1];
          })
      }
      return this;
    },
    click: function (fn) {
      this
        .each(function (index, element) {
          element
            .addEventListener('click', function (e) {
              fn.call(element, e);
            })
        })
      return this;
    },
    show: function () {
      this.css("display", "block");
      return this;
    },
    hide: function () {
      this.css("display", "none");
      return this;
    },
    classNameList: function () {
      var firstElement = this.elements[0];
      var classList = firstElement
        .className
        .trim()
        .split(' ')
        .filter(function (item) {
          return item !== ""
        })
      return classList;
    },
    addClass: function (newClsName) {
      // this.hasClass(newClsName);
      this
        .each(function (index, element) {
          if (!$(element).hasClass(newClsName)) {
            element.className += " " + newClsName;
          }
        })
      return this;
    },
    removeClass: function (oldClsName) {
      this
        .each(function (index, element) {
          if ($(element).hasClass(oldClsName)) {
            var classList = $(element).classNameList();
            // [1,0,1].splice(1,1)
            classList.splice(classList.indexOf(oldClsName), 1)
            element.className = classList.join(" ");
            // console.log(classList);
          }
        })

      return this;
    },
    hasClass: function (clsName) {

      // var result = null; result = this.classNameList().some(function (item) {
      // return item === clsName; }) return result; console.log( allClassNameArr);
      var reg = new RegExp('^' + clsName + '\\b|\\b' + clsName + '\\b|\\b' + clsName + '$');
      return reg.test(this.elements[0].className);
    },
    attr: function () {
      var arg = arguments; //实际参数列表
      if (arg.length === 1) {
        if (typeof arg[0] === 'string') {
          return this
            .elements[0]
            .getAttribute(arg[0]);
        }
        if (typeof arg[0] === 'object' && arg[0]instanceof Object) {
          this
            .each(function (index, element) {
              for (var key in arg[0]) {
                element.setAttribute(key, arg[0][key]);
              }
            })
        }
      }

      if (arg.length === 2) {
        this
          .each(function (index, element) {

            element.setAttribute(arg[0], arg[1]);
          })
      }

      return this;
    },
    val: function () {
      var arg = arguments,
        len = arg.length;
      if (len === 1) {
        this
          .each(function (index, element) {
            element.value = arg[0];
          })
        return this;
      }
      if (len === 0) {
        console.log(this)
        return this.elements[0].value;
      }
    },
    //删除属性
    removeAttr: function (attrName) {
      this
        .each(function (index, element) {
          element.removeAttribute(attrName);
        })
      return this;
    },
    input: function (fn) {
      this
        .each(function (index, element) {
          element.oninput = fn;
        });
    },
    html: function () {
      var arg = arguments,
        len = arg.length;
      if (len === 1) {
        this
          .each(function (index, element) {
            element.innerHTML = arg[0];
          })
        return this;
      }
      if (len === 0) {
        return this.elements[0].innerHTML;
      }
    },
    change: function (fn) {
      this
        .each(function (index, element) {
          console.log(element)
          element.addEventListener('change', function () {
            fn.call(this);
          })
        })
    },
    animate: function (json, callback) {
      //setInterval //所有浏览器都支持 requestAnimationFrame // 低版本不支持
      var _self = this;
      this.each(function (index, element) {
        $.cancelAnimationFrame(element.timer);

        function run() {
          for (var attr in json) {
            var currentStyle = attr === 'opacity'
                ? (parseFloat(_self.css(attr)) * 100)
                : parseInt(_self.css(attr)),
              target = attr === 'opacity'
                ? json[attr] * 100
                : json[attr],
              speed = (target - currentStyle) / 30;
            speed = speed > 0
              ? Math.ceil(speed)
              : Math.floor(speed);
            console.log(speed, 'speed')
            console.log(target, currentStyle)
            if (target === currentStyle) {
              cancelAnimationFrame(element.timer);
              callback && callback();
              return;
            } else {
              if (attr !== 'opacity') {
                element.style[attr] = currentStyle + speed + unitHandle(attr);
              } else {
                // console.log(currentStyle + speed, 'sdafdsafsadf')
                element.style[attr] = (currentStyle + speed) / 100;
              }
            }
          }
          element.timer = $.requestAnimationFrame(run);
        }
        run();
      });
    },
    X: function () {
      var that = this;
      var animateQueue = $.Queue();

      return {
        base: function (json) {
          var _self = this;
          animateQueue.enqueue(function (callback) {
            that
              .animate(json, function () {
                callback && callback();
              });
          });
          return this;
        },
        delay: function (time) {
          animateQueue.enqueue({
            sleep: function (callback) {
              setTimeout(function () {
                callback && callback();
              }, time)
            }
          });
          return this;
        },
        end: function () {
          var _self = this;
          if (!animateQueue.empty()) {
            var fn = animateQueue.dequeue();
            console.log($.isPainObject(fn))
            if ($.isFunction(fn)) {
              fn(function () {
                console.log(111);
                _self.end();
              })
            } else if ($.isPainObject(fn)) {
              fn
                .sleep(function () {
                  _self.end();
                })
            }
          }
        }
      }
    }
  }

  /*
  如何扩展方法
   */

  $.fn.init.prototype = $.fn;

  win.$ = $;
}(window));

//扩展字符串的原型
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
  }
}

String.prototype.is = function (reg) {
  return reg.test(this);
}
String.prototype.isImage = function () {
  return this.is(/(?:.+\/)?(\w+)(?=\.(?:jpe?g|png|gif|svg))/i);
}
String.prototype.getImageFileName = function () {
  if (!this.isImage()) {
    return null;
  }
  var result = this.match(/(?:.+\/)?(\w+)(?=\.(jpe?g|png|gif|svg))/i);
  return {
    fileName: result[1],
    suffix: result[2].toLowerCase()
  }
}

String.prototype.isMobile = function () {
  return this.is(/^1(?:3|5|8|7)(?:\d{9})$/);
}
String.prototype.isPhone = function () {
  return this.is(/^(\d{3,4})?-?(\d{7,8})$/);
}
String.prototype.isNumber = function () {
  return this.is(/[0-9](?:\.[0-9])?/);
}
String.prototype.toNumber = function () {
  // return this.isNumber() ? this - 0 : this;
}

/**
 * ajax
 */(function (win) {
  function ajax(option) {
    return new ajax
      .prototype
      .init(option);
  }
  ajax.fn = ajax.prototype = {
    constructor: ajax,
    init: function (option) {
      this.url = option.url;
      this.method = option.method || 'GET'; //默认是get请求
      this.xhr = new XMLHttpRequest();
      this.params = option.params || null;
      this.base(option.done, option.fail);
    },
    //底层请求函数
    base: function (done, fail) {
      if (this.method === 'GET') {
        //get请求处理
        this.url = this
          .url
          .indexOf('?') > 0
          ? this.url
          : this.url + '?' + this.parseParams();

        this
          .xhr
          .open('GET', this.url);
        this
          .xhr
          .send();
      } else {
        //post请求处理 console.log(this.url);
        this
          .xhr
          .open('POST', this.url);
        this
          .xhr
          .setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        this
          .xhr
          .send(this.parseParams());
      }

      this.xhr.onreadystatechange = function () {
        console.log(this.status, this.readyState);
        if (this.status === 200 && this.readyState === 4) {
          //可以获取数据了
          done && done(this.responseText);
        }

        if (this.status === 404) {
          fail && fail(this);
        }
      }
    },
    //parseParams 处理参数
    parseParams: function () {
      var result = '';
      if (this.params) {
        for (var key in this.params) {
          result += key + '=' + encodeURI(this.params[key]) + '&';
        }
        result = result.substring(0, result.length - 1);
      }
      return result;
    }
  }

  ajax.get = function (url, params, done, fail) {
    var doneFn,
      failFn,
      data;
    if (typeof params === 'function') {
      doneFn = params;
      data = {};
      fail = done;
    } else {
      data = params;
      doneFn = done;
      fail = failFn;
    }
    // console.log(doneFn);
    ajax({
      url: url,
      params: data,
      done: function (data) {
        doneFn(data);
      },
      fail: function (xhr) {
        failFn(xhr);
      }
    })
  }

  ajax.post = function (url, params, done, fail) {
    var doneFn,
      failFn,
      data;
    if (typeof params === 'function') {
      doneFn = params;
      data = {};
      fail = done;
    } else {
      data = params;
      doneFn = done;
      fail = failFn;
    }
    // console.log(doneFn);
    ajax({
      url: url,
      method: 'POST',
      params: data,
      done: function (data) {
        doneFn(data);
      },
      fail: function (xhr) {
        failFn(xhr);
      }
    })
  }
  // ajax.get('http://www.baidu.com',function(){},function(){});
  // ajax.get('http://www.baidu.com',{name:123});

  ajax.jsonp = function (url, params, done, calbackName) {
    var doneFn,
      data;
    console.log(calbackName)
    var cbName = calbackName
      ? calbackName
      : 'callback'
    if (typeof params === 'function') {
      doneFn = params;
      data = '';
    } else {
      data = $.toParams(params);
      doneFn = done;
      // fail = failFn;
    }
    var script = document.createElement('script');
    var fnName = 'jaonpCallback_' + Date.now() + Math.floor(Math.random() * 100000000); //字符串
    url += url.indexOf('?') > 0
      ? cbName + '=' + fnName + '&' + $.toParams(params)
      : '?' + cbName + '=' + fnName + '&' + $.toParams(params);
    script.src = url;
    document
      .head
      .appendChild(script);
    document
      .head
      .removeChild(document.head.lastElementChild);

    script = null;
    // 1.如何将函数内部的函数变为全局函数？？？ 2.函数名是随机的
    window[fnName] = function (data) {
      doneFn && doneFn(data);
    }
    // function jsonpCallback(data) {   console.log(data); }
  }

  ajax.fn.init.prototype = ajax.prototype;

  win.ajax = ajax;
}(window));