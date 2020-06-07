<template>
    <div>
        <el-radio-group @change="switchMode" v-model="mode">
            <el-radio :label="0">普通</el-radio>
            <el-radio :label="1">ftp</el-radio>
            <el-radio :label="2">sftp</el-radio>
        </el-radio-group>
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
                // 上传模式
                mode: 0,
                fileName: '',
                uploadProgress: 0,
                downloadProgress: 0,
                uploadUrl: 'upload',
                downloadUrl: 'download'
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
                xhr.open('post', `file-upload/${this.uploadUrl}`)
                xhr.send(data)
                // 绑定监听 监听服务器是否数据响应给ajax引擎 readyState改变后触发
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                        // 接收响应数据
                        that.fileName = xhr.response
                    }
                }
            },
            // 下载文件
            download() {
                this.downloadProgress = 0

                const that = this
                let xhr = new XMLHttpRequest()
                xhr.open('get', `file-upload/${this.downloadUrl}?fileName=` + this.fileName)
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
            },
            switchMode(value) {
                switch (value) {
                    case 0:
                        this.uploadUrl = 'upload'
                        this.downloadUrl = 'download'
                        break
                    case 1:
                        this.uploadUrl = 'ftp'
                        this.downloadUrl = 'ftp-download'
                        break
                    case 2:
                        this.uploadUrl = 'sftp'
                        this.downloadUrl = 'sftp-download'
                        break
                    default:
                        break
                }
            }
        }
    }
</script>
<style lang="stylus" scoped>
    .el-radio-group
        display block
        margin-bottom 30px
</style>
