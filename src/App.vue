<script setup>
import CountdownItem from './components/CountdownItem.vue'
import SidebarItem from './components/SidebarItem.vue'
</script>
<script>
export default {
  name: 'App'
}
</script>

<template>
<div id="main"
  class="overflow-hidden"
  :class="{push: sidebarIsOpen, break: countdownMode === 'break'}"
>
  <SidebarItem />
  <v-row class="mx-0 pt-5 overflow-hidden flex-md-nowrap">
    <v-col
      cols="12" :md="sidebarIsOpen ? 12 : 6"
      style="transition: 0.5s"
      class="flex-shrink-0"
    >
      <CountdownItem/>
    </v-col>
    <v-col cols="12">12</v-col>
  </v-row>
</div>
</template>

<style lang="scss">
  #main {
    height: 100vh;
    background-color: #304030;
    // background-image: url('~@/assets/img/tomato--orange.svg');
    background-repeat: no-repeat;
    background-size: 100vw;
    background-position: center bottom;
    padding-left: 72px;
    transition: padding 0.3s linear,background-position 0.3s linear;

    &.break {
      // background-image: url('~@/assets/img/tomato--green.svg');
    }
  }

@media (min-width: 768px) {
  #main{
    &.push {
      padding-left: 50vw;
      background-position: 50vw bottom;
    }
  }
}
@media (min-width: 992px) {
  #main{
    background-size: 1200px;
  }
}
</style>
