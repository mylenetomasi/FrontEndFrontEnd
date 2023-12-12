<template>
  <div>
    <RouterView />
  </div>
</template>

<script setup>
import MenuLateral from "./components/MenuLateral.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";
const route = useRoute();

const showMenu = computed(() => {
  return route.name !== "login"; 
});
</script>

<style>
@import "@/assets/base.css";
</style>
