export default {
    isSupport() {
        if (localStorage) {
            return true
        } else {
            console.error('当前浏览器不支持localStorage')
            return false
        }
    },
    get(key) {
        if (!this.isSupport) return
        const data = localStorage.getItem(key)
        return data ? JSON.parse(data) : undefined
    },
    remove(key) {
        if (!this.isSupport) return
        localStorage.removeItem(key)
    },
    set(key, data) {
        if (!this.isSupport) return
        const newData = JSON.stringify(data)
        localStorage.setItem(key, newData)
    },
    clear() {
        if (!this.isSupport) return
        return localStorage.clear()
    }
}
