<template lang="pug">
q-page.flex.column.items-center.full-height.justify-between
  .column.q-mt-md
    Word.q-my-xs(
      v-for="(word, i) in words"
      :key="word.id"
      :model-value="i"
      )
  KeyboardOne
  GameOver
</template>

<script>
import { defineComponent, computed, onMounted } from 'vue'
import { useGameStore } from 'stores/main.js'
import { useMetricsStore } from 'stores/metrics.js'

import Word from 'components/Word.vue'
import KeyboardOne from 'components/Keyboard.vue'
import GameOver from 'components/GameOver.vue'

export default defineComponent({
  name: 'IndexPage',
  components: { KeyboardOne, Word, GameOver },
  setup () {
    const store = useGameStore()
    const metricsStore = useMetricsStore()

    // Initialize metrics store on page load
    onMounted(() => {
      metricsStore.init()
    })

    store.init()

    return {
      words: computed(() => store.words)
    }
  }
})
</script>
