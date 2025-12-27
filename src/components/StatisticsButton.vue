<template lang="pug">
div
  q-btn(
    flat
    round
    icon="bar_chart"
    size="md"
    color="primary"
    @click="openDialog"
  )
    q-tooltip Статистика
  StatisticsDialog(v-model="dialogOpen")
</template>

<script>
import { defineComponent, ref } from 'vue'
import StatisticsDialog from './StatisticsDialog.vue'

export default defineComponent({
  name: 'StatisticsButton',
  components: {
    StatisticsDialog
  },
  setup () {
    const dialogOpen = ref(false)

    const openDialog = () => {
      dialogOpen.value = true
    }

    return {
      dialogOpen,
      openDialog
    }
  }
})
</script>

