<template>
  <v-sheet>
    <v-container fluid>
      <v-row justify="center">
        <v-col>
          <v-data-table
            :headers="headers"
            :items="selectedCompany.employees"
            item-key="id"
            group-by="department"
            show-group-by
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="showEmployeeDialog = true">
                  <v-icon>mdi-plus</v-icon> Add Employee
                </v-btn>
              </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn icon @click="setToBeUpdatedEmployee(item)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon @click="confirmEmployeeDeletion(item)">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            <template
              v-slot:[`group.header`]="{ group, toggle, isOpen, remove }"
            >
              <td colspan="3">
                <v-btn icon @click="toggle" small>
                  <v-icon v-if="isOpen">mdi-minus</v-icon>
                  <v-icon v-else>mdi-plus</v-icon>
                </v-btn>
                <span class="font-weight-bold text-body-1"> {{ group }} </span>
                <v-btn icon @click="remove">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-btn icon @click="confirmDepartmentDelete(group)">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </td>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
    <EmployeeDialogAdd
      :show.sync="showEmployeeDialog"
      :departments="selectedCompany.departments"
      :rules="rule.employeeAdding"
      @cancel="showEmployeeDialog = false"
      @add:employee="addNewEmployee"
    />
    <EmployeeDialogUpdate
      :show.sync="showEmployeeUpdateDialog"
      :employee="toBeUpdatedEmployee"
      :departments="selectedCompany.departments"
      @cancel="showEmployeeUpdateDialog = false"
      @update:employee="updateEmployee"
    />
    <ConfirmationDialog
      :value="showConfirmationDialog"
      @cancel="cancelEmployeeDeletion"
      @confirm="deleteEmployee"
    >
      <template v-slot:title>
        Deleting {{ toBeDeletedEmployee.fullName }}
      </template>
      <template v-slot:content-text>
        {{ toBeDeletedEmployee.fullName }} will be deleted permanently.
      </template>
    </ConfirmationDialog>
    <ConfirmationDialog
      :value="showDepartmentDeletionConfirmDialog"
      @cancel="cancelDepartmentDeletion"
      @confirm="deleteDepartment"
    >
      <template v-slot:title> Deleting {{ toBeDeletedDepartment }} </template>
      <template v-slot:content-text>
        {{ toBeDeletedDepartment }} will be deleted permanently including
        <em class="font-weight-bold">all</em> its employees.
      </template>
    </ConfirmationDialog>
  </v-sheet>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations, mapState } from "vuex";
import EmployeeDialogAdd from "@/components/EmployeeDialogAdd.vue";
import EmployeeDialogUpdate from "@/components/EmployeeDialogUpdate.vue";
import ConfirmationDialog from "@/components/ConfirmationDialog.vue";
import Employee from "@/model/Employee";
export default Vue.extend({
  components: {
    EmployeeDialogAdd,
    EmployeeDialogUpdate,
    ConfirmationDialog,
  },
  data() {
    return {
      headers: [
        {
          text: "First Name",
          value: "firstName",
          align: "start",
          groupable: false,
        },
        {
          text: "Last Name",
          value: "lastName",
          align: "start",
          groupable: false,
        },
        { text: "Department", value: "department", align: "start" },
        {
          text: "Actions",
          value: "actions",
          align: "right",
          sortable: false,
          groupable: false,
        },
      ],
      showEmployeeDialog: false,
      showEmployeeUpdateDialog: false,
      rule: {
        employeeAdding: [
          (e: Employee) =>
            !(this as any).selectedCompany.similarEmployeeExists(e) ||
            "Similar employee exists.",
        ],
      },
      toBeDeletedEmployee: {} as any,
      toBeUpdatedEmployee: {} as any,
      toBeDeletedDepartment: "",
    };
  },
  computed: {
    ...mapState(["selectedCompany"]),
    showConfirmationDialog(): boolean {
      return this.toBeDeletedEmployee instanceof Employee;
    },
    showDepartmentDeletionConfirmDialog(): boolean {
      return this.toBeDeletedDepartment.trim() !== "";
    },
  },
  methods: {
    ...mapMutations([
      "ADD_EMPLOYEE",
      "UPDATE_EMPLOYEE",
      "DELETE_EMPLOYEE",
      "DELETE_DEPARTMENT",
    ]),
    addNewEmployee(employee: Employee) {
      this.ADD_EMPLOYEE(employee);
    },
    setToBeUpdatedEmployee(employee: Employee) {
      this.toBeUpdatedEmployee = employee;
      this.showEmployeeUpdateDialog = true;
    },
    updateEmployee(employee: Employee) {
      this.UPDATE_EMPLOYEE(employee);
      this.toBeUpdatedEmployee = {};
    },
    confirmEmployeeDeletion(employee: Employee) {
      this.toBeDeletedEmployee = employee;
    },
    deleteEmployee() {
      this.DELETE_EMPLOYEE(this.toBeDeletedEmployee);
      this.toBeDeletedEmployee = {};
    },
    cancelEmployeeDeletion() {
      this.toBeDeletedEmployee = {};
    },
    confirmDepartmentDelete(department: string) {
      this.toBeDeletedDepartment = department;
    },
    cancelDepartmentDeletion() {
      this.toBeDeletedDepartment = "";
    },
    deleteDepartment() {
      this.DELETE_DEPARTMENT(this.toBeDeletedDepartment);
      this.toBeDeletedDepartment = "";
    },
  },
});
</script>
