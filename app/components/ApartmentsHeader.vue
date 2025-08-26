<template>
  <div class="apartments-header">
    <div class="static">
      <p>Планировка</p>
    </div>
    <div class="static">
      <p>Квартира</p>
    </div>
    <div
      v-for="(col, index) in sortableColumns"
      :key="index"
      class="sortable"
      @click="changeSort(index)"
    >
      <p :class="{ active: col.sortOrder !== null }">
        {{ col.title }}
      </p>
      <IconsSorting :class="col.sortOrder ?? ''" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IColumn } from '~/type/apartments'

const emit = defineEmits(['onSort'])

const sortableColumns = defineModel<IColumn[]>('sortableColumns', { default: [] })

const changeSort = (index: number) => {
  sortableColumns.value?.forEach((item, i) => {
    if (i !== index) {
      item.sortOrder = null
    }
  })

  const sortableItem = sortableColumns.value?.[index]
  if (!sortableItem) return
  switch (sortableItem.sortOrder) {
    case 'asc':
      sortableItem.sortOrder = 'desc'
      break
    case 'desc':
      sortableItem.sortOrder = null
      break
    default:
      sortableItem.sortOrder = 'asc'
  }

  emit('onSort')
}
</script>

<style scoped>

</style>ase
