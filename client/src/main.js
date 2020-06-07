import Vue from 'vue'
import app from './app'
import './registerServiceWorker'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { Calendar, Cell, DatetimePicker } from 'vant'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(Calendar)
    .use(Cell)
    .use(DatetimePicker)

// 全局注册自定义指令 当前图片加载失败时 判断默认图片是否存在 如存在 则使用默认图片
Vue.directive('default-image', async (ele, e) => {
    ele.onerror = async () => {
        let url = e.value // 默认获取图片地址
        if (url) {
            if (await imageIsExist(url)) {
                ele.setAttribute('src', url)
            }
        }
    }
})

/**
 * 检测图片是否存在
 * @param url
 */
let imageIsExist = function(url) {
    return new Promise(resolve => {
        let image = new Image()
        image.onload = function() {
            if (this.complete === true) {
                resolve(true)
                image = null
            }
        }
        image.onerror = function() {
            resolve(false)
            image = null
        }
        // 如上为异步加载 会先执行此处 再执行onload onerror
        image.src = url
    })
}

new Vue({
    router,
    store,
    render: h => h(app)
}).$mount('#app')
