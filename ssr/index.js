const Vue = require('vue')
const server = require('express')()
const vueServerRenderer = require('vue-server-renderer')
const renderer = vueServerRenderer.createRenderer()
const pageRenderer = vueServerRenderer.createRenderer({
    template: require('fs').readFileSync('template/index.html', 'utf8')
})

server.get('*', (req, res) => {

    const app = new Vue({
        data: {
            url: req.url
        },
        template: `<div>访问url => {{ url }}</div>`
    })

    const context = {
        title: '主页',
        meta: `<meta charset="utf8">`
    }

    if (req.url.indexOf('/index')) {
        pageRenderer.renderToString(app, context, (err, html) => {
            if (err) {
                res.status(500).end('Internal Server Error')
                return
            }
            res.end(html)
        })

    } else {
        renderer.renderToString(app, (err, html) => {
            if (err) {
                res.status(500).end('Internal Server Error')
                return
            }
            res.end(`<!doctype html>
                    <html lang="en">
                    <head>
                        <meta charset="utf8">
                        <title>url</title>
                    </head>
                    <body>
                        ${html}
                    </body>
                    </html>`)
        })
    }
})

server.listen(8080)
