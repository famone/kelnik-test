<template>
  <section id="catalog">
    <GoUp />
    <div class="container">
      <div class="grid-2-1">
        <div>
          <h1 class="h1">
            Квартиры
          </h1>
          <div v-if="useApartments.apartments.length">
            <ApartmentsHeader
              v-model:sortable-columns="useApartments.sortableColumns"
              @on-sort="refresh()"
            />
            <TransitionGroup
              mode="in-out"
              name="apartments"
              tag="div"
            >
              <ApartmentCard
                v-for="(item, i) in useApartments.apartments"
                :key="i"
                :item="item"
              />
            </TransitionGroup>
            <button
              v-if="useApartments.perPage < useApartments.total"
              class="load-more-btn"
              @click="loadMore"
            >
              Загрузить еще
            </button>
          </div>
          <div v-else>
            <p class="not-found">
              Ничего не найдено
            </p>
          </div>
        </div>
        <div>
          <SideFilter
            v-model:cost="useApartments.cost"
            v-model:area="useApartments.area"
            v-model:selected-room-quantity="useApartments.selectedRoomQuantity"
            @reset="resetFilters"
            @update-filter="refresh()"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useApartmentsStore } from '~/stores/apartments'
import type { IApartment } from '~/type/apartments'

const useApartments = useApartmentsStore()

const selctedSortBy = computed(() => {
  const active = useApartments.sortableColumns.find(i => i.sortOrder)
  return active ?? null
})

const { data, refresh } = await useAsyncData(
  'apartments',
  () =>
    $fetch<{ total: number, data: IApartment[] }>('/api/apartments', {
      params: {
        per_page: useApartments.perPage,
        ...(selctedSortBy.value ? { sort_by: selctedSortBy.value.key } : {}),
        ...(selctedSortBy.value ? { sort_order: selctedSortBy.value.sortOrder } : {}),
        cost_from: useApartments.cost[0],
        cost_to: useApartments.cost[1],
        area_from: useApartments.area[0],
        area_to: useApartments.area[1],
        rooms: useApartments.selectedRoomQuantity ?? undefined,
      },
    }),
)

useApartments.apartments = data.value?.data ?? []
useApartments.total = data.value?.total ?? 0

watch(data, (nv) => {
  useApartments.apartments = nv?.data ?? []
  useApartments.total = nv?.total ?? 0
})

const loadMore = () => {
  if (useApartments.perPage < useApartments.total) {
    useApartments.perPage += 20
    refresh()
  }
}

const resetFilters = () => {
  useApartments.RESET_FILTERS()
  refresh()
}
</script>

<style scoped>

</style>
