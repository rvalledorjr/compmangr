import Vue from "vue";
import Vuex from "vuex";
import User from "@/model/User";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: new User({
      userName: "admin",
      password: "admin",
    }),
  },
  mutations: {
    AUTHENTICATE(state, auth: { userName: string; password: string }) {
      state.user.authenticate(auth.userName, auth.password);
    },
    LOGOUT(state) {
      state.user.logout();
    },
  },
  actions: {},
  modules: {},
});

export default store;
