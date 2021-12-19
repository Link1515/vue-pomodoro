<template lang="pug">
#sidebar
  .btns.vh-100.d-flex.flex-column.justify-content-center
    b-btn(v-b-toggle.sidebar-lsit :class="{active: listIsOpen}")
      img(:src="require('@/assets/img/icon-list.svg')")
    b-btn(v-b-toggle.sidebar-analysis :class="{active: analysisIsOpen}")
      img(:src="require('@/assets/img/icon-analysis.svg')")

  b-sidebar#sidebar-lsit(no-header shadow :width="width" v-model="listIsOpen")
    .px-4.px-lg-5.py-5
      .list-header.d-flex.justify-content-between.align-items-center
        h2 待辦清單
        .list-filter
          label.mx-2(for="unfinished" :class="{active: listType === 'unfinished'}")
            input#unfinished.d-none(type="radio" value="unfinished" v-model="listType" checked)
            span 未完成
          label.mx-2(for="finished" :class="{active: listType === 'finished'}")
            input#finished.d-none(type="radio" value="finished" v-model="listType")
            span 已完成
      .list-searchBar
        input.w-100(type="text" maxlength="25" placeholder="新增待辦事項" v-model="newItem" @keydown.enter="addItem")
        button.addBtn(@click="addItem")
          b-icon(icon="plus")
      .list-items
        div.d-flex.align-items-center(v-for="item in filterList")
          .list-item-checkbox.mr-3(@click="finishItem(item.id)")
            b-icon(icon="check" v-if="item.finished")
          del.mr-auto(v-if="item.finished") {{ item.text }}
          .list-edit.flex-fill(v-else-if="item.editing")
            b-form-input(type="text" maxlength="25" v-model="item.editModel" autofocus @keydown.enter="editDone(item.id)" @keydown.esc="editCancel(item.id)")
            .list-edit-btns.d-flex
              button(@click="editDone(item.id)")
                img(:src="require('@/assets/img/icon-edit.svg')")
              button(@click="editCancel(item.id)")
                img(:src="require('@/assets/img/icon-cancel.svg')")
          .list-item-text.mr-auto(@dblclick="editItem(item.id)" v-else) {{ item.text }}
          .list-item-btns(v-if="!item.editing")
            button(@click="editItem(item.id)" v-if="!item.finished")
              img(:src="require('@/assets/img/icon-edit.svg')")
            button(@click="deleteItem(item.id)")
              img(:src="require('@/assets/img/icon-cancel.svg')")
  b-sidebar#sidebar-analysis(no-header shadow :width="width" v-model="analysisIsOpen")
    .px-4.px-lg-5.py-5
      h2 專注度分析
      .aa(style="width: 300px; height: 60px; background: #fa0")
      Barchart(:chartdata="chartdata" style="position: relative; height:40vh;")

</template>

<script>
import Barchart from '@/components/Barchart.vue'

export default {
  data () {
    return {
      listIsOpen: false,
      analysisIsOpen: false,
      listType: 'unfinished',
      newItem: '',
      width: '',
      chartdata: {
        labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
        datasets: [{
          data: [7, 4, 8, 2, 10, 6, 7],
          backgroundColor: [
            '#6C9460',
            '#6C9460',
            '#6C9460',
            '#6C9460',
            '#6C9460',
            '#6C9460',
            '#F08448'
          ]
        }]
      }
    }
  },
  props: {
    listItems: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    Barchart
  },
  methods: {
    resetSidebarWidth () {
      const sidebarWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) >= 768 ? '50vw' : '100vw'
      this.width = sidebarWidth
    },
    addItem () {
      if (this.newItem.length > 0) {
        this.listItems.push({
          id: Date.now(),
          text: this.newItem,
          finished: false,
          editModel: this.newItem,
          editing: false
        })
        this.newItem = ''
      }
    },
    finishItem (id) {
      const index = this.listItems.findIndex(item => item.id === id)
      this.listItems[index].finished = !this.listItems[index].finished
      this.listItems[index].editing = false
    },
    deleteItem (id) {
      const index = this.listItems.findIndex(item => item.id === id)
      this.listItems.splice(index, 1)
    },
    editItem (id) {
      const index = this.listItems.findIndex(item => item.id === id)
      this.listItems[index].editing = true
    },
    editDone (id) {
      const index = this.listItems.findIndex(item => item.id === id)
      this.listItems[index].text = this.listItems[index].editModel
      this.listItems[index].editing = false
    },
    editCancel (id) {
      const index = this.listItems.findIndex(item => item.id === id)
      this.listItems[index].editModel = this.listItems[index].text
      this.listItems[index].editing = false
    }
  },
  computed: {
    filterList () {
      if (this.listType === 'unfinished') {
        return this.listItems.filter(item => !item.finished)
      } else {
        return this.listItems.filter(item => item.finished)
      }
    }
  },
  watch: {
    listIsOpen () {
      if (this.listIsOpen) {
        this.analysisIsOpen = false
        this.$emit('sendSidebarState', true)
      } else if (!this.listIsOpen && !this.analysisIsOpen) {
        this.$emit('sendSidebarState', false)
      }
    },
    analysisIsOpen () {
      if (this.analysisIsOpen) {
        this.listIsOpen = false
        this.$emit('sendSidebarState', true)
      } else if (!this.listIsOpen && !this.analysisIsOpen) {
        this.$emit('sendSidebarState', false)
      }
    }
  },
  created () {
    this.resetSidebarWidth()
    window.addEventListener('resize', this.resetSidebarWidth)
  }
}
</script>

<style lang="scss">
@import '~@/style/variable';

#sidebar{
  font-family: 'Noto Sans TC', sans-serif;
  position: absolute;
  left: 0;
  top: 0;

  .btns{
    background-color: $textColor;
    width: 4rem;
    position: relative;
    z-index: 9999;
    button{
      background-color: transparent;
      border: none;
      transition: background-color 0.5s;
      &:hover{
        background-color: #fff;
      }
      &:active,&:focus{
        background-color: transparent;
      }
      &:focus{
        border: none;
        box-shadow: none;
      }
      &.active {
        background-color: #fff;
      }
    }
  }

  #sidebar-lsit,
  #sidebar-analysis{
    background-color: #304030 !important;
    color: white !important;
    padding-left: 4.5rem;
  }

  .list-header {
    margin-bottom: 40px;
    .list-filter{
      label {
        cursor: pointer;
        color: $textColor-light;
        transform: scale(1);
        transition: color 0.5s, transform 0.5s;
      }
      label.active{
        color: $textColor;
        transform: scale(1.1);
      }
    }
  }

  .list-searchBar {
    position: relative;
    margin-bottom: 30px;

    input{
      border: none;
      height: 56px;
      border-radius: 9999px;
      padding: 15px 24px;
      padding-right: 70px;
    }

    .addBtn{
      width: 48px;
      height: 40px;
      font-size: 30px;
      border-radius: 9999px;
      border: none;
      background-color: $color-primary;
      color: $textColor;
      margin: auto;
      display: grid;
      place-items: center;
      position: absolute;
      top: 0;
      bottom: 0;
      right: 10px;

      &:hover {
        background-color: darken($color-primary, 5%)
      }
    }
  }

  .list-items {
    color: $textColor;

    &>div{
      padding: 15px 0;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
    }

    .list-item-checkbox{
      width: 24px;
      height: 24px;
      margin: 7px 0;
      border-radius: 50%;
      border: 2px solid $textColor;
      display: grid;
      place-items: center;
      cursor: pointer;
    }

    del{
      color: $textColor-light;
    }

    .list-item-btns{
      margin-right: 5px;
      button{
        padding: 0 5px;
        background: none;
        border: none;

        &:last-child {
          margin-left: 10px;
        }
      }
    }

    .list-edit {
      position: relative;

      input{
        width: 100%;
        border-radius: 9999px;
        border: none;
        padding: 6px 12px;
        padding-right: 92px;
        box-shadow: none;
      }

      .list-edit-btns{
        height: 24px;
        gap: 6px;
        position: absolute;
        margin: auto;
        top: 0;
        bottom: 0;
        right: 6px;
      }

      button{
        background: $color-primary;
        border-radius: 9999px;
        border: none;
        display: grid;
        place-items: center;

        &:hover{
          background-color: darken($color-primary, 5%)
        }

        img {
          width: 24px;
          padding: 0 3px;
        }
      }
    }
  }
}
</style>
