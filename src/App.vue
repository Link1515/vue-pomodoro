<template lang="pug">
#app.h-100
  Sidebar
  b-row.mx-0.pt-5
    b-col(cols="12" md="6")
      Countdown
    b-col(cols="12" md="6")
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import Countdown from './components/Countdown.vue'

export default {
  components: {
    Sidebar,
    Countdown
  }
}
</script>
