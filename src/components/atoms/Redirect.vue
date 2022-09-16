<template>
  <div></div>
</template>

<script lang="ts">
export default {
  props: {
    url: {
      type: String,
      required: true
    }
  },
  mounted() {
    window.location.href = this.url;
  }
}
</script>