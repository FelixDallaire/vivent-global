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
  LandingPage: `url(https://felixdallaire.github.io/svg-hosting/city_background.png) bottom`,
  Dashboard: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 800'%3E%3Cdefs%3E%3ClinearGradient id='gradient' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0%25' stop-color='%23341C3E'/%3E%3Cstop offset='100%25' stop-color='%235C0083'/%3E%3C/linearGradient%3E%3Cpattern id='pattern' width='24' height='24' patternUnits='userSpaceOnUse'%3E%3Ccircle fill='%23A14DD8' cx='12' cy='12' r='12'/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23gradient)' width='800' height='800'/%3E%3Crect fill='url(%23pattern)' width='800' height='800' fill-opacity='0.1'/%3E%3C/svg%3E")`,
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
    return 'container m-0 p-0';
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
</style>
