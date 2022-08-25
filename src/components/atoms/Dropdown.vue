<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
defineProps({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
})

const show = ref(false)
const langMenu = ref(null)

onClickOutside(langMenu, () => {
  show.value = false
})
</script>

<template>
  <div>
    <div class="z-50">
      <!-- Dropdown toggle button -->
      <button
        :id="id"
        class="language-button flex items-center justify-center"
        type="button"
        @click.prevent="show = !show"
      >
        <span v-if="title && title.length > 0" class="mr-4">{{ title }}</span>
        <slot name="icon" />
      </button>

      <!-- Dropdown menu -->
      <div
        v-show="show"
        ref="langMenu"
        class="menu-language"
        @click="show = !show"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dropdown-button {
  @apply cursor-pointer select-none border-b border-transparent bg-transparent text-sm  text-green-500 hover:border-green-500 hover:bg-green-900;
}
.menu-language {
  z-index: 200;
  min-width: 2rem;
  @apply absolute float-left mt-1 list-none rounded bg-lightest-navy py-2 text-left text-base shadow-lg;
}
</style>
