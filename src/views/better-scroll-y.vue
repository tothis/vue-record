<template>
    <div>
        <ul class="action">
            <li @click="scrollTo(0, 0)">item 1</li>
            <li @click="scrollToEl('c-2')">item 2</li>
            <li @click="scrollToEl('c-3')">item 3</li>
            <li @click="scrollToEl('c-4')">item 4</li>
        </ul>
        <div class="content" ref="scroll">
            <div class="scroll">
                <!-- 必须包含两层div -->
                <div class="c-1">content 1</div>
                <div class="c-2">content 2</div>
                <div class="c-3">content 3</div>
                <div class="c-4">content 4</div>
            </div>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'

    export default {
        name: 'better-scroll-x',
        data() {
            return {
                scroll: {} // 滚动容器对象
            }
        },
        methods: {
            // 滚动到指定距离
            scrollTo(x, y) {
                this.scroll.scrollTo(x, y, 300)
            },
            // 滚动到指定元素
            scrollToEl(el) {
                // 根据class获取dom元素
                const element = this.$refs.scroll.getElementsByClassName(el)[0]
                this.scroll.scrollToElement(element, 300)
            }
        },
        created() {
            // 渲染dom后初始化滚动
            this.$nextTick(() => {
                // 初始化滚动
                this.scroll = new BScroll(this.$refs.scroll)

                this.scroll.on('touchend', pos => {
                    alert('下拉动作')
                    // 下拉动作
                    if (pos.y > 50) {
                        alert('加载数据')
                    }
                    // this.scroll.refresh()
                })
            })
        }
    }
</script>

<style scoped>
    .action {
        width: 200px;
        background-color: #eee;
        padding: 0;
        list-style: none;
    }

    .action > li {
        border: 1px solid #ddd;
    }

    .content {
        width: 600px;
        height: 400px;
        background-color: #999;
        white-space: nowrap;
        overflow: hidden;
    }

    .scroll > div {
        height: 400px;
        background-color: #f5f5f5;
        border: 1px solid #ddd;
    }
</style>
