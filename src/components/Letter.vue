<template lang='pug'>
div.letter-container.flex.flex-center.text-positive(:class="classContainer")
  transition(
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    )
    span(
      v-if="modelValue"
      ) {{ modelValue }}
</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'LetterOne',
  components: {},
  props: {
    modelValue: {
      type: String,
      default: '',
      validator (val) {
        return val.length < 2 && ' АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЬЪЫЭЮЯ'.includes(val)
      }
    },
    targetLetter: {
      type: String,
      default: '',
      validator (val) {
        return val.length < 2 && ' АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЬЪЫЭЮЯ'.includes(val)
      }
    },
    checkMode: {
      type: Boolean,
      default: false
    },
    error: {
      type: Boolean,
      default: false
    },
    exist: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const isEqual = computed(
      () => props.checkMode && props.modelValue === props.targetLetter
    )
    const isExist = computed(
      () => props.checkMode && props.exist
    )
    const classContainer = computed(
      () => {
        if (!props.modelValue) return ''
        if (props.error) return 'letter-container--error text-warning animated bounce'
        if (!props.checkMode) return 'animate__heartBeat'
        if (props.modelValue === props.targetLetter) return 'animated flipInX text-white bg-accent'
        if (props.exist) return 'animated flipInX text-white bg-info'
        return 'animated flipInX bg-secondary text-white'
      }
    )

    return {
      classContainer,
      isEqual,
      isExist
    }
  }
})
</script>

<style lang='scss' scoped>
:root {
  --animate-duration: 1s;
}
.letter-container {
  width: 5rem;
  height: 5rem;
  max-width: 5rem;
  max-height: 5rem;
  font-size: 2.6rem;
  border: 2px solid $secondary;
  border-radius: 0.8rem;
  margin: 0 0.2rem;
}
.letter-container--error {
  border: 2px solid $warning;
  color: red;
}

@-webkit-keyframes heartBeat {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }

  14% {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  28% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }

  42% {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  70% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
@keyframes heartBeat {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }

  14% {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  28% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }

  42% {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  70% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
.animate__heartBeat {
  -webkit-animation-name: heartBeat;
  animation-name: heartBeat;
  -webkit-animation-duration: calc(1s * 1.3);
  animation-duration: calc(1s * 1.3);
  -webkit-animation-duration: calc(var(--animate-duration) * 1.3);
  animation-duration: calc(var(--animate-duration) * 1.3);
  -webkit-animation-timing-function: ease-in-out;
  animation-timing-function: ease-in-out;
}

</style>
