<template>
    <div class="home">
        <!-- <img alt="图片" src="@/assets/cool.gif"/> -->
        <item msg="learn vue"/>
        {{ message }}

        <el-divider>分割线</el-divider>

        <el-button disabled>state {{ $store.state.count }}</el-button>
        <el-button disabled>getter {{ $store.getters.count }}</el-button>
        <el-button @click="$store.commit('increment')">mutation</el-button>
        <el-button @click="$store.dispatch('increment')">action</el-button>

        <el-divider>分割线</el-divider>

        <el-button @click="$store.commit('a/set')">module a mutation</el-button>
        <el-button @click="$store.commit('b/set')">module b mutation</el-button>
        <el-button disabled>module a state {{ $store.state.a.name }}</el-button>
        <el-button disabled>module b state {{ $store.state.b.name }}</el-button>
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
