<template lang='pug'>
q-btn(
  flat
  round
  :icon="icon"
  size="1.1rem"
  @click="toggleMode"
  )
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'ToggleButton',
  setup () {
    const $q = useQuasar()
    const toggleMode = () => $q.dark.toggle()
    const icon = computed(() => $q.dark.isActive ? 'brightness_5' : 'nights_stay')

    return {
      toggleMode,
      icon
    }
  }
})
</script>
