<template>
    <el-menu
        :default-active="activeIndex"
        @select="handleSelect"
        class="el-menu-demo"
        mode="horizontal"
    >
        <template v-for="(item, index) in list">
            <el-submenu
                :index="String(index + 1)"
                :key="item.id"
                v-if="
                    item.permissionList !== null &&
                        item.permissionList.length > 0
                "
            >
                <template slot="title"
                    >{{ item.permissionName }} {{ index + 1 }}
                </template>
                <el-menu-item
                    :href="item1.url"
                    :index="String(index + 1 + '-' + (index1 + 1))"
                    :key="item1.id"
                    v-for="(item1, index1) in item.permissionList"
                    >{{ item1.permissionName }}
                    target="_blank"
                </el-menu-item>
            </el-submenu>
            <el-menu-item
                :href="item.url"
                :index="String(index + 1)"
                :key="item.id"
                v-else
            >
                {{ item.permissionName }}
            </el-menu-item>
        </template>
    </el-menu>
</template>

<script>
import axios from 'axios'

export default {
    name: 'header',
    data() {
        return {
            activeIndex: '1',
            list: []
        }
    },
    // 当data和methods初始化完毕后 会自动执行created生命周期函数
    created() {
        axios
            .get('/permission/list')
            .then(result => {
                this.list = result.data.data.list
            })
            .catch(err => {
                console.log(err)
            })
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath)
        }
    }
}
</script>

<style scoped>
el-menu {
    background-color: red;
}
</style>
