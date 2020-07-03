<template>
    <div class="home">
        <!-- <img alt="图片" src="@/assets/cool.gif"> -->

        <el-divider>组件示例</el-divider>

        <item message="父数据" @event="event" ref="item"/>
        <el-button @click="item">父调子</el-button>

        <br>

        {{ message }}

        <el-divider>vuex示例</el-divider>

        <el-button disabled>state {{ $store.state.count }}</el-button>
        <el-button disabled>getter {{ $store.getters.count }}</el-button>
        <el-button @click="$store.commit('increment')">mutation</el-button>
        <el-button @click="$store.dispatch('increment')">action</el-button>

        <br>

        <el-button @click="$store.commit('a/set')">module a mutation</el-button>
        <el-button @click="$store.commit('b/set')">module b mutation</el-button>
        <el-button disabled>module a state {{ $store.state.a.name }}</el-button>
        <el-button disabled>module b state {{ $store.state.b.name }}</el-button>

        <br>

        <el-button disabled>mapState {{ count1 }}</el-button>
        <el-button disabled>mapState {{ count2 }}</el-button>
        <el-button disabled>mapGetter {{ countGet }}</el-button>
        <!-- <el-button disabled>mapState state {{ count }}</el-button> -->
        <el-button @click="incrementAction">mapActions</el-button>
        <el-button @click="incrementMutation">mapActions</el-button>
    </div>
</template>
<script>
    import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
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
        },
        computed: {
            ...mapState({
                count1: 'count', // 第一种写法
                count2: e => e.count // 第二种写法
            }),
            ...mapGetters({
                countGet: 'count'
            })
        },
        // computed: mapState([
        //     'count'
        // ]),
        methods: {
            ...mapActions({
                incrementAction: 'increment'
            }),
            ...mapMutations({
                incrementMutation: 'increment'
            }),
            event(e) {
                console.log('子组件数据 => ', e)
            },
            item() {
                console.log('父组件调用子组件emitEvent函数')
                this.$refs.item.emitEvent2('父组件数据')
            }
        }
    }
</script>
<style lang="stylus" scoped>
    img
        border-radius 4%
</style>
