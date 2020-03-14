# vue-record

### 介绍

vue 集成常用组件

delete和vue.delete区别
```js
let arr1 = [1,2,3]
let arr2 = [1,2,3]
// vue.delete会直接修改原数组
this.$delete(arr1,2)
console.log(arr1);

// delete不会直接修改原数组 返回一个新的数组
console.log(delete(arr,2));
```
