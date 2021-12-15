<template lang="pug">
#sidebar
  .btns.vh-100.d-flex.flex-column.justify-content-center
    b-btn(v-b-toggle.sidebar-lsit)
      img(:src="require('@/assets/img/icon-list.svg')")
    b-btn(v-b-toggle.sidebar-analysis)
      img(:src="require('@/assets/img/icon-analysis.svg')")

  b-sidebar#sidebar-lsit(shadow width="50vw" v-model="listIsOpen")
    .px-4.py-5
      .header.d-flex.justify-content-between
        h1 代辦清單
        .filter
          b-btn 未完成
          b-btn 已完成
      .search-bar
        input.w-100(type="text" placeholder="新增代辦事項")
  b-sidebar#sidebar-analysis(shadow width="50vw" v-model="analysisIsOpen")
    .px-3.py-2
      p
        | 22222Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
        | in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
</template>

<script>
export default {
  data () {
    return {
      listIsOpen: false,
      analysisIsOpen: false,
      test: 12
    }
  },
  watch: {
    listIsOpen () {
      if (this.listIsOpen) {
        this.analysisIsOpen = false
      }
    },
    analysisIsOpen () {
      if (this.analysisIsOpen) {
        this.listIsOpen = false
      }
    }
  }
}
</script>
