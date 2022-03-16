<template>
  <div id="listitem" class="mt-7">
    <template v-if="store.isWorking">
      <ul class="pe-6" style="overflow-y: scroll; height: 50vh">
        <template v-for="l in displayList" :key="l.id">
          <li class="d-flex align-center py-1">
            <v-checkbox
              v-model="l.finished"
              :label="l.text"
              color="orange"
              hide-details
              style="color: white;"
            />
          </li>
          <v-divider></v-divider>
        </template>
      </ul>
    </template>
    <template v-else>
      <div class="px-5">
        <h2 class="text-h2">休息，</h2>
        <br>
        <h3 class="text-h3">是為了下一次的努力</h3>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from '../store/index.js'
const store = useStore()
const displayList = computed(() => {
  return store.list.filter(l => !l.finished)
})
</script>

<style lang="scss" scoped>

</style>
