<template>
  <v-dialog v-bind="$attrs" max-width="430px" transition="dialog-transition">
    <v-card>
      <v-card-title primary-title>Create a new company</v-card-title>
      <v-container>
        <v-form ref="form">
          <v-container>
            <v-text-field
              v-model="company.name"
              label="Name"
              :rules="rule.name"
              required
            ></v-text-field>
            <v-text-field
              v-model="company.address"
              label="Address"
              :rules="rule.address"
            ></v-text-field>
            <v-row justify="end">
              <v-btn color="primary" text class="mt-5" @click.stop="cancel">
                Cancel
              </v-btn>
              <v-btn
                color="primary"
                text
                class="ml-1 mt-5"
                @click.stop="createCompany"
              >
                Create
              </v-btn>
            </v-row>
          </v-container>
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Company from "@/model/Company";
import { generateDefaultBanner } from "@/utils";
import Vue from "vue";
export default Vue.extend({
  data() {
    return {
      company: new Company(),
      rule: {
        name: [(v: string) => !!v || "Company name is required."],
        address: [(v: string) => !!v || "Company address is required."],
      },
    };
  },
  methods: {
    createCompany() {
      const valid = (this.$refs.form as any).validate();
      if (!valid) return;

      this.company.bannerImage = generateDefaultBanner();
      this.$emit("create-company", this.company);
      this.company = new Company();
      (this.$refs.form as any).reset();
    },
    cancel() {
      this.$emit("cancel");
      this.company = new Company();
      (this.$refs.form as any).reset();
    },
  },
});
</script>
