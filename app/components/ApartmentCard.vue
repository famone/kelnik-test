<template>
  <div class="apaetment-card">
    <div class="img-block">
      <img
        src="/img/apartment.svg"
        alt=""
      >
    </div>
    <div class="info-block">
      <div class="col-title">
        <h4>{{ item.rooms }}-комнатная №{{ item.id }}</h4>
      </div>
      <div class="col">
        <p>{{ item.area }}</p>
      </div>
      <div class="col">
        <p>{{ item.floor }} <span> из {{ item.floors_total }}</span></p>
      </div>
      <div class="col">
        <p>{{ item.price.toLocaleString() }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IApartment } from '~/type/apartments'

const { item } = defineProps<{
  item: IApartment
}>()
</script>

<style scoped>

</style>
