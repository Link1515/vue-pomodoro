<script setup>
console.log(import.meta.env.VITE_TIME)
</script>

<template>
<div id="countdown">
  <h2 class="countdown_time">00:00</h2>
  <div class="countdown_btns">
    <v-btn variant="outlined" icon>
      <img src="@/assets/images/icon-bell.svg">
    </v-btn>
    <v-btn color="white" icon size="large">
      <img src="@/assets/images/icon-play--orange.svg">
    </v-btn>
    <v-btn variant="outlined" icon>
      <img src="@/assets/images/icon-cancel.svg">
    </v-btn>
  </div>
</div>
</template>

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
</style>
