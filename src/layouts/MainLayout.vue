<template lang="pug">
q-layout(view="lHh Lpr lFf")
  q-header.bg-transparent.text-primary
    q-toolbar(style="margin:0 auto; max-width:34rem;")
      q-toolbar-title(style="font-size:2.5rem;") 5 Букв
      .flex
        InitButton.q-mr-xs
        FeedbackButton.q-mr-xs
        StatisticsButton.q-mr-xs
        ToggleButton
  q-page-container
    router-view
</template>

<script>
import { defineComponent } from 'vue'

import InitButton from 'components/InitButton.vue'
import FeedbackButton from 'components/FeedbackButton.vue'
import StatisticsButton from 'components/StatisticsButton.vue'
import ToggleButton from 'components/ToggleButton.vue'

export default defineComponent({
  name: 'MainLayout',
  components: { InitButton, FeedbackButton, StatisticsButton, ToggleButton }
})
</script>
