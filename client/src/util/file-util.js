export const fileDownload = (blob, fileName) => {
    if (window.navigator.msSaveOrOpenBlob) {
        // msSaveOrOpenBlob方法返回bool值
        navigator.msSaveBlob(blob, fileName) // 本地保存
    } else {
        const link = document.createElement('a') // a标签下载
        link.href = window.URL.createObjectURL(blob)
        // 修改文件名
        link.download = fileName
        // 触发点击
        link.click()
        // 释放通过URL.createObjectURL()创建的对象URL
        window.URL.revokeObjectURL(link.href)
    }
}

export const urlDownload = async (url, fileName) => {
    // 获取blob
    fileDownload(await fetch(url).blob(), fileName)
}
