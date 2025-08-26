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
            <ApartmentsHeader
              v-model:sortable-columns="sortableColumns"
              @on-sort="refresh()"
            />
            <TransitionGroup
              name="apartments"
              tag="div"
              class="apartments-list"
            >
              <ApartmentCard
                v-for="(item, i) in apartments"
                :key="i"
                :item="item"
              />
            </TransitionGroup>
            <button
              v-if="perPage < total"
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
            @update-slider="refresh()"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { IApartment, IColumn } from '~/type/apartments'

const perPage = ref(20)
const total = ref(0)
const apartments = ref<IApartment[]>([])

const selectedRoomQuantity = ref<number | null>(null)
const cost = ref<number[]>([5500000, 18900000])
const area = ref<number[]>([33, 123])
const sortableColumns = ref<IColumn[]>([
  { title: 'S, м²', key: 'area', sortOrder: null },
  { title: 'Этаж', key: 'floor', sortOrder: null },
  { title: 'Цена, ₽', key: 'price', sortOrder: null },
])

const selctedSortBy = computed(() => {
  const active = sortableColumns.value.find(i => i.sortOrder)
  return active ?? null
})

const { data, refresh } = await useAsyncData(
  'apartments',
  () =>
    $fetch<{ total: number, data: IApartment[] }>('/api/apartments', {
      params: {
        per_page: perPage.value,
        ...(selctedSortBy.value ? { sort_by: selctedSortBy.value.key } : {}),
        ...(selctedSortBy.value ? { sort_order: selctedSortBy.value.sortOrder } : {}),
        cost_from: cost.value[0],
        cost_to: cost.value[1],
        area_from: area.value[0],
        area_to: area.value[1],
        rooms: selectedRoomQuantity.value,
      },
    }),
  { watch: [perPage, selectedRoomQuantity] },
)

apartments.value = data.value?.data ?? []
total.value = data.value?.total ?? 0

watch(data, (nv) => {
  apartments.value = nv?.data ?? []
  total.value = nv?.total ?? 0
})

const loadMore = () => {
  if (perPage.value < total.value) {
    perPage.value += 20
  }
}

const resetFilters = () => {
  selectedRoomQuantity.value = null
  cost.value = [5500000, 18900000]
  area.value = [33, 123]
  perPage.value = 20
  refresh()
}
</script>

<style scoped>

</style>
