const { app, BrowserWindow } = require('electron')

// 保持对window对象的全局引用 如不这么做 当js对象被回收时 window对象会自动关闭
let win

function createWindow() {
    // 创建浏览器窗口
    win = new BrowserWindow({
        width: 800
        , height: 600
        // 在html中可使用require函数
        , webPreferences: {
            nodeIntegration: true
        }
    })

    // 加载应用index.html
    win.loadFile('index.html')
    // 加载vue打包后文件
    // win.loadFile('../client/build/index.html')

    // 打开开发者工具
    win.webContents.openDevTools()

    // 当window被关闭 触发此事件
    win.on('closed', () => {
        // 取消引用window对象 如果应用支持多窗口的话
        // 通常会把多个window对象存放在一个数组 删除相应元素即可
        win = null
    })
}

// electron会在初始化后并准备 创建浏览器窗口时 调用这个函数
// 部分api在ready事件触发后才能使用
app.on('ready', createWindow)

// 当全部窗口关闭时退出
app.on('window-all-closed', () => {
    // 在mac os中除非用户用Command + Q退出 否则绝大部分应用及其菜单栏会保持激活
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // 在macOS上 当单击dock图标并且没有其他窗口打开时 通常在应用程序中重新创建一个窗口
    if (win === null) {
        createWindow()
    }
})
