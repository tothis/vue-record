使用electron-packager打包时 会自动下载预编译文件
如果使用淘宝镜像出现404错误 可通过如下命令解决
```
# 不存在 https://npm.taobao.org/mirrors/electron/v8.1.1/electron-v8.1.1-win32-x64.zip
# 存在 https://npm.taobao.org/mirrors/electron/8.1.1/electron-v8.1.1-win32-x64.zip
npm config set electron_custom_dir 8.1.1
```
>electron\node_modules\electron-packager\docs\api.md
`linux` `win32` `darwin` `mas` `all`
linux linux
win32 windows
darwin mac-os
mas mac-app-store
all 打包所有
>引入本地npm项目 在当前目录时如下三种都生效
```
"test": "./test"
"test": "file:test"
"test": "file:./test"
```
