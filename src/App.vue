<template lang="pug">
#app.h-100(:class="{push: sidebarIsOpen}")
  Sidebar(@sendSidebarState="updateSidebarState")
  b-row.mx-0.pt-5
    b-col.flex-shrink-0(cols="12" :md="sidebarIsOpen ? 12 : 6" style="transition: 0.5s")
      Countdown
    b-col.flex-shrink-0(cols="12" md="6")
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import Countdown from './components/Countdown.vue'

export default {
  name: 'App',
  components: {
    Sidebar,
    Countdown
  },
  data () {
    return {
      sidebarIsOpen: false
    }
  },
  methods: {
    updateSidebarState (value) {
      this.sidebarIsOpen = value
    }
  }
}
</script>
