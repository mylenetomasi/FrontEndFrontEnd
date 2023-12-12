<script setup>
import cardAgen from './cardAgen.vue';
</script>
<template>
  <section>
    <h2>Agendamentos</h2>
    <div class="scroll">
      <cardAgen />
      <cardAgen />
      <cardAgen />
      <cardAgen />
      <cardAgen />
      <cardAgen />
      <cardAgen />
    </div>
  </section>
</template>
<style scoped>
.scroll {
  overflow-x: scroll;

  display: flex;
}
</style>
