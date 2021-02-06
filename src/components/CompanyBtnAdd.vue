<template>
  <v-btn icon v-bind="$attrs" @click="$emit('click')">
    <v-icon>mdi-plus</v-icon>
  </v-btn>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>
