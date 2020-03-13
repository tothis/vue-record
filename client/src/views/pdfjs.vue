<template>
    <div class="container">
        <div class="view" id="canvas-wrap"></div>
        <div class="toolbar">
            <el-button @click="onDownload" size="mini" type="primary">
                下载
            </el-button>
            <!-- <el-button type="primary" size="mini" @click="onPrint"> -->
            <!-- 打印-->
            <!-- </el-button> -->
        </div>
        <!-- 打印使用 -->
        <!-- <iframe name="printContainer" class="print"></iframe> -->
    </div>
</template>

<script>
    import { Loading, Message } from 'element-ui'
    import { pdf as pdfApi } from '@/service/api'
    import { fileDownload } from '@/util/file-util'
    import PDFJS from 'pdfjs-dist'

    export default {
        name: 'pdfjs',
        data() {
            return {
                pdfContent: null,
                pdfPage: 0,
                pdfScale: 1.5,
                pdfName: 'test'
            }
        }, computed: { // computed监控自定义变量 该变量不在data中声明 直接在computed中定义
            // 打印使用
            // printWindow() {
            //     return window.frames['printContainer']
            // },
            // printBody() {
            //     return this.printWindow.document.body
            // }
        },
        mounted() {
            // 加载pdf文件
            const loading = Loading.service({
                target: 'body',
                text: '加载pdf中...'
            })
            this.fetchPDFData()
                .then(pdf => {
                    loading.close()
                    if (pdf) {
                        this.pdfContent = pdf
                        this.pdfPage = pdf.numPages
                        // 执行完 pdf => canvas 任务后 执行 canvas => image 任务
                        Promise.all(this.renderCanvas()).then(() => {
                            this.canvas2img()
                        })
                    } else {
                        Message.error({
                            message: '获取pdf失败'
                        })
                    }
                })
                .catch(error => {
                    loading.close()
                    console.error(error)
                    if (error)
                        Message.error({
                            message: error.toString()
                        })
                })
        },
        methods: {
            // 拉取pdf数据
            async fetchPDFData() {
                return pdfApi()
                    .then(async res => {
                        const { ret, data } = res
                        if (ret === 0) {
                            const { data: binaryData } = data
                            const loadingTask = PDFJS.getDocument({ data: binaryData })
                            return await loadingTask.promise
                        } else {
                            return Promise.resolve()
                        }
                    })
                    .catch(error => {
                        return Promise.reject(error)
                    })
            },
            // pdf => canvas
            renderCanvas() {
                const renderTasks = []
                for (let i = 1; i <= this.pdfPage; i++) {
                    renderTasks.push(this.appendPage(i))
                }
                return renderTasks
            },
            // canvas => image
            canvas2img() {
                for (let i = 1; i <= this.pdfPage; i++) {
                    const target = document.getElementById('canvas_' + i)
                    const img = new Image()
                    img.src = target.toDataURL()
                    this.printBody.appendChild(img)
                }
            },
            // 创建canvas容器 并将1页pdf渲染上去
            appendPage(pageIndex) {
                return this.pdfContent.getPage(pageIndex).then(page => {
                    const viewport = page.getViewport(this.pdfScale)
                    // 在页面中创建canvas
                    const canvas = document.createElement('canvas')
                    canvas.id = 'canvas_' + pageIndex
                    document.getElementById('canvas-wrap').append(canvas)
                    const context = canvas.getContext('2d')
                    canvas.height = viewport.height
                    canvas.width = viewport.width
                    const renderContext = {
                        canvasContext: context,
                        viewport: viewport
                    }
                    return page.render(renderContext)
                })
            },
            // 下载
            onDownload() {
                this.pdfContent.getData().then(data => {
                    const blob = new Blob([data], { type: 'application/pdf' })
                    fileDownload(blob, `${this.pdfName}.pdf`)
                })
            }
            // 打印
            // onPrint() {
            //     this.printWindow.print()
            // }
        }
    }
</script>
<style lang="stylus" scoped>
    .container
        position relative
        width 100%
        height 100%

    .view
        width 100%
        padding-top 44px
        text-align center

    .toolbar
        position fixed
        top 16%

    .print
        display none
</style>
