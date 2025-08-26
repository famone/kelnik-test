<template>
  <div class="filter-box">
    <div class="room-btns">
      <button
        v-for="(item, idx) in rooms"
        :key="idx"
        :disabled="!item.enabled"
        :class="{ active: item.value === selectedRoomQuantity }"
        @click="changeRoom(item.value)"
      >
        {{ item.title }}
      </button>
    </div>
    <!--  -->
    <div>
      <p class="label">
        Стоимость квартиры, ₽
      </p>
      <div class="ranges">
        <p>от <span>{{ cost[0]?.toLocaleString() }}</span></p>
        <p>до  <span>{{ cost[1]?.toLocaleString() }}</span></p>
      </div>
      <VueSlider
        v-model="cost"
        :min="3100000"
        :max="21000000"
        :interval="100000"
        tooltip="none"
        @drag-end="emit('updateFilter')"
      />
    </div>
    <!--  -->
    <div>
      <p class="label">
        Площадь, м²
      </p>
      <div class="ranges">
        <p>от <span>{{ area[0] }}</span></p>
        <p>до  <span>{{ area[1] }}</span></p>
      </div>
      <VueSlider
        v-model="area"
        :min="20"
        :max="216"
        tooltip="none"
        @drag-end="emit('updateFilter')"
      />
    </div>
    <button
      class="clear-btn"
      @click="resetFilter"
    >
      Сбросить параметры
      <IconsClose />
    </button>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['reset', 'updateFilter'])

const { scrollToTop } = useScroll()

const resetFilter = () => {
  scrollToTop()
  emit('reset')
}

const selectedRoomQuantity = defineModel<number | null>('selectedRoomQuantity', { default: null })
const cost = defineModel<number[]>('cost', { default: [0, 100] })
const area = defineModel<number[]>('area', { default: [0, 100] })

const rooms = [
  {
    title: '1к',
    value: 1,
    enabled: true,
  },
  {
    title: '2к',
    value: 2,
    enabled: true,
  },
  {
    title: '3к',
    value: 3,
    enabled: true,
  },
  {
    title: '4к',
    value: 4,
    enabled: false,
  },
]

const changeRoom = (value: number) => {
  selectedRoomQuantity.value = value
  emit('updateFilter')
}
</script>

<style scoped>

</style>
