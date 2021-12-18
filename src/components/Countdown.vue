<template lang="pug">
#countdown.d-flex.flex-column.align-items-center
  .time
    span {{ mins }}
    | :
    span {{ seconds }}
  .btns.d-flex.align-items-center
    b-btn.rounded-circle(variant="outline-light")
      img(:src="require('@/assets/img/icon-bell.svg')")
    b-btn.btn-lg.rounded-circle(variant="light" @click="play")
      img(:src="playImgSrc")
    b-btn.rounded-circle(variant="outline-light")
      img(:src="require('@/assets/img/icon-cancel.svg')")
</template>

<script>
const ORANGE_PLAY_ICON = require('@/assets/img/icon-play--orange.svg')
const ORANGE_PAUSE_ICON = require('@/assets/img/icon-pause--orange.svg')
const GREEN_PLAY_ICON = require('@/assets/img/icon-play--green.svg')
const GREEN_PAUSE_ICON = require('@/assets/img/icon-pause--green.svg')

export default {
  data () {
    return {
      mode: 'work',
      state: 'pause',
      time: parseInt(process.env.VUE_APP_TIME),
      timer: 0,
      playImgSrc: ORANGE_PLAY_ICON
    }
  },
  methods: {
    play () {
      if (this.state === 'pause') {
        this.state = 'play'
        this.playImgSrc = this.mode === 'work' ? ORANGE_PAUSE_ICON : GREEN_PAUSE_ICON
      } else if (this.state === 'play') {
        this.state = 'pause'
        this.playImgSrc = this.mode === 'work' ? ORANGE_PLAY_ICON : GREEN_PLAY_ICON
      }
    }
  },
  watch: {
    state () {
      if (this.state === 'play') {
        this.timer = setInterval(() => {
          this.time--
        }, 1000)
      } else {
        clearInterval(this.timer)
      }
    },
    time () {
      if (this.time === 0) {
        clearInterval(this.timer)
        this.state = 'pause'
        if (this.mode === 'work') {
          this.mode = 'break'
          this.time = parseInt(process.env.VUE_APP_TIME)
          this.playImgSrc = ORANGE_PLAY_ICON
        } else {
          this.mode = 'work'
          this.time = parseInt(process.env.VUE_APP_TIMEBREAK)
          this.playImgSrc = GREEN_PLAY_ICON
        }
      }
    }
  },
  computed: {
    mins () {
      return Math.floor(this.time / 60).toString().padStart(2, '0')
    },
    seconds () {
      return (this.time % 60).toString().padStart(2, '0')
    }
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

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
    &:not(.btn-lg):hover img{
      filter: invert(21%) sepia(21%) saturate(534%) hue-rotate(71deg) brightness(94%) contrast(91%);
    }
  }
  .btn-lg{
    width: 4rem;
    height: 4rem;
  }
}
</style>
