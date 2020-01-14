<template>
  <div ref="chart" :style="{ width: '300px', height: '300px' }"></div>
</template>

<script>
// import echarts from 'echarts'

// 全局引入会将所有的echarts图表打包导致体积过大 使用require而不是import
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/bar");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");

export default {
  name: "chart-table",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom 初始化echarts实例
      let chart = echarts.init(this.$refs.chart);
      // 绘制图表
      chart.setOption({
        title: { text: "标题" },
        tooltip: {},
        xAxis: {
          data: ["one", "two", "three"]
        },
        yAxis: {},
        series: [
          {
            name: "data",
            type: "bar",
            data: [5, 20, 100]
          }
        ]
      });
    }
  }
};
</script>

<style scoped></style>
