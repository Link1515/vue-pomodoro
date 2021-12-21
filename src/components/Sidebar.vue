<template lang="pug">
#sidebar
  .btns.vh-100.d-flex.flex-column.justify-content-center
    b-btn(v-b-toggle.sidebar-list :class="{active: listIsOpen}")
      img(:src="require('@/assets/img/icon-list.svg')")
    b-btn(v-b-toggle.sidebar-analysis :class="{active: analysisIsOpen}")
      img(:src="require('@/assets/img/icon-analysis.svg')")

  b-sidebar#sidebar-list(no-header shadow :width="width" v-model="listIsOpen")
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
    .px-4.px-lg-5.py-5.vh-100.d-flex.flex-column.justify-content-between
      h2 專注度分析
      b-row.analysis-statistics
        b-col.analysis-item(cols="12" xl="6")
          h3.mb-3 今日
            span.date.ml-3 2021 . 12 .21
          .analysis-card.text-center.d-flex.justify-content-evenly.py-3.mt-3
            .analysis-cardItem.w-50
              h4.green {{ analysis.todayUnfinished }}
              p 待辦事項
            .analysis-cardItem.w-50
              h4.orange {{ analysis.todayFinished }}
              p 已完成
        b-col.analysis-item.d-none.d-xl-block(cols="6")
          h3.mb-3 本週
          .analysis-card.d-flex.text-center.d-flex.justify-content-evenly.py-3.mt-3
            .analysis-cardItem.w-50
              h4.green {{ analysis.weekUnfinished }}
              p 待辦事項
            .analysis-cardItem.w-50
              h4.orange {{ analysis.weekFinished }}
              p 已完成
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
          data: [0, 0, 0, 0, 0, 0, 6],
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
      },
      analysis: {
        todayUnfinished: 0,
        todayFinished: 0,
        weekUnfinished: 0,
        weekFinished: 0
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
        this.analysis.todayUnfinished++
        this.analysis.weekUnfinished++
      }
    },
    finishItem (id) {
      const index = this.listItems.findIndex(item => item.id === id)
      this.listItems[index].finished = !this.listItems[index].finished
      this.listItems[index].editing = false
      if (this.listItems[index].finished) {
        this.analysis.todayFinished++
        this.analysis.weekFinished++
      } else {
        this.analysis.todayFinished--
        this.analysis.weekFinished--
      }
    },
    deleteItem (id) {
      const index = this.listItems.findIndex(item => item.id === id)
      if (!this.listItems[index].finished) {
        this.analysis.todayUnfinished--
        this.analysis.weekUnfinished--
      }
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
    // listItems () {
    //   const newListIndex = this.listItems.at(-1).id
    //   const newListDate = (new Date(newListIndex)).toDateString()
    //   if (newListDate === (new Date(Date.now())).toDateString()) {
    //     this.analysis.todayUnfinished++
    //   }
    // }
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
  position: absolute;
  left: 0;
  top: 0;

  h2{
    font-size: calc(25px + 1vw);
  }

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

  #sidebar-list,
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

  .analysis-statistics{
    height: 35vh;
    color: $textColor;
  }

  .analysis-card{
    border: 1px solid $textColor-light;
    border-radius: 10px;
    position: relative;

    &::after{
      content: '';
      width: 1px;
      height: 80%;
      background-color: $textColor-light;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
    }
  }

  .analysis-item{
    h3, .date{
      font-size: 24px;
    }

    .date{
      color: $textColor-light;
    }

    .analysis-cardItem{
      h4{
        font-size: calc(70px + 1vw);

        &.green {
          color: $color-secondary;
        }

        &.orange {
          color: $color-primary;
        }
      }

      p {
        font-size: 24px;
        font-weight: 300;
      }
    }
  }
}
</style>
