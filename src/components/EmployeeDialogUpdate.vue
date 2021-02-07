<template>
  <v-dialog
    v-model="showDialog"
    max-width="430px"
    transition="dialog-transition"
    persistent
  >
    <v-card>
      <v-card-title>
        Editing employee
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            v-model="localEmployee.firstName"
            placeholder="First name"
            :rules="rule.name"
          ></v-text-field>
          <v-text-field
            v-model="localEmployee.lastName"
            placeholder="Last name"
            :rules="rule.name"
          ></v-text-field>
          <v-combobox
            v-model="localEmployee.department"
            :items="departments"
            :rules="rule.department"
            chips
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
        <v-btn text color="primary" @click="updateEmployee">
          Save
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
    employee: {
      default: () => new Employee(),
    },
    show: {
      default: false,
    },
    departments: {
      default: () => [] as string[],
    },
  },
  data() {
    return {
      rule: {
        name: [(v: string) => !!v || "This field is required."],
        department: [(v: string) => !!v || "This field is required."],
      },
      showDialog: false,
      errorPrompt: "",
      localEmployee: new Employee(),
    };
  },
  computed: {},
  watch: {
    show(nv, ov) {
      this.showDialog = nv;
    },
    employee(nv, ov) {
      if (nv === ov) return;
      Object.assign(this.localEmployee, nv);
    },
  },
  methods: {
    updateEmployee() {
      const valid = (this.$refs.form as any).validate();
      if (!valid) return;

      this.showDialog = false;
      this.$emit("update:show", this.showDialog);

      this.$emit("update:employee", this.localEmployee);
      this.errorPrompt = "";
    },
    cancel() {
      (this.$refs.form as any).reset();

      this.showDialog = false;
      this.errorPrompt = "";
      this.$emit("update:show", this.showDialog);
    },
  },
});
</script>
