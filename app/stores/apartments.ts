import { defineStore } from 'pinia'
import type { IApartment, IColumn } from '~/type/apartments'

export const useApartmentsStore = defineStore('apartments', () => {
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

  function RESET_FILTERS() {
    selectedRoomQuantity.value = null
    cost.value = [5500000, 18900000]
    area.value = [33, 123]
    perPage.value = 20
    sortableColumns.value.forEach((i) => {
      i.sortOrder = null
    })
  }

  return {
    perPage,
    total,
    apartments,
    selectedRoomQuantity,
    cost,
    area,
    sortableColumns,
    RESET_FILTERS,
  }
},
{
  persist: true,
},
)
