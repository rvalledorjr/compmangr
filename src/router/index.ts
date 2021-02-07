import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import store from "@/store";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/home/companies",
  },
  {
    path: "/login",
    component: () => import("@/views/LoginPage.vue"),
  },
  {
    path: "/home",
    component: () => import("@/views/HomePage.vue"),
    children: [
      {
        path: "companies",
        components: {
          default: () => import("@/views/CompaniesPage.vue"),
          companyBtnAdd: () => import("@/components/CompanyBtnAdd.vue"),
          companyDialogAdd: () => import("@/components/CompanyDialogAdd.vue"),
        },
        beforeEnter(to, from, next) {
          store.commit("SELECT_COMPANY", {});
          next();
        },
      },
      {
        path: "companies/:id",
        components: {
          default: () => import("@/views/CompanyPage.vue"),
        },
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const toLogin = to.path === "/login";
  const toRoot = to.path == "/";
  const user = store.state.user;
  if (!user.isAuthenticated) {
    if (toLogin) next();
    else next("/login");
    return;
  }

  if (user.isAuthenticated) {
    if (toLogin) next("/home/companies");
    else next();
  }
});

export default router;
