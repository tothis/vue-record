module.exports = {
    // outputDir: 'dist', // build输出目录
    // assetsDir: 'assets', // 静态资源目录js, css, img
    // lintOnSave: false, // 是否开启eslint
    devServer: {
        open: true, // 是否自动弹出浏览器页面
        host: 'localhost',
        port: '8888',
        // https: false, // 是否使用https协议
        // hotOnly: false, // 是否开启热更新
        proxy: {
            // 必须以'/'开始
            '/api': {
                target: 'http://localhost:8080', // API服务器的地址
                ws: true, // 代理websockets
                // 开启代理 在本地会创建一个虚拟服务端 然后发送请求的数据
                // 并同时接收请求的数据 服务端和服务端进行数据交互不会有跨域问题
                changeOrigin: true,
                pathRewrite: {
                    // 重写路径 比如'/api/aaa/bbb'重写为'/aaa/bbb'
                    'api': ''
                }
            },
            '/file': {
                target: 'http://localhost:8080',
                changeOrigin: true,
                pathRewrite: {
                    'file': 'file-upload'
                }
            }
        }
    }
}
