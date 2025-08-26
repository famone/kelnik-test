<template>
  <button
    class="go-up-btn"
    @click="scrollToTop"
  >
    <IconsArrowup />
  </button>
</template>

<script setup lang="ts">
const { scrollToTop } = useScroll()
</script>

<style scoped>

</style>
