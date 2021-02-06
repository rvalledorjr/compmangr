<template>
  <v-app>
    <v-app-bar clipped-left app outlined flat>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>
        Commangr
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <router-view
        name="companyBtnAdd"
        @click="showCompanyDialogAdd = true"
      ></router-view>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar size="45" color="primary" v-on="on" v-bind="attrs">
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
    <v-main>
      <v-container>
        <v-row>
          <router-view></router-view>
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
export default Vue.extend({
  data() {
    return {
      showCompanyDialogAdd: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapMutations(["LOGOUT", "ADD_COMPANY"]),
    addCompany(company: Company) {
      this.ADD_COMPANY(company);
      this.showCompanyDialogAdd = false;
    },
    logout() {
      this.LOGOUT();
      this.$router.push("/login");
    },
  },
});
</script>
