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
        <v-list-item class="sidebar_iconList" value="list" @click="toggleSidebar('list')"></v-list-item>
        <v-list-item class="sidebar_iconAnalysis" value="analysis" @click="toggleSidebar('analysis')"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-navigation-drawer
      class="sidebar_list"
      v-model="sidebarState.list"
      width="auto"
      style="width: calc(50vw - 72px); background: var(--theme-color); box-shadow: 0 10px 10px rgba(0,0,0,0.5); padding: 3rem 2rem"
      :style="{width: `calc(${sidebarWidth} - 72px)`}"
    >
      <ListEditor />
    </v-navigation-drawer>
    <v-navigation-drawer
    class="sidebar_analysis"
      v-model="sidebarState.analysis"
      width="auto"
      style="width: calc(50vw - 72px); background: var(--theme-color); box-shadow: 0 10px 10px rgba(0,0,0,0.5)"
    >
      analysisSidebar
    </v-navigation-drawer>
  </v-layout>
</v-card>
</template>

<script setup>
import ListEditor from './ListEditor.vue'
import { useStore } from '../../store/index.js'
import { storeToRefs } from 'pinia'
import { ref, reactive, computed } from 'vue'

const { sidebarIsOpen } = storeToRefs(useStore())
const sidebarState = reactive({
  list: false,
  analysis: false
})
sidebarIsOpen.value = computed(() => {
  return sidebarState.list || sidebarState.analysis
})

function toggleSidebar (iconType) {
  if ((!sidebarState.list && !sidebarState.analysis) || sidebarState[iconType]) {
    sidebarState[iconType] = !sidebarState[iconType]
  } else {
    sidebarState.list = !sidebarState.list
    sidebarState.analysis = !sidebarState.analysis
  }
}

function resizeSidebar () {
  return Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) >= 960 ? '50vw' : '100vw'
}
const sidebarWidth = ref(resizeSidebar())
window.addEventListener('resize', () => {
  sidebarWidth.value = resizeSidebar()
})
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
