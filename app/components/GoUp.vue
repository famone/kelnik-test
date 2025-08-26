<template>
  <button
    class="go-up-btn"
    @click="scrollToTop"
  >
    <IconsArrowup />
  </button>
</template>

<script setup lang="ts">
function scrollToTop() {
  const start = window.scrollY
  const duration = 500
  const startTime = performance.now()

  function animate(time: number) {
    const progress = Math.min((time - startTime) / duration, 1)
    const ease = 1 - Math.pow(1 - progress, 3)
    window.scrollTo(0, start * (1 - ease))
    if (progress < 1) requestAnimationFrame(animate)
  }

  requestAnimationFrame(animate)
}
</script>

<style scoped>

</style>
