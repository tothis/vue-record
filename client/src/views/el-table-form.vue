<template>
    <div>
        <el-button @click="addRow">新增</el-button>
        <el-form :model="form" :rules="form.formRule">
            <el-table empty-text="请增行填写" :data="form.formData">
                <!-- 索引列 -->
                <el-table-column type="index" align="center" />

                <el-table-column label="名称">
                    <template slot-scope="scope">
                        <el-form-item
                            :prop="'formData.' + scope.$index + '.name'"
                            :rules="form.formRule.name">
                            <el-input v-model="scope.row.name" placeholder="请输入名称" />
                        </el-form-item>
                    </template>
                </el-table-column>

                <el-table-column label="高度">
                    <template slot-scope="scope">
                        <el-form-item
                            :prop="'formData.' + scope.$index + '.height'"
                            :rules="form.formRule.height">
                            <el-input v-model="scope.row.height" type="number" placeholder="请输入高度" />
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="date"
                    label="操作"
                    width="100">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="danger"
                            icon="el-icon-delete"
                            circle
                            @click="deleteRow(scope.$index)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form>
    </div>
</template>
<script>
export default {
    name: 'el-table-form',
    data() {
        return {
            form: {
                // 数据
                formData: [{
                    name: '李磊',
                    height: 0
                }],
                // 校验
                formRule: {
                    name: [
                        { required: true, message: '名称不能为空', trigger: 'blur' }
                    ],
                    height: [
                        { required: true, message: '高度不能为空', trigger: 'blur' }
                    ]
                }
            }
        }
    },
    methods: {
        addRow() {
            this.form.formData.push({
                name: null,
                height: null
            })
        },
        deleteRow(index) {
            this.form.formData.splice(index, 1)
        }
    }
}
</script>