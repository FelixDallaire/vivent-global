<template>
  <div>
    <NavBar />
    <div :class="containerClass">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { watch, computed } from "vue";
import { useRoute } from "vue-router";
import NavBar from "./components/NavBar.vue";

const route = useRoute();
const routeBackgroundColors = {
  MapEditing: '#3E2383',
  Login: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 800'%3E%3Cg %3E%3Ccircle fill='%231D1A18' cx='400' cy='400' r='600'/%3E%3Ccircle fill='%23291d29' cx='400' cy='400' r='500'/%3E%3Ccircle fill='%23341f3c' cx='400' cy='400' r='400'/%3E%3Ccircle fill='%233f214f' cx='400' cy='400' r='300'/%3E%3Ccircle fill='%234a2263' cx='400' cy='400' r='200'/%3E%3Ccircle fill='%23552277' cx='400' cy='400' r='100'/%3E%3C/g%3E%3C/svg%3E")`,
  Register: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 800'%3E%3Cg %3E%3Ccircle fill='%231D1A18' cx='400' cy='400' r='600'/%3E%3Ccircle fill='%23291d29' cx='400' cy='400' r='500'/%3E%3Ccircle fill='%23341f3c' cx='400' cy='400' r='400'/%3E%3Ccircle fill='%233f214f' cx='400' cy='400' r='300'/%3E%3Ccircle fill='%234a2263' cx='400' cy='400' r='200'/%3E%3Ccircle fill='%23552277' cx='400' cy='400' r='100'/%3E%3C/g%3E%3C/svg%3E")`,
  default: '#FFFFFF'
};

watch(
  () => route.name,
  (newRouteName) => {
    const newBackground = routeBackgroundColors[newRouteName] || routeBackgroundColors.default;
    document.body.style.background = newBackground;
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.backgroundSize = 'cover';
  },
  { immediate: true }
);

const containerClass = computed(() => {
  const fullHeightRoutes = ['Login', 'Register', 'AddEvent', 'MapSelection'];
  const noCenterAlignRoutes = ['MapEditing'];
  const editMapRoute = 'MapEditing';

  if (route.name === editMapRoute) {
    return 'container m-0 p-0'; // Specific class for EditMap
  }

  if (fullHeightRoutes.includes(route.name)) {
    const baseClass = 'h-100 d-flex justify-content-center overflow-hidden';
    return noCenterAlignRoutes.includes(route.name) ? baseClass : `${baseClass} align-items-center`;
  }

  return 'container';
});


</script>

<style lang="scss">
@use './assets/styles/main';

// Apply additional styles for the full-height views if needed
</style>
