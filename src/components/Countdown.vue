<template lang="pug">
#countdown.d-flex.flex-column.align-items-center
  .time.text-light
    span.mins 00
    | :
    span.seconds 00
  .btns.d-flex.align-items-center
    b-btn.rounded-circle(variant="outline-light")
      img(:src="require('@/assets/img/icon-bell.svg')")
    b-btn.btn-lg.rounded-circle(variant="light")
      img(:src="require('@/assets/img/icon-play--orange.svg')")
    b-btn.rounded-circle(variant="outline-light")
      img(:src="require('@/assets/img/icon-cancel.svg')")
</template>
