define(function (require, exports, module) {
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

  //只暴露一个
  module.exports = ajax;

})