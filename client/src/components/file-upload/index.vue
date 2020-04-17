<template>
    <div>
        <el-card class="box-card">
            <div class="clearfix" slot="header">
                <span>压缩前图片</span>
            </div>
            <div :key="index" class="image-show" v-for="(url, index) in imageBefore">
                <img :src="url" @click="deleteImage(index)">
            </div>
        </el-card>
        <el-card class="box-card">
            <div class="clearfix" slot="header">
                <span>压缩后图片</span>
            </div>
            <div :key="index" class="image-show" v-for="(url, index) in imageAfter">
                <img :src="url" @click="deleteImage(index)">
            </div>
        </el-card>
        <input @change="uploadImage($event)" accept="image/*"
               multiple="multiple" name="cover" type="file">
    </div>
</template>

<script>
    import EXIF from 'exif-js'
    import axios from 'axios'

    export default {
        name: 'file-upload',
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
                console.log('file -> ', file)
                // 图片压缩
                this.fileToDataUrl(file)
            },
            fileToDataUrl(file) {
                // 读取文件
                const reader = new FileReader()

                // 将file转成dataUrl Base64格式
                reader.readAsDataURL(file)
                // file转dataUrl是个异步函数 要将代码写在回调里
                reader.onload = (function(that) {
                    return function(e) {
                        const dataUrl = e.target.result
                        console.log('dataUrl的type ', typeof dataUrl)

                        // 展示图片 压缩前
                        that.imageBefore.push(dataUrl)

                        console.log('base64大小', dataUrl.length)

                        // 图片不压缩
                        if (dataUrl.length < that.config.size) {
                            that.rotateAndCompress(dataUrl, false, file.type)
                        } else {
                            // 图片压缩
                            that.rotateAndCompress(dataUrl, true, file.type)
                        }
                    }
                })(this)
            },
            // 使用canvas绘制图片并压缩
            rotateAndCompress(dataUrl, isCompress, fileType) {
                let imageItem = {}
                imageItem.type = fileType
                if (isCompress) {
                    imageItem.ratio = this.config.size / dataUrl.length
                } else {
                    imageItem.ratio = 1
                }
                console.log('压缩比ratio', imageItem.ratio)

                const image = new Image()

                console.log('beforeCompress大小', dataUrl.length)
                image.onload = (function(that) {
                        return function() {
                            let orientation
                            EXIF.getData(image, function() {
                                // 获取拍照方向
                                orientation = EXIF.getTag(this, 'Orientation')
                            })
                            console.log('照片拍摄方向 -> ', orientation)

                            // 画布
                            const canvas = document.createElement('canvas')
                            // document.body.append(canvas)
                            // 设置画布的宽高
                            canvas.width = image.width // 没压缩宽高
                            canvas.height = image.height

                            console.log('w', image.width)
                            console.log('h', image.height)

                            // 画笔
                            const ctx = canvas.getContext('2d')

                            // 根据图片拍摄方向 进行旋转
                            if (orientation === undefined) {
                                // 执行Canvas的drawImage语句
                                ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
                            } else {
                                // 保存状态
                                ctx.save()
                                // 设置画布上的(0, 0)位置 也就是旋转的中心点
                                ctx.translate(canvas.width / 2, canvas.height / 2)

                                switch (orientation) {
                                    case 3:
                                        // 把画布旋转180度
                                        ctx.rotate((180 * Math.PI) / 180)
                                        // 执行Canvas的drawImage语句
                                        ctx.drawImage(
                                            image,
                                            -canvas.width / 2,
                                            -canvas.height / 2,
                                            canvas.width,
                                            canvas.height
                                        ) // 没压缩宽高 只是调整了绘画的起始点
                                        break
                                    case  6:
                                        // 重新设置画布的宽高 需要颠倒宽高
                                        canvas.width = image.height
                                        canvas.height = image.width
                                        // 重设画布的(0, 0)位置
                                        ctx.translate(canvas.width / 2, canvas.height / 2)

                                        // 把画布旋转90度
                                        ctx.rotate((90 * Math.PI) / 180)
                                        // 执行Canvas的drawImage语句
                                        // ctx.drawImage(image, Number(y) -canvas.height / 2, Number(x) -canvas.width / 2, canvas.width, canvas.height)
                                        ctx.drawImage(
                                            image,
                                            -canvas.height / 2,
                                            -canvas.width / 2,
                                            canvas.height,
                                            canvas.width
                                        )
                                        break
                                    case 8:
                                        // 重新设置画布的宽高 需要颠倒宽高
                                        canvas.width = image.height
                                        canvas.height = image.width
                                        // 重设画布的(0, 0)位置
                                        ctx.translate(canvas.width / 2, canvas.height / 2)
                                        // 把画布旋转270度
                                        ctx.rotate((270 * Math.PI) / 180)
                                        // 执行Canvas的drawImage语句
                                        ctx.drawImage(
                                            image,
                                            -canvas.height / 2,
                                            -canvas.width / 2,
                                            canvas.height,
                                            canvas.width
                                        )
                                        break
                                    default:
                                        break
                                }

                                // 恢复状态
                                ctx.restore()
                            }

                            // 压缩图片
                            // let compressedDataUrl = canvas.toDataURL('image/jpg', imageItem.ratio)
                            console.log('imageItem', imageItem)
                            const compressedDataUrl = canvas.toDataURL(
                                imageItem.type,
                                imageItem.ratio
                            )

                            console.log('压缩后大小', compressedDataUrl.length)

                            that.imageAfter.push(compressedDataUrl)

                            that.submit(compressedDataUrl)
                        }
                    }
                )(this)
                image.src = dataUrl
            },
            /**
             * 将以base64的图片url数据转换为Blob
             * @param urlData
             * 用url方式表示的base64图片数据
             */
            convertBase64UrlToBlob(urlData) {
                const arr = urlData.split(','),
                    mime = arr[0].match(/:(.*?);/)[1],
                    // 解码base64编码
                    decode = atob(arr[1])
                let length = decode.length
                const u8arr = new Uint8Array(length)
                while (length--) {
                    u8arr[length] = decode.charCodeAt(length)
                }
                return new Blob([u8arr], { type: mime })
            },
            // 提交上传
            submit(data) {
                console.log('data上传前', data.length)

                const blob = this.convertBase64UrlToBlob(data)
                const formData = new FormData()
                formData.append(
                    'file',
                    blob,
                    'file_' + Date.parse(new Date()) + '.jpg' // 文件名称可省略
                )
                axios({
                    method: 'post',
                    url: '/file/image',
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(result => {
                        const urlPre = 'http://localhost:8080/file/'
                        console.log('上传成功' + JSON.stringify(result.data))
                        this.imageData = [
                            urlPre + result.data.fileAddress,
                            ...this.imageData
                        ]
                        this.$emit('submit', this.imageData)
                    })
                    .catch(error => {
                        console.log('上传失败' + error)
                    })
            },
            deleteImage(n) {
                // 删除图片
                this.$emit('deleteImage', n)
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
