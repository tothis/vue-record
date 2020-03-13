<template>
    <div>
        <el-button @click="dataAdd" type="primary">
            <i class="el-icon-plus"></i>
            主要按钮
        </el-button>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column label="日期">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
            </el-table-column>
            <el-table-column label="姓名">
                <template slot-scope="scope">
                    <el-popover placement="top" trigger="hover">
                        <p>姓名: {{ scope.row.name }}</p>
                        <p>住址: {{ scope.row.address }}</p>
                        <div class="name-wrapper" slot="reference">
                            <el-tag size="medium">{{ scope.row.name }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            @click="handleEdit(scope.$index, scope.row)"
                            size="mini"
                    >编辑
                    </el-button>
                    <el-button
                            @click="handleDelete(scope.$index, scope.row)"
                            size="mini"
                            type="danger"
                    >删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: 'data-table',
        data() {
            return {
                tableData: [
                    {
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    },
                    {
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄'
                    },
                    {
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1519 弄'
                    }
                ]
            }
        },
        methods: {
            dataAdd() {
                this.tableData.push({
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                })
            },
            handleEdit(index, row) {
                console.log(index, row)
            },
            handleDelete(index, row) {
                console.log(index, row)
            }
        }
    }
</script>

<style scoped></style>
