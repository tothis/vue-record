import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/About.vue")
  },
  {
    path: "/header",
    name: "header",
    component: () => import("@/components/header.vue")
  },
  {
    path: "/user",
    name: "user",
    component: () => import("@/components/user.vue")
  },
  {
    path: "/file-upload",
    name: "file-upload",
    component: () => import("@/components/file-upload/index.vue")
  },
  {
    path: "/data-table",
    name: "data-table",
    component: () => import("@/views/data-table.vue")
  },
  {
    path: "/better-scroll-x",
    name: "better-scroll-x",
    component: () => import("@/views/better-scroll-x.vue")
  },
  {
    path: "/better-scroll-y",
    name: "better-scroll-y",
    component: () => import("@/views/better-scroll-y.vue")
  },
  {
    path: "/chart-table",
    name: "chart-table",
    component: () => import("@/views/chart-table.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
