<template>
    <div>
        <el-table
                :data="userList"
                :default-sort="{ prop: 'createTime', order: 'descending' }"
                @selection-change="handleSelectionChange"
                style="width: 100%"
        >
            <el-table-column
                    :index="indexMethod"
                    align="center"
                    label="序号"
                    type="index"
            />
            <el-table-column
                    align="center"
                    label="用户账户"
                    prop="userName"
                    width="180"
            />
            <el-table-column align="center" label="用户昵称" prop="nickName"/>
            <el-table-column
                    align="center"
                    label="创建日期"
                    prop="createTime"
                    sortable
            />
            <el-table-column
                    align="center"
                    label="修改日期"
                    prop="updateTime"
                    sortable
            />
        </el-table>

        <el-pagination
                :current-page="startRow"
                :page-size="pageSize"
                :page-sizes="[10, 50, 100, 200]"
                :total="total"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                background
                layout="total, sizes, prev, pager, next, jumper"
        />
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'user',
        data() {
            return {
                keyword: '集团',
                startRow: 1,
                pageSize: 10,
                total: 0,
                userList: [],
                multipleSelection: []
            }
        },
        // 当data和methods初始化完毕后 会自动执行created生命周期函数
        created() {
            this.loadData()
        },
        methods: {
            handleSelectionChange(val) {
                // 当选择项发生变化时会触发该事件
                this.multipleSelection = val
            },
            loadData() {
                // 获取数据
                const params = {
                    keywords: this.keywords,
                    startRow: (this.startRow - 1) * this.pageSize,
                    pageSize: this.pageSize
                }
                axios
                    .get('/user/list', { params: params })
                    .then(result => {
                        this.userList = result.data.data.list
                        this.total = result.data.data.count
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            handleSizeChange(size) {
                // pageSize改变时触发
                this.pageSize = size
            },
            handleCurrentChange(startRow) {
                // 切换页码时触发
                this.startRow = startRow
                this.loadData()
            },
            indexMethod(index) {
                // 索引显示
                return (this.startRow - 1) * this.pageSize + index + 1
            }
        }
    }
</script>

<style scoped></style>
