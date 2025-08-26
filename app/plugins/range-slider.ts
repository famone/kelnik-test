import VueSlider from 'vue-3-slider-component'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('VueSlider', VueSlider)
})
