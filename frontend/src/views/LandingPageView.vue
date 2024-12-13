<template>
  <div class="d-flex justify-content-center align-items-center landing-page w-100">
    <div class="text-center">
      <img src="@/assets/logo_funky.svg" alt="Logo" class="mb-4" height="300" />
      <h1 class="text-center text-light fs-4">L’expérience événementielle, autrement.</h1>
      <router-link class="btn btn-dark fw-bold px-5 py-2 mt-3 color-vivent-pink d-inline-block"
        :to="isAuthenticated ? '/dashboard' : '/login'">
        C'est Parti!
        <i class="bi bi-rocket-takeoff-fill"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import { computed } from 'vue';

export default {
  name: 'LandingPageView',
  setup() {
    const authStore = useAuthStore();
    const isAuthenticated = computed(() => authStore.isAuthenticated);

    return {
      isAuthenticated
    }
  }
};
</script>

<style scoped>
.landing-page {
  height: calc(100vh - var(--navbar-height));
}

.color-vivent-pink {
  color: #A14DD8 !important;
}

.landing-page .container {
  background: rgba(0, 0, 0, 0.6);
  padding: 2rem;
  border-radius: 0.5rem;
}

.text-center .btn {
  margin: 0 auto;
  display: block;
}
</style>
