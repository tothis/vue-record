import axios from 'axios/index'
import qs from 'qs'
import storage from '@/util/storage'

const ENV_BASEURL_MAP = {
    development: '',
    production: ''
}

axios.defaults.baseURL = ENV_BASEURL_MAP[process.env.NODE_ENV] // 根据构建环境配置请求基础url
axios.defaults.timeout = 2500 // 配置默认超时时间

axios.defaults.headers.post['content-type'] = 'application/x-www-form-urlencoded;charset=utf-8'

// 请求拦截
axios.interceptors.request.use(
    config => {
        const AUTH_TOKEN = storage.get('auth_token')
        console.log(666)
        AUTH_TOKEN && (config.headers.Authorization = AUTH_TOKEN)
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
// 响应拦截
axios.interceptors.response.use(
    response => {
        if (response.status === 200) {
            // 大多数情况需要在业务层定义响应错误的行为
            return Promise.resolve(response)
        } else {
            return Promise.reject(response)
        }
    },
    error => {
        console.log(error, 9991)
        if (error.response.status) {
            // 通信层定义响应错误的行为
        }
        return Promise.reject(error)
    }
)

// 封装get方法
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                params
            })
            .then(res => {
                console.log(res, 222)
                resolve(res.data)
            })
            .catch(error => {
                reject(error.data)
            })
    })
}

// 封装post方法
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, qs.stringify(params))
            .then(res => {
                resolve(res.data)
            })
            .catch(error => {
                reject(error.data)
            })
    })
}
