# vue-record

#### 多环境配置文件`.env`
`.env`定义变量时 前缀为`VUE_APP_` 否则会被忽略
`--mode prod`指定使用`.env.prod`配置 但NODE_ENV默认为`development` `production` `test`
当`--mode`的值不是三者之一时 需手动设置NODE_ENV变量 否则NODE_ENV值为默认值(默认值为development)
使用cross-env设置变量`cross-env NODE_ENV=development`
#### 依赖`.env`使用js文件
使用`.env`无法热重载 可使用js根据不同NODE_ENV配置不同数据
```js
let baseUrl = ''
switch (process.env.NODE_ENV) {
  case 'development':
    baseUrl = 'development/xxxx'
    break
  case 'production':
    baseUrl = 'production/xxxx'
    break
  default:
    baseUrl = 'development/xxxx'
    break
}
export default baseUrl
```

### vue基础
delete和vue.delete区别
```js
let arr1 = [1, 2, 3]
let arr2 = [1, 2, 3]
// vue.delete会直接修改原数组
this.$delete(arr1, 2)
console.log(arr1)

// delete不会直接修改原数组 返回一个新的数组
console.log(delete(arr, 2))
```
