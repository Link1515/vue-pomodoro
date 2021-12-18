<template lang="pug">
#viewlist.list-items
  div.d-flex.align-items-center(v-for="item in filterList")
    .list-item-checkbox.mr-3(@click="finishItem(item.id)")
      b-icon(icon="check" v-if="item.finished")
    del.mr-auto(v-if="item.finished") {{ item.text }}
    .list-item-text.mr-auto(@dblclick="editItem(item.id)" v-else) {{ item.text }}
    .list-item-btns(v-if="!item.editing")
      button(@click="editItem(item.id)" v-if="!item.finished")
        img(:src="require('@/assets/img/icon-edit.svg')")
      button(@click="deleteItem(item.id)")
        img(:src="require('@/assets/img/icon-cancel.svg')")
</template>
