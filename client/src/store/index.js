import Vue from 'vue'
import Vuex from 'vuex'
import { a, b } from './module'

Vue.use(Vuex)

const state = {
    count: 0,
    users: [{ name: 1 }, { name: 2 }, { name: 3 }]
}

const mutations = {
    increment(e) {
        console.log(e, 'state对象')
        e.count++
    }
}

const actions = {
    increment(e) {
        console.log(e, '$store对象')
        e.commit('increment')
    }
}

const modules = { a, b }

const getters = {
    count: e => {
        console.log(e, 'state对象')
        return e.count
    }
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    modules,
    getters
})