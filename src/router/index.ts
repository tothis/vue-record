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
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
