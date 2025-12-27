<template lang='pug'>
q-dialog(v-model="gameOver" position="bottom" @hide="handleClose")
  q-card(style="width:90%; max-width:480px; border-radius:1rem;")
    q-card-section.position-relative
      q-btn.cursor-pointer.absolute-top-right(flat round icon="close" v-close-popup size="lg" color="grey" @click="handleClose")
    q-card-section.text-center
      .text-h4.text-accent {{ gameWin ? "Поздравляем!!!" : "Увы, неудача!" }}
    q-card-section.text-center.q-mb-md.column.q-gutter-y-sm
      .text-subtitle1.text-positive {{ gameWin ? "Вы победили!" : "Вам не удалось победить!" }}
      .text-subtitle2.text-grey {{ gameWin ? `Потребовалось всего ${maxTry} за 25 минут!` : `Вам не хватило ${maxTry}` }}
      .text-subtitle1.text-positive {{ gameWin ? "Так держать!" : "Не расстраивайтесь, играйте дальше!" }}
  FeedbackDialog(v-model="showFeedbackPrompt")
</template>

<script>
import { defineComponent, computed, watch, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useGameStore } from 'src/stores/main'
import FeedbackDialog from './FeedbackDialog.vue'

const FEEDBACK_PROMPT_KEY = 'lastFeedbackPrompt'
const FEEDBACK_PROMPT_INTERVAL = 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds

export default defineComponent({
  name: 'GameOver',
  components: {
    FeedbackDialog
  },
  setup () {
    const store = useGameStore()
    const showFeedbackPrompt = ref(false)

    const shouldShowFeedbackPrompt = () => {
      try {
        const lastPrompt = localStorage.getItem(FEEDBACK_PROMPT_KEY)
        if (!lastPrompt) return true
        
        const lastPromptTime = parseInt(lastPrompt, 10)
        const now = Date.now()
        const timeSinceLastPrompt = now - lastPromptTime
        
        return timeSinceLastPrompt >= FEEDBACK_PROMPT_INTERVAL
      } catch (error) {
        console.error('Error checking feedback prompt:', error)
        return false
      }
    }

    const handleClose = () => {
      store.gameOver = false
    }

    // Watch for game over and show feedback prompt if needed
    watch(() => store.gameOver, (isOver) => {
      if (isOver && shouldShowFeedbackPrompt()) {
        // Show feedback prompt after a short delay (2 seconds)
        setTimeout(() => {
          showFeedbackPrompt.value = true
          // Update last prompt time
          try {
            localStorage.setItem(FEEDBACK_PROMPT_KEY, Date.now().toString())
          } catch (error) {
            console.error('Error saving feedback prompt time:', error)
          }
        }, 2000)
      }
    })

    return {
      ...storeToRefs(store),
      showFeedbackPrompt,
      maxTry: computed(() => {
        const mt = store.currentIndex + 1
        if (mt === 1) return `${mt} попытка`
        if ([5, 6].includes(mt)) return `${mt} попыток`
        return `${mt} попытки`
      }),
      handleClose
    }
  }
})
</script>
