<template>
<div id="countdown">
  <h2 class="countdown_time">{{timeMin}}:{{timeSec}}</h2>
  <div class="countdown_btns">
    <v-btn @click="store.mute = !store.mute" variant="outlined" icon style="position: relative">
      <img src="@/assets/images/icon-bell.svg">
      <div v-if="store.mute" class="muteBar"></div>
    </v-btn>
    <v-btn
      @click="store.startCountdown"
      v-if="!store.isPlaying"
      color="white"
      icon size="large"
    >
      <img v-if="store.isWorking" src="@/assets/images/icon-play--orange.svg">
      <img v-else src="@/assets/images/icon-play--green.svg">
    </v-btn>
    <v-btn
      @click="store.pauseCountdown"
      v-else
      color="white"
      icon size="large"
    >
      <img v-if="store.isWorking" src="@/assets/images/icon-pause--orange.svg">
      <img v-else src="@/assets/images/icon-pause--green.svg">
    </v-btn>
    <v-btn @click="store.passCountdown()" variant="outlined" icon>
      <img src="@/assets/images/icon-cancel.svg">
    </v-btn>
  </div>
</div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from '../store/index.js'

const store = useStore()
const timeMin = computed(() => Math.floor(store.currentTime / 60).toString().padStart(2, '0'))
const timeSec = computed(() => (store.currentTime % 60).toString().padStart(2, '0'))
</script>

<style lang="scss" scoped>
.countdown_time {
  text-align: center;
  font-size: 12rem;
}

.countdown_btns {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem
}

.muteBar {
  width: 30px;
  height: 2px;
  transform: rotate(-40deg);
  background-color: #fff;
  position: absolute;
}
</style>
