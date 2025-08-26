<template>
  <section id="catalog">
    <GoUp />
    <div class="container">
      <div class="grid-2-1">
        <div>
          <h1 class="h1">
            Квартиры
          </h1>
          <div>
            <ApartmentsHeader v-model:sortable-columns="sortableColumns" />
            <ApartmentCard
              v-for="(item, i) in data?.data"
              :key="i"
              :item="item"
            />
            <button
              v-if="data?.pages_total !== page"
              class="load-more-btn"
              @click="loadMore"
            >
              Загрузить еще
            </button>
          </div>
        </div>
        <div>
          <SideFilter
            v-model:cost="cost"
            v-model:area="area"
            v-model:selected-room-quantity="selectedRoomQuantity"
            @reset="resetFilters"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { IApartment, IColumn } from '~/type/filter'

const page = ref(1)
const selectedRoomQuantity = ref<number | null>(null)
const cost = ref<number[]>([5500000, 18900000])
const area = ref<number[]>([33, 123])
const sortableColumns = ref<IColumn[]>([
  {
    title: 'S, м²',
    key: 'area',
    sortOrder: null,
  },
  {
    title: 'Этаж',
    key: 'floor',
    sortOrder: null,
  },
  {
    title: 'Цена, ₽',
    key: 'price',
    sortOrder: null,
  },
])

const { data, refresh } = await useAsyncData(() => $fetch<{ pages_total: number, data: IApartment[] }>('/api/apartments', {
  params: {
    page: page.value,
    per_page: 5,
    //   sort_by: sort_by.value,
    //   sort_order: sort_order.value,
    cost_from: cost.value[0],
    cost_to: cost.value[1],
    area_from: area.value[0],
    area_to: area.value[1],
    rooms: selectedRoomQuantity.value,
  },
}))

const loadMore = () => {
  page.value += 1
  refresh()
}

const resetFilters = () => {
  selectedRoomQuantity.value = null
  cost.value = [5500000, 18900000]
  area.value = [33, 123]
}
</script>

<style scoped>

</style>
