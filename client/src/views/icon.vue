<template>
    <div>
        <p>原生写法</p>
        <svg class="icon">
            <use xlink:href="#icon-eye"></use>
        </svg>
        <p>组件写法</p>
        <svg-icon icon-class="eye"></svg-icon>
    </div>
</template>
<script>
    export default {
        name: 'icon'
    }
</script>
<style lang="stylus" scoped>
    .icon
        width 100px
        height 100px
        vertical-align -0.15em
        fill currentColor
        overflow hidden
</style>