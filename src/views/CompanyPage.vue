<template>
  <v-sheet>
    <v-container fluid>
      <v-row>
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
          />
        </v-hover>
      </v-row>
    </v-container>
    <CompanyDialogUpdate
      :value="showUpdateDialog"
      :company="toBeUpdated"
      @update:company="updateCompany"
      @cancel="cancelUpdate"
    />
    <ConfirmationDialog
      :value="showConfirmDialog"
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
      toBeDeleted: {},
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
    ...mapMutations(["DELETE_COMPANY"]),
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
  },
});
</script>