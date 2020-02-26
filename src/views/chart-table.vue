<template>
    <div class="content" ref="chart"></div>
</template>

<script>
import echarts from 'echarts'

// 全局引入会将所有的echarts图表打包导致体积过大 使用require而不是import
// 引入基本模板
// let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
// require('echarts/lib/chart/bar')
// 引入提示框和title组件
// require('echarts/lib/component/tooltip')
// require('echarts/lib/component/title')
export default {
    name: 'chart-table',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    },
    mounted() {
        this.draw()
    },
    methods: {
        draw() {
            const category = []
            let dottedBase = +new Date()
            const lineData = []
            const barData = []
            for (let i = 0; i < 20; i++) {
                const date = new Date((dottedBase += 3600 * 24 * 1000))
                category.push(
                    [
                        date.getFullYear(),
                        date.getMonth() + 1,
                        date.getDate()
                    ].join('-')
                )
                const b = Math.random() * 200
                const d = Math.random() * 200
                barData.push(b)
                lineData.push(d + b)
            }

            // 基于准备好的dom 初始化echarts实例
            const chart = echarts.init(this.$refs.chart)
            // 绘制图表
            chart.setOption({
                backgroundColor: '#0f375f',
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['line', 'bar'],
                    textStyle: {
                        color: '#ccc'
                    }
                },
                xAxis: {
                    data: category,
                    axisLine: {
                        lineStyle: {
                            color: '#ccc'
                        }
                    }
                },
                yAxis: {
                    splitLine: { show: false },
                    axisLine: {
                        lineStyle: {
                            color: '#ccc'
                        }
                    }
                },
                series: [
                    {
                        name: 'line',
                        type: 'line',
                        smooth: true,
                        showAllSymbol: true,
                        symbol: 'emptyCircle',
                        symbolSize: 15,
                        data: lineData
                    },
                    {
                        name: 'bar',
                        type: 'bar',
                        barWidth: 10,
                        itemStyle: {
                            barBorderRadius: 5,
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    { offset: 0, color: '#14c8d4' },
                                    { offset: 1, color: '#43eec6' }
                                ]
                            )
                        },
                        data: barData
                    },
                    {
                        name: 'line',
                        type: 'bar',
                        barGap: '-100%',
                        barWidth: 10,
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    {
                                        offset: 0,
                                        color: 'rgba(20,200,212,0.5)'
                                    },
                                    {
                                        offset: 0.2,
                                        color: 'rgba(20,200,212,0.2)'
                                    },
                                    { offset: 1, color: 'rgba(20,200,212,0)' }
                                ]
                            )
                        },
                        z: -12,
                        data: lineData
                    },
                    {
                        name: 'dotted',
                        type: 'pictorialBar',
                        symbol: 'rect',
                        itemStyle: {
                            color: '#0f375f'
                        },
                        symbolRepeat: true,
                        symbolSize: [12, 4],
                        symbolMargin: 1,
                        z: -10,
                        data: lineData
                    }
                ]
            })
        }
    }
}
</script>

<style lang="stylus" scoped>
.content
    height 80%
</style>
