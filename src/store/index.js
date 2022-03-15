import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => {
    return {
      isWorking: true,
      isPlaying: false,
      sidebarIsOpen: false,
      currentTime: import.meta.env.VITE_TIME,
      timer: null,
      mute: false,
      alarm: new Audio('./audio/alarm.mp3'),
      list: []
    }
  },
  actions: {
    startCountdown () {
      this.alarm.load()
      this.isPlaying = true
      this.timer = setInterval(() => {
        this.currentTime--
        if (this.currentTime < 0) {
          clearInterval(this.timer)
          if (!this.mute) {
            this.alarm.play()
          }
          this.isPlaying = false
          if (this.isWorking) {
            this.isWorking = false
            this.currentTime = import.meta.env.VITE_TIMEBREAK
          } else {
            this.isWorking = true
            this.currentTime = import.meta.env.VITE_TIME
          }
        }
      }, 1000)
    },
    pauseCountdown () {
      this.alarm.load()
      this.isPlaying = false
      clearInterval(this.timer)
    },
    passCountdown () {
      this.alarm.load()
      clearInterval(this.timer)
      this.isPlaying = false
      this.isWorking = !this.isWorking
      this.isWorking ? this.currentTime = import.meta.env.VITE_TIME : this.currentTime = import.meta.env.VITE_TIMEBREAK
    }
  }
})
