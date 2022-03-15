<template>
  <div id="listeditor">
    <div class="header mb-5">
      <h2 class="me-auto">代辦清單</h2>
      <h4 class="mx-1">已完成</h4>
      <h4 class="mx-1">未完成</h4>
    </div>
    <div>
      <v-text-field
        v-model="text"
        color="black"
        bg-color="white"
        label="add to-do"
        variant="outlined"
        shaped
      />
    </div>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
#listeditor {
  color: white;
}

.header {
  display: flex;
  align-items: center;

  h2 {
    font-size: 2rem;
  }
}
</style>
