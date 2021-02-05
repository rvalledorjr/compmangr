import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
  },
  {
    path: "/login",
    component: () => import("@/views/LoginPage.vue"),
  },
  {
    path: "/home",
    component: () => import("@/views/HomePage.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const toLogin = to.path === "/login";
  const toRoot = to.path == "/";
  const user = store.state.user;
  if (user.isAuthenticated && (toLogin || toRoot)) {
    next("/home");
  } else if (!user.isAuthenticated && !toLogin) {
    next("/login");
  } else {
    next();
  }
});

export default router;
