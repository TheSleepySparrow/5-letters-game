<template lang='pug'>
q-btn(
  flat round icon="refresh" @click="init"
  )
</template>

<script>
import { defineComponent } from 'vue'
import { useGameStore } from 'stores/main.js'

export default defineComponent({
  name: 'InitButton',
  setup () {
    const store = useGameStore()

    return {
      init: () => store.init()
    }
  }
})
</script>
