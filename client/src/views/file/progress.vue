<template>
    <div>
        <el-button @click="$refs.file.click()">
            <input @change="upload" ref="file" style="display: none" type="file">上传
        </el-button>
        <p>上传进度</p>
        <el-progress :percentage="uploadProgress"></el-progress>
        <el-button @click="download" type="primary">下载</el-button>
        <p>下载进度</p>
        <el-progress :percentage="downloadProgress"></el-progress>
    </div>
</template>

<script>
    export default {
        name: 'file-progress',
        data() {
            return {
                fileName: '',
                uploadProgress: 0,
                downloadProgress: 0
            }
        },
        methods: {
            // 上传文件
            upload() {
                this.uploadProgress = 0

                const that = this
                const file = this.$refs.file
                let data = new FormData()
                data.append('file', file.files[0])
                let xhr = new XMLHttpRequest()
                // ajax每次发送一段数据 会生成一个progress事件
                xhr.upload.addEventListener('progress', e => {
                    that.uploadProgress = Math.round((e.loaded * 100) / e.total)
                })
                xhr.open('post', 'http://localhost:8080/file/image')
                xhr.send(data)
                // 绑定监听 监听服务器是否数据响应给ajax引擎 readyState改变后触发
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                        // 接收响应数据
                        that.fileName = JSON.parse(xhr.response).fileName
                    }
                }
            },
            // 下传文件
            download() {
                this.downloadProgress = 0

                const that = this
                let xhr = new XMLHttpRequest()
                xhr.open('get', 'http://localhost:8080/file/download?fileName=' + this.fileName)
                // 设置请求数据类型 否则文件下载后无法打开
                // https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/responseType
                xhr.responseType = 'blob'
                xhr.addEventListener('progress', e => {
                    // 响应头必须有content-length
                    if (e.lengthComputable) {
                        that.downloadProgress = Math.round((e.loaded * 100) / e.total)
                    }
                })
                xhr.send()
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                        // let fileName = xhr.getResponseHeader('content-disposition')
                        let link = document.createElement('a')
                        link.href = window.URL.createObjectURL(xhr.response)
                        link.download = '文件.jpg'
                        link.click()
                        // 释放通过URL.createObjectURL()创建的对象URL
                        window.URL.revokeObjectURL(link.href)
                    }
                }
            }
        }
    }
</script>
