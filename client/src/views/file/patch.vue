<template>
    <div ref="content">
        <el-button @click="$refs.file.click()">
            <input @change="load" ref="file" style="display: none" type="file">选择视频
        </el-button>
        <el-button @click="time">打印时间</el-button>
        <el-button @click="upload">开始上传</el-button>
        <p>上传进度</p>
        <el-progress :percentage="uploadProgress"></el-progress>
        <video controls="controls" ref="video"/>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'patch',
        data() {
            return {
                // 文件名称
                fileName: '',
                // 进度条
                uploadProgress: 0,
                // 每片大小 5m
                chunkSize: 1024 * 1024 * 5,
                // 切片数量
                chunkNumber: 0,
                // 文件分片下标
                fileIndex: 0,
                // 文件分片名称组合
                tempFileName: ''
            }
        },
        methods: {
            // 上传文件
            upload() {
                this.uploadProgress = 0

                const blob = this.$refs.file.files[0]

                let start = 0,
                    end = 0,
                    index = 0,
                    fileSize = blob.size // 文件大小(单位字节)

                this.fileName = blob.name // 文件名称

                // 计算文件切片总数 向上取整计算
                if (fileSize % this.chunkSize === 0) {
                    this.chunkNumber = Math.ceil(fileSize / this.chunkSize)
                } else {
                    this.chunkNumber = Math.ceil(fileSize / this.chunkSize) + 1
                }

                // 上传文件
                while (start < fileSize) {
                    // 切片上传
                    end = start + this.chunkSize
                    if (end > fileSize) {
                        // 一次性上传
                        end = fileSize
                    }
                    // 分割文件核心部分slice
                    let chunk = blob.slice(start, end)
                    let formData = new FormData() // 创建提交数据
                    formData.append('chunk', chunk) // 具体文件数据
                    formData.append('fileIndex', index) // 当前文件下标

                    axios({
                        method: 'post',
                        url: 'file-upload/split',
                        data: formData
                    })
                        .then(result => {
                            // 渲染进度条 如已上传完成则合并文件
                            this.fileMerge(result.data.tempFile)
                        })
                        .catch(error => {
                            console.log('上传失败' + error)
                        })
                    index++
                    start = end
                }
            },
            fileMerge(tempFile) {
                console.log(tempFile, 'tempFile')
                this.fileIndex++
                this.tempFileName += tempFile + ','
                // 上传视频进度条
                this.uploadProgress = Number((this.fileIndex
                    / this.chunkNumber * 100).toFixed(2))
                // 上传完所有的视频后执行
                if (this.fileIndex === this.chunkNumber - 1) {
                    let formData = new FormData()
                    formData.append('tempFile', this.tempFileName) // 文件分片名称
                    formData.append('originalFileName', this.fileName) // 文件名称
                    axios({
                        method: 'post',
                        url: 'file-upload/merge',
                        data: formData
                    })
                        .then(result => {
                            console.log(result)
                            this.uploadProgress = 100
                        })
                        .catch(error => {
                            console.log('上传失败' + error)
                        })
                    // 清空临时文件名称
                    this.tempFileName = ''
                    // 文件下标归0
                    this.fileIndex = 0
                }
            },
            time() {
                const url = URL.createObjectURL(this.$refs.file.files[0])

                // 可通过audio对象获取视频或音频时长
                const audio = new Audio(url)

                // 当音/视频的元数据加载时 会触发loadedmetadata事件
                audio.addEventListener('loadedmetadata', function() {
                    // 获取视频播放时间
                    const hour = parseInt((this.duration) / 3600)
                    const minute = parseInt((this.duration % 3600) / 60)
                    const second = Math.ceil(this.duration % 60)
                    console.log(hour + '小时 ' + minute + '分 ' + second + '秒')
                })
            },
            // 加载视频
            load() {
                let file = this.$refs.file.files[0]
                let video = this.$refs.video
                video.src = URL.createObjectURL(file)

                const that = this
                /*
                 * loadstart      视频开始加载时执行
                 * durationchange 视频时长发生变化时执行
                 * loadedmetadata 视频元数据加载后时执行
                 * loadeddata     视频当前帧的数据可用时执行
                 * progress       视频正在下载时执行
                 * canplay        视频准备开始播放时执行
                 * canplaythrough 视频可以正常播放且无需停顿时执行
                 */
                video.addEventListener('canplaythrough', function() {
                    let scale = 0.8
                    let canvas = document.createElement('canvas')
                    canvas.width = this.videoWidth * scale
                    canvas.height = this.videoHeight * scale
                    canvas.getContext('2d').drawImage(this, 0, 0, canvas.width, canvas.height)

                    let image = document.createElement('img')
                    image.src = canvas.toDataURL('image/png')
                    image.width = 400
                    image.height = 300
                    that.$refs.content.appendChild(image)
                })
            }
        }
    }
</script>
