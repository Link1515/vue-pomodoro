<template>
  <div id="listeditor">
    <div class="header mb-5">
      <h2 class="me-auto">代辦清單</h2>
      <v-btn-toggle v-model="displayType">
        <v-btn variant="text" value="unfinish" class="ms-auto">未完成</v-btn>
        <v-btn variant="text" value="finish">已完成</v-btn>
      </v-btn-toggle>
    </div>
    <div>
      <v-tooltip>
        <template v-slot:activator="{ props }">
          <v-text-field
            v-model="text"
            @keydown.enter="addList(text)"
            @keydown.esc="text = ''"
            v-bind="props"
            color="black"
            bg-color="white"
            label="add to-do"
            variant="outlined"
            shaped
          />
        </template>
        <span>enter 存入 / esc 清空</span>
      </v-tooltip>
    </div>
    <ul>
      <v-divider></v-divider>
      <template v-for="l in displayList" :key="l.id">
        <li class="d-flex align-center py-1">
          <template v-if="!l.editing">
            <v-checkbox
              v-model="l.finished"
              :label="l.text"
              color="orange"
              hide-details
              style="color: white;"
            />
            <div class="listeditor_btns">
              <v-btn @click="store.editList(l.id)" variant="text" icon>
                <img src="../../assets/images/icon-edit.svg">
              </v-btn>
              <v-btn @click="store.deleteList(l.id)" variant="text" icon>
                <img src="../../assets/images/icon-delete.svg">
              </v-btn>
            </div>
          </template>
          <template v-else>
            <v-tooltip>
              <template v-slot:activator="{ props }">
                <v-text-field
                  v-model="l.editText"
                  @keydown.enter="store.saveList(l.id, true)"
                  @keydown.esc="store.saveList(l.id, false)"
                  v-bind="props"
                  :label="l.text"
                  bg-color="white" hide-details
                />
              </template>
              <span>enter 保存 / esc 取消</span>
            </v-tooltip>
          </template>
        </li>
        <v-divider></v-divider>
      </template>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from '../../store/index.js'

const store = useStore()
const text = ref('')
const displayType = ref('unfinish')
const displayList = computed(() => {
  if (displayType.value === 'unfinish') {
    return store.list.filter(l => !l.finished)
  } else {
    return store.list.filter(l => l.finished)
  }
})

function addList (txt) {
  if (text.value === '') return
  store.addList(txt)
  text.value = ''
}
</script>

<style lang="scss" scoped>
#listeditor {
  color: white;
}

.header {
  display: flex;
  align-items: center;

  h2 {
    font-size: 2rem;
  }
}
</style>
