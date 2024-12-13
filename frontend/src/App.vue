<template>
  <div>
    <NavBar />
    <div class="container m-0 p-0">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import NavBar from './components/NavBar.vue';

const route = useRoute();
const routeBackgroundColors = {
  MapEditing: '#3E2383',
  default: '#FFFFFF',
};

 watch(
  () => route.name,
  (newRouteName) => {
    const newBackgroundColor =
      routeBackgroundColors[newRouteName] || routeBackgroundColors.default;
    document.body.style.backgroundColor = newBackgroundColor;
  },
  { immediate: true }
);
</script>

<style lang="scss">
@use './assets/styles/main';
</style>
