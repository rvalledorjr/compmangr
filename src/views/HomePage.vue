<template>
  <v-app>
    <v-app-bar clipped-left app outlined flat color="primary" dark>
      <v-app-bar-nav-icon
        @click="showNavDrawer = !showNavDrawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>
        <span v-if="noSelectedCompany"> Commangr </span>
        <span v-else> {{ selectedCompany.name }} </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <router-view
        name="companyBtnAdd"
        @click="showCompanyDialogAdd = true"
      ></router-view>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar size="45" color="purple" v-on="on" v-bind="attrs">
            <div class="text-h6 white--text">
              {{ user.userNameInitial }}
            </div>
          </v-avatar>
        </template>
        <v-list>
          <v-list-item @click="logout">
            <v-list-item-title>
              Logout
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer v-model="showNavDrawer" clipped app>
      <v-list>
        <v-list-item @click="goToHome">
          <v-list-item-icon>
            <v-icon large>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            Home
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-subheader> Companies </v-subheader>
        <CompanyListItemAvatar
          v-for="(c, i) in companies"
          :key="i"
          :company="c"
          @selected="selectAndGoToCompanyPage"
        >
        </CompanyListItemAvatar>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col cols="12">
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <router-view
      name="companyDialogAdd"
      v-model="showCompanyDialogAdd"
      @create-company="addCompany"
      @cancel="showCompanyDialogAdd = !showCompanyDialogAdd"
    ></router-view>
  </v-app>
</template>

<script lang="ts">
import Company from "@/model/Company";
import Vue from "vue";
import { mapMutations, mapState } from "vuex";
import CompanyListItemAvatar from "@/components/CompanyListItemAvatar.vue";
export default Vue.extend({
  components: {
    CompanyListItemAvatar,
  },
  data() {
    return {
      showCompanyDialogAdd: false,
      showNavDrawer: false,
    };
  },
  computed: {
    ...mapState(["user", "companies", "selectedCompany"]),
    noSelectedCompany(): boolean {
      return !(this.selectedCompany instanceof Company);
    },
  },
  methods: {
    ...mapMutations(["LOGOUT", "ADD_COMPANY", "SELECT_COMPANY"]),
    addCompany(company: Company) {
      this.ADD_COMPANY(company);
      this.showCompanyDialogAdd = false;
    },
    logout() {
      this.LOGOUT();
      this.$router.push("/login");
    },
    goToHome() {
      if (this.$route.path === "/home/companies") return;

      this.$router.push("/home/companies");
    },
    selectAndGoToCompanyPage(company: Company) {
      this.SELECT_COMPANY(company);

      const toPath = `/home/companies/${company.id}`;
      if (this.$route.path === toPath) return;
      this.$router.push(toPath);
    },
  },
});
</script>
