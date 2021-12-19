<template lang="pug">
#countdown.d-flex.flex-column.align-items-center
  .time
    span {{ mins }}
    | :
    span {{ seconds }}
  .btns.d-flex.align-items-center
    b-btn.rounded-circle(variant="outline-light" :class="{mute: mute}" @click="muteToggle")
      img(:src="require('@/assets/img/icon-bell.svg')")
    b-btn.btn-lg.rounded-circle(variant="light" @click="playToggle")
      img(:src="playImgSrc")
    b-btn.rounded-circle(variant="outline-light" @click="cancel")
      img(:src="require('@/assets/img/icon-cancel.svg')")
</template>

<script>
const ORANGE_PLAY_ICON = require('@/assets/img/icon-play--orange.svg')
const ORANGE_PAUSE_ICON = require('@/assets/img/icon-pause--orange.svg')
const GREEN_PLAY_ICON = require('@/assets/img/icon-play--green.svg')
const GREEN_PAUSE_ICON = require('@/assets/img/icon-pause--green.svg')

const alarm = new Audio(require('@/assets/audio/alarm.mp3'))

export default {
  data () {
    return {
      mode: 'work',
      state: 'pause',
      time: parseInt(process.env.VUE_APP_TIME),
      timer: 0,
      playImgSrc: ORANGE_PLAY_ICON,
      mute: false
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
  methods: {
    playToggle () {
      alarm.load()
      if (this.state === 'pause' && this.unfinishedList.length !== 0) {
        this.state = 'play'
        this.playImgSrc = this.mode === 'work' ? ORANGE_PAUSE_ICON : GREEN_PAUSE_ICON
      } else if (this.state === 'play') {
        this.state = 'pause'
        this.playImgSrc = this.mode === 'work' ? ORANGE_PLAY_ICON : GREEN_PLAY_ICON
      }
    },
    cancel () {
      this.state = 'pause'
      this.mode = 'work'
      this.time = parseInt(process.env.VUE_APP_TIME)
      this.playImgSrc = ORANGE_PLAY_ICON
      clearInterval(this.timer)
    },
    muteToggle () {
      this.mute = !this.mute
      this.mute ? alarm.volume = 0 : alarm.volume = 1
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
    mode () {
      this.$emit('sendCountdownMode', this.mode)
    },
    time () {
      if (this.time === 0) {
        alarm.play()
        clearInterval(this.timer)
        this.state = 'pause'
        if (this.mode === 'work') {
          this.unfinishedList[0].finished = true
          if (this.unfinishedList.length === 0) {
            this.time = parseInt(process.env.VUE_APP_TIME)
            this.playImgSrc = ORANGE_PLAY_ICON
          } else {
            this.mode = 'break'
            this.time = parseInt(process.env.VUE_APP_TIMEBREAK)
            this.playImgSrc = GREEN_PLAY_ICON
          }
        } else {
          this.mode = 'work'
          this.time = parseInt(process.env.VUE_APP_TIME)
          this.playImgSrc = ORANGE_PLAY_ICON
        }
      }
    }
  },
  computed: {
    unfinishedList () {
      return this.listItems.filter(item => !item.finished)
    },
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

    &.mute {
      background-color: #f8f9fa;
      position: relative;
      img {
        filter: invert(21%) sepia(21%) saturate(534%) hue-rotate(71deg) brightness(94%) contrast(91%);
      }
      &::after {
        content: '';
        position: absolute;
        width: 25px;
        height: 2px;
        background-color: #fff;
        filter: invert(21%) sepia(21%) saturate(534%) hue-rotate(71deg) brightness(94%) contrast(91%);
        transform: rotate(45deg);
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
      }
    }
  }
  .btn-lg{
    width: 4rem;
    height: 4rem;
  }
}
</style>
