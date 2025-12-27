<template lang='pug'>
//- q-card.q-pa-xs(square flat)
.q-pa-xs.q-mb-sm
  .row.flex.justify-center
    KeyButton(
      v-for="s in row01"
      :key="s.key"
      @click="store.input(s.label)"
      :label="s.label"
      )
  .row.flex.justify-center.q-my-md
    KeyButton(
      v-for="s in row02"
      :key="s.key"
      @click="store.input(s.label)"
      :label="s.label"
      )
  .row.flex.justify-center
    q-btn.keyboard-button--control(
      unelevated
      color="primary"
      :disable="!store.full"
      @click="store.done()"
      )
      q-icon(name="done" size="1.7rem")
    KeyButton(
      v-for="s in row03"
      :key="s.key"
      @click="store.input(s.label)"
      :label="s.label"
      )
      span.text-h5 {{ s.label }}
    q-btn.keyboard-button--control(
      unelevated
      color="secondary"
      :disable="store.empty"
      @click="store.backSpace"
      )
      q-icon(name="backspace" size="1.7rem")
</template>

<script>
import { defineComponent } from 'vue'
import { getKeyboardLayout } from 'src/helpers/keyboard'
import { useGameStore } from 'src/stores/main'

import KeyButton from './KeyButton.vue'

export default defineComponent({
  name: 'KeyboardOne',
  components: { KeyButton },
  setup () {
    const store = useGameStore()
    const row01 = getKeyboardLayout({ row: 0 })
    const row02 = getKeyboardLayout({ row: 1 })
    const row03 = getKeyboardLayout({ row: 2 })

    return {
      row01,
      row02,
      row03,
      store
    }
  }
})
</script>

<style lang="scss">
.keyboard-button--control {
  height: $key-height;
  width:4rem;
  border-radius:0.4rem;
  margin:0 $key-margin;
}
</style>
