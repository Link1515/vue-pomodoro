<template lang="pug">
#app.h-100.overflow-hidden(:class="{push: sidebarIsOpen}")
  Sidebar(:listItems="listItems" @sendSidebarState="updateSidebarState" @updateListItems="updateListItems")
  b-row.mx-0.pt-5.overflow-hidden.flex-md-nowrap
    b-col.flex-shrink-0(cols="12" :md="sidebarIsOpen ? 12 : 6" style="transition: 0.5s")
      Countdown
    b-col.flex-shrink-0(cols="12" md="6")
      Viewlist(:listItems="listItems")
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import Countdown from './components/Countdown.vue'
import Viewlist from './components/Viewlist.vue'

export default {
  name: 'App',
  components: {
    Sidebar,
    Countdown,
    Viewlist
  },
  data () {
    return {
      sidebarIsOpen: false,
      listItems: []
    }
  },
  methods: {
    updateSidebarState (value) {
      this.sidebarIsOpen = value
    },
    updateListItems (value) {
      this.listItems = value
    }
  }
}
</script>
