<template>
  <v-card
    v-bind="$attrs"
    class="d-flex flex-column"
    :height="desktopDevice ? 280 : 'auto'"
  >
    <v-img
      :src="company.bannerImage"
      max-height="130px"
      gradient="to top right, rgba(100,115,201,.1), rgba(25,32,72,.2)"
    >
      <v-card-title class="d-flex flex-nowrap align-start mb-3">
        <a
          class="course-class-name white--text headline mr-auto no-wrap"
          @click.prevent.stop="$emit('selected', company)"
          >{{ company.name }}
        </a>
        <v-menu offset-y>
          <template dark v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon color="white">mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="$emit('update', company)">
              <v-list-item-subtitle>Update Company Info</v-list-item-subtitle>
            </v-list-item>
            <v-list-item @click="$emit('delete', company)">
              <v-list-item-subtitle> Delete </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-card-title>
      <v-card-subtitle class="body-2">
        <div class="white--text">{{ company.address }}</div>
        <div v-if="hasEmployees" class="white--text">
          {{ company.employees.length }} employees
        </div>
      </v-card-subtitle>
    </v-img>
    <v-card-text v-show="desktopDevice"></v-card-text>
    <v-divider v-show="desktopDevice" class="mt-auto"></v-divider>
    <v-card-actions v-show="desktopDevice" class="align-self-end">
      <v-btn icon tile @click="$emit('selected', company)">
        <v-icon> mdi-account-group </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Company from "@/model/Company";
export default Vue.extend({
  props: {
    company: {
      default() {
        return new Company();
      },
    },
  },
  computed: {
    hasEmployees(): boolean {
      const company = (this as any).company as Company;
      return company.employees.length > 0;
    },
    desktopDevice(): boolean {
      return (this as any).$vuetify.breakpoint.name !== "xs";
    },
  },
  methods: {},
});
</script>

<style lang="scss" scoped>
.course-class-name:hover {
  text-decoration: underline;
}

.no-wrap {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
