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

new Vue({
    router,
    store,
    render: h => h(app)
}).$mount('#app')