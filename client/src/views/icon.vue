<template>
    <div>
        <p>原生写法</p>
        <svg class="svg-icon">
            <use xlink:href="#icon-eye"/>
        </svg>
        <p>组件写法</p>
        <svg-icon icon-class="树"/>
        <p>font</p>
        <p><i class="font-eye"/></p>
        <p><i class="font-树"/></p>
    </div>
</template>
<script>
    export default {
        name: 'icon'
    }
</script>
<style lang="stylus" scoped>
    .svg-icon
        width 1em
        height 1em
</style>