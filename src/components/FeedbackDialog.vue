<template lang="pug">
q-dialog(v-model="isOpen" position="bottom" @hide="handleClose")
  q-card(style="width:90%; max-width:480px; border-radius:1rem;")
    q-card-section.position-relative
      .text-h5.text-center Обратная связь
      q-btn.cursor-pointer.absolute-top-right(
        flat 
        round 
        icon="close" 
        v-close-popup 
        size="lg" 
        color="grey"
        @click="handleClose"
      )
    
    q-card-section
      .text-subtitle2.text-center.q-mb-md Пожалуйста, оцените приложение и оставьте комментарий
    
    q-card-section
      .text-center.q-mb-md
        .text-body2.q-mb-sm Оценка
        q-rating(
          v-model="rating"
          :max="5"
          size="2.5rem"
          color="primary"
          icon="star_border"
          icon-selected="star"
        )
        .text-caption.q-mt-xs {{ ratingText }}
    
    q-card-section
      q-input(
        v-model="comment"
        label="Ваш комментарий (необязательно)"
        type="textarea"
        rows="4"
        outlined
        :disable="loading"
      )
    
    q-card-section.q-pt-none
      q-btn(
        label="Отправить"
        color="primary"
        unelevated
        :loading="loading"
        :disable="!rating || loading"
        @click="handleSubmit"
        class="full-width"
      )
      q-btn(
        label="Отмена"
        flat
        color="grey"
        :disable="loading"
        @click="handleClose"
        class="full-width q-mt-sm"
      )
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import { sendFeedback } from 'src/services/feedback'

export default defineComponent({
  name: 'FeedbackDialog',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const $q = useQuasar()
    const isOpen = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value)
    })
    
    const rating = ref(0)
    const comment = ref('')
    const loading = ref(false)

    const ratingText = computed(() => {
      if (rating.value === 0) return 'Выберите оценку'
      if (rating.value === 1) return 'Очень плохо'
      if (rating.value === 2) return 'Плохо'
      if (rating.value === 3) return 'Нормально'
      if (rating.value === 4) return 'Хорошо'
      if (rating.value === 5) return 'Отлично'
      return ''
    })

    const handleClose = () => {
      if (!loading.value) {
        rating.value = 0
        comment.value = ''
        isOpen.value = false
      }
    }

    const handleSubmit = async () => {
      if (!rating.value || loading.value) return

      loading.value = true

      try {
        await sendFeedback(rating.value, comment.value)
        
        $q.notify({
          type: 'positive',
          message: 'Спасибо за ваш отзыв!',
          position: 'top',
          timeout: 3000
        })

        // Reset form and close dialog
        rating.value = 0
        comment.value = ''
        setTimeout(() => {
          isOpen.value = false
        }, 500)
      } catch (error) {
        $q.notify({
          type: 'negative',
          message: error.message || 'Не удалось отправить отзыв. Пожалуйста, попробуйте позже.',
          position: 'top',
          timeout: 5000
        })
      } finally {
        loading.value = false
      }
    }

    return {
      isOpen,
      rating,
      comment,
      loading,
      ratingText,
      handleClose,
      handleSubmit
    }
  }
})
</script>

