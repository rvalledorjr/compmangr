<template>
  <v-dialog
    v-model="showDialog"
    persistent
    max-width="430px"
    transition="dialog-transition"
  >
    <v-card>
      <v-card-title>
        Adding new employee
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            v-model="employee.firstName"
            placeholder="First name"
            :rules="rule.name"
          ></v-text-field>
          <v-text-field
            v-model="employee.lastName"
            placeholder="Last name"
            :rules="rule.name"
          ></v-text-field>
          <v-combobox
            v-model="employee.department"
            :items="departments"
            placeholder="Department"
            chips
            :rules="rule.department"
          ></v-combobox>
        </v-form>
      </v-card-text>
      <v-card-subtitle v-if="errorPrompt !== ''" class="red--text">
        {{ errorPrompt }}
      </v-card-subtitle>
      <v-card-actions>
        <v-btn text color="primary" @click="cancel" class="ml-auto">
          Cancel
        </v-btn>
        <v-btn text color="primary" @click="addNewEmployee">
          Add employee
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Employee from "@/model/Employee";
import Vue from "vue";
export default Vue.extend({
  props: {
    show: {
      default: false,
    },
    rules: {
      default: () => [] as Function[],
    },
    departments: {
      default: () => [] as string[],
    },
  },
  data() {
    return {
      employee: new Employee(),
      rule: {
        name: [(v: string) => !!v || "This field is required."],
        department: [(v: string) => !!v || "This field is required."],
      },
      showDialog: false,
      errorPrompt: "",
    };
  },
  computed: {},
  watch: {
    show(nv, ov) {
      this.showDialog = nv;
      console.log("watch: " + nv);
    },
  },
  methods: {
    addNewEmployee() {
      for (const r of this.rules) {
        const result = r(this.employee);
        if (typeof result === "string") {
          this.errorPrompt = result;
          return;
        }
      }

      const valid = (this.$refs.form as any).validate();
      if (!valid) return;

      this.showDialog = false;
      this.$emit("update:show", this.showDialog);

      this.$emit("add:employee", this.employee);
      this.employee = new Employee();

      (this.$refs.form as any).reset();
      this.errorPrompt = "";
    },
    cancel() {
      this.employee = new Employee();

      (this.$refs.form as any).reset();

      this.showDialog = false;
      this.errorPrompt = "";
      this.$emit("update:show", this.showDialog);
    },
  },
});
</script>
