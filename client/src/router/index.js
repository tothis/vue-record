import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '@/views/home'

Vue.use(VueRouter)

const routes = [
    {
        // '/'和''都可映射为主路由
        path: '',
        name: 'home',
        component: home
    },
    {
        // 必须以'/'开始
        path: '/about',
        name: 'about',
        component: () => import('@/views/about')
    },
    {
        path: '/header',
        name: 'header',
        component: () => import('@/components/header')
    },
    {
        path: '/user',
        name: 'user',
        component: () => import('@/components/user')
    },
    {
        path: '/file-upload',
        name: 'file-upload',
        component: () => import('@/components/file-upload/index')
    },
    {
        path: '/data-table',
        name: 'data-table',
        component: () => import('@/views/data-table')
    },
    {
        path: '/better-scroll-x',
        name: 'better-scroll-x',
        component: () => import('@/views/better-scroll-x')
    },
    {
        path: '/better-scroll-y',
        name: 'better-scroll-y',
        component: () => import('@/views/better-scroll-y')
    },
    {
        path: '/remember-scroll',
        name: 'remember-scroll',
        component: () => import('@/views/remember-scroll')
    },
    {
        path: '/chart-table',
        name: 'chart-table',
        component: () => import('@/views/chart-table')
    },
    {
        path: '/vant-calendar',
        name: 'vant-calendar',
        component: () => import('@/views/vant-calendar')
    },
    {
        path: '/vant-date',
        name: 'vant-date',
        component: () => import('@/views/vant-date')
    },
    {
        path: '/ele-date',
        name: 'ele-date',
        component: () => import('@/views/ele-date')
    },
    {
        path: '/pdfjs',
        name: 'pdfjs',
        component: () => import('@/views/pdfjs')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
