<template>
  <v-dialog
    max-width="350px"
    transition="dialog-transition"
    persistent
    v-bind="$attrs"
  >
    <v-card class="pa-2">
      <v-card-title>
        <slot name="title"></slot>
      </v-card-title>
      <v-card-text>
        <slot name="content-text"></slot>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="$emit('cancel')" class="ml-auto">Cancel</v-btn>
        <v-btn color="primary" @click="$emit('confirm')"> Confirm </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({});
</script>
