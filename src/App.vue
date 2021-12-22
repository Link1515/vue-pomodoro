<template lang="pug">
#app.h-100.overflow-hidden(:class="{push: sidebarIsOpen, break: countdownMode === 'break'}")
  Sidebar(:listItems="listItems" @sendSidebarState="updateSidebarState")
  b-row.mx-0.pt-5.overflow-hidden.flex-md-nowrap
    b-col.flex-shrink-0(cols="12" :md="sidebarIsOpen ? 12 : 6" style="transition: 0.5s")
      Countdown(:listItems="listItems" @sendCountdownMode="updateCountdownMode")
    b-col.flex-shrink-0(cols="12" md="6")
      Viewlist(:listItems="listItems" :countdownMode="countdownMode")
</template>

<script>
import Sidebar from '@/components/Sidebar.vue'
import Countdown from '@/components/Countdown.vue'
import Viewlist from '@/components/Viewlist.vue'

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
      countdownMode: 'work',
      listItems: []
    }
  },
  methods: {
    updateSidebarState (value) {
      this.sidebarIsOpen = value
    },
    updateCountdownMode (value) {
      this.countdownMode = value
    }
  },
  watch: {
    listItems: {
      deep: true,
      handler () {
        localStorage.setItem('pomodoro-listItems', JSON.stringify(this.listItems))
      }
    }
  },
  created () {
    const localData = JSON.parse(localStorage.getItem('pomodoro-listItems'))
    if (localData) {
      this.listItems = localData
    }
  }
}
</script>

<style lang="scss">
#app{
  background-color: #304030;
  background-image: url('~@/assets/img/tomato--orange.svg');
  background-repeat: no-repeat;
  background-size: 100vw;
  background-position: center bottom;
  padding-left: 4rem;
  transition: padding 0.3s linear,background-position 0.3s linear;

  &.break {
    background-image: url('~@/assets/img/tomato--green.svg');
  }
}

@media (min-width: 768px) {
  #app{
    &.push {
      padding-left: 50vw;
      background-position: 50vw bottom;
    }
  }
}

@media (min-width: 992px) {
  #app{
    background-size: 1200px;
  }
}
</style>
