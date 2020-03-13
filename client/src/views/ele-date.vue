<template>
    <el-card class="box-card">
        <div class="block">
            <span class="demonstration">默认</span>
            <el-date-picker
                    placeholder="选择日期时间"
                    type="datetime"
                    v-model="value1"
            >
            </el-date-picker>
        </div>
        <div class="block">
            <span class="demonstration">带快捷选项</span>
            <el-date-picker
                    :picker-options="pickerOptions"
                    align="right"
                    placeholder="选择日期时间"
                    type="datetime"
                    v-model="value2"
            >
            </el-date-picker>
        </div>
        <div class="block">
            <span class="demonstration">设置默认时间</span>
            <el-date-picker
                    default-time="12:00:00"
                    placeholder="选择日期时间"
                    type="datetime"
                    v-model="value3"
            >
            </el-date-picker>
        </div>
    </el-card>
</template>

<script>
    export default {
        name: 'ele-date',
        data() {
            return {
                pickerOptions: {
                    shortcuts: [
                        {
                            text: '今天',
                            onClick(picker) {
                                picker.$emit('pick', new Date())
                            }
                        },
                        {
                            text: '昨天',
                            onClick(picker) {
                                const date = new Date()
                                date.setTime(date.getTime() - 3600 * 1000 * 24)
                                picker.$emit('pick', date)
                            }
                        },
                        {
                            text: '一周前',
                            onClick(picker) {
                                const date = new Date()
                                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                                picker.$emit('pick', date)
                            }
                        }
                    ]
                },
                value1: '',
                value2: '',
                value3: ''
            }
        }
    }
</script>

<style scoped></style>
