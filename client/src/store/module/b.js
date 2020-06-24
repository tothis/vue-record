export default {
    namespaced: true,
    state: { name: 'moduleB' },
    mutations: {
        set(e) {
            e.name = 'b'
        }
    },
    actions: {},
    getters: {}
}