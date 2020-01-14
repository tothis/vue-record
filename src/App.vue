<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
      |
      <router-link to="/header">header</router-link>
      |
      <router-link to="/user">user</router-link>
      |
      <router-link to="/file-upload">file-upload</router-link>
      |
      <router-link to="/data-table">element-table</router-link>
      |
      <router-link to="/better-scroll-x">better-scroll-x</router-link>
      |
      <router-link to="/better-scroll-y">better-scroll-y</router-link>
      |
      <router-link to="/chart-table">echarts</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<style lang="stylus">
#app
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    text-align center
    color #2c3e50
    margin-top 60px
</style>
