import axios from 'axios'
import qs from 'qs'

axios.defaults.timeout = 5000 // 响应时间
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' // 配置请求头
axios.defaults.baseURL = 'http://localhost:8090/' // 配置接口地址

// post传参序列化 添加请求拦截器
axios.interceptors.request.use((config) => {
    // 在发送请求之前做某件事
    if (config.method === 'post') {
        config.data = qs.stringify(config.data)
    }
    return config
}, (error) => {
    console.log('错误的传参')
    return Promise.reject(error)
})

// 返回状态判断 添加响应拦截器
axios.interceptors.response.use((res) => {
    // 对响应数据做些事
    return res.data.success ? res : Promise.resolve(res)
}, (error) => {
    console.log('网络异常')
    return Promise.reject(error)
})

// 返回一个promise 发送post请求
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params).then(response => {
            resolve(response)
        }, err => {
            reject(err)
        }).catch((error) => {
            reject(error)
        })
    })
}

// 返回一个promise 发送get请求
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params,
            headers: {
                'x-access-datetime': dateFormat(new Date()),
                'x-access-token': localStorage.getItem('token')
            }
        }).then(response => {
            resolve(response)
        }, err => {
            reject(err)
        }).catch((error) => {
            reject(error)
        })
    })
}

let dateFormat = (date, pattern = 'yyyy-mm-dd hh:mm:ss') => { // 形参默认值
    let y = date.getFullYear()
    // 月份从0开始 获取正确月份需+1 padStart(2,'0')函数 不是二位的字符串则在前加字符串'0'
    let M = (date.getMonth() + 1).toString().padStart(2, '0')
    let d = date.getDate().toString().padStart(2, '0') // 日
    let H = date.getHours().toString().padStart(2, '0') // 小时
    let m = date.getMinutes().toString().padStart(2, '0') // 分
    let s = date.getSeconds().toString().padStart(2, '0') // 秒

    pattern = pattern.toLowerCase() // 把pattern转为小写

    switch (pattern) {
        case 'yyyy-mm-dd':
            return `${y}-${M}-${d}`
        case 'yyyy-mm-dd hh:mm:ss':
            return `${y}-${M}-${d} ${H}:${m}:${s}`
        default:
            return `${y}-${M}-${d} ${H}:${m}:${s}`
    }
}
