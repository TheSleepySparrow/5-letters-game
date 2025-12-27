<template lang='pug'>
.row
  Letter(
    v-for="(l, index) in word"
    :model-value="l"
    :target-letter="target.charAt(index)"
    :check-mode="checkMode"
    :error="error"
    :exist="target.includes(l) && !equal.includes(l) && word.indexOf(l) === index"
    )
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useGameStore } from 'stores/main.js'

import Letter from './Letter.vue'

export default defineComponent({
  name: 'WordOne',
  components: { Letter },
  props: {
    modelValue: {
      type: Number,
      default: 0
    }
  },
  setup (props) {
    const store = useGameStore()
    const word = computed(
      () => store.words[props.modelValue].word.padEnd(5, ' ').split('').map(el => el.trim())
    )
    const equal = computed(
      () => word.value.reduce((acc, el, i) => {
        if (store.target[i] === el) {
          acc += el
        }
        return acc
      }, '')
    )
    return {
      word,
      equal,
      target: computed(() => store.target),
      error: computed(() => !store.words[props.modelValue].exist),
      checkMode: computed(() => store.words[props.modelValue].check)
    }
  }
})
</script>
