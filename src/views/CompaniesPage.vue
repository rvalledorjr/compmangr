<template>
  <v-sheet>
    <v-container fluid>
      <v-row v-if="companies.length > 0">
        <v-hover
          v-for="(c, i) in companies"
          :key="i"
          v-slot:default="{ hover }"
        >
          <CompanyCard
            :company="c"
            class="ml-5 mt-5"
            width="300"
            height="250"
            :outlined="!hover"
            @delete="confirmCompanyDeletion"
            @update="setToBeUpdated"
            @selected="selectCompany"
          />
        </v-hover>
      </v-row>
      <v-row v-else justify="center">
        <v-col cols="12">
          <v-card class="mt-5" flat>
            <v-card-text class="d-flex justify-center">
              <v-icon size="100" color="grey">
                mdi-package-variant
              </v-icon>
            </v-card-text>
            <v-card-title class="d-flex justify-center text-h3 grey--text">
              Start adding companies.
            </v-card-title>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <CompanyDialogUpdate
      :value="showUpdateDialog"
      :company="toBeUpdated"
      persistent
      @update:company="updateCompany"
      @cancel="cancelUpdate"
    />
    <ConfirmationDialog
      :value="showConfirmDialog"
      persistent
      @cancel="cancelDeletion"
      @confirm="deleteCompany"
    >
      <template v-slot:title> Delete {{ toBeDeleted.name }}? </template>
      <template v-slot:content-text>
        This company will be deteleted permanently.
      </template>
    </ConfirmationDialog>
  </v-sheet>
</template>

<script lang="ts">
import Vue from "vue";
import CompanyCard from "@/components/CompanyCard.vue";
import CompanyDialogUpdate from "@/components/CompanyDialogUpdate.vue";
import ConfirmationDialog from "@/components/ConfirmationDialog.vue";
import { mapMutations, mapState } from "vuex";
import Company from "@/model/Company";
export default Vue.extend({
  components: {
    CompanyCard,
    CompanyDialogUpdate,
    ConfirmationDialog,
  },

  data() {
    return {
      toBeDeleted: {} as any,
      toBeUpdated: {},
    };
  },
  computed: {
    ...mapState(["companies"]),
    showUpdateDialog(): boolean {
      return this.toBeUpdated instanceof Company;
    },
    showConfirmDialog(): boolean {
      return this.toBeDeleted instanceof Company;
    },
  },
  methods: {
    ...mapMutations(["DELETE_COMPANY", "SELECT_COMPANY"]),
    confirmCompanyDeletion(company: Company) {
      this.toBeDeleted = company;
    },
    setToBeUpdated(company: Company) {
      this.toBeUpdated = company;
    },
    updateCompany(company: Company) {
      this.toBeUpdated = {};
    },
    cancelUpdate() {
      this.toBeUpdated = {};
    },
    deleteCompany() {
      this.DELETE_COMPANY(this.toBeDeleted);
      this.toBeDeleted = {};
    },
    cancelDeletion() {
      this.toBeDeleted = {};
    },
    selectCompany(company: Company) {
      this.SELECT_COMPANY(company);
      this.$router.push(`/home/companies/${company.id}`);
    },
  },
});
</script>
