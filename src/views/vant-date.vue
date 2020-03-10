<template>
    <div>
        <el-input v-model="showDate"></el-input>
        <van-datetime-picker
                :formatter="formatter"
                :max-date="maxDate"
                :min-date="minDate"
                @confirm="show"
                type="datetime"
                v-model="date"
        />
    </div>
</template>

<script>
    export default {
        name: 'vant-date',
        data() {
            return {
                minDate: new Date(2020, 0, 1),
                maxDate: new Date(2025, 10, 1),
                date: new Date(),
                showDate: ''
            }
        },
        methods: {
            show() {
                console.log(this.date)
                this.showDate = this.dateFormat(this.date)
            },
            formatter(type, value) {
                // 格式化选择器日期
                if (type === 'year') {
                    return `${value}年`
                } else if (type === 'month') {
                    return `${value}月`
                } else if (type === 'day') {
                    return `${value}日`
                } else if (type === 'hour') {
                    return `${value}时`
                } else if (type === 'minute') {
                    return `${value}分`
                }
                return value
            },
            dateFormat(date) {
                const showDate = new Date(date)
                const y = showDate.getFullYear()
                const M = (showDate.getMonth() + 1).toString().padStart(2, '0')
                const d = showDate
                    .getDate()
                    .toString()
                    .padStart(2, '0') // 日
                const H = showDate
                    .getHours()
                    .toString()
                    .padStart(2, '0') // 小时
                const m = showDate
                    .getMinutes()
                    .toString()
                    .padStart(2, '0') // 分
                const s = showDate
                    .getSeconds()
                    .toString()
                    .padStart(2, '0') // 秒
                return `${y}-${M}-${d} ${H}:${m}:${s}`
            }
        }
    }
</script>

<style scoped></style>
