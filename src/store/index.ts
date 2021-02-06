import Vue from "vue";
import Vuex from "vuex";
import User from "@/model/User";
import Company from "@/model/Company";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: new User({
      userName: "admin",
      password: "admin",
    }),
    companies: [] as Company[],
  },
  mutations: {
    AUTHENTICATE(state, auth: { userName: string; password: string }) {
      state.user.authenticate(auth.userName, auth.password);
    },
    LOGOUT(state) {
      state.user.logout();
    },
    ADD_COMPANY(state, company: Company) {
      state.companies.push(company);
    },
    DELETE_COMPANY(state, company: Company) {
      const i = state.companies.indexOf(company);
      state.companies.splice(i, 1);
    },
  },
  actions: {},
  modules: {},
});

export default store;
