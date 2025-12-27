<template lang="pug">
q-dialog(v-model="isOpen" position="bottom" @hide="handleClose")
  q-card(style="width:90%; max-width:480px; border-radius:1rem;")
    q-card-section.position-relative
      .text-h5.text-center Статистика
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
      .column.q-gutter-md
        .row.justify-between.items-center
          .text-body1 Всего игр:
          .text-h6.text-primary {{ stats.totalGames }}
        
        .row.justify-between.items-center
          .text-body1 Побед:
          .text-h6.text-positive {{ stats.totalWins }}
        
        .row.justify-between.items-center
          .text-body1 Поражений:
          .text-h6.text-negative {{ stats.totalLosses }}
        
        q-separator
        
        .row.justify-between.items-center
          .text-body1 Процент побед:
          .text-h6 {{ stats.winRate }}%
        
        .row.justify-between.items-center
          .text-body1 Среднее время:
          .text-h6 {{ stats.averageTime }}
        
        .row.justify-between.items-center
          .text-body1 Последняя игра:
          .text-h6 {{ stats.lastGameTime }}
    
    q-card-section.q-pt-none
      q-btn(
        label="Сбросить статистику"
        color="negative"
        outline
        :disable="stats.totalGames === 0"
        @click="handleReset"
        class="full-width"
      )
</template>

<script>
import { defineComponent, computed, onMounted, watch } from 'vue'
import { useQuasar } from 'quasar'
import { useMetricsStore } from 'src/stores/metrics'

export default defineComponent({
  name: 'StatisticsDialog',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup (props, { emit }) {
    const $q = useQuasar()
    const metricsStore = useMetricsStore()

    const isOpen = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value)
    })

    const stats = computed(() => metricsStore.formattedStats)

    onMounted(() => {
      // Initialize metrics from localStorage when component mounts
      metricsStore.init()
    })

    // Refresh stats when dialog opens
    watch(() => props.modelValue, (newVal) => {
      if (newVal) {
        metricsStore.init()
      }
    })

    const handleClose = () => {
      isOpen.value = false
    }

    const handleReset = () => {
      $q.dialog({
        title: 'Сбросить статистику?',
        message: 'Вы уверены, что хотите сбросить всю статистику? Это действие нельзя отменить.',
        cancel: true,
        persistent: true
      }).onOk(() => {
        metricsStore.reset()
        $q.notify({
          type: 'positive',
          message: 'Статистика сброшена',
          position: 'top',
          timeout: 2000
        })
      })
    }

    return {
      isOpen,
      stats,
      handleClose,
      handleReset
    }
  }
})
</script>

