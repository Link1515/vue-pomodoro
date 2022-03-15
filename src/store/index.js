import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => {
    return {
      sidebarIsOpen: false,
      currentTime: import.meta.env.VITE_TIME
    }
  }
})
