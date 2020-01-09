<template>
    <div>
        <div v-for="(imgUrl, index) in imgList" :key="index">
            <img :src='imgUrl' preview="1">
            <div @click="deleteImg(index)">
                <img>
            </div>
        </div>
        <div class="add-pic" v-if="imgList.length < 6">
            <img>
            <p>{{picNum}}/6</p>
            <input type="file" accept="image/*" multiple="multiple" name="cover" @change="uploadPic($event)">
        </div>
    </div>
</template>

<script>
    import EXIF from 'exif-js'

    export default {
        name: 'file-upload',
        props: {
            imgUrls: Array
        },
        data () {
            return {
                // 图片
                picNum: 0,
                imgObj: {
                    size: 500
                },
                imgList: []
            }
        },
        mounted () {
            this.imgList = this.imgUrls
        },
        methods: {
            // 上传图片
            uploadPic (e) {
                if (this.imgUrls.length === 6) {
                    console.log({
                        message: '最多上传6张图片',
                        duration: 1200
                    })
                    return
                }
                // 获取当前选中的文件
                let file = e.target.files[0]
                // console.log('初始file:', file);
                this.imgObj.imgType = file.type
                // 图片压缩之旅
                this.transformFileToDataUrl(file)
            },
            transformFileToDataUrl (file) { // 将file转成dataUrl Base64格式
                let _this = this
                let imgCompassMaxSize = 1024 * 500 * 4 / 3 // 超过500k就压缩

                // 读取文件
                let reader = new FileReader()

                reader.readAsDataURL(file)
                // file转dataUrl是个异步函数 要将代码写在回调里
                reader.onload = function (e) {
                    let dataUrl = e.target.result
                    console.log('dataUrl的type:', typeof dataUrl)

                    // 展示图片-压缩前
                    // document.querySelector('#show-pic').src = dataUrl

                    console.log('Base64大小:', dataUrl.length)

                    // 图片不压缩
                    if (dataUrl.length < imgCompassMaxSize) {
                        _this.rotateAndCompress(dataUrl, false)

                        // 图片压缩
                    } else {
                        _this.rotateAndCompress(dataUrl, true)
                    }
                }
            },
            // 使用canvas绘制图片并压缩
            rotateAndCompress (dataUrl, isCompress) {
                let _this = this
                if (isCompress) {
                    this.imgObj.ratio = (this.imgObj.size * 1024) / (dataUrl.length)
                } else {
                    this.imgObj.ratio = 1
                }
                console.log('压缩比ratio:', this.imgObj.ratio)

                let img = new Image()
                // console.log('img:', img)

                console.log('beforeCompress大小:', dataUrl.length)

                img.onload = function () {
                    // 方向
                    let orient
                    EXIF.getData(img, function () { // 只用来获取方向
                        orient = EXIF.getTag(this, 'Orientation')
                    })
                    console.log('方向orient:', orient)

                    // 画布
                    let canvas = document.createElement('canvas')
                    // document.body.append(canvas)
                    // 设置画布的宽高
                    canvas.width = img.width // 没压缩宽高
                    canvas.height = img.height

                    console.log('w:', img.width)
                    console.log('h:', img.height)

                    // 画笔
                    let ctx = canvas.getContext('2d')

                    // 执行Canvas的drawImage语句
                    // ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
                    // 画图 判断图片拍摄方向的 - 旋转角度
                    if (orient === 1 || orient === 0 || orient === undefined) {
                        // 执行Canvas的drawImage语句
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
                    } else {
                        // 保存状态
                        ctx.save()
                        // 设置画布上的(0, 0)位置 也就是旋转的中心点
                        ctx.translate(canvas.width / 2, canvas.height / 2)

                        if (orient === 3) {
                            // 把画布旋转180度
                            ctx.rotate(180 * Math.PI / 180)
                            // 执行Canvas的drawImage语句
                            ctx.drawImage(img, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height) // 没压缩宽高 只是调整了绘画的起始点
                        } else if (orient === 6) {
                            // 重新设置画布的宽高 需要颠倒宽高
                            canvas.width = img.height
                            canvas.height = img.width
                            // 重设画布的(0, 0)位置
                            ctx.translate(canvas.width / 2, canvas.height / 2)

                            // 把画布旋转90度
                            ctx.rotate(90 * Math.PI / 180)
                            // 执行Canvas的drawImage语句
                            // ctx.drawImage(img, Number(y) -canvas.height / 2, Number(x) -canvas.width / 2, canvas.width, canvas.height)
                            ctx.drawImage(img, -canvas.height / 2, -canvas.width / 2, canvas.height, canvas.width)
                        } else if (orient === 8) {
                            // 重新设置画布的宽高 需要颠倒宽高
                            canvas.width = img.height
                            canvas.height = img.width
                            // 重设画布的(0, 0)位置
                            ctx.translate(canvas.width / 2, canvas.height / 2)
                            // 把画布旋转270度
                            ctx.rotate(270 * Math.PI / 180)
                            // 执行Canvas的drawImage语句
                            ctx.drawImage(img, -canvas.height / 2, -canvas.width / 2, canvas.height, canvas.width)
                        }

                        // 恢复状态
                        ctx.restore()
                    }

                    // 压缩图片
                    // let compressedDataUrl = canvas.toDataURL('image/jpeg', imgObj.ratio)
                    console.log('imgObj:', _this.imgObj)
                    let compressedDataUrl = canvas.toDataURL(_this.imgObj.imgType, _this.imgObj.ratio)

                    console.log('afterCompress大小', compressedDataUrl.length)

                    _this.uploadImg(compressedDataUrl)
                }
                img.src = dataUrl
            },
            /**
             * 将以base64的图片url数据转换为Blob
             * @param urlData
             * 用url方式表示的base64图片数据
             */
            convertBase64UrlToBlob (urlData) {
                let arr = urlData.split(','),
                    mime = arr[0].match(/:(.*?);/)[1],
                    bstr = atob(arr[1]),
                    n = bstr.length,
                    u8arr = new Uint8Array(n)
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n)
                }
                return new Blob([u8arr], {type: mime})
            },
            uploadImg (data) {
                console.log('data上传前 ', data.length)

                let blob = this.convertBase64UrlToBlob(data)
                let formData = new FormData()
                formData.append('file', blob, 'file_' + Date.parse(new Date()) + '.jpg')
                formData.append('userId', 0)
                formData.append('fileType', 0)
                formData.append('flag', '')

                let config = {
                    transformRequest: data => data,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    // timeout: 10000
                } // 添加请求头

                this.$axios.post('http://localhost:8080/file-upload/image', formData, config)
                    .then(res => {
                        // console.log(res)
                        // 上传成功
                        if (res.status === 200) {
                            this.imgList = [res.data.data.fileUrl, ...this.imgList]
                            this.picNum++
                            // console.log(this.imgUrls)
                            this.$emit('uploadImg', this.imgList)
                        }
                    })
            },
            deleteImg (n) { // 删除图片
                this.picNum--
                this.$emit('deleteImg', n)
            }
        }
    }
</script>

<style scoped>

</style>
