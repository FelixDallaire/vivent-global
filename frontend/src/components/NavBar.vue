<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand d-flex align-items-center" :to="'/'">
        <img src="@/assets/logo.svg" alt="Logo" class="me-2" height="25" />
      </router-link>

      <router-link v-if="isAuthenticated" to="/dashboard"
        class="nav-link mx-auto text-uppercase text-white">Dashboard</router-link>

      <div class="navbar-collapse">
        <ul class="navbar-nav ms-auto d-flex align-items-center">
          <template v-if="isAuthenticated">
            <span class="fw-medium text-uppercase text-white ">{{ username }}</span>
            <li class="nav-item dropdown">
              <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img :src="avatar" alt="Avatar" class="sp-1 rounded-circle border border-white p-1 border-3"
                  height="40">
              </a>
              <ul class="dropdown-menu dropdown-menu-end">
                <li>
                  <a class="dropdown-item disabled" href="#">Profile</a>
                </li>
                <li v-if="isOrganizer">
                  <router-link class="dropdown-item" to="/add-event">Add event</router-link>
                </li>
                <li>
                  <button @click="logout" class="dropdown-item text-danger">Logout</button>
                </li>
              </ul>
            </li>
          </template>
          <template v-else>
            <li class="nav-item">
              <router-link to="/login" class="nav-link text-uppercase text-white">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/register" class="nav-link text-uppercase text-white">Register</router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores/user';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'NavBar',
  setup() {
    const authStore = useAuthStore();
    const userStore = useUserStore();
    const router = useRouter();

    const isAuthenticated = computed(() => authStore.isAuthenticated);
    const username = computed(() => userStore.username);
    const avatar = computed(() => userStore.avatar);
    const isOrganizer = computed(() => userStore.isOrganizer);

    const logout = async () => {
      await authStore.logout();
      router.push('/login');
    };

    return {
      isAuthenticated,
      username,
      avatar,
      isOrganizer,
      logout
    };
  },
};
</script>

<style scoped>
.nav-link.dropdown-toggle::after {
  display: none;
}
</style>
