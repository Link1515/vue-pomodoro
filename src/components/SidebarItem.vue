<template>
<v-card id="sidebar">
  <v-layout>
    <v-navigation-drawer
      theme="light"
      rail
      permanent
    >
      <v-list
        density="comfortable"
        nav
        class="sidebar_btns"
      >
        <v-list-item class="sidebar_iconList" value="list" @click="sidebarIsOpen = !sidebarIsOpen"></v-list-item>
        <v-list-item class="sidebar_iconAnalysis" value="analysis" @click="sidebarIsOpen = !sidebarIsOpen"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer
      v-model="sidebarIsOpen"
    >
      123
    </v-navigation-drawer>
  </v-layout>
</v-card>
</template>

<script setup>
// import { storeToRefs } from 'pinia'
// import { useStore } from '../store/index.js'
// const { sidebarIsOpen } = storeToRefs(useStore())
</script>
<script>
import { mapWritableState } from 'pinia'
import { useStore } from '../store/index.js'
export default {
  computed: {
    ...mapWritableState(useStore, ['sidebarIsOpen'])
  }
}
</script>

<style lang="scss" scoped>
.sidebar_btns{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.sidebar_iconList {
  padding-right: 0;
  background: url('@/assets/images/icon-list.svg') no-repeat center / 60% auto;
}

.sidebar_iconAnalysis {
  padding-right: 0;
  background: url('@/assets/images/icon-analysis.svg') no-repeat center / 60% auto;
}
</style>
