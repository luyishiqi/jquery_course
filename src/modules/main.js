/**
 * 第一个参数是数组(依赖项)：使用的模块路径
 * 第二个参数是函数，函数的形参，和数组的每一个元素一一对应
 */
require(['./math','./ajax'],function(math,ajax){
    console.log(math,ajax);

  ajax.get('https://www.easy-mock.com/mock/59fc22e013b54e4771d5444d/tea/shopDetail')
});