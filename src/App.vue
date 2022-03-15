<template>
<div id="main"
  class="overflow-hidden"
  :class="{push: store.sidebarIsOpen, break: !store.isWorking}"
>
  <SidebarItem />
  <v-row class="mx-0 pt-5 overflow-hidden flex-md-nowrap">
    <v-col
      cols="12" :md="store.sidebarIsOpen ? 12 : 6"
      style="transition: 0.5s"
      class="flex-shrink-0"
    >
      <CountdownItem/>
    </v-col>
    <v-col cols="12">12</v-col>
  </v-row>
</div>
</template>

<script setup>
import CountdownItem from './components/CountdownItem.vue'
import SidebarItem from './components/SidebarItem/index.vue'
import { useStore } from './store/index.js'
const store = useStore()
</script>
<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
  #main {
    height: 100vh;
    background-color: var(--theme-color);
    background-image: url('@/assets/images/tomato--orange.svg');
    background-repeat: no-repeat;
    background-size: 100vw;
    background-position: center bottom;
    padding-left: 72px;
    transition: padding 0.3s linear,background-position 0.3s linear;

    &.break {
      background-image: url('@/assets/images/tomato--green.svg');
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
