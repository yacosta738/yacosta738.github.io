<script setup lang="ts">
import {generalStore ,toggleShowAdsBanner } from "@store:index";
import { useStore } from "@nanostores/vue";

const $generalStore = useStore(generalStore);
</script>

<template>
  <div v-if="$generalStore.showAdsBanner"
    class="flex items-center transition-height delay-200 h-10 bg-green-400 hover:bg-green-500"
  >
    <p
      class="text-navy group-hover:text-black sm:top-1.5 w-full pl-4 sm:text-center text-sm"
    >
      <slot />
    </p>
    <button @click="toggleShowAdsBanner()">
    <slot name="close-button-icon"/>
  </button>
  </div>
</template>
