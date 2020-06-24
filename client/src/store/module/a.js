export default {
    namespaced: true,
    state: { name: 'moduleA' },
    mutations: {
        set(e) {
            e.name = 'a'
        }
    },
    actions: {},
    getters: {}
}