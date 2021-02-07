<template>
  <v-list-item @click="emitSelected">
    <v-list-item-avatar :color="generatedColor">
      <span class="body-1 white--text mx-auto">{{ company.nameInitial }}</span>
    </v-list-item-avatar>
    <v-list-item-content>
      {{ company.name }}
    </v-list-item-content>
  </v-list-item>
</template>

<script lang="ts">
import Vue from "vue";
import { stringToHslColor } from "@/utils";
import Company from "@/model/Company";
export default Vue.extend({
  props: {
    company: {
      default: () => new Company(),
    },
  },
  computed: {
    generatedColor(): string {
      return stringToHslColor(this.company.name);
    },
  },
  methods: {
    emitSelected() {
      this.$emit("selected", this.company);
    },
  },
});
</script>
