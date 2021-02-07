import Vue from "vue";
import Vuex from "vuex";
import User from "@/model/User";
import Company from "@/model/Company";
import Employee from "@/model/Employee";
import { compile } from "vue/types/umd";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: new User({
      userName: "admin",
      password: "admin",
    }),
    companies: [] as Company[],
    selectedCompany: {},
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
    SELECT_COMPANY(state, company: Company) {
      state.selectedCompany = company;
    },

    ADD_EMPLOYEE(state, employee: Employee) {
      const company = state.selectedCompany as Company;
      company.addEmployee(employee);
    },
    UPDATE_EMPLOYEE(state, employee: Employee) {
      const company = state.selectedCompany as Company;
      const emp = company.employeeWithId(employee.id);
      Object.assign(emp, employee);
    },
    DELETE_EMPLOYEE(state, employee: Employee) {
      const company = state.selectedCompany as Company;
      company.deleteEmployee(employee);
    },

    DELETE_DEPARTMENT(state, department: string) {
      const company = state.selectedCompany as Company;
      company.deleteDepartment(department);
    },
  },
  actions: {},
  modules: {},
});

export default store;
