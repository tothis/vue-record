const path = require('path')
const fs = require('fs')
const Koa = require('koa')
const app = new Koa()
const KoaRouter = require('koa-router')
const router = new KoaRouter()

// '/'和''都可映射为主路由
router.get('', (ctx, next) => {
    ctx.body = `<p style="text-align: center">主页</p>`
})
// 必须以'/'开始
router.get('/pdf', async (ctx, next) => {
    const res = new Promise((resolve, reject) => {
        fs.readFile(
            path.resolve(__dirname, 'test.pdf'),
            (error, data) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(data)
                }
            }
        )
    })
        .then(data => ({ ret: 0, data }))
        .catch(error => ({
            ret: 1,
            data: null,
            msg: error.toString()
        }))
    ctx.body = await res
})
app.use(router.routes()).use(router.allowedMethods())

app.listen(8080, () => {
    console.log('koa服务启动 port 8080')
})
