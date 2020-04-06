<template>
    <div class="home">
        <img alt="Vue logo" src="@/assets/cool.gif"/>
        <item msg="learn vue"/>
        {{ message }}
    </div>
</template>
<script>
    import item from '@/components/item'

    export default {
        name: 'home',
        components: {
            item
        },
        data() {
            return {
                message: process.env
            }
        }
    }
</script>
<style lang="stylus" scoped>
    img
        border-radius 4%
</style>
