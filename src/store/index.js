import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'

const alarm = new Audio('/audio/alarm.mp3')

export const useStore = defineStore('main', {
  state: () => {
    return {
      isWorking: true,
      isPlaying: false,
      sidebarIsOpen: false,
      currentTime: import.meta.env.VITE_TIME,
      timer: null,
      mute: false,
      list: []
    }
  },
  persist: true,
  actions: {
    startCountdown () {
      alarm.load()
      this.isPlaying = true
      this.timer = setInterval(() => {
        this.currentTime--
        if (this.currentTime < 0) {
          clearInterval(this.timer)
          if (!this.mute) {
            alarm.play()
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
      alarm.load()
      this.isPlaying = false
      clearInterval(this.timer)
    },
    passCountdown () {
      alarm.load()
      clearInterval(this.timer)
      this.isPlaying = false
      this.isWorking = !this.isWorking
      this.isWorking ? this.currentTime = import.meta.env.VITE_TIME : this.currentTime = import.meta.env.VITE_TIMEBREAK
    },

    addList (text) {
      this.list.push({
        id: nanoid(),
        finished: false,
        editing: false,
        text,
        editText: text
      })
    },
    editList (id) {
      this.list.forEach(l => { l.editing = false })
      const index = this.list.findIndex(l => l.id === id)
      this.list[index].editing = true
    },
    saveList (id, isNew) {
      const index = this.list.findIndex(l => l.id === id)
      if (isNew) {
        this.list[index].text = this.list[index].editText
      } else {
        this.list[index].editText = this.list[index].text
      }
      this.list[index].editing = false
    },
    deleteList (id) {
      const index = this.list.findIndex(l => l.id === id)
      this.list.splice(index, 1)
    }
  }
})
