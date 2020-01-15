<template>
  <div>
    <el-input v-model="showDate"></el-input>
    <van-datetime-picker
      v-model="date"
      type="datetime"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="show"
      :formatter="formatter"
    />
  </div>
</template>

<script>
export default {
  name: "vant-date",
  data() {
    return {
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      date: new Date(),
      showDate: ""
    };
  },
  methods: {
    show() {
      console.log(this.date);
      this.showDate = this.dateFormat(this.date);
    },
    formatter(type, value) {
      // 格式化选择器日期
      if (type === "year") {
        return `${value}年`;
      } else if (type === "month") {
        return `${value}月`;
      } else if (type === "day") {
        return `${value}日`;
      } else if (type === "hour") {
        return `${value}时`;
      } else if (type === "minute") {
        return `${value}分`;
      }
      return value;
    },
    dateFormat(date) {
      let showDate = new Date(date);
      let y = showDate.getFullYear();
      let M = (showDate.getMonth() + 1).toString().padStart(2, "0");
      let d = showDate
        .getDate()
        .toString()
        .padStart(2, "0"); // 日
      let H = showDate
        .getHours()
        .toString()
        .padStart(2, "0"); // 小时
      let m = showDate
        .getMinutes()
        .toString()
        .padStart(2, "0"); // 分
      let s = showDate
        .getSeconds()
        .toString()
        .padStart(2, "0"); // 秒
      return `${y}-${M}-${d} ${H}:${m}:${s}`;
    }
  }
};
</script>

<style scoped></style>
