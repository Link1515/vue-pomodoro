<template lang="pug">
#viewlist.list-items.p-5.overflow-auto
  h1.text-center(v-if="unfinishedList.length === 0") 無待辦事項
  .d-flex.align-items-center.mb-2(v-for="item in unfinishedList" v-else)
    .list-item-checkbox(@click="finishItem(item.id)")
      b-icon(icon="check" v-if="item.finished")
    .list-item-text {{ item.text }}
</template>

<script>
export default {
  props: {
    listItems: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
    finishItem (id) {
      const index = this.listItems.findIndex(item => item.id === id)
      this.listItems[index].finished = !this.listItems[index].finished
    }
  },
  computed: {
    unfinishedList () {
      return this.listItems.filter(item => !item.finished)
    }
  }
}
</script>

<style lang="scss">
@import '~@/style/variable';

#viewlist{
  height: 80vh;
  color: $textColor;

  >div:first-child{
    font-size: 32px;

    .list-item-checkbox{
      width: 40px;
      height: 40px;
      margin: 0;
      margin-right: 1rem;
    }
  }

  .list-item-checkbox{
    width: 24px;
    height: 24px;
    margin: 7px 0.5rem;
    border-radius: 50%;
    border: 2px solid $textColor;
    display: grid;
    place-items: center;
    cursor: pointer;
  }
}
</style>
