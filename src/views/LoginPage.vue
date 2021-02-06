<template>
  <v-app>
    <v-main>
      <v-container fill-height>
        <v-row justify="center">
          <v-col md="4">
            <v-card class="pa-4">
              <v-card-title>
                <v-avatar color="grey" size="70" class="mx-auto">
                  <v-icon size="40" color="white">mdi-account</v-icon>
                </v-avatar>
              </v-card-title>
              <v-card-text>
                <v-form ref="loginForm">
                  <v-text-field
                    v-model="userName"
                    required
                    placeholder="User Name"
                    :rules="rule.userName"
                    @keyup.enter="login"
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    required
                    placeholder="Password"
                    type="password"
                    :rules="rule.password"
                    @keyup.enter="login"
                  ></v-text-field>
                  <p v-if="invalidCredentials" class="red--text mt-3 accent-1">
                    Invalid user name and password.
                  </p>
                  <div class="d-flex">
                    <v-btn color="primary" class="ml-auto" @click="login">
                      Login
                    </v-btn>
                  </div>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import User from "@/model/User";
import Vue from "vue";
import { mapMutations, mapState } from "vuex";
export default Vue.extend({
  data() {
    return {
      userName: "",
      password: "",
      invalidCredentials: false,
      rule: {
        userName: [(v: any) => !!v || "User name is required."],
        password: [(v: any) => !!v || "User name is required."],
      },
    };
  },

  computed: {
    ...mapState(["user"]),
  },

  methods: {
    ...mapMutations(["AUTHENTICATE"]),
    login() {
      this.AUTHENTICATE({ userName: this.userName, password: this.password });

      const valid = (this.$refs.loginForm as any).validate();
      const user = this.user as User;

      this.invalidCredentials = !(valid && user.isAuthenticated);

      if (!this.invalidCredentials) {
        this.$router.push("/home/companies");
      }
    },
  },
});
</script>
