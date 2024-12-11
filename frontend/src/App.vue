<template>
  <div>
    <Navbar v-if="!hideNavbar" /> <!-- Conditionally render the navbar -->
    <router-view />
  </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from '@/components/Navbar.vue';

export default {
  components: {
    Navbar,
  },
  setup() {
    const route = useRoute();
    const hideNavbar = computed(() => route.name === 'MapEditing');
    return {
      hideNavbar,
    };
  },
};
</script>
