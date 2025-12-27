<template lang="pug">
div
  q-btn(
    flat
    round
    icon="feedback"
    size="md"
    color="primary"
    @click="openDialog"
    :disable="loading"
  )
    q-tooltip Обратная связь
  FeedbackDialog(v-model="dialogOpen")
</template>

<script>
import { defineComponent, ref } from 'vue'
import FeedbackDialog from './FeedbackDialog.vue'

export default defineComponent({
  name: 'FeedbackButton',
  components: {
    FeedbackDialog
  },
  setup () {
    const dialogOpen = ref(false)
    const loading = ref(false)

    const openDialog = () => {
      dialogOpen.value = true
    }

    return {
      dialogOpen,
      loading,
      openDialog
    }
  }
})
</script>

