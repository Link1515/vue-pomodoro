<template lang="pug">
#countdown.d-flex.flex-column.align-items-center
  .time
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

<style lang="scss">
@import '~@/style/variable';

#countdown{
  .time{
    font-size: calc(100px + 5vw);
    color: $textColor;
  }

  .btns{
    gap: 1rem;
  }

  button{
    width: 3rem;
    height: 3rem;
    display: grid;
    place-items: center;
  }
  .btn-lg{
    width: 4rem;
    height: 4rem;
  }
}
</style>
