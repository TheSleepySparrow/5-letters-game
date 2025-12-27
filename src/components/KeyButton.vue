<template lang='pug'>
q-btn.keyboard-button(
  outline
  color="primary"
  :class="{'bg-secondary text-white': isDismiss, 'bg-accent text-white': isEqual, 'bg-info text-accent': isExist}"
  )
  span.keyboard-button__label {{ label }}
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useGameStore } from 'src/stores/main.js'

export default defineComponent({
  name: 'KeyButton',
  props: {
    label: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const store = useGameStore()

    const isEqual = computed(
      () => store.equalL.includes(props.label)
    )
    const isExist = computed(
      () => store.allL.includes(props.label) && store.target.includes(props.label) && !store.equalL.includes(props.label)
    )
    const isDismiss = computed(
      () => store.allL.includes(props.label) && !isExist.value && !isEqual.value
    )

    return {
      isEqual,
      isExist,
      isDismiss
    }
  }
})
</script>

<style lang="scss">
.keyboard-button {
  // width:2.6rem;
  width: min(calc(100vw/12 - 3px), 5rem);
  height: $key-height;
  border-radius:0.4rem;
  margin:0 $key-margin;
  padding: 0 !important;
  :last-child {
    margin: 0
  }
  &__label {
    font-size: 1.8rem;
  }
}
</style>
