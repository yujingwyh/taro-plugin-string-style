# taro-plugin-string-style

`在taro 3.6版本的h5环境中，react中的style是不支持字符串的，可以使用这个插件解决`

## 如何使用

1. 安装npm包 <br />
`npm i taro-plugin-string-style --save-dev`

2. 加入到插件


```javascript
// 在项目的config/index.js文件中，加入这个插件就可以
{
    //...,
    plugins: [
        //...
        "taro-plugin-string-style"
    ]
}
```