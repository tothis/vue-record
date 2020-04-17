<template>
    <div>
        <el-card class="box-card">
            <div slot="header">压缩前图片</div>
            <div :key="index" class="image-show" v-for="(url, index) in imageBefore">
                <img :src="url" @click="deleteImage(index)">
            </div>
        </el-card>
        <el-card class="box-card">
            <div slot="header">压缩后图片</div>
            <div :key="index" class="image-show" v-for="(url, index) in imageAfter">
                <img :src="url" @click="deleteImage(index)">
            </div>
        </el-card>
        <el-card class="box-card">
            <div slot="header">服务器图片</div>
            <div :key="index" class="image-show" v-for="(url, index) in imageData">
                <img :src="url" @click="deleteImage(index)">
            </div>
        </el-card>
        <el-button @click="$refs.file.click()">
            <input @change="uploadImage($event)" accept="image/*"
                   multiple ref="file" style="display: none" type="file">上传
        </el-button>
    </div>
</template>
<script>
    import EXIF from 'exif-js'
    import axios from 'axios'

    export default {
        // name: 'image', // image为内置或保留的html元素 不可作为组件id
        name: 'file-image',
        data() {
            return {
                config: {
                    size: 1024 * 500 // 超过500k就压缩
                },
                imageBefore: [], // 压缩前图片
                imageAfter: [], // 压缩后图片
                imageData: [] // 图片链接
            }
        },
        methods: {
            // 上传图片
            uploadImage(e) {
                // 获取当前选中的文件
                const file = e.target.files[0]
                // console.log('file -> ', file)
                // 图片压缩
                this.fileToBase64(file)
            },
            fileToBase64(file) {
                // 读取文件
                const reader = new FileReader()

                // 将file转成dataUrl base64格式
                reader.readAsDataURL(file)
                // file转dataUrl为异步函数 需将代码写在回调函数中
                reader.onload = (function(that) {
                    return function(e) {
                        const base64 = e.target.result
                        console.log('base64大小', base64.length)

                        // 图片压缩
                        that.rotateAndCompress(base64, file.type)
                    }
                })(this)
            },
            // 使用canvas绘制图片并压缩
            rotateAndCompress(base64, fileType) {
                let ratio
                if (base64.length < this.config.size) {
                    ratio = 1
                } else {
                    ratio = this.config.size / base64.length
                }
                console.log('压缩比ratio', ratio)

                const image = new Image()

                console.log('压缩前大小', base64.length)
                // 压缩前图片
                this.imageBefore.push(base64)

                image.onload = (function(that) {
                        return function() {
                            let orientation
                            EXIF.getData(image, function() {
                                // 获取拍照方向
                                orientation = EXIF.getTag(this, 'Orientation')
                            })
                            /**
                             * 1 不翻转
                             * 2 左右翻转
                             * 3 180度翻转
                             * 4 上下翻转
                             * 5 顺时针翻转90度后 左右翻转
                             * 6 顺时针翻转90度
                             * 7 逆时针翻转90度后 左右翻转
                             * 8 逆时针翻转90度
                             */
                            console.log('照片拍摄方向 -> ', orientation)

                            // 画布
                            const canvas = document.createElement('canvas')
                            // 设置画布的宽高
                            canvas.width = image.width
                            canvas.height = image.height
                            console.log('图片宽度', image.width)
                            console.log('图片高度', image.height)
                            const ctx = canvas.getContext('2d')
                            switch (orientation) {
                                case 1:
                                case undefined:
                                    ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
                                    break
                                case 3:
                                    ctx.rotate(180 * Math.PI / 180) // 旋转180度
                                    ctx.drawImage(image, -image.width, -image.height, image.width
                                        , image.height)
                                    break
                                case 6:
                                    ctx.rotate(90 * Math.PI / 180) // 旋转90度
                                    ctx.drawImage(image, 0, -image.height, image.width, image.height)
                                    break
                                case 8:
                                    ctx.rotate(270 * Math.PI / 180) // 旋转270度
                                    ctx.drawImage(image, -image.width, 0, image.width, image.height)
                                    break
                                default:
                                    break
                            }

                            // 压缩图片
                            const result = canvas.toDataURL(fileType, ratio)

                            console.log('压缩后大小', result.length)
                            // 压缩后图片
                            that.imageAfter.push(result)
                            that.submit(result)
                        }
                    }
                )(this)
                image.src = base64
            },
            /**
             * base64转blob
             */
            base64ToBlob(base64) {
                const arr = base64.split(','),
                    mime = arr[0].match(/:(.*?);/)[1],
                    // 解码base64编码
                    decode = atob(arr[1])
                let length = decode.length
                const uint8Array = new Uint8Array(length)
                while (length--) {
                    uint8Array[length] = decode.charCodeAt(length)
                }
                return new Blob([uint8Array], { type: mime })
            },
            // 提交上传
            submit(data) {
                const blob = this.base64ToBlob(data)
                const formData = new FormData()
                formData.append(
                    'file', // 对应后端参数名称
                    blob,
                    new Date().getTime() + '.jpg' // 文件名称可省略
                )
                axios({
                    method: 'post',
                    url: 'file-upload/image',
                    data: formData
                })
                    .then(result => {
                        const urlPre = 'file-upload/'
                        console.log('上传成功', result.data)
                        this.imageData.push(urlPre + result.data.fileName)
                    })
                    .catch(error => {
                        console.log('上传失败' + error)
                    })
            },
            deleteImage(index) {
                this.imageBefore.splice(index, 1)
                this.imageAfter.splice(index, 1)
                this.imageData.splice(index, 1)
            }
        }
    }
</script>
<style lang="stylus" scoped>
    img
        width 240px
        height 140px
        object-fit: cover;
        border-radius 8px
        border 2px dashed

    .image-show
        display inline-block

    .image-show + .image-show
        margin-left 20px
</style>
