<script setup>
import ClientesComp from "../components/MainView/ClientesComp.vue";
import AgendamentosComp from "../components/MainView/AgendamentosComp.vue";
</script>
<template>
  <main class="pgadmin">
    <h1><strong>Administração</strong> geral</h1>
    <AgendamentosComp />
    <ClientesComp />
  </main>
</template>
<style scoped>
.pgadmin {
  padding: 20px 20px 50px 125px
}

</style>