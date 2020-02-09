<template>
  <div>
    <p v-for="item in 100" :key="item">{{ item }}</p>
  </div>
</template>

<script>
import RememberScroll from "@/util/remember-scroll";

export default {
  name: "remember-scroll",
  created() {
    new RememberScroll();
  }
};
</script>
