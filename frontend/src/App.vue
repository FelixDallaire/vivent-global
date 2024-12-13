<template>
  <div class="p-0 m-0 w-100">
    <NavBar v-if="showNavBar" />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import NavBar from './components/NavBar.vue';

const route = useRoute();
const showNavBar = computed(() => {
  const hiddenNavRoutes = ['MapEditing'];
  return !hiddenNavRoutes.includes(route.name);
});
</script>

<style lang="scss">
@use './assets/styles/main';
</style>
