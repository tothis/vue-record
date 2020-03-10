<template>
    <div class="home">
        <img alt="Vue logo" src="@/assets/cool.gif"/>
        <item msg="learn vue"/>
    </div>
</template>
<script>
    import item from '@/components/item'

    export default {
        name: 'home',
        components: {
            item
        }
    }
</script>
<style lang="stylus" scoped>
    img
        border-radius: .8%;
</style>
