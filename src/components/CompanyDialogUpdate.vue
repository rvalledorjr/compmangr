<template>
  <v-dialog v-bind="$attrs" max-width="430px" transition="dialog-transition">
    <v-card>
      <v-card-title primary-title>Update company</v-card-title>
      <v-container>
        <v-form ref="form">
          <v-container>
            <v-text-field
              v-model="upCompany.name"
              label="Name"
              :rules="rule.name"
              required
            ></v-text-field>
            <v-text-field
              v-model="upCompany.address"
              label="Address"
              :rules="rule.address"
            ></v-text-field>
            <v-row justify="end">
              <v-btn
                color="primary"
                text
                class="mt-5"
                @click.stop="$emit('cancel')"
              >
                Cancel
              </v-btn>
              <v-btn
                color="primary"
                text
                class="ml-1 mt-5"
                @click.stop="updateCompany"
              >
                Update
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
import Vue from "vue";
export default Vue.extend({
  props: {
    company: {
      default: () => new Company(),
    },
  },
  data() {
    return {
      upCompany: new Company(),
      rule: {
        name: [(v: string) => !!v || "Company name is required."],
        address: [(v: string) => !!v || "Company address is required."],
      },
    };
  },
  watch: {
    company(nv, ov) {
      if (nv === ov) return;

      this.upCompany.name = nv.name;
      this.upCompany.address = nv.address;
    },
  },
  methods: {
    updateCompany() {
      this.company.name = this.upCompany.name;
      this.company.address = this.upCompany.address;
      this.$emit("update:company", this.upCompany);
    },
  },
});
</script>
