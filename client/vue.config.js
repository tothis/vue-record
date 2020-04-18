// https://cli.vuejs.org/zh/config
module.exports = {
    outputDir: 'build', // build输出目录 默认dist
    assetsDir: 'static', // 放置生成的静态资源目录 默认为空
    publicPath: './', // 配置打包后端静态文件引用目录 默认'/'
    devServer: {
        open: true, // 是否自动弹出浏览器页面
        host: 'localhost',
        port: '8888',
        // https: true, // 是否使用https协议
        // hotOnly: false, // 是否开启热更新
        proxy: {
            'api': {
                target: 'http://localhost:8080', // API服务器的地址
                ws: true, // 代理websocket
                // 开启代理 在本地会创建一个虚拟服务端 然后发送请求的数据
                // 并同时接收请求的数据 服务端和服务端进行数据交互不会有跨域问题
                changeOrigin: true,
                pathRewrite: {
                    // 重写路径 比如`/api`重写为`/file`
                    'api': 'file'
                }
            },
            'file-upload': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                pathRewrite: {
                    'file-upload': 'file'
                }
            }
        }
    }
}
