<template>
  <div id="app">
    <div ref="wrap">
      <div id="nav" ref="nav">
        <router-link to="/">home</router-link>
        <router-link to="/about">about</router-link>
        <router-link to="/header">header</router-link>
        <router-link to="/user">user</router-link>
        <router-link to="/file-upload">file-upload</router-link>
        <router-link to="/data-table">element-table</router-link>
        <router-link to="/better-scroll-x">better-scroll-x</router-link>
        <router-link to="/better-scroll-y">better-scroll-y</router-link>
        <router-link to="/chart-table">echarts</router-link>
        <router-link to="/vant-calendar">vant-calendar</router-link>
        <router-link to="/vant-date">vant-date</router-link>
        <router-link to="/ele-date">ele-date</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  data() {
    return {
      scroll: null
    };
  },
  created() {
    this.$nextTick(() => {
      let nav = this.$refs.nav;
      let tags = nav.children;
      let width = 0;
      // 获取所有子元素宽度
      for (let i = 0; i < tags.length; i++) {
        width += tags[i].offsetWidth;
      }
      nav.style.width = width + "px";
      // this.$nextTick 是一个异步函数 为了确保dom已经渲染
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.wrap, {
            startX: 0,
            click: true,
            scrollX: true,
            // 忽略竖直方向的滚动
            scrollY: false,
            eventPassthrough: "vertical"
          });
        } else {
          this.scroll.refresh();
        }
      });
    });
  }
};
</script>

<style lang="stylus">
#app
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    text-align center
    color #2c3e50
    overflow: hidden;
    white-space: nowrap;

#nav
    margin: 2% auto;

#nav > a
    color white
    display inline-block
    border-radius 2px
    background-color seagreen
    padding: 2px 6px;

#nav > a + a
    margin-left 4px
</style>
