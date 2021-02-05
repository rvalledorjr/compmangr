<template>
  <v-app>
    <v-app-bar clipped-left app outlined flat>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>
        Commangr
      </v-toolbar-title>
      <v-spacer></v-spacer>
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
    <v-main></v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations, mapState } from "vuex";
export default Vue.extend({
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapMutations(["LOGOUT"]),
    logout() {
      this.LOGOUT();
      this.$router.push("/login");
    },
  },
});
</script>
