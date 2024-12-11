<!-- src/App.vue -->

<template>
  <div>
    <NavBar />
    <div class="container mt-4">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import NavBar from './components/NavBar.vue';
</script>

<style>
/* Styles globaux peuvent être ajoutés ici */
body {
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
