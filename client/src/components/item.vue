<template>
    <el-button :title="message" @click="emitEvent1">子调父</el-button>
</template>
<script>
    export default {
        name: 'item',
        props: {
            message: String
        },
        mounted() {
            // 监听子组件'event'事件
            this.$on('event', e => {
                console.log('子组件监听父组件event事件 数据 => ', e)
            })
        },
        methods: {
            emitEvent1() {
                console.log('子组件调用父组件event事件')
                this.$emit('event', '子组件数据')
            },
            emitEvent2(e) {
                console.log('父组件数据 => ', e)
            }
        }
    }
</script>
